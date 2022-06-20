const { Util } = require('../src')

describe('Util functionality', () => {
  test('isHex', async () => {
    let isHex = Util.isHex('70736274ff0100890100000001feb2fe21567ce50b5d06522bd02f67135ec9ab80ca2c97974d3a0b030f5b46ee0000000000fdffffff02e803000000000000220020b713088a85c3c5e785dfaa8ee3974d6c2a3a6fc63009ea98195f6c80faeceef5390300000000000022002090d3f966cf4bae739add57d46da2e0a1c120a0ce4f9c689506a36b2a6d39690d00000000000100fdaa0102000000000101ac064b1ff33cb2abfd369aaa339a0651f74265faf41c2e7e49025569558d9e2a0000000000ffffffff02d007000000000000220020b830c7f173b2ffce6e007c700283cf27018c656e6faa15fc0b15513bda6b4ac786451e000000000022002050de076a0e3f4e09b67c50f1d74cda99edb909d2ff84f7caf84aa998a51d7f930400483045022100b6d0616c03fc21c4354e003896a970b30b49db3b397df4c76c07ca5bb8c05dad02206e467c957661518c2beeed5c573c3dc6fbcb10237d4ec96862032e71859fae86014730440220758f812609f2eae2c0ab13abcd5656a98d4159c286a247fff3caf0ce2954abef022043e9b59eba0b169369ed9fa870de9973c3587232eba5accc1ebb18a4bb2b3e81018b5221021aef5e398929e3223356f5895b861eb80d0c4497183025d98ef3e2a6af33f1042103409224bafaf3312604af3dd38214861d038b7f05abc50806353e4ca53ab415e12103647d2ab3390b32893f00f4c1e905e0289ccc2425dcd8598b1e397223b2786c2a2103d9a001127fc17b17d88ab3a912c5b9de2b76330dbaccb1aa33b12c882d4771df54ae0000000001012bd007000000000000220020b830c7f173b2ffce6e007c700283cf27018c656e6faa15fc0b15513bda6b4ac70108930300483045022100f30a8a87ff2d170cbfa70cc0c917eb4fc064403c8eb114acc29e498c29fb9d1602204c35d2b41d2df33faa6d54ede049075d46096df02d6c6ad1759b15dc1c4c0f6b014751210357693b653b9098c2009228541cfe48b98c0a4cf587b6b088656488c70fe5225f2103b65ce57a7e541c1cb1d5a5a4d59266c1b5904d5ab341356ab46bc52ae337912152ae00002202021aef5e398929e3223356f5895b861eb80d0c4497183025d98ef3e2a6af33f1041cddb3f11e300000800000008000000080020000800100000000000000220203409224bafaf3312604af3dd38214861d038b7f05abc50806353e4ca53ab415e11c993d5aa830000080000000800000008002000080010000000000000000')
    expect(isHex).toBe(true)
    isHex = Util.isHex('cHNidP8BAIkBAAAAAf6y/iFWfOULXQZSK9AvZxNeyauAyiyXl006CwMPW0buAAAAAAD9////AugDAAAAAAAAIgAgtxMIioXDxeeF36qO45dNbCo6b8YwCeqYGV9sgPrs7vU5AwAAAAAAACIAIJDT+WbPS65zmt1X1G2i4KHBIKDOT5xolQajayptOWkNAAAAAAABAP2qAQIAAAAAAQGsBksf8zyyq/02mqozmgZR90Jl+vQcLn5JAlVpVY2eKgAAAAAA/////wLQBwAAAAAAACIAILgwx/Fzsv/ObgB8cAKDzycBjGVub6oV/AsVUTvaa0rHhkUeAAAAAAAiACBQ3gdqDj9OCbZ8UPHXTNqZ7bkJ0v+E98r4SqmYpR1/kwQASDBFAiEAttBhbAP8IcQ1TgA4lqlwswtJ2zs5ffTHbAfKW7jAXa0CIG5GfJV2YVGMK+7tXFc8Pcb7yxAjfU7JaGIDLnGFn66GAUcwRAIgdY+BJgny6uLAqxOrzVZWqY1BWcKGokf/88rwzilUq+8CIEPptZ66CxaTae2fqHDemXPDWHIy66WszB67GKS7Kz6BAYtSIQIa7145iSnjIjNW9Ylbhh64DQxElxgwJdmO8+KmrzPxBCEDQJIkuvrzMSYErz3TghSGHQOLfwWrxQgGNT5MpTq0FeEhA2R9KrM5CzKJPwD0wekF4CiczCQl3NhZix45ciOyeGwqIQPZoAESf8F7F9iKs6kSxbneK3YzDbrMsaozsSyILUdx31SuAAAAAAEBK9AHAAAAAAAAIgAguDDH8XOy/85uAHxwAoPPJwGMZW5vqhX8CxVRO9prSscBCJMDAEgwRQIhAPMKiof/LRcMv6cMwMkX60/AZEA8jrEUrMKeSYwp+50WAiBMNdK0HS3zP6ptVO3gSQddRglt8C1satF1mxXcHEwPawFHUSEDV2k7ZTuQmMIAkihUHP5IuYwKTPWHtrCIZWSIxw/lIl8hA7Zc5Xp+VBwcsdWlpNWSZsG1kE1as0E1arRrxSrjN5EhUq4AACICAhrvXjmJKeMiM1b1iVuGHrgNDESXGDAl2Y7z4qavM/EEHN2z8R4wAACAAAAAgAAAAIACAACAAQAAAAAAAAAiAgNAkiS6+vMxJgSvPdOCFIYdA4t/BavFCAY1PkylOrQV4RyZPVqoMAAAgAAAAIAAAACAAgAAgAEAAAAAAAAAAA==')
    expect(isHex).toBe(false)
  })

  test('hexToBase64', async () => {
    let b64 = Util.hexToBase64('70736274ff0100890100000001feb2fe21567ce50b5d06522bd02f67135ec9ab80ca2c97974d3a0b030f5b46ee0000000000fdffffff02e803000000000000220020b713088a85c3c5e785dfaa8ee3974d6c2a3a6fc63009ea98195f6c80faeceef5390300000000000022002090d3f966cf4bae739add57d46da2e0a1c120a0ce4f9c689506a36b2a6d39690d00000000000100fdaa0102000000000101ac064b1ff33cb2abfd369aaa339a0651f74265faf41c2e7e49025569558d9e2a0000000000ffffffff02d007000000000000220020b830c7f173b2ffce6e007c700283cf27018c656e6faa15fc0b15513bda6b4ac786451e000000000022002050de076a0e3f4e09b67c50f1d74cda99edb909d2ff84f7caf84aa998a51d7f930400483045022100b6d0616c03fc21c4354e003896a970b30b49db3b397df4c76c07ca5bb8c05dad02206e467c957661518c2beeed5c573c3dc6fbcb10237d4ec96862032e71859fae86014730440220758f812609f2eae2c0ab13abcd5656a98d4159c286a247fff3caf0ce2954abef022043e9b59eba0b169369ed9fa870de9973c3587232eba5accc1ebb18a4bb2b3e81018b5221021aef5e398929e3223356f5895b861eb80d0c4497183025d98ef3e2a6af33f1042103409224bafaf3312604af3dd38214861d038b7f05abc50806353e4ca53ab415e12103647d2ab3390b32893f00f4c1e905e0289ccc2425dcd8598b1e397223b2786c2a2103d9a001127fc17b17d88ab3a912c5b9de2b76330dbaccb1aa33b12c882d4771df54ae0000000001012bd007000000000000220020b830c7f173b2ffce6e007c700283cf27018c656e6faa15fc0b15513bda6b4ac70108930300483045022100f30a8a87ff2d170cbfa70cc0c917eb4fc064403c8eb114acc29e498c29fb9d1602204c35d2b41d2df33faa6d54ede049075d46096df02d6c6ad1759b15dc1c4c0f6b014751210357693b653b9098c2009228541cfe48b98c0a4cf587b6b088656488c70fe5225f2103b65ce57a7e541c1cb1d5a5a4d59266c1b5904d5ab341356ab46bc52ae337912152ae00002202021aef5e398929e3223356f5895b861eb80d0c4497183025d98ef3e2a6af33f1041cddb3f11e300000800000008000000080020000800100000000000000220203409224bafaf3312604af3dd38214861d038b7f05abc50806353e4ca53ab415e11c993d5aa830000080000000800000008002000080010000000000000000')
    expect(b64).toBe('cHNidP8BAIkBAAAAAf6y/iFWfOULXQZSK9AvZxNeyauAyiyXl006CwMPW0buAAAAAAD9////AugDAAAAAAAAIgAgtxMIioXDxeeF36qO45dNbCo6b8YwCeqYGV9sgPrs7vU5AwAAAAAAACIAIJDT+WbPS65zmt1X1G2i4KHBIKDOT5xolQajayptOWkNAAAAAAABAP2qAQIAAAAAAQGsBksf8zyyq/02mqozmgZR90Jl+vQcLn5JAlVpVY2eKgAAAAAA/////wLQBwAAAAAAACIAILgwx/Fzsv/ObgB8cAKDzycBjGVub6oV/AsVUTvaa0rHhkUeAAAAAAAiACBQ3gdqDj9OCbZ8UPHXTNqZ7bkJ0v+E98r4SqmYpR1/kwQASDBFAiEAttBhbAP8IcQ1TgA4lqlwswtJ2zs5ffTHbAfKW7jAXa0CIG5GfJV2YVGMK+7tXFc8Pcb7yxAjfU7JaGIDLnGFn66GAUcwRAIgdY+BJgny6uLAqxOrzVZWqY1BWcKGokf/88rwzilUq+8CIEPptZ66CxaTae2fqHDemXPDWHIy66WszB67GKS7Kz6BAYtSIQIa7145iSnjIjNW9Ylbhh64DQxElxgwJdmO8+KmrzPxBCEDQJIkuvrzMSYErz3TghSGHQOLfwWrxQgGNT5MpTq0FeEhA2R9KrM5CzKJPwD0wekF4CiczCQl3NhZix45ciOyeGwqIQPZoAESf8F7F9iKs6kSxbneK3YzDbrMsaozsSyILUdx31SuAAAAAAEBK9AHAAAAAAAAIgAguDDH8XOy/85uAHxwAoPPJwGMZW5vqhX8CxVRO9prSscBCJMDAEgwRQIhAPMKiof/LRcMv6cMwMkX60/AZEA8jrEUrMKeSYwp+50WAiBMNdK0HS3zP6ptVO3gSQddRglt8C1satF1mxXcHEwPawFHUSEDV2k7ZTuQmMIAkihUHP5IuYwKTPWHtrCIZWSIxw/lIl8hA7Zc5Xp+VBwcsdWlpNWSZsG1kE1as0E1arRrxSrjN5EhUq4AACICAhrvXjmJKeMiM1b1iVuGHrgNDESXGDAl2Y7z4qavM/EEHN2z8R4wAACAAAAAgAAAAIACAACAAQAAAAAAAAAiAgNAkiS6+vMxJgSvPdOCFIYdA4t/BavFCAY1PkylOrQV4RyZPVqoMAAAgAAAAIAAAACAAgAAgAEAAAAAAAAAAA==')

    b64 = Util.hexToBase64('70736274ff0100890100000001f1c6c4e36ef3789acbac3623f0df70dd6a9493d0c8365d099b5012dd3412462c0000000000fdffffff0256591e0000000000220020aab50af3478aa38796e02b20dacaf35dba86e722b5c0499ca0c1b847761354cf1027000000000000220020e31b5a8ff3a914a4ef1f6c32d1d42bd957a3da66fc475ca0d77b2cfcb5870a2700000000000100ea02000000000101dfa8c38087140a97dabd8a0a9a329d3dd712b41063202721a8e68d673a425e810000000000fdffffff0280841e0000000000220020d68242594e477f7c7fd7abe46d6fc07140696b4501dbdb3e4ec30c3c8b9172bf2a6e8e0200000000160014d35195e299b45c20c41d269ab312e139fe5661c202473044022012ddc313ec9140efa2816ad34efa81a398f409042635970feea231c80049a017022017160bca60ebad0abf97471344e421ca5afbb75ae6b9b9ae15e32ce86b9d6baa012103e54b78634b3e292e03db6f14e5be91a34f6ea01989be970321f50027b0288056483b0b0001012b80841e0000000000220020d68242594e477f7c7fd7abe46d6fc07140696b4501dbdb3e4ec30c3c8b9172bf220203b14fac12219c5c80d6f6b057b8ea25a6a7f8c98f5f82e58224003530d9d909f14730440220582687e05dea5b6babc5fd1de2b7c0a20c8ed62caa54dd9611c421fef7ecdb020220097d42e0664f5165d6b81a1bb702f954bc7eae0285150c094a925dca90b9df370101058b5221031adcfdcfb6ed3fc7b0556ffee830644379cfde8c33e9484acf00cf5d2b4d7bf5210357693b653b9098c2009228541cfe48b98c0a4cf587b6b088656488c70fe5225f2103b14fac12219c5c80d6f6b057b8ea25a6a7f8c98f5f82e58224003530d9d909f12103b65ce57a7e541c1cb1d5a5a4d59266c1b5904d5ab341356ab46bc52ae337912154ae2206031adcfdcfb6ed3fc7b0556ffee830644379cfde8c33e9484acf00cf5d2b4d7bf51c0cdb4ee230000080000000800000008002000080000000000000000022060357693b653b9098c2009228541cfe48b98c0a4cf587b6b088656488c70fe5225f1c993d5aa8300000800000008000000080020000800000000000000000220603b14fac12219c5c80d6f6b057b8ea25a6a7f8c98f5f82e58224003530d9d909f11cd6b372ce300000800000008000000080020000800000000000000000220603b65ce57a7e541c1cb1d5a5a4d59266c1b5904d5ab341356ab46bc52ae33791211cddb3f11e300000800000008000000080020000800000000000000000002202021aef5e398929e3223356f5895b861eb80d0c4497183025d98ef3e2a6af33f1041cddb3f11e300000800000008000000080020000800100000000000000220203409224bafaf3312604af3dd38214861d038b7f05abc50806353e4ca53ab415e11c993d5aa8300000800000008000000080020000800100000000000000220203647d2ab3390b32893f00f4c1e905e0289ccc2425dcd8598b1e397223b2786c2a1c0cdb4ee2300000800000008000000080020000800100000000000000220203d9a001127fc17b17d88ab3a912c5b9de2b76330dbaccb1aa33b12c882d4771df1cd6b372ce300000800000008000000080020000800100000000000000002202026c586485b5df5c9dce0f521f95a08823a204b362619a5ac0af43a706ae9831371cddb3f11e300000800000008000000080020000800000000001000000220202c0f4e3ca5f1d9601ba2978d96115a9fe1ccb9ccc422dae80a6ffae5ab042b7731c0cdb4ee230000080000000800000008002000080000000000100000022020354ae9f6cc9fc038c394632918275c727a4b90b3762f4e9cf078a16f1a53a20021c993d5aa830000080000000800000008002000080000000000100000022020390ac208207d43ce5d1f77ad023c78c6b4af982ede74056135fbd02f163d9ebcb1cd6b372ce30000080000000800000008002000080000000000100000000')
    expect(b64).toBe('cHNidP8BAIkBAAAAAfHGxONu83iay6w2I/DfcN1qlJPQyDZdCZtQEt00EkYsAAAAAAD9////AlZZHgAAAAAAIgAgqrUK80eKo4eW4Csg2srzXbqG5yK1wEmcoMG4R3YTVM8QJwAAAAAAACIAIOMbWo/zqRSk7x9sMtHUK9lXo9pm/EdcoNd7LPy1hwonAAAAAAABAOoCAAAAAAEB36jDgIcUCpfavYoKmjKdPdcStBBjICchqOaNZzpCXoEAAAAAAP3///8CgIQeAAAAAAAiACDWgkJZTkd/fH/Xq+Rtb8BxQGlrRQHb2z5Owww8i5FyvypujgIAAAAAFgAU01GV4pm0XCDEHSaasxLhOf5WYcICRzBEAiAS3cMT7JFA76KBatNO+oGjmPQJBCY1lw/uojHIAEmgFwIgFxYLymDrrQq/l0cTROQhylr7t1rmubmuFeMs6Guda6oBIQPlS3hjSz4pLgPbbxTlvpGjT26gGYm+lwMh9QAnsCiAVkg7CwABASuAhB4AAAAAACIAINaCQllOR398f9er5G1vwHFAaWtFAdvbPk7DDDyLkXK/IgIDsU+sEiGcXIDW9rBXuOolpqf4yY9fguWCJAA1MNnZCfFHMEQCIFgmh+Bd6ltrq8X9HeK3wKIMjtYsqlTdlhHEIf737NsCAiAJfULgZk9RZda4Ghu3AvlUvH6uAoUVDAlKkl3KkLnfNwEBBYtSIQMa3P3Ptu0/x7BVb/7oMGRDec/ejDPpSErPAM9dK0179SEDV2k7ZTuQmMIAkihUHP5IuYwKTPWHtrCIZWSIxw/lIl8hA7FPrBIhnFyA1vawV7jqJaan+MmPX4LlgiQANTDZ2QnxIQO2XOV6flQcHLHVpaTVkmbBtZBNWrNBNWq0a8Uq4zeRIVSuIgYDGtz9z7btP8ewVW/+6DBkQ3nP3owz6UhKzwDPXStNe/UcDNtO4jAAAIAAAACAAAAAgAIAAIAAAAAAAAAAACIGA1dpO2U7kJjCAJIoVBz+SLmMCkz1h7awiGVkiMcP5SJfHJk9WqgwAACAAAAAgAAAAIACAACAAAAAAAAAAAAiBgOxT6wSIZxcgNb2sFe46iWmp/jJj1+C5YIkADUw2dkJ8RzWs3LOMAAAgAAAAIAAAACAAgAAgAAAAAAAAAAAIgYDtlzlen5UHByx1aWk1ZJmwbWQTVqzQTVqtGvFKuM3kSEc3bPxHjAAAIAAAACAAAAAgAIAAIAAAAAAAAAAAAAiAgIa7145iSnjIjNW9Ylbhh64DQxElxgwJdmO8+KmrzPxBBzds/EeMAAAgAAAAIAAAACAAgAAgAEAAAAAAAAAIgIDQJIkuvrzMSYErz3TghSGHQOLfwWrxQgGNT5MpTq0FeEcmT1aqDAAAIAAAACAAAAAgAIAAIABAAAAAAAAACICA2R9KrM5CzKJPwD0wekF4CiczCQl3NhZix45ciOyeGwqHAzbTuIwAACAAAAAgAAAAIACAACAAQAAAAAAAAAiAgPZoAESf8F7F9iKs6kSxbneK3YzDbrMsaozsSyILUdx3xzWs3LOMAAAgAAAAIAAAACAAgAAgAEAAAAAAAAAACICAmxYZIW131ydzg9SH5WgiCOiBLNiYZpawK9DpwaumDE3HN2z8R4wAACAAAAAgAAAAIACAACAAAAAAAEAAAAiAgLA9OPKXx2WAbopeNlhFan+HMuczEItroCm/65asEK3cxwM207iMAAAgAAAAIAAAACAAgAAgAAAAAABAAAAIgIDVK6fbMn8A4w5RjKRgnXHJ6S5Czdi9OnPB4oW8aU6IAIcmT1aqDAAAIAAAACAAAAAgAIAAIAAAAAAAQAAACICA5CsIIIH1Dzl0fd60CPHjGtK+YLt50BWE1+9AvFj2evLHNazcs4wAACAAAAAgAAAAIACAACAAAAAAAEAAAAA')
  })

  test('base64ToHex', async () => {
    let hex = Util.base64ToHex('cHNidP8BAIkBAAAAAf6y/iFWfOULXQZSK9AvZxNeyauAyiyXl006CwMPW0buAAAAAAD9////AugDAAAAAAAAIgAgtxMIioXDxeeF36qO45dNbCo6b8YwCeqYGV9sgPrs7vU5AwAAAAAAACIAIJDT+WbPS65zmt1X1G2i4KHBIKDOT5xolQajayptOWkNAAAAAAABAP2qAQIAAAAAAQGsBksf8zyyq/02mqozmgZR90Jl+vQcLn5JAlVpVY2eKgAAAAAA/////wLQBwAAAAAAACIAILgwx/Fzsv/ObgB8cAKDzycBjGVub6oV/AsVUTvaa0rHhkUeAAAAAAAiACBQ3gdqDj9OCbZ8UPHXTNqZ7bkJ0v+E98r4SqmYpR1/kwQASDBFAiEAttBhbAP8IcQ1TgA4lqlwswtJ2zs5ffTHbAfKW7jAXa0CIG5GfJV2YVGMK+7tXFc8Pcb7yxAjfU7JaGIDLnGFn66GAUcwRAIgdY+BJgny6uLAqxOrzVZWqY1BWcKGokf/88rwzilUq+8CIEPptZ66CxaTae2fqHDemXPDWHIy66WszB67GKS7Kz6BAYtSIQIa7145iSnjIjNW9Ylbhh64DQxElxgwJdmO8+KmrzPxBCEDQJIkuvrzMSYErz3TghSGHQOLfwWrxQgGNT5MpTq0FeEhA2R9KrM5CzKJPwD0wekF4CiczCQl3NhZix45ciOyeGwqIQPZoAESf8F7F9iKs6kSxbneK3YzDbrMsaozsSyILUdx31SuAAAAAAEBK9AHAAAAAAAAIgAguDDH8XOy/85uAHxwAoPPJwGMZW5vqhX8CxVRO9prSscBCJMDAEgwRQIhAPMKiof/LRcMv6cMwMkX60/AZEA8jrEUrMKeSYwp+50WAiBMNdK0HS3zP6ptVO3gSQddRglt8C1satF1mxXcHEwPawFHUSEDV2k7ZTuQmMIAkihUHP5IuYwKTPWHtrCIZWSIxw/lIl8hA7Zc5Xp+VBwcsdWlpNWSZsG1kE1as0E1arRrxSrjN5EhUq4AACICAhrvXjmJKeMiM1b1iVuGHrgNDESXGDAl2Y7z4qavM/EEHN2z8R4wAACAAAAAgAAAAIACAACAAQAAAAAAAAAiAgNAkiS6+vMxJgSvPdOCFIYdA4t/BavFCAY1PkylOrQV4RyZPVqoMAAAgAAAAIAAAACAAgAAgAEAAAAAAAAAAA==')
    expect(hex).toBe('70736274ff0100890100000001feb2fe21567ce50b5d06522bd02f67135ec9ab80ca2c97974d3a0b030f5b46ee0000000000fdffffff02e803000000000000220020b713088a85c3c5e785dfaa8ee3974d6c2a3a6fc63009ea98195f6c80faeceef5390300000000000022002090d3f966cf4bae739add57d46da2e0a1c120a0ce4f9c689506a36b2a6d39690d00000000000100fdaa0102000000000101ac064b1ff33cb2abfd369aaa339a0651f74265faf41c2e7e49025569558d9e2a0000000000ffffffff02d007000000000000220020b830c7f173b2ffce6e007c700283cf27018c656e6faa15fc0b15513bda6b4ac786451e000000000022002050de076a0e3f4e09b67c50f1d74cda99edb909d2ff84f7caf84aa998a51d7f930400483045022100b6d0616c03fc21c4354e003896a970b30b49db3b397df4c76c07ca5bb8c05dad02206e467c957661518c2beeed5c573c3dc6fbcb10237d4ec96862032e71859fae86014730440220758f812609f2eae2c0ab13abcd5656a98d4159c286a247fff3caf0ce2954abef022043e9b59eba0b169369ed9fa870de9973c3587232eba5accc1ebb18a4bb2b3e81018b5221021aef5e398929e3223356f5895b861eb80d0c4497183025d98ef3e2a6af33f1042103409224bafaf3312604af3dd38214861d038b7f05abc50806353e4ca53ab415e12103647d2ab3390b32893f00f4c1e905e0289ccc2425dcd8598b1e397223b2786c2a2103d9a001127fc17b17d88ab3a912c5b9de2b76330dbaccb1aa33b12c882d4771df54ae0000000001012bd007000000000000220020b830c7f173b2ffce6e007c700283cf27018c656e6faa15fc0b15513bda6b4ac70108930300483045022100f30a8a87ff2d170cbfa70cc0c917eb4fc064403c8eb114acc29e498c29fb9d1602204c35d2b41d2df33faa6d54ede049075d46096df02d6c6ad1759b15dc1c4c0f6b014751210357693b653b9098c2009228541cfe48b98c0a4cf587b6b088656488c70fe5225f2103b65ce57a7e541c1cb1d5a5a4d59266c1b5904d5ab341356ab46bc52ae337912152ae00002202021aef5e398929e3223356f5895b861eb80d0c4497183025d98ef3e2a6af33f1041cddb3f11e300000800000008000000080020000800100000000000000220203409224bafaf3312604af3dd38214861d038b7f05abc50806353e4ca53ab415e11c993d5aa830000080000000800000008002000080010000000000000000')

    hex = Util.base64ToHex('cHNidP8BAIkBAAAAAfHGxONu83iay6w2I/DfcN1qlJPQyDZdCZtQEt00EkYsAAAAAAD9////AlZZHgAAAAAAIgAgqrUK80eKo4eW4Csg2srzXbqG5yK1wEmcoMG4R3YTVM8QJwAAAAAAACIAIOMbWo/zqRSk7x9sMtHUK9lXo9pm/EdcoNd7LPy1hwonAAAAAAABAOoCAAAAAAEB36jDgIcUCpfavYoKmjKdPdcStBBjICchqOaNZzpCXoEAAAAAAP3///8CgIQeAAAAAAAiACDWgkJZTkd/fH/Xq+Rtb8BxQGlrRQHb2z5Owww8i5FyvypujgIAAAAAFgAU01GV4pm0XCDEHSaasxLhOf5WYcICRzBEAiAS3cMT7JFA76KBatNO+oGjmPQJBCY1lw/uojHIAEmgFwIgFxYLymDrrQq/l0cTROQhylr7t1rmubmuFeMs6Guda6oBIQPlS3hjSz4pLgPbbxTlvpGjT26gGYm+lwMh9QAnsCiAVkg7CwABASuAhB4AAAAAACIAINaCQllOR398f9er5G1vwHFAaWtFAdvbPk7DDDyLkXK/IgIDsU+sEiGcXIDW9rBXuOolpqf4yY9fguWCJAA1MNnZCfFHMEQCIFgmh+Bd6ltrq8X9HeK3wKIMjtYsqlTdlhHEIf737NsCAiAJfULgZk9RZda4Ghu3AvlUvH6uAoUVDAlKkl3KkLnfNwEBBYtSIQMa3P3Ptu0/x7BVb/7oMGRDec/ejDPpSErPAM9dK0179SEDV2k7ZTuQmMIAkihUHP5IuYwKTPWHtrCIZWSIxw/lIl8hA7FPrBIhnFyA1vawV7jqJaan+MmPX4LlgiQANTDZ2QnxIQO2XOV6flQcHLHVpaTVkmbBtZBNWrNBNWq0a8Uq4zeRIVSuIgYDGtz9z7btP8ewVW/+6DBkQ3nP3owz6UhKzwDPXStNe/UcDNtO4jAAAIAAAACAAAAAgAIAAIAAAAAAAAAAACIGA1dpO2U7kJjCAJIoVBz+SLmMCkz1h7awiGVkiMcP5SJfHJk9WqgwAACAAAAAgAAAAIACAACAAAAAAAAAAAAiBgOxT6wSIZxcgNb2sFe46iWmp/jJj1+C5YIkADUw2dkJ8RzWs3LOMAAAgAAAAIAAAACAAgAAgAAAAAAAAAAAIgYDtlzlen5UHByx1aWk1ZJmwbWQTVqzQTVqtGvFKuM3kSEc3bPxHjAAAIAAAACAAAAAgAIAAIAAAAAAAAAAAAAiAgIa7145iSnjIjNW9Ylbhh64DQxElxgwJdmO8+KmrzPxBBzds/EeMAAAgAAAAIAAAACAAgAAgAEAAAAAAAAAIgIDQJIkuvrzMSYErz3TghSGHQOLfwWrxQgGNT5MpTq0FeEcmT1aqDAAAIAAAACAAAAAgAIAAIABAAAAAAAAACICA2R9KrM5CzKJPwD0wekF4CiczCQl3NhZix45ciOyeGwqHAzbTuIwAACAAAAAgAAAAIACAACAAQAAAAAAAAAiAgPZoAESf8F7F9iKs6kSxbneK3YzDbrMsaozsSyILUdx3xzWs3LOMAAAgAAAAIAAAACAAgAAgAEAAAAAAAAAACICAmxYZIW131ydzg9SH5WgiCOiBLNiYZpawK9DpwaumDE3HN2z8R4wAACAAAAAgAAAAIACAACAAAAAAAEAAAAiAgLA9OPKXx2WAbopeNlhFan+HMuczEItroCm/65asEK3cxwM207iMAAAgAAAAIAAAACAAgAAgAAAAAABAAAAIgIDVK6fbMn8A4w5RjKRgnXHJ6S5Czdi9OnPB4oW8aU6IAIcmT1aqDAAAIAAAACAAAAAgAIAAIAAAAAAAQAAACICA5CsIIIH1Dzl0fd60CPHjGtK+YLt50BWE1+9AvFj2evLHNazcs4wAACAAAAAgAAAAIACAACAAAAAAAEAAAAA')
    expect(hex).toBe('70736274ff0100890100000001f1c6c4e36ef3789acbac3623f0df70dd6a9493d0c8365d099b5012dd3412462c0000000000fdffffff0256591e0000000000220020aab50af3478aa38796e02b20dacaf35dba86e722b5c0499ca0c1b847761354cf1027000000000000220020e31b5a8ff3a914a4ef1f6c32d1d42bd957a3da66fc475ca0d77b2cfcb5870a2700000000000100ea02000000000101dfa8c38087140a97dabd8a0a9a329d3dd712b41063202721a8e68d673a425e810000000000fdffffff0280841e0000000000220020d68242594e477f7c7fd7abe46d6fc07140696b4501dbdb3e4ec30c3c8b9172bf2a6e8e0200000000160014d35195e299b45c20c41d269ab312e139fe5661c202473044022012ddc313ec9140efa2816ad34efa81a398f409042635970feea231c80049a017022017160bca60ebad0abf97471344e421ca5afbb75ae6b9b9ae15e32ce86b9d6baa012103e54b78634b3e292e03db6f14e5be91a34f6ea01989be970321f50027b0288056483b0b0001012b80841e0000000000220020d68242594e477f7c7fd7abe46d6fc07140696b4501dbdb3e4ec30c3c8b9172bf220203b14fac12219c5c80d6f6b057b8ea25a6a7f8c98f5f82e58224003530d9d909f14730440220582687e05dea5b6babc5fd1de2b7c0a20c8ed62caa54dd9611c421fef7ecdb020220097d42e0664f5165d6b81a1bb702f954bc7eae0285150c094a925dca90b9df370101058b5221031adcfdcfb6ed3fc7b0556ffee830644379cfde8c33e9484acf00cf5d2b4d7bf5210357693b653b9098c2009228541cfe48b98c0a4cf587b6b088656488c70fe5225f2103b14fac12219c5c80d6f6b057b8ea25a6a7f8c98f5f82e58224003530d9d909f12103b65ce57a7e541c1cb1d5a5a4d59266c1b5904d5ab341356ab46bc52ae337912154ae2206031adcfdcfb6ed3fc7b0556ffee830644379cfde8c33e9484acf00cf5d2b4d7bf51c0cdb4ee230000080000000800000008002000080000000000000000022060357693b653b9098c2009228541cfe48b98c0a4cf587b6b088656488c70fe5225f1c993d5aa8300000800000008000000080020000800000000000000000220603b14fac12219c5c80d6f6b057b8ea25a6a7f8c98f5f82e58224003530d9d909f11cd6b372ce300000800000008000000080020000800000000000000000220603b65ce57a7e541c1cb1d5a5a4d59266c1b5904d5ab341356ab46bc52ae33791211cddb3f11e300000800000008000000080020000800000000000000000002202021aef5e398929e3223356f5895b861eb80d0c4497183025d98ef3e2a6af33f1041cddb3f11e300000800000008000000080020000800100000000000000220203409224bafaf3312604af3dd38214861d038b7f05abc50806353e4ca53ab415e11c993d5aa8300000800000008000000080020000800100000000000000220203647d2ab3390b32893f00f4c1e905e0289ccc2425dcd8598b1e397223b2786c2a1c0cdb4ee2300000800000008000000080020000800100000000000000220203d9a001127fc17b17d88ab3a912c5b9de2b76330dbaccb1aa33b12c882d4771df1cd6b372ce300000800000008000000080020000800100000000000000002202026c586485b5df5c9dce0f521f95a08823a204b362619a5ac0af43a706ae9831371cddb3f11e300000800000008000000080020000800000000001000000220202c0f4e3ca5f1d9601ba2978d96115a9fe1ccb9ccc422dae80a6ffae5ab042b7731c0cdb4ee230000080000000800000008002000080000000000100000022020354ae9f6cc9fc038c394632918275c727a4b90b3762f4e9cf078a16f1a53a20021c993d5aa830000080000000800000008002000080000000000100000022020390ac208207d43ce5d1f77ad023c78c6b4af982ede74056135fbd02f163d9ebcb1cd6b372ce30000080000000800000008002000080000000000100000000')
  })
})