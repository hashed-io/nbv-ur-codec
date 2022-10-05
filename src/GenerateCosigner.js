const ecc = require('tiny-secp256k1')
const b58 = require('bs58check')
const { BIP32Factory } = require('bip32')
const bip39 = require('bip39')
const bitcoin = require('bitcoinjs-lib')
const Util = require('./Util')

const prefixes = new Map(
  [
    ['xpub', '0488b21e'],
    ['ypub', '049d7cb2'],
    ['Ypub', '0295b43f'],
    ['zpub', '04b24746'],
    ['Zpub', '02aa7ed3'],
    ['tpub', '043587cf'],
    ['upub', '044a5262'],
    ['Upub', '024289ef'],
    ['vpub', '045f1cf6'],
    ['Vpub', '02575483']
  ]
)

// const NETWORK_TYPES = {
//   "xpub": {
//     messagePrefix: '\x18Bitcoin Signed Message:\n',
//     bech32: 'bc',
//     bip32: {
//       public: 0x0488b21e,
//       private: 0x0488ade4,
//     },
//     pubKeyHash: 0x00,
//     scriptHash: 0x05,
//     wif: 0x80,
//   },
//   "ypub": {
//     messagePrefix: '\x18Bitcoin Signed Message:\n',
//     bech32: 'bc',
//     bip32: {
//       public: 0x049d7cb2,
//       private: 0x049d7878,
//     },
//     pubKeyHash: 0x00,
//     scriptHash: 0x05,
//     wif: 0x80,
//   },
//   "Ypub": {
//     messagePrefix: '\x18Bitcoin Signed Message:\n',
//     bech32: 'bc',
//     bip32: {
//       public: 0x0295b43f,
//       private: 0x0295b005,
//     },
//     pubKeyHash: 0x00,
//     scriptHash: 0x05,
//     wif: 0x80,
//   },
//   "zpub": {
//     messagePrefix: '\x18Bitcoin Signed Message:\n',
//     bech32: 'bc',
//     bip32: {
//       public: 0x04b24746,
//       private: 0x04b2430c,
//     },
//     pubKeyHash: 0x00,
//     scriptHash: 0x05,
//     wif: 0x80,
//   },
//   "Zpub": {
//     messagePrefix: '\x18Bitcoin Signed Message:\n',
//     bech32: 'bc',
//     bip32: {
//       public: 0x02aa7ed3,
//       private: 0x02aa7a99,
//     },
//     pubKeyHash: 0x00,
//     scriptHash: 0x05,
//     wif: 0x80,
//   },
//   "tpub": {
//     messagePrefix: '\x18Bitcoin Signed Message:\n',
//     bech32: 'tb',
//     bip32: {
//       public: 0x043587cf,
//       private: 0x04358394,
//     },
//     pubKeyHash: 0x6f,
//     scriptHash: 0xc4,
//     wif: 0xef,
//   },
//   "upub": {
//     messagePrefix: '\x18Bitcoin Signed Message:\n',
//     bech32: 'tb',
//     bip32: {
//       public: 0x044a5262,
//       private: 0x044a4e28,
//     },
//     pubKeyHash: 0x6f,
//     scriptHash: 0xc4,
//     wif: 0xef,
//   },
//   "Upub": {
//     messagePrefix: '\x18Bitcoin Signed Message:\n',
//     bech32: 'tb',
//     bip32: {
//       public: 0x024289ef,
//       private: 0x024285b5,
//     },
//     pubKeyHash: 0x6f,
//     scriptHash: 0xc4,
//     wif: 0xef,
//   },
//   "vpub": {
//     messagePrefix: '\x18Bitcoin Signed Message:\n',
//     bech32: 'tb',
//     bip32: {
//       public: 0x045f1cf6,
//       private: 0x045f18bc,
//     },
//     pubKeyHash: 0x6f,
//     scriptHash: 0xc4,
//     wif: 0xef,
//   },
//   "Vpub": {
//     messagePrefix: '\x18Bitcoin Signed Message:\n',
//     bech32: 'tb',
//     bip32: {
//       public: 0x02575483,
//       private: 0x02575048,
//     },
//     pubKeyHash: 0x6f,
//     scriptHash: 0xc4,
//     wif: 0xef,
//   }
// }

class GenerateCosigner {
  /**
   * This functions resolvers the ECC to create the bit32T instance.
   */
  static resolveECC = async () => {
    const eccT = await ecc
    this.bip32T = BIP32Factory(eccT)
  }

  /**
   * Changes the version of the xpub to the version of the network
   * @param {string} xpub extended public key to be changed
   * @param {string} targetFormat ypub, Ypub, zpub, Zpub, tpub, upub, Upub, vpub, Vpub
   * @returns
   */

  static changeVersionBytes = (xpub, targetFormat) => {
    if (!prefixes.has(targetFormat)) {
      return 'Invalid target version.'
    }

    xpub = xpub.trim()

    try {
      let data = b58.decode(xpub)
      data = data.slice(4)
      data = Buffer.concat([Buffer.from(prefixes.get(targetFormat), 'hex'), data])
      return b58.encode(data)
    } catch (err) {
      return 'Invalid extended public key.'
    }
  }

  /**
   * Create a new cosigner and a new mnemonic
   * @returns {Object} An object containing the data to create a new cosigner
   */

  static getCosigner = async () => {
    await this.resolveECC()
    // const zp = b'\x04\xb2\x43\x0c'
    const network = bitcoin.networks.bitcoin // use networks.testnet for testnet

    const path = "m/48'/0'/0'/2'" // Use m/49'/1'/0'/0 for testnet
    const mnemonic = bip39.generateMnemonic()
    const seed = bip39.mnemonicToSeedSync(mnemonic)
    const root = this.bip32T.fromSeed(seed, network)
    const xpub = root.derivePath(path).neutered().toBase58()

    const xfp = Util.byteArrayToHexString(root.fingerprint).toUpperCase()
    const Zpub = this.changeVersionBytes(xpub, 'Zpub')

    return {
      seed: mnemonic,
      Zpub: Zpub,
      xfp: xfp,
      path: path
    }
  }
}

module.exports = GenerateCosigner
