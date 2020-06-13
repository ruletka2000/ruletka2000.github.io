'use strict';

$(document).ready(function () {
  var popUp = document.querySelector('.pop-up-need-help');
  var header = document.querySelector('.header');
  if (popUp) {
    var bgImg = popUp.querySelector('.bg-img');
    var trigger = popUp.querySelector('.trigger');
    var content = popUp.querySelector('.content');
    var wrap = popUp.querySelector('.wrap');
    var btnBack = popUp.querySelector('.btn-back');
    var scrollBlocker = new ScrollBlocker(content);
    trigger.addEventListener('click', function () {
      if (!popUp.classList.contains('open')) {
        popUp.classList.add('open');
        scrollBlocker.blockScroll();
        animationOpen.play();
        if (!g_isDesktop) header.classList.add('white');
      } else {
        popUp.classList.remove('open');
        animationOpen.reverse();
        scrollBlocker.openScroll();
        if (!g_isDesktop && !header.classList.contains('default-white')) {
          header.classList.remove('white');
        }
      }
    });

    if (btnBack) {
      btnBack.addEventListener('click', function () {
        if (popUp.classList.contains('open')) {
          popUp.classList.remove('open');
          animationOpen.reverse();
          scrollBlocker.openScroll();
          if (!g_isDesktop && !header.classList.contains('default-white')) {
            header.classList.remove('white');
          }
        }
      });
    }

    bgImg.addEventListener('click', function () {
      if (popUp.classList.contains('open')) {
        popUp.classList.remove('open');
        animationOpen.reverse();
        scrollBlocker.openScroll();
        if (!g_isDesktop && !header.classList.contains('default-white')) {
          header.classList.remove('white');
        }
      }
    });

    var animationOpen = gsap.timeline({ paused: true });
    if (g_isDesktop) {
      animationOpen.to(wrap, 0.3, { x: 0, y: '50%' }, 0);
    } else {
      animationOpen.to(wrap, 0.3, { x: 0 }, 0);
    }

    // .to(content, 0.3, {x:0}, 0);
  }
});