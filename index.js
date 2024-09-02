function addProgress() {
    if(currentProgress < quests[gameProgress].progress) {
        currentProgress++        
    } else{
        expCount += quests[gameProgress].exp;
        currentProgress = 0;
        gameProgress++;

    }
    save_data();
    update_html();
}

function update_html() {
    if(document.title != 'Title Screen') {
        if (document.title == 'Home') {
            document.getElementById('quest-name').innerHTML = quests[gameProgress].title;
            document.getElementById('quest-description').innerHTML = quests[gameProgress].desc;
            document.getElementById('reward-coins').innerHTML = '+' + quests[gameProgress].coins;
            document.getElementById('reward-exp').innerHTML = '+' + quests[gameProgress].exp;
            document.getElementById('quest-max-progress').innerHTML = quests[gameProgress].progress;
            document.getElementById('quest-progress').innerHTML = currentProgress;
        }
        document.getElementById('exp-level').innerHTML = Math.floor(expCount / maxExp) + 1;
        document.getElementById('exp-progress').style.width = (((expCount %maxExp) / maxExp) * 100) + '%';
    }
}

function save_data(){
    localStorage.setItem('gameProgress', gameProgress);
    localStorage.setItem('expCount', expCount);
}

function display_log(when){
    console.log(when)
    console.log("gameProgress : " + localStorage.getItem('gameProgress'));
    console.log(expCount);
    console.log("gameProgress : " + gameProgress);
}

function load_vars(){
     gameProgress = parseInt(localStorage.getItem('gameProgress'))  || 0;
     currentProgress = parseInt(localStorage.getItem('currentProgress'))  || 0;
     expCount = parseInt(localStorage.getItem('expCount')) || 0;
     firstTime =  localStorage.getItem('firstTime') || true;
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

var maxExp,gameProgress,currentProgress,expCount,firstTime;
load_vars()
if(!firstTime){window.location.href = "home.html";}
display_log("post-dichiarazione-variabili")
update_html();
