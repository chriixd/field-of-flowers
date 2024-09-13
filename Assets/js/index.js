function addProgress() {
   lastExp = expCount;
   currentProgress++;
    if(currentProgress < quests[gameProgress].progress.length  ) {
        return{levelup : false , end:gameProgress == quests.length }
    }else{
        expCount += quests[gameProgress].exp;
        moneyCount += quests[gameProgress].coins;
        unlocked_npcs+= quests[gameProgress].unlock_npc;
        currentProgress = 0;
        localStorage.setItem("new-quest",true)
        gameProgress++;
    }
    return {levelup : Math.floor(expCount/maxExp) != Math.floor((lastExp/maxExp)),end:gameProgress == quests.length }
}

function load_html(){
    if(firstTime=='false' && document.title == 'Title Screen'){
        window.location.href = "./home.html";
    }
    if(document.title =="Party"){
        document.querySelectorAll(".party-element").forEach((element,index,arr)=>{
            if(index < unlocked_npcs){
                document.querySelectorAll(".party-element")[index].classList.remove("hidden");
                document.querySelectorAll(".party-level-bar-progress")[index].style.width = progress_bars[index]+"%";
                document.querySelectorAll(".party-level")[index].querySelector("p").innerHTML = npc_levels[index];
            }
        });
    }
    if (document.title == 'Home'){

        document.getElementById('quests-container').classList.add("no-animation");
        for(let load_index=0;load_index<Array.from(quests).length;load_index++){
            document.getElementsByClassName('quest-name')[load_index].innerHTML = quests[load_index].title;
            document.getElementsByClassName('quest-description')[load_index].innerHTML = quests[load_index].desc;
            document.getElementsByClassName('reward-coins')[load_index].innerHTML = '+' + quests[load_index].coins;
            document.getElementsByClassName('reward-exp')[load_index].innerHTML = '+' + quests[load_index].exp;
            document.getElementsByClassName('quest-max-progress')[load_index].innerHTML = quests[load_index].progress.length;
            setTimeout(() => {
                document.getElementsByClassName('quest-body')[load_index].style.maxHeight = document.getElementsByClassName('quest-body')[load_index].scrollHeight+"px";
            }, 200);
            //  gestione visiblità quest pre-animazione
            document.getElementsByClassName('quest-progress')[load_index].innerHTML = (load_index < gameProgress ) ? quests[load_index].progress.length : currentProgress;
            if(load_index < gameProgress){
                document.getElementsByClassName('quest-body')[load_index].classList.add("completed");
                document.getElementsByClassName('quest-body')[load_index].classList.add("reduced");
            }else if(load_index == gameProgress){
                document.getElementById("locked-quests-container").innerHTML="";

            }else{
                document.getElementsByClassName('quest-container')[load_index].classList.add('hidden');
                document.getElementsByClassName('quest-container')[load_index].classList.add('op0');
                document.getElementById("locked-quests-container").innerHTML+= lock_quest_html;
            }
        }
}
    
}
async function update_html(levelUp = false,end = false) {
    if(document.title != 'Title Screen') {
        document.getElementById('money-amount').innerHTML = moneyCount;
        document.getElementById('exp-level').innerHTML = Math.floor(expCount / maxExp) + 1;
        document.getElementById('exp-progress').style.width = (((expCount %maxExp) / maxExp) * 100) + '%';
        if (document.title == 'Home' && gameProgress < quests.length) {
            if(currentProgress == 0 && gameProgress > 0){
                document.getElementsByClassName('quest-progress')[gameProgress-1].innerHTML = quests[gameProgress-1].progress.length; 
            }
            document.getElementsByClassName('quest-progress')[gameProgress].innerHTML = currentProgress;
            await document.getElementById('quests-container').classList.remove("no-animation");

            if(end){
                    
            }

            // gestione animazioni
            
        if(localStorage.getItem('introduction')=='true') {

            document.getElementById('introduction-text').classList.remove('op0');
            document.getElementById('introduction-text').classList.add("background-blur");
            localStorage.setItem('introduction',false)
        } else {
            document.getElementById('introduction-text').classList.add('op0');
            document.getElementById('introduction-text').classList.remove("background-blur");
            setTimeout(()=>{
                document.getElementById('introduction-text').classList.add('hidden');
            },1000);
        }
            if(localStorage.getItem("new-quest")=='true'){
                completed_quest_animation(gameProgress);
            }
            if(levelUp) {levelUp_animation();}
        }
    }

}

