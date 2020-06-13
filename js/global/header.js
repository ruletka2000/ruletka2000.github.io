let menu;
let languages;
let logo;
let search;
let uiSystem;
let header;



$(document).ready( function() {
  header = document.querySelector('#header');

  languages = new Languages(document.getElementById('header__languages'));
  if(!g_isDesktop) languages.hide(0);
  menu = new MotherMenu(document.querySelector('#header__nav ul'), document.getElementById('header-open-close-btn'),undefined,true);
  logo = new Logo(document.getElementById('header__logo'));
  search = new Search(document.getElementById('header__search'));
  uiSystem = new UiSystem(document.getElementById('header__ui-system'));

  toggleWhite();
  window.addEventListener('scroll', _.throttle(toggleWhite, 150));
});

const toggleWhite = () => {
  if(window.scrollY >= 10) {     
    header.classList.add('white', 'default-white'); 
  } else {
    if(!menu.menu.classList.contains('open')) {
      header.classList.remove('white');
    }
    header.classList.remove('default-white');
    
  }
}

class Languages {
  constructor(languages) {
    this.lan = languages;
    this.lanUl = this.lan.querySelector('ul');
    this.lanLis = this.lan.querySelectorAll('ul li');
    this.lanAs = this.lan.querySelectorAll('ul li a');
    this.lanScrollBlocker = new ScrollBlocker(this.lanUl);

    $(this.lanLis).each( (i, li) => {
      if(li.querySelector('span').classList.contains('wpml-ls-native')) {
        li.style.order = '-1';
      }
    } );

    $(this.lanAs).each( (i, a) => {
      const that = this;
      a.addEventListener('click', function(event)  {      
        event.stopPropagation();
        if(this.querySelector('span').classList.contains('wpml-ls-native')) {
          event.preventDefault();
        }
  
        if(that.lan.classList.contains('open')) {
          closeLanguages();
        } else {
          openLanguages();
        }
  
      } )
    } );

    document.addEventListener('click', () => {closeLanguages()});

    const addMouseListnersToLanguage = () => {
      this.lanUl.addEventListener('mouseenter', openLanguages );
    
      this.lanUl.addEventListener('mouseleave', closeLanguages);
    } 
    const removeMouseListnersToLanguage = () => {
      this.lanUl.removeEventListener('mouseenter', openLanguages );
    
      this.lanUl.removeEventListener('mouseleave', closeLanguages);
    } 

    const openLanguages = () => {
      this.lan.classList.add('open');
      $(this.lanLis).each( (i,li) => {
        li.style.height = this.lan.offsetHeight + 'px';
      } );
      this.lanUl.style.height = this.lanUl.offsetHeight * this.lanLis.length + 'px';
    
      this.lanScrollBlocker.blockScroll();
    }
    
    const closeLanguages = () => {
      this.lan.classList.remove('open');
      this.lanUl.style.height = this.lan.offsetHeight + 'px';
      $(this.lanLis).each( (i,li) => {
        li.style.height = this.lan.offsetHeight + 'px';
      } );
    
      this.lanScrollBlocker.openScroll();
      
    }

    if(g_isDesktop) addMouseListnersToLanguage();

    window.addEventListener('resize', _.throttle(() => {
      if(g_isDesktop) {
        addMouseListnersToLanguage();
      } else {
        removeMouseListnersToLanguage();
      }
    }, 150));


    this.animationHide = gsap.timeline({paused: true});
    this.animationHide
    .to(this.lan, 0.3, {x:'-100%', opacity: 0});

    this.hide = (time) => {
      if(time === 0) {
        this.animationHide.pause(0.3);
      } else {
        this.animationHide.play();
      }
      
      this.lan.classList.add('hide');
    }
    this.show = () => {
      this.animationHide.reverse();
      this.lan.classList.remove('hide');
    }

    window.addEventListener('resize', _.throttle(() => {
      if(!search.search.classList.contains('opening')) {
        closeLanguages();
        if(g_isDesktop) { 
          this.show(); 
        } else {
          if(menu.menu.classList.contains('open')){
            console.log('меню открыто');
            this.show();
          } else {
            this.hide(); 
          }
        }
      }
      
    }, 150));
  }
}



