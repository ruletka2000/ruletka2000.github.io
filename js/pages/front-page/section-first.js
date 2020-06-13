const secFirstSliderSpeed = 900;

$(document).ready( function() {

  let imgSlider;
  let textSlider;
  let slides;
  let bgImgs;

  if(g_isDesktop) createSlider('vertical', 'fade', false);
  if(!g_isDesktop) createSlider('horizontal', 'fade', true);


  // document.querySelector('.section-first').style.height = g_clientH + 'px';
  // document.querySelector('.section-first').style.minHeight = g_clientH + 'px';

  window.addEventListener('resize', _.throttle(updateSliders , 150));
  window.addEventListener('orientationchange', _.throttle(updateSliders, 150));

  function updateSliders() {
    
    imgSlider.destroy();
    textSlider.destroy();
    if(g_isDesktop) createSlider('vertical', 'fade', false);
    if(!g_isDesktop) createSlider('horizontal', 'fade', true);
  }

  function createSlider(direction, effect, allow) {
    imgSlider = new Swiper('.section-first__img-slider', {
      spaceBetween: 0,
      direction: direction,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
      // freeMode: true,
      speed: secFirstSliderSpeed,
    });
    textSlider = new Swiper('.section-first__text-slider', {
      spaceBetween: 0,
      effect: effect,
      speed: secFirstSliderSpeed,
      allowTouchMove: allow,
      fadeEffect: {
        crossFade: true
      },
      navigation: {
        nextEl: '.section-first__navigation .swiper-button-next',
        prevEl: '.section-first__navigation .swiper-button-prev',
      },
      pagination: {
        el: '.section-first__navigation .swiper-pagination',
        type: 'bullets',
        clickable: true
      },
      thumbs: {
        swiper: imgSlider
      }
    });
    
    

    imgSlider.on('slideChangeTransitionStart', function () {
      const index = imgSlider.realIndex;
      const prevIndex = imgSlider.previousIndex;
      console.log(index);
      flag2 = false;
      bgImgs[index].toggle(scrollProcent);
      bgImgs[prevIndex].toggle(scrollProcent);
    });

  }

  slides = document.querySelectorAll('.section-first__img-slider .swiper-slide');
    bgImgs = [];
    
    $(slides).each( (i, slide) => {
      // console.log(slide);
      const bg = new SecFirstBgImg(slide.querySelector('.bg-img'));
      console.log(bg);
      bgImgs.push(bg );
      if(i%2 !== 0) {
        bg.toBig(0);
        
      }
      if(i === imgSlider.realIndex) {
        bg.toBig(0);
      }
    } );

  

  // ------------------ touchmove
  const sectionFirst = document.querySelector('.section-first');
  // const blockerScroll = new ScrollBlocker(sectionFirst);
  
  // const touch = {};
  // let dierection = false;
  // let deltaY;
  // let deltaX;

  // const touchstartHandler = e => {
  //   e.stopPropagation();
  //   if(!g_isDesktop) {
  //     touch.x = e.touches[0].clientX;
  //     touch.y = e.touches[0].clientY;
  //   }
  // }

  // const touchmoveHandler = e => {
  //   e.stopPropagation();
  //   if(!g_isDesktop) {
  //     deltaX = e.touches[0].clientX - touch.x;
  //     deltaY = e.touches[0].clientY - touch.y;

  //     if(Math.abs(deltaX) > Math.abs(deltaY)) {
  //       if(!dierection) { dierection = 'x'; }
  //     } else {
  //       if(!dierection) { dierection = 'y'; }
  //     }
  //   }
  // }

  // const touchendHandler = e => {
  //   e.stopPropagation();
  //   if(dierection === 'x') { 
  //     if(deltaX > 0) {
  //       // console.log('prev');
  //       textSlider.slidePrev();
  //     }
  //     if(deltaX < 0) {
  //       // console.log('next');
  //       textSlider.slideNext();
  //     }
  //   }
  //   dierection = false;
  //   // blockerScroll.openScroll();
  // }


  // sectionFirst.addEventListener('touchstart', touchstartHandler);
  // sectionFirst.addEventListener('touchmove', touchmoveHandler);
  // sectionFirst.addEventListener('touchend', touchendHandler);

  let scrollProcent = window.scrollY / sectionFirst.offsetHeight;
  const afterClick = {};
  afterClick.x = 1;
  window.addEventListener('scroll', () => {
    scrollProcent = window.scrollY / sectionFirst.offsetHeight;
    // if(scrollProcent >= 1 || scrollProcent <= 0) {
    //   scrollProcent = 1;
    // }
    // if() {
    //   scrollProcent = 0;
    // if(scrollProcent <= 1 && scrollProcent >= 0) {
    //   scrollUpdate();
    // }
    flag2 = true;
    if(scrollProcent <= 1 && scrollProcent >= 0 && flag) {
      window.requestAnimationFrame(myRender);
    }
  });

  function myRender() {
    flag = false;
    if(scrollProcent <= 1 && scrollProcent >= 0 && flag2 && g_isDesktop) {
      
      
      bgImgs.forEach( (bgImg) => {
        bgImg.toProcent(scrollProcent, afterClick);
      } );

      window.requestAnimationFrame(myRender);
    } else {
      flag = true;
      console.log('stop render');
    }
  }
  
  let flag;
  let flag2 = true;
  window.requestAnimationFrame(myRender);
  

  // const scrollUpdate = () => {
  //   bgImgs.forEach( (bgImg) => {
  //     bgImg.toProcent(scrollProcent, afterClick);
  //   } );
  // }
  



});

class SecFirstBgImg {
  constructor(bgImg) {

    this.bgImg = bgImg;

    this.animation = gsap.timeline({paused:true});
    this.animation
    .to(this.bgImg, secFirstSliderSpeed/1000, {scaleX:1.2, scaleY:1.2, ease: Power1.easeInOut});
  
    const update = () => {
      gsap.set(this.bgImg, {clearProps: 'all'});
      this.animation.clear();
      this.animation = gsap.timeline({paused: true});
      this.animation
      .to(this.bgImg, secFirstSliderSpeed/1000, {scaleX:1.2, scaleY:1.2, ease: Power1.easeInOut});
    
      if(this.bgImg.classList.contains('big')) {
        this.animation.pause(secFirstSliderSpeed/1000);
      }
    }

    window.addEventListener('resize', _.throttle(update, 150));
    window.addEventListener('orientationchange', _.throttle(update, 150));
  }

  toBig(time) {
    if(g_isDesktop) {
      this.bgImg.classList.add('big');
      if(time === 0) {
        this.animation.pause(secFirstSliderSpeed/1000);
      } else {
        this.animation.play();
      } 
    }
  }
  toDefault() {
    this.bgImg.classList.remove('big');
    this.animation.reverse();
  }

  toggle() {
    if(g_isDesktop) {
      if(this.bgImg.classList.contains('big')) {
        this.bgImg.classList.remove('big');
        this.animation.reverse();
      } else {
        this.bgImg.classList.add('big');
        this.animation.play();
      }
    }
  }

  toProcent(procent) {
    if(this.bgImg.classList.contains('big')) {
      this.animation.progress(1 - procent).pause();
    } else {
      this.animation.progress(procent).pause();
    }
  }
}

