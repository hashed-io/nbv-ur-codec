const { Encoder } = require('../src')

let encoder

beforeAll(async () => {
  encoder = new Encoder()
})

describe('encodeVault', () => {
  test('Valid vault', async () => {
    const vault = getVault()
    const result = encoder.encodeVault(vault, 'Test wallet')
    const encoded =
      'Name: Test wallet\n' +
      'Policy: 2 of 4\n' +
      "Derivation: m/48'/0'/0'/2'\n" +
      'Format: P2WSH\n\n' +

      '0CDB4EE2: Zpub753WkfemgkpJqtboFVaoqHqBSVEQNgEdKmpRuMkNNabVv6ATumRRhNUdrnQopkgLnAxwZxzkh7rDvsCoEvBHuKuojKtSFfuroukMw9Kv1Ui\n\n' +

      'D6B372CE: Zpub74mtS5wc9ewL5xy5u1NqjaZJ5ok13s8VaXHtX8qr2jxV8anG63C4dtHu7ZtAoBe9ksezve3gTBDs5PriFPApJoyQvq8SXQjJeUdzs153XEj\n\n' +

      'DDB3F11E: Zpub74CJEA8Vx5yub6CiSuoFMLESzh2TzuaXXcZ4BrA9wntbg4kR9sCUrHqPQUCu5YMXRD6n624FUozZd8r5C41ProRqs3G6Mp2Zieu4RrWKdor\n\n' +

      '993D5AA8: Zpub752e1TJf2Roex9i8Wr4BCVgtoEWtQQeP2bievFbxFyheuNJoUQMXwxuafVercaBhAWXno2wXWAQesVjrDRNHkCL9Jf89Gx4aRKNNCF5Moq2\n\n'
    expect(result).toBe(encoded)
  })

  test('should fail for no vault', async () => {
    expect.assertions(1)
    try {
      encoder.encodeVault(null, 'Test wallet')
    } catch (error) {
      expect(error.message).toContain('A vault must be provided')
    }
  })
  test('No name', async () => {
    expect.assertions(1)
    try {
      const vault = getVault()
      encoder.encodeVault(vault)
    } catch (error) {
      expect(error.message).toContain('A name for the vault must be provided')
    }
  })

  test('should fail for non integer thershold', async () => {
    expect.assertions(1)
    try {
      const vault = getVault()
      vault.threshold = 'a'
      encoder.encodeVault(vault, 'Test wallet')
    } catch (error) {
      expect(error.message).toContain('threshold must be an integer')
    }
  })

  test('should fail for non array cosigners', async () => {
    expect.assertions(1)
    try {
      const vault = getVault()
      vault.cosigners = 'a'
      encoder.encodeVault(vault, 'Test wallet')
    } catch (error) {
      expect(error.message).toContain('cosigners must be an array')
    }
  })

  test('should fail for threshold greater than number of cosigners', async () => {
    expect.assertions(1)
    try {
      const vault = getVault()
      vault.threshold = 5
      encoder.encodeVault(vault, 'Test wallet')
    } catch (error) {
      expect(error.message).toContain('threshold can not be greater than the number of cosigners')
    }
  })

  test('should fail for less than to cosigners', async () => {
    expect.assertions(1)
    try {
      const vault = {
        threshold: 1,
        cosigners: [{
          xfp: '0CDB4EE2',
          xpub: 'Zpub753WkfemgkpJqtboFVaoqHqBSVEQNgEdKmpRuMkNNabVv6ATumRRhNUdrnQopkgLnAxwZxzkh7rDvsCoEvBHuKuojKtSFfuroukMw9Kv1Ui',
          derivation_path: "m/48'/0'/0'/2'"
        }]
      }
      encoder.encodeVault(vault, 'Test wallet')
    } catch (error) {
      expect(error.message).toContain('There must be at least 2 cosigners')
    }
  })

  test('should fail for cosigner without xfp', async () => {
    expect.assertions(1)
    try {
      const vault = getVault()
      vault.cosigners[0].xfp = null
      encoder.encodeVault(vault, 'Test wallet')
    } catch (error) {
      expect(error.message).toContain('cosigner 0: xfp must have a value')
    }
  })

  test('should fail for cosigner without xpub', async () => {
    expect.assertions(1)
    try {
      const vault = getVault()
      vault.cosigners[1].xpub = null
      encoder.encodeVault(vault, 'Test wallet')
    } catch (error) {
      expect(error.message).toContain('cosigner 1: xpub must have a value')
    }
  })

  test('should fail for cosigner without derivation path', async () => {
    expect.assertions(1)
    try {
      const vault = getVault()
      vault.cosigners[3].derivation_path = null
      encoder.encodeVault(vault, 'Test wallet')
    } catch (error) {
      expect(error.message).toContain('cosigner 3: derivation_path must have a value')
    }
  })

  test('should fail for cosigner with different derivation path', async () => {
    expect.assertions(1)
    try {
      const vault = getVault()
      vault.cosigners[3].derivation_path = "m/48'/0'/0'/3'"
      encoder.encodeVault(vault, 'Test wallet')
    } catch (error) {
      expect(error.message).toContain('The derivation path of the cosigners do not match')
    }
  })
})

