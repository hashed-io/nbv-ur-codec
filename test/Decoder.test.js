const { Decoder } = require('../src')

let decoder

beforeAll(async () => {
  decoder = new Decoder()
})

describe('decodeXPub', () => {
  test('Valid encoded XPub', async () => {
    const result = decoder.decodeXPub('UR:CRYPTO-ACCOUNT/OEADCYADWMTNKIAOLYTAADMETAADDLOLAOWKAXHDCLAXHPDIHNWKMYCFHNROCARHSESKLDPDSWOTMWGTJNGWIYHYYNWSOLENTSUEMKTOTAVDAAHDCXBDHHBZSBURBSMKZOECOEHHJPHTSRVACMBGHEROMYCKHHNBHFHGNBGMNYAESPNDFHAHTAADEHOEADADAOAEAMTAADDYOTADLOCSDYYKAEYKAEYKAOYKAOCYADWMTNKIAXAAAYCYLOWLDITOJTCNDTAY')
    expect(result.xpubKey).toBe('Zpub756tPxxwHiYkYiT12G2WUD2cpAHyVWhjvKPbXoY5jDZSyo71yG5C14LCuwhycTTAzgTUcQfddR8FFTQ1bSWR6kzmNbMEaVzUrj4Lhxbonjo')
    expect(result.derivationPath).toBe("m/48'/0'/0'/2'")
    expect(result.masterFingerprint).toBe('01EBDA7D')
    expect(result.fullXpub).toBe("[01EBDA7D/48'/0'/0'/2']Zpub756tPxxwHiYkYiT12G2WUD2cpAHyVWhjvKPbXoY5jDZSyo71yG5C14LCuwhycTTAzgTUcQfddR8FFTQ1bSWR6kzmNbMEaVzUrj4Lhxbonjo")
  })

  test('Invalid encoded XPub', async () => {
    expect.assertions(1)
    try {
      decoder.decodeXPub('UR:CRYPTO-ACCOUNT/OEADCYADWMTNKIAOLYT')
    } catch (error) {
      expect(error.message).toContain('word.length does not match wordLength provided')
    }
  })

  test('Invalid encoded type', async () => {
    expect.assertions(1)
    try {
      decoder.decodeXPub('UR:BYTES/HKADKNCNCXGRIHKKJKJYJLJTIHCXGTKPJZJYINJKINIOCXJKIHJYKPJOCXIYINJZIHCXDEIAJPIHHSJYIHIECXJLJTCXDYEHFEFWFYFPEMFYDTBKCNBKGLHSJNIHFTCXGRGHHEFGFPFPESDYFEFWENHEEYDPEYBKGDJLJZINIAKKFTCXEYCXJLIYCXEYBKFYIHJPINKOHSJYINJLJTFTCXJNDLEEETDIDLDYDIDLDYDIDLEYDIBKFGJLJPJNHSJYFTCXGDEYHGGUFDBKBKDYEHFEFWFYFPEMFYFTCXHTJOKPIDEMECENJYGDKSKSKTFDINHKJEHKINGHEHEYFLEYHGGOFYEYIAJOFPFDKKHFHGISIMKOGRGDIDHDJLHKECIMFYHTGUKKJLEMEHKKFLECFXEHEEGSFXKPKTISKKIAGHGHFPKNIOGHGOIAGYIYIEIEGMETFGFGGHGYEHIDGUHGGMENJEKNJNGLIDGTFEHSHFKNGOJPIMEEGSISKSIDJLJTIMJLBKESEMFXFWEHECEEEYFTCXHTJOKPIDEMECHFKPHKIYKTJPFXIMEYGLHDKTFGGSGMIEIDKKKOGDGDJNGDKOEMGMJYIHGYKTFGGTHDFDGEGTGDJKFYKPFXEMKOISKOIDHGJSJLJNFEIEEMETHKJOJLGRIEEMJEGRJEIAIAGHGHFXFPJNJNIDECHFJNHDFPEHESHSISEMIMHDGYINIOGRGOIHKSJEIHGSIHKPGRIMKTJYFDKKENECJLBKYLYAHNRS')
    } catch (error) {
      expect(error.message).toContain('Data is not of expected type crypto-account, found type: bytes')
    }
  })
})

