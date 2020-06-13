$(document).ready( function() {
  if(document.querySelector('.section-helps .helps-item__title')) {
    let titles = document.querySelectorAll('.section-helps .helps-item__title');
    let texts = document.querySelectorAll('.section-helps .helps-item__text');
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
      .staggerFrom(".section-helps .helps-item", 1, {scale: "0.1", opacity:0}, 0.2);
      
      var scene = new ScrollMagic.Scene({
        triggerElement: ".section-helps", 
        duration: document.querySelector('.section-helps').offsetHeight + g_clientH,
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