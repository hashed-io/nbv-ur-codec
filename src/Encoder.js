const { Bytes, CryptoPSBT } = require('@keystonehq/bc-ur-registry')
const { Psbt } = require('bitcoinjs-lib')
const QRCode = require('./QRCode')
const Util = require('./Util')

class Encoder {
  constructor () {
    this.qrCode = new QRCode()
  }

  /**
   * Encodes a vault object into a Uniform resource that can be used
   * to generate the qr code from
   * @param {object} vault with the following structure:
   *  {
   *    threshold: 2,
   *    cosigners: [
   *      {
   *        xfp: '0CDB4EE2',
   *        xpub: 'Zpub753WkfemgkpJqtboFVaoqHqBSVEQNgEdKmpRuMkNNabVv6ATumRRhNUdrnQopkgLnAxwZxzkh7rDvsCoEvBHuKuojKtSFfuroukMw9Kv1Ui',
   *        derivation_path: "m/48'/0'/0'/2'"
   *      },
   *      {
   *        xfp: 'D6B372CE',
   *        xpub: 'Zpub74mtS5wc9ewL5xy5u1NqjaZJ5ok13s8VaXHtX8qr2jxV8anG63C4dtHu7ZtAoBe9ksezve3gTBDs5PriFPApJoyQvq8SXQjJeUdzs153XEj',
   *        derivation_path: "m/48'/0'/0'/2'"
   *      }
   *    ]
   * }
   * @param {string} name of the vault
   * @returns the uniform resource for the vault
   */
  encodeVault (vault, name) {
    if (name == null) {
      throw new Error('A name for the vault must be provided')
    }
    if (vault == null) {
      throw new Error('A vault must be provided')
    }
    const err = this._validateVault(vault)
    if (err != null) {
      throw new Error(err)
    }

    const {
      threshold,
      cosigners
    } = vault
    let encoded = `Name: ${name}\n`
    encoded += `Policy: ${threshold} of ${cosigners.length}\n`
    encoded += `Derivation: ${cosigners[0].derivation_path}\n`
    encoded += 'Format: P2WSH\n\n'

    for (const cosigner of cosigners) {
      const {
        xfp,
        xpub
      } = cosigner
      encoded += `${xfp}: ${xpub}\n\n`
    }
    return encoded
  }

  /**
   * Creates a QR code from a vault object
   * @param {object} vault with the following structure:
   *  {
   *    threshold: 2,
   *    cosigners: [
   *      {
   *        xfp: '0CDB4EE3',
   *        xpub: 'Zpub753WlfemgkpJqtboFVaoqHqBSVEQNgEdKmpRuMkNNabVv6ATumRRhNUdrnQopkgLnAxwZxzkh7rDvsCoEvBHuKuojKtSFfuroukMw9Kv1Ui',
   *        derivation_path: "m/48'/0'/0'/2'"
   *      },
   *      {
   *        xfp: 'D6B372CA',
   *        xpub: 'Zpub74rtS5wc9ewL5xy5u1NqjaZJ5ok13s8VaXHtX8qr2jxV8anG63C4dtHu7ZtAoBe9ksezve3gTBDs5PriFPApJoyQvq8SXQjJeUdzs153XEj',
   *        derivation_path: "m/48'/0'/0'/2'"
   *      }
   *    ]
   * }
   * @param {string} name of the vault
   * @returns {string} representing svg image of the qr code
   */
  vaultToQRCode (vault, name) {
    const encoded = this.encodeVault(vault, name)
    return this._toQRCode(encoded)[0]
  }

  /**
   * Encodes a vault object into a bytes Uniform resource that can be used
   * to generate the qr code from
   * @param {object} vault with the following structure:
   *  {
   *    threshold: 2,
   *    cosigners: [
   *      {
   *        xfp: '0CDB4EE3',
   *        xpub: 'Zpub753WlfemgkpJqtboFVaoqHqBSVEQNgEdKmpRuMkNNabVv6ATumRRhNUdrnQopkgLnAxwZxzkh7rDvsCoEvBHuKuojKtSFfuroukMw9Kv1Ui',
   *        derivation_path: "m/48'/0'/0'/2'"
   *      },
   *      {
   *        xfp: 'D6B372CA',
   *        xpub: 'Zpub74rtS5wc9ewL5xy5u1NqjaZJ5ok13s8VaXHtX8qr2jxV8anG63C4dtHu7ZtAoBe9ksezve3gTBDs5PriFPApJoyQvq8SXQjJeUdzs153XEj',
   *        derivation_path: "m/48'/0'/0'/2'"
   *      }
   *    ]
   * }
   * @param {string} name of the vault
   * @param {int} fragmentLength the max length of the encoded fragments
   * @returns {Array<string>} An array of uniform resources for the vault
   */
  encodeVaultBytes (vault, name, fragmentLength) {
    const encoded = this.encodeVault(vault, name)
    const bytes = new Bytes(Buffer.from(encoded))
    const encoder = bytes.toUREncoder(fragmentLength)

    const ret = []
    for (let c = 1; c <= encoder.fragmentsLength; c++) {
      const ur = encoder.nextPart()
      ret.push(ur)
    }

    return ret
  }