class MotherMenu {
  constructor(menu, triggerBtn, closeBtn, subMenusFlag) {
    this.menu = menu;
    this.triggerBtn = triggerBtn;
    
    // this.whiteLabel = subMenusFlag ? document.querySelector('#header__nav .white-label') : undefined;

    this.subMenusFlag = subMenusFlag;

    this.blockerScroll = new ScrollBlocker(this.menu);

    this.animation = gsap.timeline({paused: true});
    this.animation
    .to(this.menu, {duration: 0.3, x:0}, 0);
    

    this.animationForWrap = gsap.timeline({paused: true});
    this.animationForWrap
    .to($('section'), 0.3, {x:'-50%'}, 0)
    .to($('.footer .footer-wrap'), 0.3, {x:'-50%'}, 0);
    // .to(this.whiteLabel, {duration: 0.3, x:0}, 0);

      // setTimeout(() => {
      //   this.animation.play();
      // }, 3000);

    
    this.animationHide = gsap.timeline({paused: true});
    this.animationHide
    .to(this.triggerBtn, 0.3, {x: '100%', opacity: 0});

    this.hide = () => {
      this.animationHide.play();
      this.triggerBtn.classList.add('hide');
    }
    this.show = () => {
      this.animationHide.reverse();
      this.triggerBtn.classList.remove('hide');
    }

    triggerBtn.addEventListener('click', () => {
      if(this.menu.classList.contains('open')) {
        this.close();
      } else {
        this.open();
      }

      if(triggerBtn.getAttribute('data-btn-id')) {
        this.triggerBtnM = g_openCloseBtns[triggerBtn.getAttribute('data-btn-id')];
      }
      
    })

    if(closeBtn)
    closeBtn.addEventListener('click', () => {
      if(this.menu.classList.contains('open')) {
        this.close();
      } else {
        this.open();
      }
    })

    

  
    

    this.open = () => {
      if(!g_isDesktop) {
        this.blockerScroll.blockScroll();
        this.animation.play();
        this.menu.classList.add('open');
        
        if(!this.subMenusFlag) {
          
          this.menu.style.top = '';
          const swt = g_clientH - this.menu.getBoundingClientRect().bottom;
          
          this.menu.style.top = this.menu.parentElement.parentElement.scrollTop + 'px';
        } else {
          document.querySelector('.header').classList.add('white');
          this.animationForWrap.play();

          if(!g_isDesktop) logo.hide();
          languages.show();
        }
      }
      
      // this.menu.addEventListener('scroll', (e)=> {
      //   console.dir(e);
      //   console.dir(this.menu.scrollTop);
      // })
      // console.log(this.menu.offsetTop );
      // console.log(this.menu.getBoundingClientRect().bottom);
    }
    this.close = (time) => {
      if(time === 0) {
        this.animation.pause(0);
        this.menu.classList.remove('open');
        this.blockerScroll.openScroll();
        if(this.subMenusFlag) {
          this.animationForWrap.pause(0);
        }
      } else {
        this.animation.reverse();
        this.menu.classList.remove('open');
        this.blockerScroll.openScroll();
        if(this.subMenusFlag) {
          this.animationForWrap.reverse();
        }
      }
      
      if(this.subMenusFlag) {
        if(!document.querySelector('.header').classList.contains('default-white')) document.querySelector('.header').classList.remove('white');
        logo.show();
        if(!g_isDesktop) languages.hide();

        
      }
    }

    const updateMenuForDesk = () => {
      if(g_isDesktop) {
        $('li', this.menu).each( (i, li) => {
          const ul = li.querySelector('ul');
          
          if(ul) {
            // console.dir(ul);
            li.classList.add('long');
            if(ul.childElementCount > 4) {
              ul.style.width = '600px';
            }
            if(ul.childElementCount > 7) {
              ul.style.width = '900px';
            }
          }
        } );
      }
    }
    updateMenuForDesk();

    
    
    

    if(this.subMenusFlag) {
      this.subMenus = [];
      const subMenus = this.menu.querySelectorAll(' li > ul');
      // console.dir(subMenus);
      
      $(subMenus).each( (i, subMenu) => {
        const trigger = subMenu.parentElement.querySelector('a');
        const closeBtn = document.createElement('a');
        closeBtn.innerHTML = trigger.innerHTML;
        const li = document.createElement('li');
        li.appendChild(closeBtn);
        subMenu.appendChild(li);

        trigger.addEventListener('click', e => { e.preventDefault(); });
        closeBtn.addEventListener('click', e => { e.preventDefault(); });

        this.subMenus.push( new MotherMenu(subMenu, trigger, closeBtn) );
      } );

      triggerBtn.addEventListener('click', () => {
        $(this.subMenus).each( (i, subMenu) => {
          subMenu.close();
        });
      });
    }

    const updateOnResize = () => {
      // console.log('bigResize', bigResize);

      if(bigResize && !search.search.classList.contains('opening')) {
        this.close();
        if(this.triggerBtnM) this.triggerBtnM.close();
        
        gsap.set(this.menu, {clearProps: 'all'});
        this.animation.clear();
        this.animation = gsap.timeline({paused: true});
        this.animation
        .to(this.menu, {duration: 0.3, x:0});

        gsap.set($('section'), {clearProps: 'all'});
        gsap.set($('.footer .footer-wrap'), {clearProps: 'all'});
        this.animationForWrap.clear();
        this.animationForWrap = gsap.timeline({paused: true});
        this.animationForWrap
        .to($('section'), 0.3, {x:'-50%'}, 0)
        .to($('.footer .footer-wrap'), 0.3, {x:'-50%'}, 0);
        
        updateMenuForDesk();

        menuWidth = this.menu.offsetWidth;
        // console.log(this.animation);
      }
    }
    


    window.addEventListener('resize', _.throttle(updateOnResize, 150));
    window.addEventListener('orientationchange', _.throttle(updateOnResize, 150));

    /////////////////////////////////////// touchmove

    let touch = {};
    let menuWidth = this.menu.offsetWidth;
    let scrollTop = this.menu.scrollTop;
    let isTouch = false;
    let dierection = false;
    let procentX = 0;
    let deltaX = 0;
    let deltaY = 0;
    
    let footer = document.querySelector('.footer .footer-wrap');

    const rendering = (a,i,t) => {
      if(isTouch && dierection === 'x') {
        
        // this.animation.progress((100 - procentX)/100).pause();
        this.menu.style.transform = `translateX(${deltaX}px)`;
        if(subMenusFlag) {
          // this.whiteLabel.style.transform = `translateX(${deltaX}px)`;
          languages.animationHide.progress((procentX)/100).pause();
          logo.animationLogohide.progress((100 - procentX)/100).pause();

          $('section').each((i, section) => {
            section.style.transform = `translateX(${-50 + procentX/2}%)`;
          })

          footer.style.transform = `translateX(${-50 + procentX/2}%)`;
        }
        

        if(this.triggerBtnM) {
          this.triggerBtnM.animation.progress((100 - procentX)/100).pause();
        }
      }
      // console.log(t);
    }

    const touchstartHandler = e => {
      e.stopPropagation();
      if(this.menu.classList.contains('open')) {
        
        scrollTop = this.menu.scrollTop;
        isTouch = true;
        procentX = 0;
        touch.x = e.touches[0].clientX;
        touch.y = e.touches[0].clientY;

        gsap.ticker.add(rendering);
      }
    }

    const touchmoveHandler = e => {
      e.stopPropagation();
      if(this.menu.classList.contains('open')) {
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
          deltaX = (deltaX > 0) ? deltaX : 0;
        }
        
        
        
        // console.log(procentX);
      }
    }

