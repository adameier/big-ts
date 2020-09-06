import * as assert from 'assert'
import { parse, toString } from '../src/Big'
import { pipe } from 'fp-ts/lib/function'

function testToString(expected: string, value: string | number) {
  it(`Big.js test: ${value} to string`, () => {
    assert.strictEqual(pipe(value, parse, toString), expected)
  })
}

describe('toString', () => {
  testToString('0', 0)

  testToString('9', 9)

  testToString('90', 90)

  testToString('90.12', 90.12)

  testToString('0.1', 0.1)

  testToString('0.01', 0.01)

  testToString('0.0123', 0.0123)

  testToString('1111111111111111111', '1111111111111111111')

  testToString('11111111111111111111', '11111111111111111111')

  testToString('111111111111111111111', '111111111111111111111')

  testToString('0.00001', 0.00001)

  testToString('0.000001', 0.000001)

  testToString('1e-7', 0.0000001)

  testToString('1.2e-7', 0.00000012)

  testToString('1.23e-7', 0.000000123)

  testToString('1e-8', 0.00000001)

  testToString('1.2e-8', 0.000000012)

  testToString('1.23e-8', 0.0000000123)

  testToString('-1e-7', -0.0000001)

  testToString('-1.2e-7', -0.00000012)

  testToString('-1.23e-7', -0.000000123)

  testToString('-1e-8', -0.00000001)

  testToString('-1.2e-8', -0.000000012)

  testToString('-1.23e-8', -0.0000000123)

  testToString('0', -0)

  testToString('-9', -9)

  testToString('-90', -90)

  testToString('-90.12', -90.12)

  testToString('-0.1', -0.1)

  testToString('-0.01', -0.01)

  testToString('-0.0123', -0.0123)

  testToString('-1111111111111111111', '-1111111111111111111')

  testToString('-11111111111111111111', '-11111111111111111111')

  testToString('-111111111111111111111', '-111111111111111111111')

  testToString('-0.00001', -0.00001)

  testToString('-0.000001', -0.000001)

  testToString(
    '-0.00002880972004499178518524380571906338098072371970938177432917135459615370973',
    '-2.880972004499178518524380571906338098072371970938177432917135459615370973e-5'
  )

  testToString('0.004062', '4.062e-3')

  testToString('-0.206499585624247', '-2.06499585624247e-1')

  testToString('-3217152390551.3480681585096', '-3.2171523905513480681585096e+12')

  testToString(
    '-0.40559318155029357183161762311247760893712676112986144952',
    '-4.0559318155029357183161762311247760893712676112986144952e-1'
  )

  testToString('0.67557005614746', '6.7557005614746e-1')

  testToString('2151.831421496', '2.151831421496e+3')

  testToString(
    '-0.1022172129444977165472535878409456456335734198775387674763620211',
    '-1.022172129444977165472535878409456456335734198775387674763620211e-1'
  )

  testToString('-230807.1307795', '-2.308071307795e+5')

  testToString(
    '0.002624512719656034051820141160621618555340964456445',
    '2.624512719656034051820141160621618555340964456445e-3'
  )

  testToString('0.00001327437838824505056', '1.327437838824505056e-5')

  testToString(
    '-9951290509.3429612599596526988511098538865484988394',
    '-9.9512905093429612599596526988511098538865484988394e+9'
  )

  testToString('-3427642993691330.341017204453', '-3.427642993691330341017204453e+15')

  testToString(
    '-37824866439491973.50741863066968911367117518074717651871061595',
    '-3.782486643949197350741863066968911367117518074717651871061595e+16'
  )

  testToString('-752565.9663775', '-7.525659663775e+5')

  testToString('0.0410317752667061957691693201', '4.10317752667061957691693201e-2')

  testToString('2.5', '2.5e+0')

  testToString(
    '0.001164502035787451528115883000625978204981335782911350225248841560576941',
    '1.164502035787451528115883000625978204981335782911350225248841560576941e-3'
  )

  testToString('-92525086100.53245', '-9.252508610053245e+10')

  testToString('71909248250.092670577', '7.1909248250092670577e+10')

  testToString('-0.000029839925870209739408399', '-2.9839925870209739408399e-5')

  testToString('-223.93', '-2.2393e+2')

  testToString(
    '-0.000259240816662184155275574744458044334917585',
    '-2.59240816662184155275574744458044334917585e-4'
  )

  testToString(
    '485824484771564977316.86962509957823510727432',
    '4.8582448477156497731686962509957823510727432e+20'
  )

  testToString(
    '-18257504137.6607202783942428100860671852104',
    '-1.82575041376607202783942428100860671852104e+10'
  )

  testToString(
    '1207719.135268928473061847066565333537875194537162',
    '1.207719135268928473061847066565333537875194537162e+6'
  )

  testToString('-3', '-3e+0')

  testToString(
    '-31621064264859.749410561631439237598765358',
    '-3.1621064264859749410561631439237598765358e+13'
  )

  testToString('-54.47464', '-5.447464e+1')

  testToString('-11.5', '-1.15e+1')

  testToString('0.569182274127', '5.69182274127e-1')

  testToString('5', '5e+0')

  testToString(
    '381.62010663178723664752926995655828448751389488899637765782586264',
    '3.8162010663178723664752926995655828448751389488899637765782586264e+2'
  )

  testToString('18668065.48', '1.866806548e+7')

  testToString(
    '223807275510855910.6988025822523469037817173438124946663186',
    '2.238072755108559106988025822523469037817173438124946663186e+17'
  )

  testToString('15173665864491.945786', '1.5173665864491945786e+13')

  testToString(
    '-251.56445330169957142953167749737702776442537230366599',
    '-2.5156445330169957142953167749737702776442537230366599e+2'
  )

  testToString(
    '0.0000747343483945109530854605989856965703549253246797858230222012',
    '7.47343483945109530854605989856965703549253246797858230222012e-5'
  )

  testToString('-3095291.956', '-3.095291956e+6')

  testToString(
    '8590.419179188907071273310109584707017019342529023922994463304837665',
    '8.590419179188907071273310109584707017019342529023922994463304837665e+3'
  )

  testToString(
    '-0.000002681085217615878927905287650187567705621444210005590775053806026369',
    '-2.681085217615878927905287650187567705621444210005590775053806026369e-6'
  )

  testToString('0.00000248044514182', '2.48044514182e-6')

  testToString('-1.38339', '-1.38339e+0')

  testToString(
    '265815510006244.257349767564387359753901857238',
    '2.65815510006244257349767564387359753901857238e+14'
  )

  testToString('288046583927539014.556402201511015', '2.88046583927539014556402201511015e+17')

  testToString('6459.1', '6.4591e+3')

  testToString('446.1824', '4.461824e+2')

  testToString('2.616635870641879', '2.616635870641879e+0')

  testToString('-4085948139.5804686188882798', '-4.0859481395804686188882798e+9')

  testToString('45458990.221135', '4.5458990221135e+7')

  testToString('229849.695421', '2.29849695421e+5')

  testToString('7.85927694849110186784769009469', '7.85927694849110186784769009469e+0')

  testToString('697498231.03150555927', '6.9749823103150555927e+8')

  testToString('-1090915789387.96911391171700684', '-1.09091578938796911391171700684e+12')

  testToString('-0.120429337172718', '-1.20429337172718e-1')

  testToString('913792605266.5301219', '9.137926052665301219e+11')

  testToString('0.0873642688709634', '8.73642688709634e-2')

  testToString(
    '-21603884141633471.858655613534445827759992354862479336548698767',
    '-2.1603884141633471858655613534445827759992354862479336548698767e+16'
  )

  testToString(
    '12.91982044990511129067920212999349413176623775307358115384657666844065',
    '1.291982044990511129067920212999349413176623775307358115384657666844065e+1'
  )

  testToString(
    '0.0019086760429407683234932444875158352387775521972728951440817006035554',
    '1.9086760429407683234932444875158352387775521972728951440817006035554e-3'
  )

  testToString(
    '-78330.1825415413331166762813674735976496678',
    '-7.83301825415413331166762813674735976496678e+4'
  )

  testToString('4560775.849', '4.560775849e+6')

  testToString('199832274592037770879.2236', '1.998322745920377708792236e+20')

  testToString(
    '-20.74300801013397685207589423690045359233',
    '-2.074300801013397685207589423690045359233e+1'
  )

  testToString('-6505752.09135542952252455354085623', '-6.50575209135542952252455354085623e+6')

  testToString('0', '0e+0')

  testToString(
    '-218837142747859.23497622147534484506798006756785404226264059321898534689',
    '-2.1883714274785923497622147534484506798006756785404226264059321898534689e+14'
  )

  testToString('992610690.16', '9.9261069016e+8')

  testToString(
    '-0.0000364256683518569714198080887356701966951222545151062855406806097704164',
    '-3.64256683518569714198080887356701966951222545151062855406806097704164e-5'
  )

  testToString(
    '0.00000928774725799597452720977358774052299631189443',
    '9.28774725799597452720977358774052299631189443e-6'
  )

  testToString(
    '-0.005434426149751121309048951009022312656054485654112967897440271106066',
    '-5.434426149751121309048951009022312656054485654112967897440271106066e-3'
  )

  testToString('2.1714946', '2.1714946e+0')

  testToString(
    '0.000006781622347012320873794747282794246412400005134449059641940179',
    '6.781622347012320873794747282794246412400005134449059641940179e-6'
  )

  testToString('2.13', '2.13e+0')

  testToString('-28.0725174096', '-2.80725174096e+1')

  testToString(
    '0.000050052572229552162438382075420392610439202759423472256249007310645',
    '5.0052572229552162438382075420392610439202759423472256249007310645e-5'
  )

  testToString(
    '-28190608186955.67000386761846269433359128370160432',
    '-2.819060818695567000386761846269433359128370160432e+13'
  )

  testToString('6115836580.06931776667946472', '6.11583658006931776667946472e+9')

  testToString('3127055.98', '3.12705598e+6')

  testToString('-0.00000278086669318447179655304', '-2.78086669318447179655304e-6')

  testToString(
    '-19854.337795671507151567789137457495269813344795660135609697504472',
    '-1.9854337795671507151567789137457495269813344795660135609697504472e+4'
  )

  testToString(
    '16557108569.03005723004894135118172469151458',
    '1.655710856903005723004894135118172469151458e+10'
  )

  testToString('8447179435644004778.514210275024009', '8.447179435644004778514210275024009e+18')

  testToString('33024.01969986989181558', '3.302401969986989181558e+4')

  testToString(
    '-0.00000702495553976446537245326608574770080797449009928127905658985785323597741349',
    '-7.02495553976446537245326608574770080797449009928127905658985785323597741349e-6'
  )

  testToString(
    '0.0001097914385362789240230012522029502986760487614749277',
    '1.097914385362789240230012522029502986760487614749277e-4'
  )

  testToString('1.67669241', '1.67669241e+0')

  testToString('5.0598473256548127', '5.0598473256548127e+0')

  testToString('146398550409534.32', '1.4639855040953432e+14')

  testToString('-55339611176.494079841526043079614', '-5.5339611176494079841526043079614e+10')

  testToString('602222732065006149.6', '6.022227320650061496e+17')

  testToString(
    '-4600698101679072.64824427288266592988058099344507821735484',
    '-4.60069810167907264824427288266592988058099344507821735484e+15'
  )

  testToString('0.13255667462360854362969930852', '1.3255667462360854362969930852e-1')

  testToString('-61525865178604724426.398', '-6.1525865178604724426398e+19')

  testToString(
    '15187995032.00996401112180591408712891586',
    '1.518799503200996401112180591408712891586e+10'
  )

  testToString(
    '159950633.980480337780026144119910434350827825760366',
    '1.59950633980480337780026144119910434350827825760366e+8'
  )

  testToString('-764.8', '-7.648e+2')

  testToString(
    '-31.662121934648835053529869160168892970483',
    '-3.1662121934648835053529869160168892970483e+1'
  )

  testToString('0.03666727306518206862708073', '3.666727306518206862708073e-2')

  testToString('-0.00028843261916109', '-2.8843261916109e-4')

  testToString('478.49', '4.7849e+2')

  testToString(
    '-62.627190076223933399553699369552867555985635522',
    '-6.2627190076223933399553699369552867555985635522e+1'
  )

  testToString('156548216895997686.578615255', '1.56548216895997686578615255e+17')

  testToString('8388218102792.292405470516', '8.388218102792292405470516e+12')

  testToString('0.0036317133235', '3.6317133235e-3')

  testToString('4514788796646646.42224023997023', '4.51478879664664642224023997023e+15')

  testToString('41201.30645135922512', '4.120130645135922512e+4')

  testToString('0.004502698911439375781698700519896', '4.502698911439375781698700519896e-3')

  testToString('1', '1e+0')

  testToString('3555.0291', '3.5550291e+3')

  testToString('-3591377193611873751.3353113792', '-3.5913771936118737513353113792e+18')

  testToString('-27081149345253.645950476439003274', '-2.7081149345253645950476439003274e+13')

  testToString('633675232487518.576287395312347', '6.33675232487518576287395312347e+14')

  testToString('547.912745337206643', '5.47912745337206643e+2')

  testToString(
    '-1369789020071.5871864408090320565841144805',
    '-1.3697890200715871864408090320565841144805e+12'
  )

  testToString('14.37', '1.437e+1')

  testToString('-352890772277830924312.60265470726', '-3.5289077227783092431260265470726e+20')

  testToString(
    '-0.8263363420562821806512025997732471776',
    '-8.263363420562821806512025997732471776e-1'
  )

  testToString('-3.90321003458651663108762157', '-3.90321003458651663108762157e+0')

  testToString('14353.2834182', '1.43532834182e+4')

  testToString('-0.0000071527952119', '-7.1527952119e-6')

  testToString(
    '3237586.98790145745425063520074214062128950915646430035937338199676',
    '3.23758698790145745425063520074214062128950915646430035937338199676e+6'
  )

  testToString('-20.891434', '-2.0891434e+1')

  testToString('7869302.9900499', '7.8693029900499e+6')

  testToString('-146423440.13', '-1.4642344013e+8')

  testToString('0.0001507', '1.507e-4')

  testToString(
    '-0.00026117760659270894594481410304037863053',
    '-2.6117760659270894594481410304037863053e-4'
  )

  testToString('2123550805855611.6796631', '2.1235508058556116796631e+15')

  testToString('-2267146878608434212.0596889', '-2.2671468786084342120596889e+18')

  testToString('-39589210486412.3716342418324338321', '-3.95892104864123716342418324338321e+13')

  testToString('-11323534649360.42945605732789', '-1.132353464936042945605732789e+13')

  testToString(
    '-253480938953960.03129886270901867817052499',
    '-2.5348093895396003129886270901867817052499e+14'
  )

  testToString('878485741141478152036.782', '8.78485741141478152036782e+20')

  testToString('40.72', '4.072e+1')

  testToString('0.00000419651493687959734699558527', '4.19651493687959734699558527e-6')

  testToString(
    '-5539611145832.73638919574913889280760421',
    '-5.53961114583273638919574913889280760421e+12'
  )

  testToString(
    '988848038030744178.1829136155908503186753749975178',
    '9.888480380307441781829136155908503186753749975178e+17'
  )

  testToString('-49.655', '-4.9655e+1')

  testToString('-92019024363681427.51', '-9.201902436368142751e+16')

  testToString(
    '0.40179862349934895209970133009437007843603241944946845532608648027',
    '4.0179862349934895209970133009437007843603241944946845532608648027e-1'
  )

  testToString('0.00027323435290229', '2.7323435290229e-4')

  testToString('-287.307413075519263341', '-2.87307413075519263341e+2')

  testToString('489173.689099058495720286', '4.89173689099058495720286e+5')

  testToString(
    '0.00000147215454893076048653261289571696023288538969518393799203798',
    '1.47215454893076048653261289571696023288538969518393799203798e-6'
  )

  testToString(
    '0.000074449450587117231184246544545675658438023541362',
    '7.4449450587117231184246544545675658438023541362e-5'
  )

  testToString('1.169311569', '1.169311569e+0')

  testToString(
    '-21949352412.9904826825522111998359879599288366014040193774185970714131093',
    '-2.19493524129904826825522111998359879599288366014040193774185970714131093e+10'
  )

  testToString('-218879937679551392.189024', '-2.18879937679551392189024e+17')

  testToString('1541540107.1145132154683674', '1.5415401071145132154683674e+9')

  testToString(
    '-7509.580144660349789159418324905916726',
    '-7.509580144660349789159418324905916726e+3'
  )

  testToString('798968.361269712405243689738', '7.98968361269712405243689738e+5')

  testToString('-23914810.356', '-2.3914810356e+7')

  testToString(
    '-0.0000011686639705418429850704560989878569387703202111178051017322584',
    '-1.1686639705418429850704560989878569387703202111178051017322584e-6'
  )

  testToString(
    '66398146.86494006855852173107370871122679',
    '6.639814686494006855852173107370871122679e+7'
  )

  testToString('-13061.00785831952599100135398795', '-1.306100785831952599100135398795e+4')

  testToString(
    '24386.12747311816804599078050671055594988810784455859',
    '2.438612747311816804599078050671055594988810784455859e+4'
  )

  testToString(
    '23.1482440256844245825852224454660373564879353266268453019435951916384499',
    '2.31482440256844245825852224454660373564879353266268453019435951916384499e+1'
  )

  testToString('-12.066', '-1.2066e+1')

  testToString(
    '3824249690.744942003288636719934967371432',
    '3.824249690744942003288636719934967371432e+9'
  )

  testToString('-4035.15351126', '-4.03515351126e+3')

  testToString(
    '-186385.04210983462432868870963586536412803139826621335',
    '-1.8638504210983462432868870963586536412803139826621335e+5'
  )

  testToString(
    '-0.0008554911175315826215076839473647265',
    '-8.554911175315826215076839473647265e-4'
  )

  testToString('0.00126070187425794865401', '1.26070187425794865401e-3')

  testToString('0.0016431437584973628209451788', '1.6431437584973628209451788e-3')

  testToString(
    '-78797.344273597515126427785281070901556',
    '-7.8797344273597515126427785281070901556e+4'
  )

  testToString('0.000027197516733214969419979043489', '2.7197516733214969419979043489e-5')

  testToString('34231.6666792804527911832867793479095', '3.42316666792804527911832867793479095e+4')

  testToString('-0.0016026339968302068544304748262863', '-1.6026339968302068544304748262863e-3')

  testToString('1.1489744061887', '1.1489744061887e+0')

  testToString(
    '34.802794480472992829077222920294423597551',
    '3.4802794480472992829077222920294423597551e+1'
  )

  testToString(
    '-0.13968357011235485005920820153289818014836286594729971084655744864563',
    '-1.3968357011235485005920820153289818014836286594729971084655744864563e-1'
  )

  testToString('36782356.605705226582252036652683058', '3.6782356605705226582252036652683058e+7')

  testToString(
    '-0.0000041171213382692649586879633642089089959393863795',
    '-4.1171213382692649586879633642089089959393863795e-6'
  )

  testToString('19.387350669785', '1.9387350669785e+1')

  testToString('-22867.530537', '-2.2867530537e+4')

  testToString(
    '-7115.37994036808268478263377221529848',
    '-7.11537994036808268478263377221529848e+3'
  )

  testToString('-1837.414453982931593965797407518506', '-1.837414453982931593965797407518506e+3')

  testToString(
    '-0.00038303400838648252101595120613261049796436260145181784',
    '-3.8303400838648252101595120613261049796436260145181784e-4'
  )

  testToString('199834393757638560.48365651429302047', '1.9983439375763856048365651429302047e+17')

  testToString('64706.4911792715', '6.47064911792715e+4')

  testToString('-2', '-2e+0')

  testToString('-0.000001886004002403469961362572546672', '-1.886004002403469961362572546672e-6')

  testToString(
    '-0.0000310103946215031028586927929479250572359767776057431945832',
    '-3.10103946215031028586927929479250572359767776057431945832e-5'
  )

  testToString(
    '-55060735.322112208733188720279601757782733608564',
    '-5.5060735322112208733188720279601757782733608564e+7'
  )

  testToString('-1.1', '-1.1e+0')

  testToString('54839153693259579.9795', '5.48391536932595799795e+16')

  testToString(
    '0.0041759310069240548770474304055254667169662955214058456572',
    '4.1759310069240548770474304055254667169662955214058456572e-3'
  )

  testToString('0.0001955365160381498364947545', '1.955365160381498364947545e-4')

  testToString('3.27323', '3.27323e+0')

  testToString('70.6', '7.06e+1')

  testToString('-0.026508636799607573347975491', '-2.6508636799607573347975491e-2')

  testToString('25188781.150611', '2.5188781150611e+7')

  testToString(
    '-0.018894991938338647856502400607763862237528708988761254099175589727552',
    '-1.8894991938338647856502400607763862237528708988761254099175589727552e-2'
  )

  testToString(
    '617807816691763257.508357656061659471644432794446692740861',
    '6.17807816691763257508357656061659471644432794446692740861e+17'
  )

  testToString('73183170035928.81575660902505', '7.318317003592881575660902505e+13')

  testToString('0.0000164455107650189184357371', '1.64455107650189184357371e-5')

  testToString('-0.93599961', '-9.3599961e-1')

  testToString('14734.9184214899580591121', '1.47349184214899580591121e+4')

  testToString('15946.29165654625272129', '1.594629165654625272129e+4')

  testToString('122966441.290185145609340122412', '1.22966441290185145609340122412e+8')

  testToString(
    '-129.654371704230659398725613745012717737573933658257',
    '-1.29654371704230659398725613745012717737573933658257e+2'
  )

  testToString(
    '0.0001761377819621266803778554313207263082401264088237246981620072',
    '1.761377819621266803778554313207263082401264088237246981620072e-4'
  )

  testToString('-7', '-7e+0')

  testToString('-15309785476025143.756408973719659838', '-1.5309785476025143756408973719659838e+16')

  testToString('-3670228393526736.52', '-3.67022839352673652e+15')

  testToString('0.000731', '7.31e-4')

  testToString(
    '5.6183847424066950657818656796546070156921299115031071',
    '5.6183847424066950657818656796546070156921299115031071e+0'
  )

  testToString('-1.1', '-1.1e+0')

  testToString('20.7271796351', '2.07271796351e+1')

  testToString('-3.7', '-3.7e+0')

  testToString(
    '-24017356010538845.10861917433652302066375691548110464881649',
    '-2.401735601053884510861917433652302066375691548110464881649e+16'
  )

  testToString(
    '-0.00952946836809535253950074785587127807727767',
    '-9.52946836809535253950074785587127807727767e-3'
  )

  testToString(
    '0.00012968834094598251424610958860395289575847',
    '1.2968834094598251424610958860395289575847e-4'
  )

  testToString('-0.3459913', '-3.459913e-1')

  testToString('-158067352.4', '-1.580673524e+8')

  testToString('-0.000014790343125179690326739', '-1.4790343125179690326739e-5')

  testToString(
    '0.0193943717016794836655634658134262659293302509313781667025177208',
    '1.93943717016794836655634658134262659293302509313781667025177208e-2'
  )

  testToString(
    '113542357.4117024541705333527869936887227315756680969573589892339805447390658',
    '1.135423574117024541705333527869936887227315756680969573589892339805447390658e+8'
  )

  testToString('-0.154220377', '-1.54220377e-1')

  testToString('0.0427523', '4.27523e-2')

  testToString(
    '1085202870092846001.489480354353962808914322',
    '1.085202870092846001489480354353962808914322e+18'
  )

  testToString('-52122.564', '-5.2122564e+4')

  testToString('-69', '-6.9e+1')

  testToString('45453557279.70926480053', '4.545355727970926480053e+10')

  testToString(
    '-8459227194561.009568405224959256810337570435527435',
    '-8.459227194561009568405224959256810337570435527435e+12'
  )

  testToString(
    '0.16711094626502869265467433959064784065092439761523318705',
    '1.6711094626502869265467433959064784065092439761523318705e-1'
  )

  testToString('758439672656.17494756140912792', '7.5843967265617494756140912792e+11')

  testToString('-0.0000108140557920934375827728189164762', '-1.08140557920934375827728189164762e-5')

  testToString('1134838730.3350646724840481462521912', '1.1348387303350646724840481462521912e+9')

  testToString('0.001816435719305977', '1.816435719305977e-3')

  testToString(
    '-0.0940451841857620585410399891420224321683214142',
    '-9.40451841857620585410399891420224321683214142e-2'
  )

  testToString(
    '0.7088984300959367781273668039450998309536026408287804482',
    '7.088984300959367781273668039450998309536026408287804482e-1'
  )

  testToString('10.11847', '1.011847e+1')

  testToString(
    '27512.990770009509682231716955970446038275546',
    '2.7512990770009509682231716955970446038275546e+4'
  )

  testToString(
    '-262611924651.02616702076749905814718436605807480522286301086176286',
    '-2.6261192465102616702076749905814718436605807480522286301086176286e+11'
  )

  testToString(
    '18176137775866581965.65220583044244674108496842671900180386069435393',
    '1.817613777586658196565220583044244674108496842671900180386069435393e+19'
  )

  testToString('3', '3e+0')

  testToString('39632.958108', '3.9632958108e+4')

  testToString('0.00001549607612980463131760552343556214', '1.549607612980463131760552343556214e-5')

  testToString(
    '-0.0002821935547414936046805564857061667284704668',
    '-2.821935547414936046805564857061667284704668e-4'
  )

  testToString('-551423700538313.88650175935008238', '-5.5142370053831388650175935008238e+14')

  testToString(
    '-301262672059247735962.5446352061744371',
    '-3.012626720592477359625446352061744371e+20'
  )

  testToString('9798548.38', '9.79854838e+6')

  testToString('614106949056.88254499703107', '6.1410694905688254499703107e+11')

  testToString(
    '-843417433172646.11103502049784353019792165900544779976',
    '-8.4341743317264611103502049784353019792165900544779976e+14'
  )

  testToString(
    '71772998054220350.6199053786417894454778759434551',
    '7.17729980542203506199053786417894454778759434551e+16'
  )

  testToString(
    '26127.67128955864044319543855168943866783836987763512222412737570813263582',
    '2.612767128955864044319543855168943866783836987763512222412737570813263582e+4'
  )

  testToString('0.2174051275943', '2.174051275943e-1')

  testToString(
    '14819984281.646113452644795447671498797132793211504582',
    '1.4819984281646113452644795447671498797132793211504582e+10'
  )

  testToString('-6.1055742757466659414848358753699291', '-6.1055742757466659414848358753699291e+0')

  testToString('-0.00278009647645774520888672', '-2.78009647645774520888672e-3')

  testToString('-8', '-8e+0')
})
