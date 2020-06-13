$(document).ready( function() {
  if(document.querySelector('.section-news .slide-title')) {
    var mySwiper = new Swiper('.section-news-slider', {
      slidesOffsetBefore: 20,
      // slidesOffsetAfter: 20,
      // slidesPerView: 1.1,
      speed: 400,
      spaceBetween: 16,
      resistanceRatio: 0,
      navigation: {
        nextEl: '.section-news .navigation-group .swiper-button-next',
        prevEl: '.section-news .navigation-group .swiper-button-prev',
      },
      pagination: {
        el: '.section-news .navigation-group .swiper-pagination',
        type: 'bullets',
      },
      breakpoints: {
        // when window width is >= 320px
        320: {
          slidesPerView: 1.2,
          spaceBetween: 16
        },
        // when window width is >= 480px
        480: {
          slidesPerView: 1.2,
          spaceBetween: 16
        },
        // when window width is >= 640px
        640: {
          slidesPerView: 2.2,
          spaceBetween: 16
        },
        // when window width is >= 768px
        768: {
          slidesPerView: 2.5,
          spaceBetween: 16
        },
        // when window width is >= 1366px
        1366: {
          slidesPerView: 3.1,
          spaceBetween: 30,
          slidesOffsetBefore: 110,
        },
        1550: {
          slidesPerView: 3.5,
          spaceBetween: 30,
          slidesOffsetBefore: 110,
        },
        // when window width is >= 1680px
        1680: {
          slidesPerView: 3.8,
          spaceBetween: 30,
          slidesOffsetBefore: 173,
        },
      }
    });
    
    let titles = document.querySelectorAll('.section-news .slide-title');
    let texts = document.querySelectorAll('.section-news .slide-text');
    let maxH = 0;
    $(titles).each((i, title)=>{
      if(title.offsetHeight >= maxH) {
        maxH = title.offsetHeight;
      }
    });
    $(titles).each((i, title)=>{
      title.style.height = maxH + 'px';
    });

    $(texts).each((i, text)=>{
      console.log(text);
      console.log(text.offsetHeight);
      if(text.offsetHeight >= maxH) {
        maxH = text.offsetHeight;
      }
    });
    $(texts).each((i, text)=>{
      text.style.height = maxH + 'px';
    });


    if(g_isDesktop) {
      let controller = new ScrollMagic.Controller();

      let animation = gsap.timeline({paused:true});
      animation
      .from(".section-news .sub-title", 1, {x: 50, opacity:0}, 0)
      .from(".section-news .title", 1, {x: 100, opacity:0}, 0)
      .from(".section-news .section-news-slider", 1, {x: '50vw', opacity:0}, 0)
      
      var scene = new ScrollMagic.Scene({
        triggerElement: ".section-news", 
        duration: document.querySelector('.section-news').offsetHeight + g_clientH,
        triggerHook: 0.9,
      })
      .addTo(controller)
      // .addIndicators() // add indicators (requires plugin)
      .on("enter leave", function (e) {
        if(e.type == 'enter') {
          animation.play();
        }
      })
    }
  }
  
});