    const touchendHandler = e => {
      e.stopPropagation();
        dierection = false; isTouch = false;

        gsap.ticker.remove(rendering);

        if(procentX >= 30) {
          // this.close();
          if(this.triggerBtnM) this.triggerBtnM.close();
          if(subMenusFlag) logo.show();
          if(subMenusFlag) languages.hide();
          this.menu.style.transition = 'all 0.3s ease-in-out';
          // if(subMenusFlag) this.whiteLabel.style.transition = 'all 0.3s ease-in-out';
          this.menu.style.transform = 'translate3d(' + menuWidth + 'px,0,0)';
          // if(subMenusFlag) this.whiteLabel.style.transform = 'translate3d(' + menuWidth + 'px,0,0)';
          $('section').each((i, section) => {
            section.style.transition = 'all 0.3s ease-in-out';
            section.style.transform = 'translateX(0)';
          })
          footer.style.transition = 'all 0.3s ease-in-out';
          footer.style.transform = 'translateX(0)';
          setTimeout(()=>{
            this.menu.style.transition = ''; this.close(0);
            $('section').each((i, section) => {
              section.style.transition = '';
            })
            footer.style.transition = '';
          
            // if(subMenusFlag) this.whiteLabel.style.transition = ''; this.close(0);
          }, 300);
        } else if(procentX >= 1) {
          // this.open();
          if(subMenusFlag) logo.hide();
          if(subMenusFlag) languages.show();
          if(this.triggerBtnM) this.triggerBtnM.open();
          this.menu.style.transition = 'all 0.3s ease-in-out';
          // if(subMenusFlag) this.whiteLabel.style.transition = 'all 0.3s ease-in-out';
          this.menu.style.transform = 'translate3d(' + 0 + 'px,0,0)';
          // if(subMenusFlag) this.whiteLabel.style.transform = 'translate3d(' + 0 + 'px,0,0)';
          $('section').each((i, section) => {
            section.style.transition = 'all 0.3s ease-in-out';
            section.style.transform = 'translateX(-50%)';
          })
          footer.style.transition = 'all 0.3s ease-in-out';
          footer.style.transform = 'translateX(-50%)';
          setTimeout(()=>{
            this.menu.style.transition = '';
            // if(subMenusFlag) this.whiteLabel.style.transition = '';
            $('section').each((i, section) => {
              section.style.transition = '';
            })
            footer.style.transition = '';
          }, 300);
        }
        this.blockerScroll.openScroll();
        this.blockerScroll.blockScroll();
      
    }

