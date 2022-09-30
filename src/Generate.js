const ecc = require('tiny-secp256k1')
const { BIP32Factory } = require('bip32')
const bip39 = require('bip39')
const bitcoin = require('bitcoinjs-lib')
const bs58 = require('bs58')

const example_bip32 = () => {
  // const zp = b'\x04\xb2\x43\x0c'
  const bip32 = BIP32Factory(ecc)
  const network = bitcoin.networks.bitcoin //use networks.testnet for testnet

  const path = `m/48'/0'/0'/2` // Use m/49'/1'/0'/0 for testnet

  let mnemonic = bip39.generateMnemonic()
  const seed = bip39.mnemonicToSeedSync(mnemonic)

  let root = bip32.fromSeed(seed, network)

  console.log('Root info');
  console.log(root.fingerprint.toString('hex'));
  console.log(root.derivePath(path).neutered().toBase58());
  console.log(path);
  console.log(mnemonic);


};

example_bip32()