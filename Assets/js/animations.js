
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
    // hide_quest_animation(index-1);
    // await hide_next_lock_animation()
    // document.getElementsByClassName('quest-container')[index].classList.remove('hidden');
    // document.getElementsByClassName('locked-quest')[0].classList.add('hidden');
    // show_quest_animation(index)

}