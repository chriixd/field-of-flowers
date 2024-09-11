
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
    document.getElementsByClassName("lock-img")[0].classList.add('op0');
    setTimeout(()=>{
        document.getElementsByClassName("quest-body")[index -1].classList.add('reduced');
        document.getElementsByClassName("quest-body")[index].classList.add('reduced');
        document.getElementsByClassName("quest-container")[index].classList.remove('hidden');
        setTimeout(()=>{
            document.getElementsByClassName("quest-container")[index].classList.remove('op0');
        },10);
            document.getElementsByClassName("locked-quest")[0].remove();
        setTimeout(() => {     
            document.getElementsByClassName('quest-body')[index -1].classList.add("completed");
            document.getElementsByClassName("quest-body")[index].classList.remove('reduced');
            localStorage.setItem("new-quest",false);
        }, 500);
    },1000);


}
async function show_popup_box(title="",description="",code=true){
    popupOverlay = document.getElementById("hidden-popup-box");
    document.querySelector("#box-title").innerHTML = title;
    document.querySelector("#box-description").innerHTML = description;
    popupOverlay.classList.remove("hidden");
    setTimeout(() => {
        popupOverlay.classList.add("background-blur");
        popupOverlay.classList.remove('hide-popup');
    }, 0); // Durata della dissolvenza (0.3s come in CSS)
 
}
async function hide_popup_box(){
    popupOverlay = document.getElementById("hidden-popup-box");
    popupOverlay.classList.add('hide-popup');
    popupOverlay.classList.remove("background-blur");
    setTimeout(() => {
        popupOverlay.classList.add("hidden")
    }, 500); // Durata della dissolvenza (0.3s come in CSS)
}