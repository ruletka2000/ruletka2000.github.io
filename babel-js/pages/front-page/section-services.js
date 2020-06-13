'use strict';

$(document).ready(function () {
  if (document.querySelector('.services-slider-container')) {
    var mySwiper = new Swiper('.services-slider-container', {
      speed: 400,
      spaceBetween: 0,
      resistanceRatio: 0,
      autoHeight: true,
      navigation: {
        nextEl: '.section-services .swiper-button-next',
        prevEl: '.section-services .swiper-button-prev'
      },
      pagination: {
        el: '.section-services .swiper-pagination',
        type: 'bullets'
      }
    });

    if (g_isDesktop) {
      console.log('hello');
      var controller = new ScrollMagic.Controller();

      var animation = gsap.timeline();
      animation.from(".services-slider-container .bg-img", { scale: 1.5 }, 0).from(".services-slider-container h2", { x: 40 }, 0);

      var bgs = document.querySelector('.services-slider-container .swiper-slide .bg-img');

      var scene = new ScrollMagic.Scene({
        triggerElement: ".services-slider-container",
        duration: document.querySelector('.services-slider-container').offsetHeight,
        triggerHook: 1
      })
      // animate color and top border in relation to scroll position
      .setTween(animation) // the tween durtion can be omitted and defaults to 1
      // .addIndicators({name: "2"}) // add indicators (requires plugin)
      .addTo(controller);

      // setTimeout(()=>{
      //   animation.play();
      // }, 5000)
    }
  }
});