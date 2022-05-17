const { URDecoder } = require('@ngraveio/bc-ur')
const {
  CryptoAccount,
  CryptoPSBT,
  ScriptExpressions
} = require('@keystonehq/bc-ur-registry')
const b58 = require('bs58check')

const PATH_NATIVE_SEGWIT = "m/48'/0'/0'/2'"
const PATH_WRAPPED_SEGWIT = "m/48'/0'/0'/1'"
const PATH_LEGACY = "m/45'"

class Decoder {
  /**
   * Decodes XPUB Uniform Resource into a structured object
   * @param {string} payload UR from scanned xpub qr code
   * @returns {object} with the following structure:
   *    {
   *      xpubKey: 'Zpub756tPrxwHiYkYiT12G2WUD2cpAHyVWhjvKPbXoY5jDZSyo71yG5C14LCuwhycTTAzgTUcQfddR8FFTQ1bSWR6kzmNbMEaVzUrj4Lhxbonjo',
   *      masterFingerprint: '21EBDA7D',
   *      derivationPath: "m/48'/0'/0'/2'"
   *    }
   */
  decodeXPub (payload) {
    const decoded = this._decode(payload, 'crypto-account')
    const cryptoAccount = CryptoAccount.fromCBOR(decoded.cbor)

    const hdKey = cryptoAccount.outputDescriptors[0].getCryptoKey()
    const derivationPath = 'm/' + hdKey.getOrigin().getPath()
    const script = cryptoAccount.outputDescriptors[0].getScriptExpressions()[0].getExpression()
    const isMultisig =
    script === ScriptExpressions.WITNESS_SCRIPT_HASH.getExpression() ||
    derivationPath === PATH_LEGACY ||
    derivationPath === PATH_WRAPPED_SEGWIT ||
    derivationPath === PATH_NATIVE_SEGWIT
    const version = Buffer.from(isMultisig ? '02aa7ed3' : '04b24746', 'hex')
    const parentFingerprint = hdKey.getParentFingerprint()
    const depth = hdKey.getOrigin().getDepth()
    const depthBuf = Buffer.alloc(1)
    depthBuf.writeUInt8(depth)
    const components = hdKey.getOrigin().getComponents()
    const lastComponents = components[components.length - 1]
    const index = lastComponents.isHardened() ? lastComponents.getIndex() + 0x80000000 : lastComponents.getIndex()
    const indexBuf = Buffer.alloc(4)
    indexBuf.writeUInt32BE(index)
    const chainCode = hdKey.getChainCode()
    const key = hdKey.getKey()
    const data = Buffer.concat([version, depthBuf, parentFingerprint, indexBuf, chainCode, key])

    const xpubKey = b58.encode(data)
    const masterFingerprint = cryptoAccount.getMasterFingerprint().toString('hex').toUpperCase()
    let fullXpub = xpubKey
    if (
      masterFingerprint != null && masterFingerprint !== '' &&
        derivationPath != null && derivationPath !== ''
    ) {
      fullXpub = `[${masterFingerprint}${derivationPath.substring(1)}]${xpubKey}`
    }
    const result = {
      xpubKey,
      masterFingerprint,
      derivationPath,
      fullXpub
    }

    return result
  }

  /**
   * Decodes PSBT Uniform Resources into a hex encoded psbt
   * @param {Array<string>} fragments An array of PSBT UR from scanned PSBT QR Codes
   * @returns {string} the psbt as a hex encoded string
   */
  decodePSBT (fragments) {
    const decoded = this._decode(fragments, 'crypto-psbt')
    const cryptoPsbt = CryptoPSBT.fromCBOR(decoded.cbor)
    return cryptoPsbt.getPSBT().toString('hex')
  }

  _decode (fragments, expectedType) {
    fragments = Array.isArray(fragments) ? fragments : [fragments]
    const decoder = new URDecoder()
    for (const fragment of fragments) {
      decoder.receivePart(fragment)
    }

    if (!decoder.isComplete()) {
      throw new Error('provided fragments do not form a complete UR')
    }

    if (!decoder.isSuccess()) {
      throw new Error(decoder.resultError())
    }

    const decoded = decoder.resultUR()
    if (decoded.type !== expectedType) {
      throw new Error(`Data is not of expected type ${expectedType}, found type: ${decoded.type}`)
    }
    return decoded
  }
}

module.exports = Decoder
