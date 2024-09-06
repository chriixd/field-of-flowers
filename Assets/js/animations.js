function hide_quest_animation(index,lockanimation = false){
    return new Promise((resolve)=>{
        let h = parseInt(getComputedStyle(document.getElementsByClassName('quest-body')[index-1]).height);
        let oqb = parseFloat(getComputedStyle(document.getElementsByClassName('quest-body')[index-1]).opacity);
        let ol =  parseFloat(getComputedStyle(document.getElementsByClassName('lock-img')[0]).opacity);
        console.log(document.getElementsByClassName('quest-body')[index-1].clientHeight)
       if(lockanimation){
            let opacity_lock_quest_animation = setInterval(() => {
                if(ol>0){
                    ol-=0.05
                    document.getElementsByClassName('lock-img')[0].style.opacity = ol;
                }else{
                    clearInterval(opacity_lock_quest_animation)
                }
            }, 30);
        }
        let opacity_quest_animation = setInterval(() => {
            if(oqb>0){
                oqb-=0.05
                document.getElementsByClassName('quest-body')[index-1].style.opacity = oqb;
            }else{
                clearInterval(opacity_quest_animation)
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
            }else{
                clearInterval(opacity_quest_animation)
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