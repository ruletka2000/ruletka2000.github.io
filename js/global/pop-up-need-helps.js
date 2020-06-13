$(document).ready( function() {
  let popUp = document.querySelector('.pop-up-need-help');
  let header = document.querySelector('.header');
  if(popUp) {
    let bgImg = popUp.querySelector('.bg-img');
    let trigger = popUp.querySelector('.trigger');
    let content = popUp.querySelector('.content');
    let wrap = popUp.querySelector('.wrap');
    let btnBack = popUp.querySelector('.btn-back');
    let scrollBlocker = new ScrollBlocker(content);
    trigger.addEventListener('click', ()=>{
      if(!popUp.classList.contains('open')) {
        popUp.classList.add('open');
        scrollBlocker.blockScroll();
        animationOpen.play();
        if(!g_isDesktop) header.classList.add('white');
      } else {
        popUp.classList.remove('open');
        animationOpen.reverse();
        scrollBlocker.openScroll();
        if(!g_isDesktop && !header.classList.contains('default-white')) {
          header.classList.remove('white');
        }
      }

    });

    if(btnBack) {
      btnBack.addEventListener('click', ()=>{
        if(popUp.classList.contains('open')) {
          popUp.classList.remove('open');
          animationOpen.reverse();
          scrollBlocker.openScroll();
          if(!g_isDesktop && !header.classList.contains('default-white')) {
            header.classList.remove('white');
          }
        }
      });
    }

    bgImg.addEventListener('click', ()=>{
      if(popUp.classList.contains('open')) {
        popUp.classList.remove('open');
        animationOpen.reverse();
        scrollBlocker.openScroll();
        if(!g_isDesktop && !header.classList.contains('default-white')) {
          header.classList.remove('white');
        }
      }
    });

    let animationOpen = gsap.timeline({paused:true});
    if(g_isDesktop) {
      animationOpen
      .to(wrap, 0.3, {x:0, y:'50%'}, 0);
    } else {
      animationOpen
      .to(wrap, 0.3, {x:0}, 0);
    }
    
    // .to(content, 0.3, {x:0}, 0);
  }
});