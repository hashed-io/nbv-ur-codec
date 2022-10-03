const ecc = require('tiny-secp256k1')
let b58 = require('bs58check');
const { BIP32Factory } = require('bip32')
const bip39 = require('bip39')
const bitcoin = require('bitcoinjs-lib')

const bip32 = BIP32Factory(ecc)

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
    ['Vpub', '02575483'],
  ]
);

const NETWORK_TYPES = {
  "xpub": {
    messagePrefix: '\x18Bitcoin Signed Message:\n',
    bech32: 'bc',
    bip32: {
      public: 0x0488b21e,
      private: 0x0488ade4,
    },
    pubKeyHash: 0x00,
    scriptHash: 0x05,
    wif: 0x80,
  },
  "ypub": {
    messagePrefix: '\x18Bitcoin Signed Message:\n',
    bech32: 'bc',
    bip32: {
      public: 0x049d7cb2,
      private: 0x049d7878,
    },
    pubKeyHash: 0x00,
    scriptHash: 0x05,
    wif: 0x80,
  },
  "Ypub": {
    messagePrefix: '\x18Bitcoin Signed Message:\n',
    bech32: 'bc',
    bip32: {
      public: 0x0295b43f,
      private: 0x0295b005,
    },
    pubKeyHash: 0x00,
    scriptHash: 0x05,
    wif: 0x80,
  },
  "zpub": {
    messagePrefix: '\x18Bitcoin Signed Message:\n',
    bech32: 'bc',
    bip32: {
      public: 0x04b24746,
      private: 0x04b2430c,
    },
    pubKeyHash: 0x00,
    scriptHash: 0x05,
    wif: 0x80,
  },
  "Zpub": {
    messagePrefix: '\x18Bitcoin Signed Message:\n',
    bech32: 'bc',
    bip32: {
      public: 0x02aa7ed3,
      private: 0x02aa7a99,
    },
    pubKeyHash: 0x00,
    scriptHash: 0x05,
    wif: 0x80,
  },
  "tpub": {
    messagePrefix: '\x18Bitcoin Signed Message:\n',
    bech32: 'tb',
    bip32: {
      public: 0x043587cf,
      private: 0x04358394,
    },
    pubKeyHash: 0x6f,
    scriptHash: 0xc4,
    wif: 0xef,
  },
  "upub": {
    messagePrefix: '\x18Bitcoin Signed Message:\n',
    bech32: 'tb',
    bip32: {
      public: 0x044a5262,
      private: 0x044a4e28,
    },
    pubKeyHash: 0x6f,
    scriptHash: 0xc4,
    wif: 0xef,
  },
  "Upub": {
    messagePrefix: '\x18Bitcoin Signed Message:\n',
    bech32: 'tb',
    bip32: {
      public: 0x024289ef,
      private: 0x024285b5,
    },
    pubKeyHash: 0x6f,
    scriptHash: 0xc4,
    wif: 0xef,
  },
  "vpub": {
    messagePrefix: '\x18Bitcoin Signed Message:\n',
    bech32: 'tb',
    bip32: {
      public: 0x045f1cf6,
      private: 0x045f18bc,
    },
    pubKeyHash: 0x6f,
    scriptHash: 0xc4,
    wif: 0xef,
  },
  "Vpub": {
    messagePrefix: '\x18Bitcoin Signed Message:\n',
    bech32: 'tb',
    bip32: {
      public: 0x02575483,
      private: 0x02575048,
    },
    pubKeyHash: 0x6f,
    scriptHash: 0xc4,
    wif: 0xef,
  }
};

// https://stackoverflow.com/questions/40031688/javascript-arraybuffer-to-hex
function byteArrayToHexString(byteArray) {
  return Array.from(byteArray, function (byte) {
    return ('0' + (byte & 0xFF).toString(16)).slice(-2);
  }).join('')
}

const changeVersionBytes = function (xpub, targetFormat) {
  if (!prefixes.has(targetFormat)) {
    return "Invalid target version";
  }

  // trim whitespace
  xpub = xpub.trim();

  try {
    var data = b58.decode(xpub);
    data = data.slice(4);
    data = Buffer.concat([Buffer.from(prefixes.get(targetFormat), 'hex'), data]);
    return b58.encode(data);
  } catch (err) {
    return "Invalid extended public key! Please double check that you didn't accidentally paste extra data.";
  }
};

// unused functions
const getFingerprint = function (xpub, targetFormat) {
  return byteArrayToHexString(bip32.fromBase58(changeVersionBytes(xpub, targetFormat), NETWORK_TYPES[targetFormat]).fingerprint);
}

const getParentFingerprint = function (xpub, targetFormat) {
  return bip32.fromBase58(changeVersionBytes(xpub, targetFormat), NETWORK_TYPES[targetFormat]).parentFingerprint.toString(16);
}

const getDepth = function (xpub, targetFormat) {
  return bip32.fromBase58(changeVersionBytes(xpub, targetFormat), NETWORK_TYPES[targetFormat]).depth;
}

const generateCosigner = () => {
  // const zp = b'\x04\xb2\x43\x0c'
  const network = bitcoin.networks.bitcoin //use networks.testnet for testnet

  const path = `m/48'/0'/0'/2'` // Use m/49'/1'/0'/0 for testnet // ! needed to be exported
  let mnemonic = bip39.generateMnemonic() // ! need to be exported
  const seed = bip39.mnemonicToSeedSync('pledge world throw hobby cross height sure elder rough weekend share sausage')
  let root = bip32.fromSeed(seed, network)
  const xpub = root.derivePath(path).neutered().toBase58()

  const xfp = byteArrayToHexString(root.fingerprint).toUpperCase();
  const Zpub = changeVersionBytes(xpub, 'Zpub');

  return {
    seed: mnemonic,
    Zpub: Zpub,
    xfp: xfp,
    path: path
  }
};

module.exports = generateCosigner