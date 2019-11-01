clc;
clear;
ymelhor = [17.828192249080278,17.871077999777338,17.871077999777338,17.863805610144023,17.71522241389446,17.71522241389446,17.877210774161867,17.882610407090993,17.877210774161867,17.877210774161867,17.877210774161867,17.87110145201163,17.86235053433469,17.8782103361373,17.751895742207452,17.865064034701927,17.845761510927556,17.885233722407285,17.885233722407285,17.864512081943683,17.848342992411016,17.883674064173743,17.837279008312557,17.78118231811367,17.744056413614725,17.744056413614725,17.744056413614725,17.744056413614725,17.75643451872731,17.605460261566257,17.66963258935923,17.736907940012806,17.590862138871586,17.499394404275616,17.499394404275616,17.495340431541486,17.579141575419783,17.422727586116743,17.467461062564066,17.507406872545122,17.507406872545122,17.408301595858845,17.481537833114192,17.515454532579685,17.6377868025536,17.728526716828508,17.6377868025536,17.6377868025536,17.663064439925037,17.64278285491728,17.64278285491728,17.537017072218877,17.537017072218877,17.66757270981345,17.74022769473307,17.587657721666186,17.587657721666186,17.480941212608407,17.442617775734917,17.401207793861946,17.430658175584824,17.430658175584824,17.571502011132374,17.571502011132374,17.571502011132374,17.57658500984776,17.57658500984776,17.590293516199026,17.590293516199026,17.565813816473128,17.623996699442525,17.59281879587145,17.50118705658754,17.546672865348903,17.58468483398844,17.489494002932858,17.6004345584956,17.6004345584956,17.616616369051904,17.6004345584956,17.555392380893835,17.56785103222344,17.56785103222344,17.575570318277325,17.666346660241505,17.5290797814431,17.560079092944477,17.62576636428856,17.602047919383978,17.542774883180336,17.53486992761711,17.52693115992271,17.56258254042611,17.591322725411747,17.641664415576933,17.641664415576933,17.64837007626988,17.73447057239131,17.73447057239131,17.69532341878307];
ymedia = [10.663470611927982,11.044177512530156,11.082451980564315,11.19434277109598,11.426591893827316,11.197210204661497,11.920258929332787,11.960363518204293,12.863252395551092,14.004293138674777,14.479401628785515,14.642726408588358,15.315904476127987,15.670154340532294,16.35816449961658,16.508267815277208,16.70719581131126,16.808578933140765,16.898942809219008,17.02758985250223,17.033583680877147,17.06893546414984,17.024021395383418,17.0502890270364,17.06774967300222,17.075913671894796,17.17663303189674,17.164807429817444,17.179504755681435,17.178300084504116,17.136450255167286,17.217853261496145,17.143648289155784,17.135208887676075,17.088808545467757,17.08384894560146,17.08860710592162,17.07500258921045,17.08738687947524,17.103639943049057,17.117537556848568,17.068637839185172,17.08657131812807,17.06272617004627,17.082189295981756,17.121865186063573,17.143550559461993,17.174883983912434,17.178145630021056,17.18928005822981,17.200292423090847,17.219024646686886,17.218636148709876,17.20058015779788,17.189989758249844,17.160204075462996,17.139320369837144,17.114047430077292,17.122094335328562,17.150918845197783,17.173049160426146,17.177834632096122,17.200264561841454,17.222039755854404,17.215674775959837,17.22222105235446,17.217145194181246,17.20625624426877,17.21602710058235,17.20528993810872,17.23537183885904,17.234130292173983,17.23776189010748,17.275229088177138,17.278552612606425,17.25376199581043,17.272278427715236,17.2585808677262,17.276401752560222,17.290663854640812,17.28879338210612,17.295658959804342,17.295398518562678,17.293171535873093,17.28615121099936,17.287553488194757,17.27612714698483,17.29050858292055,17.28751188619106,17.278421974159752,17.267075351071107,17.25163510742467,17.269759888518482,17.28052573029695,17.286355859001336,17.290090442412176,17.2799416943813,17.269573393506533,17.26846519734432,17.25478491924986];
ypior = [5.415356334347394,5.560379704379265,4.324305236063053,4.430919566897071,5.303212917237868,5.303212917237868,5.097218625335908,3.9183890869439235,5.459287534429789,4.052087365294302,4.132542805011402,4.9279399379076745,3.921314987898235,4.162650019802691,9.792109475190546,10.6330948137502,12.121493991025776,13.736160425036049,14.664858904324884,14.664858904324884,14.664858904324884,15.800748421078483,15.920797348533604,16.011969270962076,16.371298797551756,16.31536838714604,16.443828456867298,16.439243612437394,16.288748739104584,16.288748739104584,16.288748739104584,16.542653868456984,16.542653868456984,16.78415706316007,16.606171838858394,16.197192212562996,16.58604708380293,16.673283204960484,16.48349627923985,16.490515551344032,16.490515551344032,16.43186523671238,16.490515551344032,16.490515551344032,16.55548644152826,16.46186200900486,16.108599771019946,16.582069681347388,16.582069681347388,16.822754697135853,16.767437488818686,16.56022769661519,16.56022769661519,16.56022769661519,16.56022769661519,16.651350414642756,16.634329563029404,16.593565284592007,16.512896599237028,16.512896599237028,16.512896599237028,16.74416365870818,16.62237106499585,16.763102936495343,16.890790548852753,16.890790548852753,16.846129939708163,16.880067812696936,16.880067812696936,16.6663285287474,16.927390254355366,16.931124175732158,16.80195484788894,16.990189733103374,16.917447214099365,17.011795651531617,17.044672195912366,16.919458639403338,17.022283964263334,17.044065954716864,17.06313102947906,17.024164590733648,16.710028293560132,16.803959861805634,16.803959861805634,16.895513503586326,16.895513503586326,16.9450005662495,17.025000567791157,16.854767765712676,16.9265368700397,16.885837507582625,16.326337169822978,16.326337169822978,16.614129209034044,16.836005879525594,16.836005879525594,16.836005879525594,16.344389046780428,15.994963914362408];
xdata = [1:1:100];
plot(xdata,ypior);
hold on;
plot(xdata,ymedia);
hold on;
plot(xdata,ymelhor);
hold on;