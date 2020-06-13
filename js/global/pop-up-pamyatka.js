let animationOpenForPopUpPamyatka;
let scrollBlockerForPopUpPamyatka;
$(document).ready( function() {
  let popUp = document.querySelector('.pop-up-pamyatka');
  let header = document.querySelector('.header');
  if(popUp) {
    let bgImg = popUp.querySelector('.bg-img');
    // let trigger = popUp.querySelector('.trigger');
    let content = popUp.querySelector('.content');
    let wrap = popUp.querySelector('.wrap');
    let btnBack = popUp.querySelector('.close-btn');
    let btnOk = popUp.querySelector('.btn-ok');
    scrollBlockerForPopUpPamyatka = new ScrollBlocker(content);
    // trigger.addEventListener('click', ()=>{
    //   if(!popUp.classList.contains('open')) {
    //     popUp.classList.add('open');
    //     scrollBlocker.blockScroll();
    //     animationOpenForPopUpPamyatka.play();
    //     if(!g_isDesktop) header.classList.add('white');
    //   } else {
    //     popUp.classList.remove('open');
    //     animationOpenForPopUpPamyatka.reverse();
    //     scrollBlocker.openScroll();
    //     if(!g_isDesktop && !header.classList.contains('default-white')) {
    //       header.classList.remove('white');
    //     }
    //   }

    // });



    if(btnBack) {
      btnBack.addEventListener('click', ()=>{
        if(popUp.classList.contains('open')) {
          popUp.classList.remove('open');
          animationOpenForPopUpPamyatka.reverse();
          scrollBlockerForPopUpPamyatka.openScroll();
          if(!g_isDesktop && !header.classList.contains('default-white')) {
            header.classList.remove('white');
          }
        }
      });
    }
    if(btnOk) {
      btnOk.addEventListener('click', ()=>{
        if(popUp.classList.contains('open')) {
          popUp.classList.remove('open');
          animationOpenForPopUpPamyatka.reverse();
          scrollBlockerForPopUpPamyatka.openScroll();
          if(!g_isDesktop && !header.classList.contains('default-white')) {
            header.classList.remove('white');
          }
        }
      });
    }

    bgImg.addEventListener('click', ()=>{
      if(popUp.classList.contains('open')) {
        popUp.classList.remove('open');
        animationOpenForPopUpPamyatka.reverse();
        scrollBlockerForPopUpPamyatka.openScroll();
        if(!g_isDesktop && !header.classList.contains('default-white')) {
          header.classList.remove('white');
        }
      }
    });

    animationOpenForPopUpPamyatka = gsap.timeline({paused:true});
    if(g_isDesktop) {
      animationOpenForPopUpPamyatka
      .to(wrap, 0.8, {x:0, y:'50%', opacity: 1}, 0);
    } else {
      animationOpenForPopUpPamyatka
      .to(wrap, 0.3, {x:0}, 0);
    }
    
    // .to(content, 0.3, {x:0}, 0);
  }
});

window.addEventListener('load', ()=>{
  if(!document.querySelector('.pop-up-pamyatka').classList.contains('open')) {
    setTimeout(()=>{
      document.querySelector('.pop-up-pamyatka').classList.add('open');
      scrollBlockerForPopUpPamyatka.blockScroll();
      animationOpenForPopUpPamyatka.play();
      if(!g_isDesktop) document.querySelector('.header').classList.add('white');
    }, 3000);
    
  }
});