describe('encodeVaultBytes', () => {
  test('Valid vault', async () => {
    const vault = getVault()
    const result = encoder.encodeVaultBytes(vault, 'Test wallet', 200)
    expect(result).toStrictEqual([
      'ur:bytes/1-3/lpadaxcfaoftcymtvsayaohdrnhkaoemglhsjnihftcxghihjkjycxkthsjzjzihjybkgdjljziniakkftcxeycxjliycxeebkfyihjpinkohsjyinjljtftcxjndleeetdidldydidldydidleydibkfgjljpjnhsjyftcxgdeyhggufdbkbkdyfxfyfweefefeeyftcxhtjokpidemeceohgjeiyihjniojejogejsjyidjlfghfhsjljsfdjsfwguhffegygliofeiegrjnjogmkpgtjeglglhsidhfkoenfpghkpjngmgmisglgoiejpjtgyjljojeiogsjtfpkskthtksknjeisemjpfykojkfxjlfekofwfdkpgrkpjlimgrjygufgiykpjpjlkprninsgny',
      'ur:bytes/2-3/lpaoaxcfaoftcymtvsayaohdrnjegtktesgrkoehgoinbkbkfyenfweoemeyfxfeftcxhtjokpidemeejnjyguecktiaesihktgseckskkeckpehgljsimhshtgeecjljeeheojkethfhshdfdjyhdetjsjpeyimkshfethsjtfleneofxeeiejyfdkpemhtjyfpjlfwihesjejkihknkoiheoioghfwfyjkecgdjpinfggdfpjogejlkkgykojsetguhdgyimgeihgoieknjkeheceohdfeimbkbkfyfyfweofgehehfeftcxhtjokpidemeefxgefefpethfkseckkkpidenfxingukpjlfggtgsfegukniseyghknkphshdhdiahteefwjpfpesktjtcpkpiast',
      'ur:bytes/3-3/lpaxaxcfaoftcymtvsayaohdrnjyidioeejegmesjkfxgojpfdjsgdgygofxkpechkgthdgmfyenjteneyeefggojlknhtieetjpecfxeeehgdjpjlgmjsjkeoflengtjoeyhtinihkpeegmjphggriejljpbkbkeseseofyecfpfpetftcxhtjokpidemeceyihehghgeiyeygmjlihksesinethgjpeefwfxhfiojyjlfehgjygygyihgdeyidinihkofgidksfgkkisihkpglgejlgogygthdktkskphsiyhfihjpiahsfwisfphghdjtjleykthdhgfpgyihjkhfimjpfygmglfdjefxgsesgeiyetesflkseehsgmgrglglfxfgecgtjljseybkbkynghldoy'
    ])
  })
})

