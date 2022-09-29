const ecc = require('tiny-secp256k1')
const { BIP32Factory } = require('bip32')
const bip39 = require('bip39')
const bitcoin = require('bitcoinjs-lib')
const bs58 = require('bs58')

const example_bip32 = () => {
  // const zp = b'\x04\xb2\x43\x0c'
  const bip32 = BIP32Factory(ecc)
  console.log(bip32)
  const network = bitcoin.networks.bitcoin //use networks.testnet for testnet

  const path = `m/48'/0'/0'/2` // Use m/49'/1'/0'/0 for testnet

  let mnemonic = bip39.generateMnemonic()
  const seed = bip39.mnemonicToSeedSync(mnemonic)

  let root = bip32.fromSeed(seed, network)
  // console.log('root:', root.s)

  console.log('Root info');
  console.log(root.fingerprint.toString('hex'))
  console.log(root.identifier.toString('hex'))
  let address = root.privateKey.toString('hex')


  let account = root.derivePath(path)
  let node = account.derive(0).derive(0)
  console.log(node.identifier.toString('hex'))

  let btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network,
  }).address

  console.log(`
  Wallet generated:
  - Address    : ${btcAddress},
  - Key        : ${node.toBase58()},
  - xfp        : ${node.fingerprint},
  - Public key : ${node.publicKey.toString('hex')},
  - WIF        : ${node.toWIF()}
  - Mnemonic   : ${mnemonic}
  `)

  var buf = Buffer.from(btcAddress, 'x9.62');
  address = bs58.encode(buf)
  console.log(address)

};
const example_bip84 = () => {

  let mnemonic = bip39.generateMnemonic()

  const BIP84 = require('bip84')

  var root = new BIP84.fromMnemonic(mnemonic)
  console.log('Root public key', root.getRootPublicKey())
  var child0 = root.deriveAccount(0)

  console.log('mnemonic:', mnemonic)
  console.log('rootpriv:', root.getRootPrivateKey())
  console.log('rootpub:', root.getRootPublicKey())
  console.log('\n');

  var account0 = new BIP84.fromZPrv(child0)

  console.log("Account 0, root = m/84'/0'/0'");
  console.log('Account 0 xprv:', account0.getAccountPrivateKey())
  console.log('Account 0 xpub:', account0.getAccountPublicKey())
  console.log('\n');
};

const example_export_xpub = () => {
  const bip32 = BIP32Factory(ecc);

  const mnemonic = bip39.generateMnemonic()
  const seed = bip39.mnemonicToSeedSync(mnemonic);
  const node = bip32.fromSeed(seed);
  const strng = node.toBase58();
  const restored = bip32.fromBase58(strng);

  console.log(node.fingerprint.toString('hex'))
  console.log('strng:', strng)
};

example_bip32()