  /**
   * Creates a series of QR codes from a vault object
   * @param {object} vault with the following structure:
   *  {
   *    threshold: 2,
   *    cosigners: [
   *      {
   *        xfp: '0CDB4EE3',
   *        xpub: 'Zpub753WlfemgkpJqtboFVaoqHqBSVEQNgEdKmpRuMkNNabVv6ATumRRhNUdrnQopkgLnAxwZxzkh7rDvsCoEvBHuKuojKtSFfuroukMw9Kv1Ui',
   *        derivation_path: "m/48'/0'/0'/2'"
   *      },
   *      {
   *        xfp: 'D6B372CA',
   *        xpub: 'Zpub74rtS5wc9ewL5xy5u1NqjaZJ5ok13s8VaXHtX8qr2jxV8anG63C4dtHu7ZtAoBe9ksezve3gTBDs5PriFPApJoyQvq8SXQjJeUdzs153XEj',
   *        derivation_path: "m/48'/0'/0'/2'"
   *      }
   *    ]
   * }
   * @param {string} name of the vault
   * @param {int} fragmentLength the max length of the encoded fragments
   * @returns {Array<string>} an array of strings representing svg images of the qr codes
   */
  vaultBytesToQRCode (vault, name, fragmentLength) {
    const fragments = this.encodeVaultBytes(vault, name, fragmentLength)
    return this._toQRCode(fragments)
  }

  /**
   * Encodes a hex or base64 encoded psbt PSBT Uniform resource that can be used
   * to generate the qr code from
   * @param {string} psbt hex or base64 encoded psbt
   * @param {int} fragmentLength the max length of the encoded fragments
   * @returns {Array<string>} An array of uniform resources for the psbt
   */
  encodePSBT (psbt, fragmentLength) {
    let data = null
    try {
      Psbt.fromHex(psbt)
      data = Util.fromHex(psbt)
    } catch (error) {
      Psbt.fromBase64(psbt)
      data = Util.fromBase64(psbt)
    }

    const cryptoPSBT = new CryptoPSBT(data)
    const encoder = cryptoPSBT.toUREncoder(fragmentLength)

    const ret = []
    for (let c = 1; c <= encoder.fragmentsLength; c++) {
      const ur = encoder.nextPart()
      ret.push(ur)
    }

    return ret
  }

  /**
   * Creates a series of QR codes from a hex or base64 encoded psbt
   * @param {string} psbt hex or base64 encoded psbt
   * @param {int} fragmentLength the max length of the encoded fragments
   * @returns {Array<string>} an array of strings representing svg images of the qr codes
   */
  psbtToQRCode (psbt, fragmentLength) {
    const fragments = this.encodePSBT(psbt, fragmentLength)
    return this._toQRCode(fragments)
  }

  _toQRCode (contents) {
    contents = Array.isArray(contents) ? contents : [contents]
    const qrCodes = []
    for (const content of contents) {
      qrCodes.push(this.qrCode.create(content))
    }
    return qrCodes
  }

  _validateVault (vault) {
    const {
      threshold,
      cosigners
    } = vault
    if (!Number.isInteger(threshold)) {
      return 'threshold must be an integer'
    }
    if (!Array.isArray(cosigners)) {
      return 'cosigners must be an array'
    }
    if (threshold > cosigners.length) {
      return 'threshold can not be greater than the number of cosigners'
    }
    return this._validateCosigners(cosigners)
  }

  _validateCosigners (cosigners) {
    if (cosigners.length < 2) {
      return 'There must be at least 2 cosigners'
    }
    const derivationPath = cosigners[0].derivation_path
    for (const [i, cosigner] of cosigners.entries()) {
      const err = this._validateCosigner(cosigner)
      if (err != null) {
        return `cosigner ${i}: ${err}`
      }
      if (cosigner.derivation_path !== derivationPath) {
        return `The derivation path of the cosigners do not match ${cosigner.derivation_path} != ${derivationPath}`
      }
    }
    return null
  }

  _validateCosigner (cosigner) {
    if (cosigner == null) {
      return 'cosigner can not be null'
    }
    const {
      xfp,
      xpub,
      derivation_path: derivationPath
    } = cosigner
    if (xfp == null) {
      return 'xfp must have a value'
    }

    if (xpub == null) {
      return 'xpub must have a value'
    }

    if (derivationPath == null) {
      return 'derivation_path must have a value'
    }
    return null
  }
}

module.exports = Encoder