function save_data(){
    if(gameProgress < 8) {
        localStorage.setItem('gameProgress', gameProgress);
    } else {
        localStorage.setItem('gameProgress', 7);
        gameCompleted = true;
        localStorage.setItem('gameCompleted', gameCompleted);
        console.log("max reached", gameCompleted)
    }
    localStorage.setItem('expCount', expCount);
    localStorage.setItem('moneyCount', moneyCount);
    localStorage.setItem('quest-progress', currentProgress);
    localStorage.setItem('unlocked_npcs',unlocked_npcs);
    localStorage.setItem('shop_acquired',shop_acquired);
}

function display_log(when){
    console.log(when)
    console.log("gameProgress : " + localStorage.getItem('gameProgress'));
    console.log(expCount);
    console.log("gameProgress : " + gameProgress);
    console.log(gameCompleted);
}

function load_vars(){
     gameProgress = parseInt(localStorage.getItem('gameProgress'))  || 0;
     currentProgress = parseInt(localStorage.getItem('quest-progress'))  || 0;
     expCount = parseInt(localStorage.getItem('expCount')) || 0;
     moneyCount = parseInt(localStorage.getItem('moneyCount')) || 100;
     firstTime = localStorage.getItem('firstTime') || true;
     gameCompleted = localStorage.getItem('gameCompleted') || false;
     unlocked_npcs = parseInt(localStorage.getItem('unlocked_npcs')) ||2;
     shop_acquired = localStorage.getItem("shop_acquired") || [0,0,0,0,0,0];
     maxExp = 100;
} 

function flushStorage() {
    if(document.getElementById('flush-key').value == 'reset') {
        localStorage.clear();
        document.getElementById('flush-key').value = '';
        window.location.href = "./index.html";
    }
}

function startGame() {
    localStorage.setItem('introduction',true);
    localStorage.setItem('firstTime', false);
    document.querySelector("#title-page-body").style.opacity = 0;
    setTimeout(()=>{
        window.location.href = "./home.html";
    },2000);
}

function quitPurchase() {
    document.getElementById('purchase').classList.remove('flex');
    document.getElementById('purchase').classList.add('hidden');
}

function purchasePopup(itemNo, itemName) {
    switch(itemNo) {
        case 1:
            console.log('selected item no.1');
            document.getElementById('purchase').classList.remove('hidden');
            document.getElementById('purchase').classList.add('flex');
            document.getElementById('purchasable-item-name').innerHTML = 'Forchetta della Danza Irresistibile';
            document.getElementById('purchasable-item-description').innerHTML = 'Questa forchetta di argento, decorata con rune intricate, emana una magia caotica. Chiunque venga colpito dalle sue punte è costretto a ballare freneticamente per un minuto, incapace di fermarsi. La danza varia tra movimenti caotici e graziose piroette, a seconda della vittima.';
            document.getElementById('purchasable-item-image').src = 'Assets/img/icons/' + itemName + '.png'
            break;
        case 2:
            console.log('selected item no.2');
            document.getElementById('purchase').classList.remove('hidden');
            document.getElementById('purchase').classList.add('flex');
            document.getElementById('purchasable-item-name').innerHTML = 'Sasso del Potere';
            document.getElementById('purchasable-item-description').innerHTML = 'Questo ciottolo bianco ha una abilità unica: dopo aver rivelato la tua mano in una partita di carta, forbice, sasso, trasforma magicamente la tua scelta in sasso. Discreto e rapido, offre un vantaggio sorprendente, confondendo gli avversari.';
            document.getElementById('purchasable-item-image').src = 'Assets/img/icons/' + itemName + '.png'
            break;
        case 3:
            console.log('selected item no.3');
            document.getElementById('purchase').classList.remove('hidden');
            document.getElementById('purchase').classList.add('flex');
            document.getElementById('purchasable-item-name').innerHTML = 'Moneta del Destino';
            document.getElementById('purchasable-item-description').innerHTML = 'La Moneta del Destino offre un potere semplice ma straordinario: dichiarando "testa" o "croce" e lanciandola, se indovini, acquisisci immediatamente la risposta a una domanda. Tuttavia, fallire ti lascerà nel dubbio fino a quando non scoprirai la verità da solo.';
                        document.getElementById('purchasable-item-image').src = 'Assets/img/icons/' + itemName + '.png'
            break;
        case 4:
            console.log('selected item no.4');
            document.getElementById('purchase').classList.remove('hidden');
            document.getElementById('purchase').classList.add('flex');
            document.getElementById('purchasable-item-name').innerHTML = 'Mochi della Saggezza';
            document.getElementById('purchasable-item-description').innerHTML = 'Questo mochi pare davvero prelibato.';
                        document.getElementById('purchasable-item-image').src = 'Assets/img/icons/' + itemName + '.png'
            break;
    }
}

document.addEventListener("DOMContentLoaded", function() {
    load_vars();
    load_html();
    update_html();
    document.body.style.visibility = "visible";
});