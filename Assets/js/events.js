document.addEventListener("DOMContentLoaded", function() {
    if(document.title=="Home"){
        document.getElementById("hidden-popup-box").addEventListener('click', (e)=> {
            if (e.target === document.getElementById("hidden-popup-box")) {
                hide_popup_box();
            }
        });
        document.querySelectorAll(".quest-complete").forEach(element=>{
                element.addEventListener('click',(ev)=>{
                        show_popup_box("Inserisci il codice",quests[gameProgress].progress[currentProgress].task,true);
                });
        });
        document.querySelectorAll(".code-button").forEach(element=>{
            element.addEventListener('click',(ev)=>{
                if(quests[gameProgress].progress[currentProgress].code == document.querySelector(".box-textbox").value){
                    let update = addProgress();
                    save_data();
                    console.log(gameProgress);
                    completed_quest_animation(gameProgress);
                    hide_popup_box();
                    update_html(update.levelup,update.end);
                }
            });
        });
        document.querySelectorAll(".quest-title").forEach(element=>{
            element.addEventListener('click',(ev)=>{
                console.log( ev.target.closest(".quest-container").getElementsByClassName("quest-body"))
                ev.target.closest(".quest-container").getElementsByClassName("quest-body")[0].classList.toggle('reduced');
            });
        });
        
    }
});