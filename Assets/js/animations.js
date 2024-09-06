function hide_quest_animation(index){
    return new Promise((resolve)=>{
        let h = parseInt(getComputedStyle(document.getElementsByClassName('quest-body')[index-1]).height);
        let o = parseFloat(getComputedStyle(document.getElementsByClassName('quest-body')[index-1]).opacity);
        console.log(document.getElementsByClassName('quest-body')[index-1].clientHeight)
        let opacity_quest_animation = setInterval(() => {
            if(o>0){
                o-=0.05
                document.getElementsByClassName('quest-body')[index-1].style.opacity = o;
            }
        }, 50);
        let height_quest_animation = setInterval(() => {
            if(h > 0){
                h-=0.5;
                document.getElementsByClassName('quest-body')[index-1].style.height = h+"px";

            }else{
                setTimeout(()=>{
                    clearInterval(height_quest_animation)
                    resolve()
                },200)

            }
        }, 1);
    });
}
function show_quest_animation(index){
    return new Promise((resolve)=>{
        let h = 0;
        let o = 0 
        let opacity_quest_animation = setInterval(() => {
            if(o<1){
                o+=0.05
                document.getElementsByClassName('quest-body')[index-1].style.opacity = o;
            }
        }, 50);
        let complete_quest_animation = setInterval(() => {
            if(h < parseInt(document.getElementsByClassName('quest-body')[index-1].scrollHeight)){
                document.getElementsByClassName('quest-body')[index-1].style.height = h+"px";
                h+=0.5;
                console.log(h)

            }else{
                setTimeout(()=>{
                    clearInterval(complete_quest_animation)
                    document.getElementsByClassName('quest-body')[index - 1].classList.remove('reduced')
                    resolve()
                },1000)

            }
        }, 1);
    });
}

function levelUp_animation(){
    document.getElementById('level-up-section').classList.add('flex');
    document.getElementById('level-up-section').classList.remove('hidden');
    document.getElementById('level-up-animation').play();
    setTimeout(() => {
        document.getElementById('level-up-section').classList.remove('flex');
        document.getElementById('level-up-section').classList.add('hidden');
    }, 2812);
}