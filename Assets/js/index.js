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
    if(document.title=="Shop"){
        isFirstPurchased = localStorage.getItem('item1Purchased?');
        isSecondPurchased = localStorage.getItem('item2Purchased?');
        isThirdPurchased = localStorage.getItem('item3Purchased?');
        isFourthPurchased = localStorage.getItem('item4Purchased?');
        if(isFirstPurchased) {
            firstItemSlot = localStorage.getItem('firstItemSlot');
            document.getElementById('first-item-image').style.opacity = 0.25;
            document.getElementById('first-item-coin-icon').classList.add('hidden');
            document.getElementById('first-item-price').innerHTML = 'Sold';
            document.getElementById('first-item-price').style.opacity = 0.25;
            document.getElementById(`inventory-slot-${firstItemSlot}`).classList.remove('hidden-item');
            document.querySelector(`#inventory-slot-${firstItemSlot} img`).src = 'Assets/img/icons/forchetta.png';
        }
        if(isSecondPurchased) {
            secondItemSlot = localStorage.getItem('secondItemSlot');
            document.getElementById('second-item-image').style.opacity = 0.25;
            document.getElementById('second-item-coin-icon').classList.add('hidden');
            document.getElementById('second-item-price').innerHTML = 'Sold';
            document.getElementById('second-item-price').style.opacity = 0.25;
            document.getElementById(`inventory-slot-${secondItemSlot}`).classList.remove('hidden-item');
            document.querySelector(`#inventory-slot-${secondItemSlot} img`).src = 'Assets/img/icons/sasso.png';
        }
        if(isThirdPurchased) {
            thirdItemSlot = localStorage.getItem('thirdItemSlot');
            document.getElementById('third-item-image').style.opacity = 0.25;
            document.getElementById('third-item-coin-icon').classList.add('hidden');
            document.getElementById('third-item-price').innerHTML = 'Sold';
            document.getElementById('third-item-price').style.opacity = 0.25;
            document.getElementById(`inventory-slot-${thirdItemSlot}`).classList.remove('hidden-item');
            document.querySelector(`#inventory-slot-${thirdItemSlot} img`).src = 'Assets/img/icons/old-coin.png';
        }
        if(isFourthPurchased) {
            fourthItemSlot = localStorage.getItem('fourthItemSlot');
            document.getElementById('fourth-item-image').style.opacity = 0.25;
            document.getElementById('fourth-item-coin-icon').classList.add('hidden');
            document.getElementById('fourth-item-price').innerHTML = 'Sold';
            document.getElementById('fourth-item-price').style.opacity = 0.25;
            document.getElementById(`inventory-slot-${fourthItemSlot}`).classList.remove('hidden-item');
            document.querySelector(`#inventory-slot-${fourthItemSlot} img`).src = 'Assets/img/icons/mochi.png';
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
     moneyCount = isNaN(parseInt(localStorage.getItem('moneyCount')))  ?  100 : parseInt(localStorage.getItem('moneyCount'));
     firstTime = localStorage.getItem('firstTime') || true;
     gameCompleted = localStorage.getItem('gameCompleted') || false;
     unlocked_npcs = parseInt(localStorage.getItem('unlocked_npcs')) ||2;
     try{
        shop_acquired = localStorage.getItem("shop_acquired").split(",");
     }catch{
        shop_acquired = [0,0,0,0,0,0];
     } 
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

function purchasePopup(itemNo, itemName) {
    save_data();
    expLevel = parseInt(document.getElementById('exp-level').innerHTML);
    switch(itemNo) {
        case 1:
            if(!localStorage.getItem('item1Purchased?')) {
                document.getElementById('purchase').classList.remove('hidden');
                setTimeout(() => {
                    document.getElementById('purchase').classList.remove('op0')
                }, 10);
                opened_item = itemNo-1;
                console.log('selected item no.1');
                document.getElementById('purchasable-item-name').innerHTML = 'Forchetta della Danza Irresistibile';
                document.getElementById('purchasable-item-description').innerHTML = 'Questa forchetta di argento, decorata con rune intricate, emana una magia caotica. Chiunque venga colpito dalle sue punte è costretto a ballare freneticamente per un minuto, incapace di fermarsi. La danza varia tra movimenti caotici e graziose piroette, a seconda della vittima.';
                document.getElementById('purchasable-item-image').src = 'Assets/img/icons/' + itemName + '.png'
                localStorage.setItem('selectedPurchasable', 1);
            }
            break;
        case 2:
            if(!localStorage.getItem('item2Purchased?')) {
                document.getElementById('purchase').classList.remove('hidden');
                setTimeout(() => {
                    document.getElementById('purchase').classList.remove('op0')
                }, 10);
                opened_item = itemNo-1;
                console.log('selected item no.2');
                document.getElementById('purchasable-item-name').innerHTML = 'Sasso del Potere';
                document.getElementById('purchasable-item-description').innerHTML = 'Questo ciottolo bianco ha una abilità unica: dopo aver rivelato la tua mano in una partita di carta, forbice, sasso, trasforma magicamente la tua scelta in sasso. Discreto e rapido, offre un vantaggio sorprendente, confondendo gli avversari.';
                document.getElementById('purchasable-item-image').src = 'Assets/img/icons/' + itemName + '.png'
                localStorage.setItem('selectedPurchasable', 2);
                if(moneyCount < 50) {
                    document.querySelector('.purchase-button').style.backgroundColor = '#808080';
                    document.querySelector('.purchase-button h1').innerHTML = 'Fondi Insufficienti!'
                }
                if(expLevel < 2) {
                    document.querySelector('.purchase-button').style.backgroundColor = '#808080';
                    document.querySelector('.purchase-button h1').innerHTML = 'Livello troppo Basso!'
                }
            }
            break;
        case 3:
            if(!localStorage.getItem('item3Purchased?')) {
                document.getElementById('purchase').classList.remove('hidden');
                setTimeout(() => {
                    document.getElementById('purchase').classList.remove('op0')
                }, 10);
                opened_item = itemNo-1;
                console.log('selected item no.3');
                document.getElementById('purchasable-item-name').innerHTML = 'Moneta del Destino';
                document.getElementById('purchasable-item-description').innerHTML = 'La Moneta del Destino offre un potere semplice ma straordinario: dichiarando "testa" o "croce" e lanciandola, se indovini, acquisisci immediatamente la risposta a una domanda. Tuttavia, fallire ti lascerà nel dubbio fino a quando non scoprirai la verità da solo.';
                document.getElementById('purchasable-item-image').src = 'Assets/img/icons/' + itemName + '.png'
                localStorage.setItem('selectedPurchasable', 3);
                if(moneyCount < 200) {
                    document.querySelector('.purchase-button').style.backgroundColor = '#808080';
                    document.querySelector('.purchase-button h1').innerHTML = 'Fondi Insufficienti!'
                }
                if(expLevel < 3) {
                    document.querySelector('.purchase-button').style.backgroundColor = '#808080';
                    document.querySelector('.purchase-button h1').innerHTML = 'Livello troppo Basso!'
                }
            }
            break;
        case 4:
            if(!localStorage.getItem('item4Purchased?')) {
                document.getElementById('purchase').classList.remove('hidden');
                setTimeout(() => {
                    document.getElementById('purchase').classList.remove('op0')
                }, 10);
                opened_item = itemNo-1;
                console.log('selected item no.4');
                document.getElementById('purchasable-item-name').innerHTML = 'Mochi della Saggezza';
                document.getElementById('purchasable-item-description').innerHTML = 'Questo mochi pare davvero prelibato.';
                document.getElementById('purchasable-item-image').src = 'Assets/img/icons/' + itemName + '.png'
                localStorage.setItem('selectedPurchasable', 4);
                if(moneyCount < 50) {
                    document.querySelector('.purchase-button').style.backgroundColor = '#808080';
                    document.querySelector('.purchase-button h1').innerHTML = 'Fondi Insufficienti!'
                }
                if(expLevel < 4) {
                    document.querySelector('.purchase-button').style.backgroundColor = '#808080';
                    document.querySelector('.purchase-button h1').innerHTML = 'Livello troppo Basso!'
                }
            }
            break;
    }
}

function purchaseItem() {
    if(getComputedStyle(document.querySelector('.purchase-button')) != '#808080') {
        selectedPurchasable = localStorage.getItem('selectedPurchasable');
        expLevel =  parseInt(document.getElementById('exp-level').innerHTML);
        console.log(selectedPurchasable, expLevel);
            if (selectedPurchasable == 1) {
                if(moneyCount >= 100 && expLevel >= 1) {
                    document.getElementById('purchase').classList.add('op0');
                    setTimeout(()=>{
                        document.getElementById('purchase').classList.add('hidden');
                    },1000);
                    localStorage.setItem('item1Purchased?', true);
                    moneyCount -= 100;
                }
                document.getElementById('first-item-image').style.opacity = 0.25;
                document.getElementById('first-item-coin-icon').classList.add('hidden');
                document.getElementById('first-item-price').innerHTML = 'Sold';
                document.getElementById('first-item-price').style.opacity = 0.25;
                for (let i = 1; i <= 4; i++) {
                    const slot = document.querySelector(`#inventory-slot-${i} img`);
                    if(slot.getAttribute('src') === 'Assets/img/null.png') {
                        document.getElementById(`inventory-slot-${i}`).classList.remove('hidden-item');
                        document.querySelector(`#inventory-slot-${i} img`).src = 'Assets/img/icons/forchetta.png';
                        localStorage.setItem('firstItemSlot', i);
                        break;
                    }
                }
                save_data();
                update_html();
            } else if (selectedPurchasable == 2) {
                if(moneyCount >= 50 && expLevel >= 2) {
                    document.getElementById('purchase').classList.add('op0');
                    setTimeout(()=>{
                        document.getElementById('purchase').classList.add('hidden');
                    },1000);
                    localStorage.setItem('item2Purchased?', true);
                    moneyCount -= 50;
                }
                document.getElementById('second-item-image').style.opacity = 0.25;
                document.getElementById('second-item-coin-icon').classList.add('hidden');
                document.getElementById('second-item-price').innerHTML = 'Sold';
                document.getElementById('second-item-price').style.opacity = 0.25;
                for (let i = 1; i <= 4; i++) {
                    const slot = document.querySelector(`#inventory-slot-${i} img`);
                    if(slot.getAttribute('src') === 'Assets/img/null.png') {
                        document.getElementById(`inventory-slot-${i}`).classList.remove('hidden-item');
                        document.querySelector(`#inventory-slot-${i} img`).src = 'Assets/img/icons/sasso.png';
                        localStorage.setItem('secondItemSlot', i);
                        break;
                    }
                }
                save_data();
                update_html();
            } else if (selectedPurchasable == 3) {
                if(moneyCount >= 200 && expLevel >= 3) {
                    document.getElementById('purchase').classList.add('op0');
                    setTimeout(()=>{
                        document.getElementById('purchase').classList.add('hidden');
                    },1000);
                    localStorage.setItem('item3Purchased?', true);
                    moneyCount -= 200;
                }
                document.getElementById('third-item-image').style.opacity = 0.25;
                document.getElementById('third-item-coin-icon').classList.add('hidden');
                document.getElementById('third-item-price').innerHTML = 'Sold';
                document.getElementById('third-item-price').style.opacity = 0.25;
                for (let i = 1; i <= 4; i++) {
                    const slot = document.querySelector(`#inventory-slot-${i} img`);
                    if(slot.getAttribute('src') === 'Assets/img/null.png') {
                        document.getElementById(`inventory-slot-${i}`).classList.remove('hidden-item');
                        document.querySelector(`#inventory-slot-${i} img`).src = 'Assets/img/icons/sasso.png';
                        localStorage.setItem('thirdItemSlot', i);
                        break;
                    }
                }
                save_data();
                update_html();
            } else if (selectedPurchasable == 4) {
                if(moneyCount >= 50 && expLevel >= 4) {
                    document.getElementById('purchase').classList.add('op0');
                    setTimeout(()=>{
                        document.getElementById('purchase').classList.add('hidden');
                    },1000);
                    localStorage.setItem('item4Purchased?', true);
                    moneyCount -= 50;
                }
                document.getElementById('fourth-item-image').style.opacity = 0.25;
                document.getElementById('fourth-item-coin-icon').classList.add('hidden');
                document.getElementById('fourth-item-price').innerHTML = 'Sold';
                document.getElementById('fourth-item-price').style.opacity = 0.25;
                for (let i = 1; i <= 4; i++) {
                    const slot = document.querySelector(`#inventory-slot-${i} img`);
                    if(slot.getAttribute('src') === 'Assets/img/null.png') {
                        document.getElementById(`inventory-slot-${i}`).classList.remove('hidden-item');
                        document.querySelector(`#inventory-slot-${i} img`).src = 'Assets/img/icons/sasso.png';
                        localStorage.setItem('fourthItemSlot', i);
                        break;
                    }
                }
                save_data();
                update_html();
            }
    }
}

function showItem(slot) {
    let itemImageName = document.querySelector(`#inventory-slot-${slot} img`).src;
    let itemImageNameSubstr = itemImageName.substr(itemImageName.length - 5);
    if(itemImageNameSubstr != 'l.png') {
        document.getElementById('item-description').classList.remove('hidden');
        setTimeout(() => {
            document.getElementById('item-description').classList.remove('op0')
        }, 10);
        document.querySelector('.item-description-popup img').src = document.querySelector(`#inventory-slot-${slot} img`).src;
        if(itemImageNameSubstr == 'a.png') {
            document.querySelector('.item-description-popup h1').innerHTML = 'Forchetta della Danza Irresistibile ';
            document.querySelector('.item-description-popup p').innerHTML = 'Questa forchetta di argento, decorata con rune intricate, emana una magia caotica. Chiunque venga colpito dalle sue punte è costretto a ballare freneticamente per un minuto, incapace di fermarsi. La danza varia tra movimenti caotici e graziose piroette, a seconda della vittima.';
        } else if(itemImageNameSubstr == 'o.png') {
            document.querySelector('.item-description-popup h1').innerHTML = 'Sasso del Potere';
            document.querySelector('.item-description-popup p').innerHTML = 'Questo ciottolo bianco ha una abilità unica: dopo aver rivelato la tua mano in una partita di carta, forbice, sasso, trasforma magicamente la tua scelta in sasso. Discreto e rapido, offre un vantaggio sorprendente, confondendo gli avversari.';
        } else if(itemImageNameSubstr == 'n.png') {
            document.querySelector('.item-description-popup h1').innerHTML = 'Moneta del Destino';
            document.querySelector('.item-description-popup p').innerHTML = 'La Moneta del Destino offre un potere semplice ma straordinario: dichiarando "testa" o "croce" e lanciandola, se indovini, acquisisci immediatamente la risposta a una domanda. Tuttavia, fallire ti lascerà nel dubbio fino a quando non scoprirai la verità da solo.';
        } else if(itemImageNameSubstr == 'i.png') {
            document.querySelector('.item-description-popup h1').innerHTML = 'Mochi della Saggezza';
            document.querySelector('.item-description-popup p').innerHTML = 'Questo mochi pare davvero prelibato.';
        };
    };
}

document.addEventListener("DOMContentLoaded", function() {
    load_vars();
    load_html();
    update_html();
    document.body.style.visibility = "visible";
});