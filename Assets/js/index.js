function addProgress() {
   lastExp = expCount;
    if(currentProgress < quests[gameProgress].progress) {
        currentProgress++        
    } else{
        expCount += quests[gameProgress].exp;
        moneyCount += quests[gameProgress].coins;
        currentProgress = 0;
        localStorage.setItem("new-quest",true)
        gameProgress++;
        if(gameProgress == 8) {
            isLastQuest = true;
        } else {
            isLastQuest = false;
        }
        if(isLastQuest) {
            document.getElementById('quest-container').classList.add('hidden');
            document.getElementById('quest-container').classList.remove('flex');
            document.getElementById('last-completed-quest').classList.remove('hidden');
            document.getElementById('last-completed-quest').classList.add('flex');
        }
    }
    save_data();
    update_html(Math.floor(expCount / maxExp) != Math.floor(lastExp / maxExp));
}
function load_html(){
    if (document.title == 'Home'){
        document.getElementById('quests-container').classList.add("no-animation");
        if(localStorage.getItem('introductionHidden')) {
            document.getElementById('introduction-text').classList.add('hidden');
            document.getElementById('introduction-text').classList.remove('flex');
        } else {
            document.getElementById('introduction-text').classList.remove('hidden');
            document.getElementById('introduction-text').classList.add('flex');
        }
        for(let load_index=0;load_index<Array.from(quests).length;load_index++){
            document.getElementsByClassName('quest-name')[load_index].innerHTML = quests[load_index].title;
            document.getElementsByClassName('quest-description')[load_index].innerHTML = quests[load_index].desc;
            document.getElementsByClassName('reward-coins')[load_index].innerHTML = '+' + quests[load_index].coins;
            document.getElementsByClassName('reward-exp')[load_index].innerHTML = '+' + quests[load_index].exp;
            document.getElementsByClassName('quest-max-progress')[load_index].innerHTML = quests[load_index].progress;
            document.getElementsByClassName('quest-body')[load_index].style.maxHeight = document.getElementsByClassName('quest-body')[load_index].scrollHeight+20+"px";
            //  gestione visiblità quest pre-animazione
            document.getElementsByClassName('quest-progress')[load_index].innerHTML = (load_index < gameProgress ) ? quests[load_index].progress : currentProgress;
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
async function update_html(levelUp = false) {
    if(document.title != 'Title Screen') {
        document.getElementById('money-amount').innerHTML = moneyCount;
        document.getElementById('exp-level').innerHTML = Math.floor(expCount / maxExp) + 1;
        document.getElementById('exp-progress').style.width = (((expCount %maxExp) / maxExp) * 100) + '%';
        if (document.title == 'Home' && gameProgress < 8) {
            document.getElementsByClassName('quest-progress')[gameProgress].innerHTML = currentProgress;
            await document.getElementById('quests-container').classList.remove("no-animation");


            // gestione animazioni
            if(localStorage.getItem("new-quest")=='true'){
                document.getElementsByClassName("quest-body")[gameProgress].classList.add('reduced');
                document.getElementsByClassName("lock-img")[0].style.opacity = 0;
                setTimeout(() => {
                    document.getElementsByClassName("quest-body")[gameProgress -1].classList.add('reduced');
                    document.getElementsByClassName("quest-container")[gameProgress].classList.remove('hidden');
                    document.getElementsByClassName("quest-container")[gameProgress].classList.remove('op0');
                    setTimeout(() => {
                        document.getElementsByClassName("locked-quest")[0].remove()
                        document.getElementsByClassName("quest-body")[gameProgress].classList.remove('reduced');
                        // document.getElementsByClassName("quest-body")[gameProgress].classList.remove('reduced');
                        // document.getElementsByClassName("lock-img")[0].classList.add('hidden');
                        localStorage.setItem("new-quest",false);
                    }, 500);
                }, 1000);
            }
            if(levelUp) {levelUp_animation();}
        }

        if(document.getElementById('money-amount').innerHTML == '1010' && !localStorage.getItem('isWidthSet')) {
            localStorage.setItem('money-container-width', parseInt(getComputedStyle(document.getElementById('money-container')).width.slice(0, -2)))
            localStorage.setItem('isWidthSet', true);
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
     maxExp = 100;
} 

function flushStorage() {
    if(document.getElementById('flush-key').value == 'reset') {
        localStorage.clear();
        document.getElementById('flush-key').value = '';
        console.log("Storage Flushed")
        window.location.href = "./index.html";
    }
}

function startGame() {
    localStorage.setItem('firstTime', false);
    window.location.href = "./home.html";
}

function setWidth() {
    if(localStorage.getItem('isWidthSet')) {
        console.log(localStorage.getItem('money-container-width'));
        document.getElementById('money-container').style.width = localStorage.getItem('money-container-width') + 'px';
    }
}

function hideIntroduction() {
    var introductionInterval = setInterval(() => {
        if(getComputedStyle(document.getElementById('introduction-text')).opacity > 0) {
            document.getElementById('introduction-text').style.opacity = getComputedStyle(document.getElementById('introduction-text')).opacity - 0.01;
        } else {
            clearInterval(introductionInterval);
                document.getElementById('introduction-text').classList.remove('flex');
                document.getElementById('introduction-text').classList.add('hidden');
        }
    }, 1);
    localStorage.setItem('introductionHidden', true);
}
function toggleQuest(element){
  
    element.parentElement.getElementsByClassName("quest-body")[0].classList.toggle('reduced');
}
var maxExp,gameProgress,currentProgress,expCount,firstTime,moneyCount;

document.addEventListener("DOMContentLoaded", function() {
    load_vars();
    if(!firstTime && document.title == 'Title Screen'){window.location.href = "./home.html";}
    load_html();
    update_html();
    display_log("post-dichiarazione-variabili")
    try {
        setWidth();
    } catch (error) {
        
    }
    
    document.body.style.visibility = "visible";
});

