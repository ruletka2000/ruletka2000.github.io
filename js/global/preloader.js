let animationPreloader;

$(document).ready( function() {
  animationPreloader = gsap.timeline({paused:true});
  animationPreloader
  .to('#preloader .bg-img--accent', 0.3, {x:'-100%'})
  .to('#preloader', 0.3, {x:'-100%'}, 0.8)
  .from('.section-first h1, .section-first .h1', 1, {opacity: 0}, 1.5)
  .from('.section-first .accent-btn', 1, {opacity: 0}, 1.5)
  .from('.section-first .weather-container', 1, {opacity: 0}, 1.5)
  .from('.section-first .section-first__navigation .swiper-pagination', 1, {opacity: 0}, 1.5)
  .from('.section-first .section-first__navigation .swiper-button-prev', 1, {opacity: 0}, 1.5)
  .from('.section-first .section-first__navigation .swiper-button-next', 1, {opacity: 0}, 1.5)
  .from('.section-flights .radio-filter-wrap', 1, {opacity: 0, y:'100%'}, 1.5)
  .from('.pop-up-need-help .trigger', 1, {opacity: 0, x:'100%'}, 1.5)
});

window.addEventListener('load', ()=>{
  document.querySelector('#preloader .logo-default').classList.remove('visible');
  document.querySelector('#preloader .logo-accent').classList.add('visible');
  animationPreloader.play();
});