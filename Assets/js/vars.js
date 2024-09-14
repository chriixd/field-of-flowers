    var maxExp,gameProgress,currentProgress,expCount,firstTime,moneyCount,npc_counter,unlocked_npcs,shop_acquired,opened_item;
    var shop_acquired = [0,0,0,0,0,0];
    const progress_bars = [50,89,52,46,26,89,21,19,78];
    const npc_levels = [3,5,7,12,10,20,30,100,50];
    const quests = [
      {
        "title": "Un Inizio Improbabile",
        "desc": "Per iniziare dovrai dirigerti laddove normalmente andresti per procurarti del cibo per il tuo fidato compagno Zagor e lì troverai i primi alleati… o che siano solamente dei farabutti ?",
        "exp": 50,
        "coins": 50,
        "progress": [{code:"sam",task:"Chi è il primo farabutto che incontri ?"}],
        "unlock_npc": 0
      },
      {
        "title": "Il Viandante Solitario",
        "desc": "Come già ti è stato rivelato da questo solitario viandante, tra i numerosi scaffali di questo luogo si nasconde un oggetto che raffigura una particolare creatura. Trovalo poiché in questo animale si cela una verità nascosta che il vagabondo sta cercando.",
        "exp": 50,
        "coins": 75,
        "progress": [{code:"Topo",task:"qual è la creatura misteriosa ?"}],
        "unlock_npc": 1
      },
      {
        "title": "Laddove Tutto Poteva Iniziare",
        "desc": "Come molti sanno, tu, Giulia, sei oggi una delle più formidabili Guardiane delle Ferrovie, con una forza ineguagliabile e una volontà straordinaria. Ma non è sempre stato così. Il tuo passato ha forgiato il tuo presente. Ora dovrai dirigerti verso il luogo in cui saresti potuta finire, se non avessi scelto il cammino delle Ferrovie.Una semplice pietra potrebbe rivelarsi preziosa.",
        "exp": 75,
        "coins": 50,
        "progress": [{code:"la piadineria",task:"Qual è questo luogo ?"}],
        "unlock_npc": 0
      },
      {
        "title": "Origine della Simmetria",
        "desc": "I due antichi bardi custodiscono i segreti per riportare in vita il defunto re. Tuttavia, prima di svelarli, dovrai affrontare e superare le loro prove, dimostrando la tua conoscenza e saggezza.",
        "exp": 75,
        "coins": 75,
        "progress": [{code:"plug in baby",task:"qual è il nome del brano ?"},{code:"californication",task:"qual è il nome del brano ?"},{code:"my own summer",task:"qual è il nome del brano ?"}],
        "unlock_npc": 2
      },
      {
        "title": "Il Grande Mercato",
        "desc": "<i>Sono un crocevia di mille sapori,<br />tra gli scaffali puoi vagabondare,<br />frutta, pane e mille colori,<br />qui vieni per tutto ciò che vuoi cucinare.</i>",
        "exp": 50,
        "coins": 50,
        "progress": [{code:"Carrefour",task:"Qual é il nome di questo luogo ancora inesplorato"}],
        "unlock_npc": 0
      },
      {
        "title": "Il Re Ormai Scomparso",
        "desc": "<i>La sua anima un tempo infiammata,<br />Ora in silenzio è incatenata.<br />Nel cuore di un oggetto antico,Riposano fiamme di un vecchio amico.</br>Non più calore, non più tormento,<br /> Solo un ricordo nel freddo vento. <br />La sua anima, che tanto ha lottato,<br />Ora riposa, finalmente calmato.<br /></i>In questo luogo, tra le varie corsie, si nasconde un oggetto capace di estinguere persino la fiamma più feroce. La sua superficie cremisi porta inciso un antico numero, il quale, se pronunciato secondo il rituale corretto, farà risorgere il Re defunto.",
        "exp": 25,
        "coins": 100,
        "progress": [{code:"004",task:"Qual é l'antico numero necessario per riportare in vita il Re ?"}],
        "unlock_npc": 2
      },
      {
        "title": "La Prova del Re",
        "desc": "Davanti al Re devi dimostrare la tua arguzia, potrai usare ogni cosa che hai raccolto fino ad ora a tuo vantaggio.",
        "exp": 100,
        "coins": 1000,
        "progress": [{code:"mango",task:"Qui si cela un luogo nascosto, il cui nome richiama un dolce frutto."},{code:"Bottega del Caffè e Bottega & Natura",task:"Sono due, una appartiene al Regno del Caffè, l'altra è fianco a fianco con la Natura"},{code:"trony",task:"Qual è la bottega senza pari, così unica che non ha eguali? Che brilla come una stella nel cielo, senza paragoni tra tutte le meraviglie."},{code:"PittaRosso",task:"È di un rosso intenso, ma non è il frutto del campo; ciò che cerchi è avvolto nel mistero e non è un semplice pomodoro."},{code:"GrandVision",task:"Per guidare con saggezza, un Re deve possedere grandi visioni del futuro; qui si cela un luogo che svela tali visioni a chiunque le cerchi"}],
        "unlock_npc": 2
      }
    ]

const lock_quest_html ='<div class="quest locked-quest container flex">\n<img class="lock-img" src="Assets/img/icons/lock.png" alt="">\n </div>'


/* backup quest di Nick & Sam:
Come già ti è stato rivelato da questi due viandanti, tra i numerosi scaffali di questo luogo si nasconde un oggetto speciale. Trovalo e non scordarti il suo prezzo, poiché in quel numero si cela una verità nascosta che la coppia di vagabondi sta cercando. "
*/