describe('encodePSBT', () => {
  test('Valid psbt', async () => {
    const psbt = '70736274ff0100890100000001f1c6c4e36ef3789acbac3623f0df70dd6a9493d0c8365d099b5012dd3412462c0000000000fdffffff0256591e0000000000220020aab50af3478aa38796e02b20dacaf35dba86e722b5c0499ca0c1b847761354cf1027000000000000220020e31b5a8ff3a914a4ef1f6c32d1d42bd957a3da66fc475ca0d77b2cfcb5870a2700000000000100ea02000000000101dfa8c38087140a97dabd8a0a9a329d3dd712b41063202721a8e68d673a425e810000000000fdffffff0280841e0000000000220020d68242594e477f7c7fd7abe46d6fc07140696b4501dbdb3e4ec30c3c8b9172bf2a6e8e0200000000160014d35195e299b45c20c41d269ab312e139fe5661c202473044022012ddc313ec9140efa2816ad34efa81a398f409042635970feea231c80049a017022017160bca60ebad0abf97471344e421ca5afbb75ae6b9b9ae15e32ce86b9d6baa012103e54b78634b3e292e03db6f14e5be91a34f6ea01989be970321f50027b0288056483b0b0001012b80841e0000000000220020d68242594e477f7c7fd7abe46d6fc07140696b4501dbdb3e4ec30c3c8b9172bf220203b14fac12219c5c80d6f6b057b8ea25a6a7f8c98f5f82e58224003530d9d909f14730440220582687e05dea5b6babc5fd1de2b7c0a20c8ed62caa54dd9611c421fef7ecdb020220097d42e0664f5165d6b81a1bb702f954bc7eae0285150c094a925dca90b9df370101058b5221031adcfdcfb6ed3fc7b0556ffee830644379cfde8c33e9484acf00cf5d2b4d7bf5210357693b653b9098c2009228541cfe48b98c0a4cf587b6b088656488c70fe5225f2103b14fac12219c5c80d6f6b057b8ea25a6a7f8c98f5f82e58224003530d9d909f12103b65ce57a7e541c1cb1d5a5a4d59266c1b5904d5ab341356ab46bc52ae337912154ae2206031adcfdcfb6ed3fc7b0556ffee830644379cfde8c33e9484acf00cf5d2b4d7bf51c0cdb4ee230000080000000800000008002000080000000000000000022060357693b653b9098c2009228541cfe48b98c0a4cf587b6b088656488c70fe5225f1c993d5aa8300000800000008000000080020000800000000000000000220603b14fac12219c5c80d6f6b057b8ea25a6a7f8c98f5f82e58224003530d9d909f11cd6b372ce300000800000008000000080020000800000000000000000220603b65ce57a7e541c1cb1d5a5a4d59266c1b5904d5ab341356ab46bc52ae33791211cddb3f11e300000800000008000000080020000800000000000000000002202021aef5e398929e3223356f5895b861eb80d0c4497183025d98ef3e2a6af33f1041cddb3f11e300000800000008000000080020000800100000000000000220203409224bafaf3312604af3dd38214861d038b7f05abc50806353e4ca53ab415e11c993d5aa8300000800000008000000080020000800100000000000000220203647d2ab3390b32893f00f4c1e905e0289ccc2425dcd8598b1e397223b2786c2a1c0cdb4ee2300000800000008000000080020000800100000000000000220203d9a001127fc17b17d88ab3a912c5b9de2b76330dbaccb1aa33b12c882d4771df1cd6b372ce300000800000008000000080020000800100000000000000002202026c586485b5df5c9dce0f521f95a08823a204b362619a5ac0af43a706ae9831371cddb3f11e300000800000008000000080020000800000000001000000220202c0f4e3ca5f1d9601ba2978d96115a9fe1ccb9ccc422dae80a6ffae5ab042b7731c0cdb4ee230000080000000800000008002000080000000000100000022020354ae9f6cc9fc038c394632918275c727a4b90b3762f4e9cf078a16f1a53a20021c993d5aa830000080000000800000008002000080000000000100000022020390ac208207d43ce5d1f77ad023c78c6b4af982ede74056135fbd02f163d9ebcb1cd6b372ce30000080000000800000008002000080000000000100000000'
    let result = encoder.encodePSBT(psbt, 2000)
    // console.log(result)
    expect(result).toStrictEqual([
      'ur:crypto-psbt/hkahptjojkidjyzmadaeldadaeaeaeadwnswssvljtwfksnysbpsencnwturjoutimmwmutispenhlasndgdbguteebgfgdwaeaeaeaeaezczmzmzmaohfhkckaeaeaeaeaecpaecxpkrebkwfflleotltmtvtdncxtnsgwfhlrdlnvdcprertgansnbseroflkobwghtkbediaeaeaeaeaeaecpaecxvlcwhtmywfptbboxwsctjzeytttydntahgottniyztflhhnbtskgdwztreltbkdiaeaeaeaeaeadaewdaoaeaeaeaeadadurpdsrlaltbbbkmstnrylebknyeyntfstsbgqzbeiacxdiclpdvalgioftfwhylyaeaeaeaeaezczmzmzmaolalrckaeaeaeaeaecpaecxtblffwhkglfllbkelbtspyvejnjlrtjsfzinjefeaduyuyfmglsrbnfnlumejprsdrjtmnaoaeaeaeaecmaebbtegymdvonlqzhhcxsscadsnyqdbgvyeszehfhssaaofldyfyaocxbgutsrbwwpmefzwsoelyimteglzslyotmkwkasaadsecmsbswyoeehspaeganbchaocxchcmbdsghnwmpmbkrsmsflbwfyveclsghtzorlhtvarhrhplbzvldwvsjentjepkadclaxvwgrksiagrfmdtdmaxuyjlbbvwrnmeotgwjtnbcfldrnmsaxclykaedipfdelahffdfrbdaeadaddnlalrckaeaeaeaeaecpaecxtblffwhkglfllbkelbtspyvejnjlrtjsfzinjefeaduyuyfmglsrbnfnlumejprscpaoaxpagwpsbgclnshhlatbynpfhgrowddaolosyasomyhelfvwlfdkaeecdytataaswnfldyfyaocxhddsltvthlwdhpjepyskzccavorlrtoebnmntbdwpkghutmtbyssclzeylwpuyaoaocxaskifwvtiygwgyihtbrocycwrlaoytghrfkbplaolpbzbnasgemohlsgmhrhuremadadahlugmclaxcyuozctkrpwefhstpfgojlzevsdyiefxkktkuelkeowlfdgetkaetkhldngtkgykclaxhginfrihfrmhmksaaemodeghcezefdrhlkbkgsykltrppfloihielostbsvwcpheclaxpagwpsbgclnshhlatbynpfhgrowddaolosyasomyhelfvwlfdkaeecdytataaswnclaxrphhvwknkbghcecepatlonoxtlmoiyseremhgthtqdfpecimqzjeskdrvlemmeclghplcpamaxcyuozctkrpwefhstpfgojlzevsdyiefxkktkuelkeowlfdgetkaetkhldngtkgykcebnuyglvodyaeaelaaeaeaelaaeaeaelaaoaeaelaaeaeaeaeaeaeaeaecpamaxhginfrihfrmhmksaaemodeghcezefdrhlkbkgsykltrppfloihielostbsvwcphecenlfshtpddyaeaelaaeaeaelaaeaeaelaaoaeaelaaeaeaeaeaeaeaeaecpamaxpagwpsbgclnshhlatbynpfhgrowddaolosyasomyhelfvwlfdkaeecdytataaswncetbqdjptodyaeaelaaeaeaelaaeaeaelaaoaeaelaaeaeaeaeaeaeaeaecpamaxrphhvwknkbghcecepatlonoxtlmoiyseremhgthtqdfpecimqzjeskdrvlemmeclceutqdwnckdyaeaelaaeaeaelaaeaeaelaaoaeaelaaeaeaeaeaeaeaeaeaecpaoaocywshyeslddtvlcpeohfykldhplnckrobtbnfymscsdydatamnwfvoolpeeownaaceutqdwnckdyaeaelaaeaeaelaaeaeaelaaoaeaelaadaeaeaeaeaeaeaecpaoaxfzmodkrdzswfehdsaapefstelfbblncaaxlulbahpyskayamecfmgsonftqzbzvycenlfshtpddyaeaelaaeaeaelaaeaeaelaaoaeaelaadaeaeaeaeaeaeaecpaoaxiekidrqdesbdeyldfhaewksewlahvtdenssfdkdauotphkluckesjpcnprksjzdrcebnuyglvodyaeaelaaeaeaelaaeaeaelaaoaeaelaadaeaeaeaeaeaeaecpaoaxtanbadbglbsekgchtpleqdptbgskrhuednkoeobtrdsfpapkeopadwlodpfljsurcetbqdjptodyaeaelaaeaeaelaaeaeaelaaoaeaelaadaeaeaeaeaeaeaeaecpaoaojzhdielpreurhhnttobsgmctmdnblocnoeaaqdidhsnyhtrtpefxosamplmkehemceutqdwnckdyaeaelaaeaeaelaaeaeaelaaoaeaelaaeaeaeaeadaeaeaecpaoaortwkvlsghecamtadrddtkstahsbzptzecesbnssffwdppllaolzmplhtpffwrljkcebnuyglvodyaeaelaaeaeaelaaeaeaelaaoaeaelaaeaeaeaeadaeaeaecpaoaxghplnejzsoztaxlkesfgeymelfkpstdioxrhbdemidwkwltkatlecmwnonftcxaocenlfshtpddyaeaelaaeaeaelaaeaeaelaaoaeaelaaeaeaeaeadaeaeaecpaoaxmhpscxlfattyfnvwttylknticnstlkjegeytlfwevdfzhfbwheryaowniatawmsbcetbqdjptodyaeaelaaeaeaelaaeaeaelaaoaeaelaaeaeaeaeadaeaeaeaekbvwtths'
    ])

    result = encoder.encodePSBT(psbt, 200)
    // console.log(result)
    expect(result).toStrictEqual([
      'ur:crypto-psbt/1-8/lpadaycfahpscykbvwtthshdrphkahptjojkidjyzmadaeldadaeaeaeadwnswssvljtwfksnysbpsencnwturjoutimmwmutispenhlasndgdbguteebgfgdwaeaeaeaeaezczmzmzmaohfhkckaeaeaeaeaecpaecxpkrebkwfflleotltmtvtdncxtnsgwfhlrdlnvdcprertgansnbseroflkobwghtkbediaeaeaeaeaeaecpaecxvlcwhtmywfptbboxwsctjzeytttydntahgottniyztflhhnbtskgdwztreltbkdiaeaeaeaeaeadaewdaoaeaeaeaeadadurpdsrlaltbbbkmstnrylebknyeyntfstsbgqzbeiacxditesomnbb',
      'ur:crypto-psbt/2-8/lpaoaycfahpscykbvwtthshdrpclpdvalgioftfwhylyaeaeaeaeaezczmzmzmaolalrckaeaeaeaeaecpaecxtblffwhkglfllbkelbtspyvejnjlrtjsfzinjefeaduyuyfmglsrbnfnlumejprsdrjtmnaoaeaeaeaecmaebbtegymdvonlqzhhcxsscadsnyqdbgvyeszehfhssaaofldyfyaocxbgutsrbwwpmefzwsoelyimteglzslyotmkwkasaadsecmsbswyoeehspaeganbchaocxchcmbdsghnwmpmbkrsmsflbwfyveclsghtzorlhtvarhrhplbzvldwvsjentjepkadclaxvwgrksiagrfmdtdmaxuyjlbbvwrnihqzvytp',
      'ur:crypto-psbt/3-8/lpaxaycfahpscykbvwtthshdrpmeotgwjtnbcfldrnmsaxclykaedipfdelahffdfrbdaeadaddnlalrckaeaeaeaeaecpaecxtblffwhkglfllbkelbtspyvejnjlrtjsfzinjefeaduyuyfmglsrbnfnlumejprscpaoaxpagwpsbgclnshhlatbynpfhgrowddaolosyasomyhelfvwlfdkaeecdytataaswnfldyfyaocxhddsltvthlwdhpjepyskzccavorlrtoebnmntbdwpkghutmtbyssclzeylwpuyaoaocxaskifwvtiygwgyihtbrocycwrlaoytghrfkbplaolpbzbnasgemohlsgmhrhuremadadahlugmclaxcycywydlmd',
      'ur:crypto-psbt/4-8/lpaaaycfahpscykbvwtthshdrpuozctkrpwefhstpfgojlzevsdyiefxkktkuelkeowlfdgetkaetkhldngtkgykclaxhginfrihfrmhmksaaemodeghcezefdrhlkbkgsykltrppfloihielostbsvwcpheclaxpagwpsbgclnshhlatbynpfhgrowddaolosyasomyhelfvwlfdkaeecdytataaswnclaxrphhvwknkbghcecepatlonoxtlmoiyseremhgthtqdfpecimqzjeskdrvlemmeclghplcpamaxcyuozctkrpwefhstpfgojlzevsdyiefxkktkuelkeowlfdgetkaetkhldngtkgykcebnuyglvodyaeaelaaeaeaeztdkglbz',
      'ur:crypto-psbt/5-8/lpahaycfahpscykbvwtthshdrplaaeaeaelaaoaeaelaaeaeaeaeaeaeaeaecpamaxhginfrihfrmhmksaaemodeghcezefdrhlkbkgsykltrppfloihielostbsvwcphecenlfshtpddyaeaelaaeaeaelaaeaeaelaaoaeaelaaeaeaeaeaeaeaeaecpamaxpagwpsbgclnshhlatbynpfhgrowddaolosyasomyhelfvwlfdkaeecdytataaswncetbqdjptodyaeaelaaeaeaelaaeaeaelaaoaeaelaaeaeaeaeaeaeaeaecpamaxrphhvwknkbghcecepatlonoxtlmoiyseremhgthtqdfpecimqzjeskdrvlemmeclceutbkmonype',
      'ur:crypto-psbt/6-8/lpamaycfahpscykbvwtthshdrpqdwnckdyaeaelaaeaeaelaaeaeaelaaoaeaelaaeaeaeaeaeaeaeaeaecpaoaocywshyeslddtvlcpeohfykldhplnckrobtbnfymscsdydatamnwfvoolpeeownaaceutqdwnckdyaeaelaaeaeaelaaeaeaelaaoaeaelaadaeaeaeaeaeaeaecpaoaxfzmodkrdzswfehdsaapefstelfbblncaaxlulbahpyskayamecfmgsonftqzbzvycenlfshtpddyaeaelaaeaeaelaaeaeaelaaoaeaelaadaeaeaeaeaeaeaecpaoaxiekidrqdesbdeyldfhaewksewlahvtdenssfdkdauotphktdutpdwd',
      'ur:crypto-psbt/7-8/lpataycfahpscykbvwtthshdrpluckesjpcnprksjzdrcebnuyglvodyaeaelaaeaeaelaaeaeaelaaoaeaelaadaeaeaeaeaeaeaecpaoaxtanbadbglbsekgchtpleqdptbgskrhuednkoeobtrdsfpapkeopadwlodpfljsurcetbqdjptodyaeaelaaeaeaelaaeaeaelaaoaeaelaadaeaeaeaeaeaeaeaecpaoaojzhdielpreurhhnttobsgmctmdnblocnoeaaqdidhsnyhtrtpefxosamplmkehemceutqdwnckdyaeaelaaeaeaelaaeaeaelaaoaeaelaaeaeaeaeadaeaeaecpaoaortwkvlsghecamtadrddtkstabkidmsly',
      'ur:crypto-psbt/8-8/lpayaycfahpscykbvwtthshdrphsbzptzecesbnssffwdppllaolzmplhtpffwrljkcebnuyglvodyaeaelaaeaeaelaaeaeaelaaoaeaelaaeaeaeaeadaeaeaecpaoaxghplnejzsoztaxlkesfgeymelfkpstdioxrhbdemidwkwltkatlecmwnonftcxaocenlfshtpddyaeaelaaeaeaelaaeaeaelaaoaeaelaaeaeaeaeadaeaeaecpaoaxmhpscxlfattyfnvwttylknticnstlkjegeytlfwevdfzhfbwheryaowniatawmsbcetbqdjptodyaeaelaaeaeaelaaeaeaelaaoaeaelaaeaeaeaeadaeaeaeaeaeaeaeaeneaycsns'
    ])
  })

  test('Invalid psbt', async () => {
    expect.assertions(1)
    const psbt = '70736274ff0100890100000001f1c6c4e36e'
    try {
      encoder.encodePSBT(psbt, 2000)
    } catch (error) {
      expect(error.message).toContain('Format Error: Unexpected End of PSBT')
    }
  })
})

function getVault () {
  return {
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
}