describe('decodePSBT', () => {
  test('Valid encoded PSBT', async () => {
    const result = decoder.decodePSBT(
      [
        'UR:CRYPTO-PSBT/1-8/LPADAYCFAHPSCYKBVWTTHSHDRPHKAHPTJOJKIDJYZMADAELDADAEAEAEADWNSWSSVLJTWFKSNYSBPSENCNWTURJOUTIMMWMUTISPENHLASNDGDBGUTEEBGFGDWAEAEAEAEAEZCZMZMZMAOHFHKCKAEAEAEAEAECPAECXPKREBKWFFLLEOTLTMTVTDNCXTNSGWFHLRDLNVDCPRERTGANSNBSEROFLKOBWGHTKBEDIAEAEAEAEAEAECPAECXVLCWHTMYWFPTBBOXWSCTJZEYTTTYDNTAHGOTTNIYZTFLHHNBTSKGDWZTRELTBKDIAEAEAEAEAEADAEWDAOAEAEAEAEADADURPDSRLALTBBBKMSTNRYLEBKNYEYNTFSTSBGQZBEIACXDITESOMNBB',
        'UR:CRYPTO-PSBT/2-8/LPAOAYCFAHPSCYKBVWTTHSHDRPCLPDVALGIOFTFWHYLYAEAEAEAEAEZCZMZMZMAOLALRCKAEAEAEAEAECPAECXTBLFFWHKGLFLLBKELBTSPYVEJNJLRTJSFZINJEFEADUYUYFMGLSRBNFNLUMEJPRSDRJTMNAOAEAEAEAECMAEBBTEGYMDVONLQZHHCXSSCADSNYQDBGVYESZEHFHSSAAOFLDYFYAOCXBGUTSRBWWPMEFZWSOELYIMTEGLZSLYOTMKWKASAADSECMSBSWYOEEHSPAEGANBCHAOCXCHCMBDSGHNWMPMBKRSMSFLBWFYVECLSGHTZORLHTVARHRHPLBZVLDWVSJENTJEPKADCLAXVWGRKSIAGRFMDTDMAXUYJLBBVWRNIHQZVYTP',
        'UR:CRYPTO-PSBT/3-8/LPAXAYCFAHPSCYKBVWTTHSHDRPMEOTGWJTNBCFLDRNMSAXCLYKAEDIPFDELAHFFDFRBDAEADADDNLALRCKAEAEAEAEAECPAECXTBLFFWHKGLFLLBKELBTSPYVEJNJLRTJSFZINJEFEADUYUYFMGLSRBNFNLUMEJPRSCPAOAXPAGWPSBGCLNSHHLATBYNPFHGROWDDAOLOSYASOMYHELFVWLFDKAEECDYTATAASWNFLDYFYAOCXHDDSLTVTHLWDHPJEPYSKZCCAVORLRTOEBNMNTBDWPKGHUTMTBYSSCLZEYLWPUYAOAOCXASKIFWVTIYGWGYIHTBROCYCWRLAOYTGHRFKBPLAOLPBZBNASGEMOHLSGMHRHUREMADADAHLUGMCLAXCYCYWYDLMD',
        'UR:CRYPTO-PSBT/4-8/LPAAAYCFAHPSCYKBVWTTHSHDRPUOZCTKRPWEFHSTPFGOJLZEVSDYIEFXKKTKUELKEOWLFDGETKAETKHLDNGTKGYKCLAXHGINFRIHFRMHMKSAAEMODEGHCEZEFDRHLKBKGSYKLTRPPFLOIHIELOSTBSVWCPHECLAXPAGWPSBGCLNSHHLATBYNPFHGROWDDAOLOSYASOMYHELFVWLFDKAEECDYTATAASWNCLAXRPHHVWKNKBGHCECEPATLONOXTLMOIYSEREMHGTHTQDFPECIMQZJESKDRVLEMMECLGHPLCPAMAXCYUOZCTKRPWEFHSTPFGOJLZEVSDYIEFXKKTKUELKEOWLFDGETKAETKHLDNGTKGYKCEBNUYGLVODYAEAELAAEAEAEZTDKGLBZ',
        'UR:CRYPTO-PSBT/5-8/LPAHAYCFAHPSCYKBVWTTHSHDRPLAAEAEAELAAOAEAELAAEAEAEAEAEAEAEAECPAMAXHGINFRIHFRMHMKSAAEMODEGHCEZEFDRHLKBKGSYKLTRPPFLOIHIELOSTBSVWCPHECENLFSHTPDDYAEAELAAEAEAELAAEAEAELAAOAEAELAAEAEAEAEAEAEAEAECPAMAXPAGWPSBGCLNSHHLATBYNPFHGROWDDAOLOSYASOMYHELFVWLFDKAEECDYTATAASWNCETBQDJPTODYAEAELAAEAEAELAAEAEAELAAOAEAELAAEAEAEAEAEAEAEAECPAMAXRPHHVWKNKBGHCECEPATLONOXTLMOIYSEREMHGTHTQDFPECIMQZJESKDRVLEMMECLCEUTBKMONYPE',
        'UR:CRYPTO-PSBT/6-8/LPAMAYCFAHPSCYKBVWTTHSHDRPQDWNCKDYAEAELAAEAEAELAAEAEAELAAOAEAELAAEAEAEAEAEAEAEAEAECPAOAOCYWSHYESLDDTVLCPEOHFYKLDHPLNCKROBTBNFYMSCSDYDATAMNWFVOOLPEEOWNAACEUTQDWNCKDYAEAELAAEAEAELAAEAEAELAAOAEAELAADAEAEAEAEAEAEAECPAOAXFZMODKRDZSWFEHDSAAPEFSTELFBBLNCAAXLULBAHPYSKAYAMECFMGSONFTQZBZVYCENLFSHTPDDYAEAELAAEAEAELAAEAEAELAAOAEAELAADAEAEAEAEAEAEAECPAOAXIEKIDRQDESBDEYLDFHAEWKSEWLAHVTDENSSFDKDAUOTPHKTDUTPDWD',
        'UR:CRYPTO-PSBT/7-8/LPATAYCFAHPSCYKBVWTTHSHDRPLUCKESJPCNPRKSJZDRCEBNUYGLVODYAEAELAAEAEAELAAEAEAELAAOAEAELAADAEAEAEAEAEAEAECPAOAXTANBADBGLBSEKGCHTPLEQDPTBGSKRHUEDNKOEOBTRDSFPAPKEOPADWLODPFLJSURCETBQDJPTODYAEAELAAEAEAELAAEAEAELAAOAEAELAADAEAEAEAEAEAEAEAECPAOAOJZHDIELPREURHHNTTOBSGMCTMDNBLOCNOEAAQDIDHSNYHTRTPEFXOSAMPLMKEHEMCEUTQDWNCKDYAEAELAAEAEAELAAEAEAELAAOAEAELAAEAEAEAEADAEAEAECPAOAORTWKVLSGHECAMTADRDDTKSTABKIDMSLY',
        'UR:CRYPTO-PSBT/8-8/LPAYAYCFAHPSCYKBVWTTHSHDRPHSBZPTZECESBNSSFFWDPPLLAOLZMPLHTPFFWRLJKCEBNUYGLVODYAEAELAAEAEAELAAEAEAELAAOAEAELAAEAEAEAEADAEAEAECPAOAXGHPLNEJZSOZTAXLKESFGEYMELFKPSTDIOXRHBDEMIDWKWLTKATLECMWNONFTCXAOCENLFSHTPDDYAEAELAAEAEAELAAEAEAELAAOAEAELAAEAEAEAEADAEAEAECPAOAXMHPSCXLFATTYFNVWTTYLKNTICNSTLKJEGEYTLFWEVDFZHFBWHERYAOWNIATAWMSBCETBQDJPTODYAEAELAAEAEAELAAEAEAELAAOAEAELAAEAEAEAEADAEAEAEAEAEAEAEAENEAYCSNS'
      ]
    )
    expect(result).toBe('cHNidP8BAIkBAAAAAfHGxONu83iay6w2I/DfcN1qlJPQyDZdCZtQEt00EkYsAAAAAAD9////AlZZHgAAAAAAIgAgqrUK80eKo4eW4Csg2srzXbqG5yK1wEmcoMG4R3YTVM8QJwAAAAAAACIAIOMbWo/zqRSk7x9sMtHUK9lXo9pm/EdcoNd7LPy1hwonAAAAAAABAOoCAAAAAAEB36jDgIcUCpfavYoKmjKdPdcStBBjICchqOaNZzpCXoEAAAAAAP3///8CgIQeAAAAAAAiACDWgkJZTkd/fH/Xq+Rtb8BxQGlrRQHb2z5Owww8i5FyvypujgIAAAAAFgAU01GV4pm0XCDEHSaasxLhOf5WYcICRzBEAiAS3cMT7JFA76KBatNO+oGjmPQJBCY1lw/uojHIAEmgFwIgFxYLymDrrQq/l0cTROQhylr7t1rmubmuFeMs6Guda6oBIQPlS3hjSz4pLgPbbxTlvpGjT26gGYm+lwMh9QAnsCiAVkg7CwABASuAhB4AAAAAACIAINaCQllOR398f9er5G1vwHFAaWtFAdvbPk7DDDyLkXK/IgIDsU+sEiGcXIDW9rBXuOolpqf4yY9fguWCJAA1MNnZCfFHMEQCIFgmh+Bd6ltrq8X9HeK3wKIMjtYsqlTdlhHEIf737NsCAiAJfULgZk9RZda4Ghu3AvlUvH6uAoUVDAlKkl3KkLnfNwEBBYtSIQMa3P3Ptu0/x7BVb/7oMGRDec/ejDPpSErPAM9dK0179SEDV2k7ZTuQmMIAkihUHP5IuYwKTPWHtrCIZWSIxw/lIl8hA7FPrBIhnFyA1vawV7jqJaan+MmPX4LlgiQANTDZ2QnxIQO2XOV6flQcHLHVpaTVkmbBtZBNWrNBNWq0a8Uq4zeRIVSuIgYDGtz9z7btP8ewVW/+6DBkQ3nP3owz6UhKzwDPXStNe/UcDNtO4jAAAIAAAACAAAAAgAIAAIAAAAAAAAAAACIGA1dpO2U7kJjCAJIoVBz+SLmMCkz1h7awiGVkiMcP5SJfHJk9WqgwAACAAAAAgAAAAIACAACAAAAAAAAAAAAiBgOxT6wSIZxcgNb2sFe46iWmp/jJj1+C5YIkADUw2dkJ8RzWs3LOMAAAgAAAAIAAAACAAgAAgAAAAAAAAAAAIgYDtlzlen5UHByx1aWk1ZJmwbWQTVqzQTVqtGvFKuM3kSEc3bPxHjAAAIAAAACAAAAAgAIAAIAAAAAAAAAAAAAiAgIa7145iSnjIjNW9Ylbhh64DQxElxgwJdmO8+KmrzPxBBzds/EeMAAAgAAAAIAAAACAAgAAgAEAAAAAAAAAIgIDQJIkuvrzMSYErz3TghSGHQOLfwWrxQgGNT5MpTq0FeEcmT1aqDAAAIAAAACAAAAAgAIAAIABAAAAAAAAACICA2R9KrM5CzKJPwD0wekF4CiczCQl3NhZix45ciOyeGwqHAzbTuIwAACAAAAAgAAAAIACAACAAQAAAAAAAAAiAgPZoAESf8F7F9iKs6kSxbneK3YzDbrMsaozsSyILUdx3xzWs3LOMAAAgAAAAIAAAACAAgAAgAEAAAAAAAAAACICAmxYZIW131ydzg9SH5WgiCOiBLNiYZpawK9DpwaumDE3HN2z8R4wAACAAAAAgAAAAIACAACAAAAAAAEAAAAiAgLA9OPKXx2WAbopeNlhFan+HMuczEItroCm/65asEK3cxwM207iMAAAgAAAAIAAAACAAgAAgAAAAAABAAAAIgIDVK6fbMn8A4w5RjKRgnXHJ6S5Czdi9OnPB4oW8aU6IAIcmT1aqDAAAIAAAACAAAAAgAIAAIAAAAAAAQAAACICA5CsIIIH1Dzl0fd60CPHjGtK+YLt50BWE1+9AvFj2evLHNazcs4wAACAAAAAgAAAAIACAACAAAAAAAEAAAAA')
  })

  test('Incomplete PSBT', async () => {
    expect.assertions(1)
    try {
      decoder.decodePSBT(
        [
          'UR:CRYPTO-PSBT/1-8/LPADAYCFAHPSCYKBVWTTHSHDRPHKAHPTJOJKIDJYZMADAELDADAEAEAEADWNSWSSVLJTWFKSNYSBPSENCNWTURJOUTIMMWMUTISPENHLASNDGDBGUTEEBGFGDWAEAEAEAEAEZCZMZMZMAOHFHKCKAEAEAEAEAECPAECXPKREBKWFFLLEOTLTMTVTDNCXTNSGWFHLRDLNVDCPRERTGANSNBSEROFLKOBWGHTKBEDIAEAEAEAEAEAECPAECXVLCWHTMYWFPTBBOXWSCTJZEYTTTYDNTAHGOTTNIYZTFLHHNBTSKGDWZTRELTBKDIAEAEAEAEAEADAEWDAOAEAEAEAEADADURPDSRLALTBBBKMSTNRYLEBKNYEYNTFSTSBGQZBEIACXDITESOMNBB',
          'UR:CRYPTO-PSBT/2-8/LPAOAYCFAHPSCYKBVWTTHSHDRPCLPDVALGIOFTFWHYLYAEAEAEAEAEZCZMZMZMAOLALRCKAEAEAEAEAECPAECXTBLFFWHKGLFLLBKELBTSPYVEJNJLRTJSFZINJEFEADUYUYFMGLSRBNFNLUMEJPRSDRJTMNAOAEAEAEAECMAEBBTEGYMDVONLQZHHCXSSCADSNYQDBGVYESZEHFHSSAAOFLDYFYAOCXBGUTSRBWWPMEFZWSOELYIMTEGLZSLYOTMKWKASAADSECMSBSWYOEEHSPAEGANBCHAOCXCHCMBDSGHNWMPMBKRSMSFLBWFYVECLSGHTZORLHTVARHRHPLBZVLDWVSJENTJEPKADCLAXVWGRKSIAGRFMDTDMAXUYJLBBVWRNIHQZVYTP'
        ]
      )
    } catch (error) {
      expect(error.message).toContain('provided fragments do not form a complete UR')
    }
  })

  test('Invalid encoded PSBT', async () => {
    expect.assertions(1)
    try {
      decoder.decodePSBT(
        [
          'UR:CRYPTO-PSBT/1-8/LPADAYCFAHPSCYKBVWTT'
        ]
      )
    } catch (error) {
      expect(error.message).toContain('Invalid Checksum')
    }
  })
  test('Invalid encoded type', async () => {
    expect.assertions(1)
    try {
      decoder.decodePSBT(['UR:BYTES/HKADKNCNCXGRIHKKJKJYJLJTIHCXGTKPJZJYINJKINIOCXJKIHJYKPJOCXIYINJZIHCXDEIAJPIHHSJYIHIECXJLJTCXDYEHFEFWFYFPEMFYDTBKCNBKGLHSJNIHFTCXGRGHHEFGFPFPESDYFEFWENHEEYDPEYBKGDJLJZINIAKKFTCXEYCXJLIYCXEYBKFYIHJPINKOHSJYINJLJTFTCXJNDLEEETDIDLDYDIDLDYDIDLEYDIBKFGJLJPJNHSJYFTCXGDEYHGGUFDBKBKDYEHFEFWFYFPEMFYFTCXHTJOKPIDEMECENJYGDKSKSKTFDINHKJEHKINGHEHEYFLEYHGGOFYEYIAJOFPFDKKHFHGISIMKOGRGDIDHDJLHKECIMFYHTGUKKJLEMEHKKFLECFXEHEEGSFXKPKTISKKIAGHGHFPKNIOGHGOIAGYIYIEIEGMETFGFGGHGYEHIDGUHGGMENJEKNJNGLIDGTFEHSHFKNGOJPIMEEGSISKSIDJLJTIMJLBKESEMFXFWEHECEEEYFTCXHTJOKPIDEMECHFKPHKIYKTJPFXIMEYGLHDKTFGGSGMIEIDKKKOGDGDJNGDKOEMGMJYIHGYKTFGGTHDFDGEGTGDJKFYKPFXEMKOISKOIDHGJSJLJNFEIEEMETHKJOJLGRIEEMJEGRJEIAIAGHGHFXFPJNJNIDECHFJNHDFPEHESHSISEMIMHDGYINIOGRGOIHKSJEIHGSIHKPGRIMKTJYFDKKENECJLBKYLYAHNRS'])
    } catch (error) {
      expect(error.message).toContain('Data is not of expected type crypto-psbt, found type: bytes')
    }
  })
})