    this.menu.addEventListener('touchstart', touchstartHandler);
    this.menu.addEventListener('touchmove', touchmoveHandler);
    this.menu.addEventListener('touchend', touchendHandler);




  }
}

class Search {
  constructor(search) {
    // console.log(logo);
    this.search = search;
    this.sheet = search.querySelector('.search__sheet');
    this.btnSearch = search.querySelector('.search-btn');
    this.btnClose = search.querySelector('.close-btn');
    this.input = search.querySelector('input');
    this.blur = search.querySelector('.bg-blur');
    this.srchScrollBlocker = new ScrollBlocker(this.sheet);
    this.btnSearch.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();
      this.open();
    })

    this.btnClose.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();

      this.close();
    })

    this.open = () => {
      this.srchScrollBlocker.blockScroll();
      this.animationOpen.play();
      this.search.classList.add('open');
      // console.dir(logo);
      this.search.classList.add('opening');
      setTimeout( () => {
        this.search.classList.remove('opening');
      }, 300 );
      this.input.focus();
      if(!g_isDesktop) logo.hide();
      if(!g_isDesktop) menu.hide();
      if(!g_isDesktop) languages.hide();
      if(!g_isDesktop) uiSystem.hide();
      
    }
    this.close = () => {
      this.input.blur();
      this.srchScrollBlocker.openScroll();
      this.animationOpen.reverse();
      this.search.classList.remove('open');
      if(!menu.triggerBtn.classList.contains('open')) {
        logo.show();
      } else {
        languages.show();
      }
      
      menu.show();
      uiSystem.show();
    }

    this.blur.addEventListener('click', () => {this.close()});

    const createAnim = () => {

      this.animationOpen = gsap.timeline({paused: true});

      if(g_isDesktop) {
        const nav = document.querySelector('#header__nav');
        const leftNav = g_offset(nav).left;
        const leftSearch = g_offset(this.search).left;
        const width = leftSearch - leftNav;
        this.animationOpen
        .to(this.sheet, 0.3, {right: 0, left: -width}, 0)
        .to(this.btnClose, 0.3, {width: 45}, 0)
        .to(this.input, 0.3, {opacity:1, display:"block"}, 0);
        // .to(this.btnSearch, 0, {x:-10}, 0);
      } else {
        this.animationOpen
        .to(this.sheet, 0.3, {right: 0, left: 0}, 0)
        .to(this.btnClose, 0.3, {width: 45}, 0);
      }
      
    }
    
    createAnim();


    window.addEventListener('resize', _.throttle(() => {
      if(!this.search.classList.contains('opening')) {
        this.close();

        gsap.set(this.sheet, {clearProps: 'all'});
        gsap.set(this.btnClose, {clearProps: 'all'});
        gsap.set(this.input, {clearProps: 'all'});
        this.animationOpen.clear();
        createAnim();
      }
      

    }, 150));
  }
}



class Logo {
  constructor(logo) {
    this.logo = logo;

    this.animationLogohide = gsap.timeline({paused: true});
    this.animationLogohide
    .to( this.logo, 0.3, {y: '-100%'} );

    this.hide = () => {
      this.animationLogohide.play();
      this.logo.classList.add('hide');
    }
    this.show = () => {
      this.animationLogohide.reverse();
      this.logo.classList.remove('hide');
    }
  }
}

class UiSystem {
  constructor(uiSystem) {
    this.uiSystem = uiSystem;

    this.animationHide = gsap.timeline({paused:true});
    this.animationHide
    .to(this.uiSystem, 0.3, {x: '100%', opacity: 0});

    this.hide = () => {
      this.animationHide.play();
      this.uiSystem.classList.add('hide');
    }
    this.show = () => {
      this.animationHide.reverse();
      this.uiSystem.classList.remove('hide');
    }
  }
}








