let flightsMoreInfo;
$(document).ready( function() {
  flightsMoreInfo = new MoreInfoForFlightsTable(document.querySelector('.flights-more-info'));

  

  const tableItems = document.querySelectorAll('.flights-table .flights-item');

  $(tableItems).each( (i, tableItem) => {
    tableItem.addEventListener('click', () => {
      if(!flightsMoreInfo.flightsMoreInfo.classList.contains('open')) {
        flightsMoreInfo.open();
      }
      
    });
  } );

});

class MoreInfoForFlightsTable {
  constructor(flightsMoreInfo) {
    this.flightsMoreInfo = flightsMoreInfo;
    
    this.btnBack = flightsMoreInfo.querySelector('.btn-back');
    this.blockerScroll = new ScrollBlocker(flightsMoreInfo);
    
    const header = document.querySelector('#header');

    const buildAnimation = () => {
      this.animation = gsap.timeline({paused: true});
      if(g_isDesktop) {
        this.animation 
        .to(this.flightsMoreInfo, 0.6, {alpha:1}, 0)
        .to($('.main-wrap'), 0.5, {x:-(g_clientW - 120),alpha: 0.3, boxShadow: '0 0 30px 3px rgba(0,0,0,0.3)', ease:Power1.easeInOut}, 0)
        .to($('.section-flights .container'), 0.5, {x:(100+g_asideW)}, 0);
      } else {
        this.animation 
        .to(this.flightsMoreInfo, 0.3, {x:0}, 0)
        .to($('section'), 0.3, {x:'-50%'}, 0);
      }
    }
    buildAnimation();
    
    this.animationHover = gsap.timeline({paused: true});

    this.animationHover
    .to($('.main-wrap'), 0.3, {alpha:0.6, ease: Power0.easeNone}, 0);

    const mouseEnterHandler = () => {
      this.animationHover.play();
    }
    const mouseLeaveHandler = () => {
      this.animationHover.reverse();
    }
    

    this.open = () => {
      this.flightsMoreInfo.classList.add('open');
      this.animation.play();
      this.blockerScroll.blockScroll();
      
      header.classList.add('white');

      setTimeout(()=> {
        g_wrap.addEventListener('click', this.close);
        g_wrap.addEventListener('mouseenter', mouseEnterHandler);
        g_wrap.addEventListener('mouseleave', mouseLeaveHandler);
        g_wrap.classList.add('shifted');
        // setTimeout(()=>{
        //   g_wrap.classList.add('on-hover');
        // }, 150);
        
        // g_wrap.style.cursor = 'pointer';
      }, 100);
      
    }
    this.close = (time) => {
      if(!header.classList.contains('default-white')) {
        header.classList.remove('white');
      }
      this.flightsMoreInfo.classList.remove('open');
      if(time === 0) {
        this.animation.pause(0);
      } else {
        this.animation.reverse();
      }
      
      this.blockerScroll.openScroll();
      // g_wrap.style.cursor = 'default';
      g_wrap.removeEventListener('click', this.close);
      g_wrap.removeEventListener('mouseenter', mouseEnterHandler);
      g_wrap.removeEventListener('mouseleave', mouseLeaveHandler);
      mouseLeaveHandler();
      g_wrap.classList.remove('shifted');
      // g_wrap.classList.remove('on-hover');

      if(g_isDesktop) {
        setTimeout(()=>{
          $('.section-flights .container').css({transform: ''});
        }, 800);  
        
      }
    }

    this.btnBack.addEventListener('click', () => {
      if(this.flightsMoreInfo.classList.contains('open')) {
        this.close();
      }
    });

    const updateOnResizeHandler = (e) => {
      menuWidth = this.flightsMoreInfo.offsetWidth;
      gsap.set(this.flightsMoreInfo, {clearProps: 'all'});
      gsap.set($('section'), {clearProps: 'all'});
      gsap.set(g_wrap, {clearProps: 'all'});
      gsap.set($('.section-flights .container'), {clearProps: 'all'});
      this.animation.clear();
      buildAnimation();
      if(g_isDesktop) {
        if(this.flightsMoreInfo.classList.contains('open')) {
          this.animation.pause(0.6);
        }
      } else {
        if(this.flightsMoreInfo.classList.contains('open')) {
          this.animation.pause(0.3);
        }
          // document.querySelector('.section-first').style.height = gSecFirstHeight + 'px';        
      }
    }

    window.addEventListener('resize', _.throttle(updateOnResizeHandler, 150));
    window.addEventListener('orientationchange', _.throttle(updateOnResizeHandler, 150));
    window.addEventListener('orientationchange', _.throttle(() => {
      // setTimeout(()=>{
        // document.querySelector('body').style.setProperty( '--vh1', `${g_vh}px` );
      // }, 150);
      
    }, 150));

    //---------------touchmove
    let touch = {};
    let menuWidth = this.flightsMoreInfo.offsetWidth;
    let isTouch = false;
    let dierection = false;
    let procentX = 0;
    let deltaX = 0;
    let deltaY = 0;
    
    

    const rendering = (a,i,t) => {
      if(isTouch && dierection === 'x') {
        
        // this.animation.progress((100 - procentX)/100).pause();
        // console.log(procentX);
        this.flightsMoreInfo.style.transform = `translateX(${deltaX}px)`;

        $('section').each((i, section) => {
          section.style.transform = `translateX(${-50 + procentX/2}%)`;
        })
      }
    }

    const touchstartHandler = e => {
      e.stopPropagation();
      if(this.flightsMoreInfo.classList.contains('open') && !g_isDesktop) {
        
        // scrollTop = this.flightsMoreInfo.scrollTop;
        isTouch = true;
        procentX = 0;
        touch.x = e.touches[0].clientX;
        touch.y = e.touches[0].clientY;

        gsap.ticker.add(rendering);
      }
    }

    const touchmoveHandler = e => {
      e.stopPropagation();
      if(this.flightsMoreInfo.classList.contains('open') && !g_isDesktop) {
        deltaX = e.touches[0].clientX - touch.x;
        deltaY = e.touches[0].clientY - touch.y;

        if(Math.abs(deltaX) > Math.abs(deltaY)) {
          if(!dierection) {dierection = 'x'; this.blockerScroll.fullBlock(); }
        } else {
          if(!dierection) dierection = 'y';
        }

        if(dierection === 'x') {
          procentX = +(deltaX*100/menuWidth).toFixed(2);
          procentX = (procentX > 0) ? procentX : 0;
          procentX = (procentX < 100) ? procentX : 100;
          deltaX = (deltaX > 0) ? deltaX : 0;
          
        }
        
        
        
        // console.log(procentX);
      }
    }

    const touchendHandler = e => {
      e.stopPropagation();
      // if(!g_isDesktop) {

      // }
        dierection = false; isTouch = false;

        gsap.ticker.remove(rendering);

        if(procentX >= 30) {
          
          console.log('procentX >= 30');
          this.flightsMoreInfo.style.transition = 'all 0.3s ease-in-out';
          this.flightsMoreInfo.style.transform = 'translate3d(' + menuWidth + 'px,0,0)';
          
          $('section').each((i, section) => {
            section.style.transition = 'all 0.3s ease-in-out';
            section.style.transform = 'translateX(0)';
          })

          setTimeout(()=>{
            this.flightsMoreInfo.style.transition = ''; this.close(0);
            $('section').each((i, section) => {
              section.style.transition = '';
            })
          }, 300);
        } else if(procentX >= 1) {
          
          this.flightsMoreInfo.style.transition = 'all 0.3s ease-in-out';
          this.flightsMoreInfo.style.transform = 'translate3d(' + 0 + 'px,0,0)';
          
          $('section').each((i, section) => {
            section.style.transition = 'all 0.3s ease-in-out';
            section.style.transform = 'translateX(-50%)';
          })

          setTimeout(()=>{
            this.flightsMoreInfo.style.transition = '';
            $('section').each((i, section) => {
              section.style.transition = '';
            })
          }, 300);
        }
        this.blockerScroll.openScroll();
        this.blockerScroll.blockScroll();
      
    }

    this.flightsMoreInfo.addEventListener('touchstart', touchstartHandler);
    this.flightsMoreInfo.addEventListener('touchmove', touchmoveHandler);
    this.flightsMoreInfo.addEventListener('touchend', touchendHandler);
  }
}