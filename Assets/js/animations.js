
function levelUp_animation(){
    document.getElementById('level-up-section').classList.add('flex');
    document.getElementById('level-up-section').classList.remove('hidden');
    document.getElementById('level-up-animation').play();
    setTimeout(() => {
        document.getElementById('level-up-section').classList.remove('flex');
        document.getElementById('level-up-section').classList.add('hidden');
    }, 2812);
}
async function completed_quest_animation(index){
    setTimeout(() => {
        document.getElementsByClassName("quest-body")[index -1].classList.add('reduced');

        document.getElementsByClassName("quest-container")[index].classList.remove('hidden');
        setTimeout(()=>{
            document.getElementsByClassName("quest-container")[index].classList.remove('op0');
        },10);
        document.getElementsByClassName("locked-quest")[0].remove()
        setTimeout(() => {
            
            document.getElementsByClassName('quest-body')[index -1].classList.add("completed");
            document.getElementsByClassName("quest-body")[index].classList.remove('reduced');
            localStorage.setItem("new-quest",false);
        }, 500);
    }, 1000);

}
async function end_game_animation(){
    
}