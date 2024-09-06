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

async function update_html(levelUp = false) {
    if(document.title != 'Title Screen') {
        if (document.title == 'Home' && gameProgress < 8) {
            if(localStorage.getItem("new-quest")=='true'){
                await hide_quest_animation(gameProgress);
            }
            if(localStorage.getItem('introductionHidden')) {
                document.getElementById('introduction-text').classList.add('hidden');
                document.getElementById('introduction-text').classList.remove('flex');
            } else {
                document.getElementById('introduction-text').classList.remove('hidden');
                document.getElementById('introduction-text').classList.add('flex');
            }
            //aggiornamento contenuto
            for(let load_index=0;load_index<Array.from(quests).length;load_index++){
                document.getElementsByClassName('quest-name')[load_index].innerHTML = quests[load_index].title;
                document.getElementsByClassName('quest-description')[load_index].innerHTML = quests[load_index].desc;
                document.getElementsByClassName('reward-coins')[load_index].innerHTML = '+' + quests[load_index].coins;
                document.getElementsByClassName('reward-exp')[load_index].innerHTML = '+' + quests[load_index].exp;
                document.getElementsByClassName('quest-max-progress')[load_index].innerHTML = quests[load_index].progress;
                document.getElementsByClassName('quest-progress')[load_index].innerHTML = (load_index < gameProgress ) ? quests[load_index].progress : currentProgress;
            }
            // aggiornamento visualizzazione html
            Array.from(document.getElementsByClassName('quest-container')).forEach((element, index, arr) => {
                if(index < gameProgress ) {
                    document.getElementsByClassName('quest-body')[index].classList.add("reduced")
                }else if(index == gameProgress){

                    if(localStorage.getItem("new-quest")=='true'){
                        document.getElementsByClassName('quest-body')[index - 1].classList.add('reduced')
                        show_quest_animation(gameProgress+1);
                        localStorage.setItem("new-quest",false);
                    }
                    document.getElementsByClassName('quest-container')[index].classList.remove('hidden');
                    document.getElementById("locked-quests-container").innerHTML = ""
                }else{
                    document.getElementsByClassName('quest-container')[index].classList.add('hidden');
                    document.getElementsByClassName('quest-container')[index].classList.remove('flex');
                    document.getElementById("locked-quests-container").innerHTML+= lock_quest_html;
                }
            });
            
            if(gameCompleted) {
                document.getElementById('quest-container').classList.add('hidden');
                document.getElementById('quest-container').classList.remove('flex');
                document.getElementById('last-completed-quest').classList.remove('hidden');
                document.getElementById('last-completed-quest').classList.add('flex');
            }
 
        }
        if(levelUp) {
            levelUp_animation()
        }
        document.getElementById('money-amount').innerHTML = moneyCount;
        document.getElementById('exp-level').innerHTML = Math.floor(expCount / maxExp) + 1;
        document.getElementById('exp-progress').style.width = (((expCount %maxExp) / maxExp) * 100) + '%';
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

function showIntroduction() {
    if(document.title == 'Home') {

    }
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

var maxExp,gameProgress,currentProgress,expCount,firstTime,moneyCount;

document.addEventListener("DOMContentLoaded", function() {
    load_vars()
    if(!firstTime){window.location.href = "./home.html";}
    display_log("post-dichiarazione-variabili")
    update_html();
    try {
        setWidth();
    } catch (error) {
        
    }
    showIntroduction();
    document.body.style.visibility = "visible";
});

