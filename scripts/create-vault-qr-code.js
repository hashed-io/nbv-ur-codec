const fs = require('fs').promises
const { Encoder } = require('../src');

(async () => {
  const vault = {
    threshold: 2,
    cosigners: [
      {
        xfp: '0CDB4EE2',
        xpub: 'Zpub753WkfemgkpJqtboFVaoqHqBSVEQNgEdKmpRuMkNNabVv6ATumRRhNUdrnQopkgLnAxwZxzkh7rDvsCoEvBHuKuojKtSFfuroukMw9Kv1Ui',
        derivation_path: "m/48'/0'/0'/2'"
      },
      {
        xfp: 'D6B372CE',
        xpub: 'Zpub74mtS5wc9ewL5xy5u1NqjaZJ5ok13s8VaXHtX8qr2jxV8anG63C4dtHu7ZtAoBe9ksezve3gTBDs5PriFPApJoyQvq8SXQjJeUdzs153XEj',
        derivation_path: "m/48'/0'/0'/2'"
      },
      {
        xfp: 'DDB3F11E',
        xpub: 'Zpub74CJEA8Vx5yub6CiSuoFMLESzh2TzuaXXcZ4BrA9wntbg4kR9sCUrHqPQUCu5YMXRD6n624FUozZd8r5C41ProRqs3G6Mp2Zieu4RrWKdor',
        derivation_path: "m/48'/0'/0'/2'"
      },
      {
        xfp: '993D5AA8',
        xpub: 'Zpub752e1TJf2Roex9i8Wr4BCVgtoEWtQQeP2bievFbxFyheuNJoUQMXwxuafVercaBhAWXno2wXWAQesVjrDRNHkCL9Jf89Gx4aRKNNCF5Moq2',
        derivation_path: "m/48'/0'/0'/2'"
      }
    ]
  }
  const encoder = new Encoder()
  const result = encoder.vaultToQRCode(vault, 'Hashed Test NBV Codec')
  const file = await fs.open('/home/sebastian/Downloads/hashed-test-vault-nbv-codec.svg', 'w')
  await file.writeFile(result)
  console.log('Created vault qr file')
})()
