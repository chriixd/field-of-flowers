function addProgress() {
   lastExp = expCount;
    if(currentProgress < quests[gameProgress].progress) {
        currentProgress++        
    } else{
        expCount += quests[gameProgress].exp;
        moneyCount += quests[gameProgress].coins;
        currentProgress = 0;
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

function update_html(levelUp = false) {
    if(document.title != 'Title Screen') {
        if (document.title == 'Home' && gameProgress < 8) {
                document.getElementById('quest-name').innerHTML = quests[gameProgress].title;
                document.getElementById('quest-description').innerHTML = quests[gameProgress].desc;
                document.getElementById('reward-coins').innerHTML = '+' + quests[gameProgress].coins;
                document.getElementById('reward-exp').innerHTML = '+' + quests[gameProgress].exp;
                document.getElementById('quest-max-progress').innerHTML = quests[gameProgress].progress;
                document.getElementById('quest-progress').innerHTML = currentProgress;
            Array.from(document.getElementsByClassName('completed-quest')).forEach((element, index, arr) => {
                if(index < gameProgress ) {
                    document.getElementsByClassName('completed-quest')[index].classList.add('flex');
                    document.getElementsByClassName('completed-quest')[index].classList.remove('hidden');
                    document.getElementsByClassName('completed-quest')[index].getElementsByTagName('h1')[0].textContent = quests[index].title;
                }
            });
            Array.from(document.getElementsByClassName('locked-quest')).forEach((element, index, arr) => {
                if (index < gameProgress) {
                    document.getElementsByClassName('locked-quest')[index].classList.remove('flex');
                    document.getElementsByClassName('locked-quest')[index].classList.add('hidden');
                }
            });
        }
        if(levelUp) {
            document.getElementById('level-up-section').classList.add('flex');
            document.getElementById('level-up-section').classList.remove('hidden');
            document.getElementById('level-up-animation').play();
            setTimeout(() => {
                document.getElementById('level-up-section').classList.remove('flex');
                document.getElementById('level-up-section').classList.add('hidden');
            }, 2812);
        }
        document.getElementById('money-amount').innerHTML = moneyCount;
        document.getElementById('exp-level').innerHTML = Math.floor(expCount / maxExp) + 1;
        document.getElementById('exp-progress').style.width = (((expCount %maxExp) / maxExp) * 100) + '%';
        if(gameCompleted) {
            document.getElementById('quest-container').classList.add('hidden');
            document.getElementById('quest-container').classList.remove('flex');
            document.getElementById('last-completed-quest').classList.remove('hidden');
            document.getElementById('last-completed-quest').classList.add('flex');
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
    if(document.getElementById('flush-key').value == 'peneduro') {
        localStorage.clear();
        document.getElementById('flush-key').value = '';
        console.log("Storage Flushed")
        window.location.href = "index.html";
    }
}

function startGame() {
    localStorage.setItem('firstTime', false);
    window.location.href = "home.html";
}

var maxExp,gameProgress,currentProgress,expCount,firstTime,moneyCount;
load_vars()
if(!firstTime){window.location.href = "home.html";}
display_log("post-dichiarazione-variabili")
update_html();
