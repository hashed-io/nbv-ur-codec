**Native Bitcoin Vault Uniform Resource Encoder/Decoder**

Enables the encoding/decoding of various Bitcoin related components from/to Uniform Resource encoding

To install run the following command:

`npm i --save @smontero/nbv-ur-codec`

Import the Decoder, Encoder objects

`import { Decoder, Encoder } from '@smontero/nbv-ur-codec'`

Create an instance of the objects:

`const decoder = new Decoder()`
`const encoder = new Encoder()`

**Decoding:**

XPUB:

`const result = decoder.decodeXPub('UR:CRYPTO-ACCOUNT/OEADCYA...')`

PSBT:

`const result = decoder.decodePSBT(['UR:CRYPTO-PSBT/1-8/LPADAYC...', 'UR:CRYPTO-PSBT/2-8/LPAOAYCFAHP...'])`

**Encoding:**

Vault:

```js
const vault = {threshold: 2,
  cosigners: [
    {
      xfp: '0CDB4EE2',
      xpub: 'Zpub753Wkfem...',
      derivation_path: "m/48'/0'/0'/2'"
    },
    {
      xfp: 'D6B372CE',
      xpub: 'Zpub74mtS5wc9ewL5...',
      derivation_path: "m/48'/0'/0'/2'"
    }
  ]
}
const vaultName = 'Test Vault'

const result = encoder.vaultToQRCode(vault, 'Test Vault')
```

PSBT:

```js
const psbt = '70736274ff0100890100000001f1c6c4e36ef3789...'
const fragmentLength = 200

const fragments = encoder.psbtToQRCode(psbt, fragmentLength)
```

**Generation of new cosigners:**

Import the GenerateCosigner object

`import { GenerateCosigner } from '@smontero/nbv-ur-codec'`

Get a Zpub address with a `m/48'/0'/0'/2'` derivation path:

```js
const new_cosigner = GenerateCosigner.getCosigner()
```

This returns an object with the following properties:

```js
{
  seed: 'only cherry ... wreck sail hope tunnel',
  Zpub: 'Zpub74FhSyrzAe2FiWxkEGU1pd...efcxqRNvJgzWeCLMQ9WcugGp1SdHb',
  xfp: 'C82DBD9A',
  path: "m/48'/0'/0'/2'"
}
```

The data is ready to be imported into the form to add a multi-signature XPUB.