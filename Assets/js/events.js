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
                if(quests[gameProgress].progress[currentProgress].code.toLowerCase() == document.querySelector(".box-textbox").value.toLowerCase() || quests[gameProgress].progress[currentProgress].code.toLowerCase() =='0' ){
                    let update = addProgress();
                    save_data();
                    hide_popup_box();
                    update_html(update.levelup,update.end);
                    document.querySelector(".box-textbox").value ="";
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
    // if(document.title=="Shop"){
    //     document.querySelector(".shop-container").querySelectorAll(".inventory-item").forEach(element=>{
    //         element.addEventListener('click',(ev)=>{
    //             show_popup_box()
    //         });
    //     });  
    // }
});