$(document).ready( function() {
  let bg = document.querySelector('.section-resize-on-scroll .bg-img');
  if(g_isDesktop && bg) {
    let controller = new ScrollMagic.Controller();

    let animation = gsap.timeline();
    animation
    .from(".section-resize-on-scroll .bg-img", {scale: 1.3}, 0)
    .from(".section-resize-on-scroll .section-logo", {y: '300%'}, 0)
    .from(".section-resize-on-scroll .sub-title", {y: '300%'}, 0)

    var scene = new ScrollMagic.Scene({
      triggerElement: ".section-resize-on-scroll", 
      duration: document.querySelector('.section-resize-on-scroll').offsetHeight,
      triggerHook: 1,
    })
    .setTween(animation)
    // .addIndicators({name: "3"})
    .addTo(controller);
  }
});