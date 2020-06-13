'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var menu = void 0;
var languages = void 0;
var logo = void 0;
var search = void 0;
var uiSystem = void 0;
var header = void 0;

$(document).ready(function () {
  header = document.querySelector('#header');

  languages = new Languages(document.getElementById('header__languages'));
  if (!g_isDesktop) languages.hide(0);
  menu = new MotherMenu(document.querySelector('#header__nav ul'), document.getElementById('header-open-close-btn'), undefined, true);
  logo = new Logo(document.getElementById('header__logo'));
  search = new Search(document.getElementById('header__search'));
  uiSystem = new UiSystem(document.getElementById('header__ui-system'));

  toggleWhite();
  window.addEventListener('scroll', _.throttle(toggleWhite, 150));
});

var toggleWhite = function toggleWhite() {
  if (window.scrollY >= 10) {
    header.classList.add('white', 'default-white');
  } else {
    if (!menu.menu.classList.contains('open')) {
      header.classList.remove('white');
    }
    header.classList.remove('default-white');
  }
};

var Languages = function Languages(languages) {
  var _this = this;

  _classCallCheck(this, Languages);

  this.lan = languages;
  this.lanUl = this.lan.querySelector('ul');
  this.lanLis = this.lan.querySelectorAll('ul li');
  this.lanAs = this.lan.querySelectorAll('ul li a');
  this.lanScrollBlocker = new ScrollBlocker(this.lanUl);

  $(this.lanLis).each(function (i, li) {
    if (li.querySelector('span').classList.contains('wpml-ls-native')) {
      li.style.order = '-1';
    }
  });

  $(this.lanAs).each(function (i, a) {
    var that = _this;
    a.addEventListener('click', function (event) {
      event.stopPropagation();
      if (this.querySelector('span').classList.contains('wpml-ls-native')) {
        event.preventDefault();
      }

      if (that.lan.classList.contains('open')) {
        closeLanguages();
      } else {
        openLanguages();
      }
    });
  });

  document.addEventListener('click', function () {
    closeLanguages();
  });

  var addMouseListnersToLanguage = function addMouseListnersToLanguage() {
    _this.lanUl.addEventListener('mouseenter', openLanguages);

    _this.lanUl.addEventListener('mouseleave', closeLanguages);
  };
  var removeMouseListnersToLanguage = function removeMouseListnersToLanguage() {
    _this.lanUl.removeEventListener('mouseenter', openLanguages);

    _this.lanUl.removeEventListener('mouseleave', closeLanguages);
  };

  var openLanguages = function openLanguages() {
    _this.lan.classList.add('open');
    $(_this.lanLis).each(function (i, li) {
      li.style.height = _this.lan.offsetHeight + 'px';
    });
    _this.lanUl.style.height = _this.lanUl.offsetHeight * _this.lanLis.length + 'px';

    _this.lanScrollBlocker.blockScroll();
  };

  var closeLanguages = function closeLanguages() {
    _this.lan.classList.remove('open');
    _this.lanUl.style.height = _this.lan.offsetHeight + 'px';
    $(_this.lanLis).each(function (i, li) {
      li.style.height = _this.lan.offsetHeight + 'px';
    });

    _this.lanScrollBlocker.openScroll();
  };

  if (g_isDesktop) addMouseListnersToLanguage();

  window.addEventListener('resize', _.throttle(function () {
    if (g_isDesktop) {
      addMouseListnersToLanguage();
    } else {
      removeMouseListnersToLanguage();
    }
  }, 150));

  this.animationHide = gsap.timeline({ paused: true });
  this.animationHide.to(this.lan, 0.3, { x: '-100%', opacity: 0 });

  this.hide = function (time) {
    if (time === 0) {
      _this.animationHide.pause(0.3);
    } else {
      _this.animationHide.play();
    }

    _this.lan.classList.add('hide');
  };
  this.show = function () {
    _this.animationHide.reverse();
    _this.lan.classList.remove('hide');
  };

  window.addEventListener('resize', _.throttle(function () {
    if (!search.search.classList.contains('opening')) {
      closeLanguages();
      if (g_isDesktop) {
        _this.show();
      } else {
        if (menu.menu.classList.contains('open')) {
          console.log('меню открыто');
          _this.show();
        } else {
          _this.hide();
        }
      }
    }
  }, 150));
};

var MotherMenu = function MotherMenu(menu, triggerBtn, closeBtn, subMenusFlag) {
  var _this2 = this;

  _classCallCheck(this, MotherMenu);

  this.menu = menu;
  this.triggerBtn = triggerBtn;

  // this.whiteLabel = subMenusFlag ? document.querySelector('#header__nav .white-label') : undefined;

  this.subMenusFlag = subMenusFlag;

  this.blockerScroll = new ScrollBlocker(this.menu);

  this.animation = gsap.timeline({ paused: true });
  this.animation.to(this.menu, { duration: 0.3, x: 0 }, 0);

  this.animationForWrap = gsap.timeline({ paused: true });
  this.animationForWrap.to($('section'), 0.3, { x: '-50%' }, 0).to($('.footer .footer-wrap'), 0.3, { x: '-50%' }, 0);
  // .to(this.whiteLabel, {duration: 0.3, x:0}, 0);

  // setTimeout(() => {
  //   this.animation.play();
  // }, 3000);


  this.animationHide = gsap.timeline({ paused: true });
  this.animationHide.to(this.triggerBtn, 0.3, { x: '100%', opacity: 0 });

  this.hide = function () {
    _this2.animationHide.play();
    _this2.triggerBtn.classList.add('hide');
  };
  this.show = function () {
    _this2.animationHide.reverse();
    _this2.triggerBtn.classList.remove('hide');
  };

  triggerBtn.addEventListener('click', function () {
    if (_this2.menu.classList.contains('open')) {
      _this2.close();
    } else {
      _this2.open();
    }

    if (triggerBtn.getAttribute('data-btn-id')) {
      _this2.triggerBtnM = g_openCloseBtns[triggerBtn.getAttribute('data-btn-id')];
    }
  });

  if (closeBtn) closeBtn.addEventListener('click', function () {
    if (_this2.menu.classList.contains('open')) {
      _this2.close();
    } else {
      _this2.open();
    }
  });

  this.open = function () {
    if (!g_isDesktop) {
      _this2.blockerScroll.blockScroll();
      _this2.animation.play();
      _this2.menu.classList.add('open');

      if (!_this2.subMenusFlag) {

        _this2.menu.style.top = '';
        var swt = g_clientH - _this2.menu.getBoundingClientRect().bottom;

        _this2.menu.style.top = _this2.menu.parentElement.parentElement.scrollTop + 'px';
      } else {
        document.querySelector('.header').classList.add('white');
        _this2.animationForWrap.play();

        if (!g_isDesktop) logo.hide();
        languages.show();
      }
    }

    // this.menu.addEventListener('scroll', (e)=> {
    //   console.dir(e);
    //   console.dir(this.menu.scrollTop);
    // })
    // console.log(this.menu.offsetTop );
    // console.log(this.menu.getBoundingClientRect().bottom);
  };
  this.close = function (time) {
    if (time === 0) {
      _this2.animation.pause(0);
      _this2.menu.classList.remove('open');
      _this2.blockerScroll.openScroll();
      if (_this2.subMenusFlag) {
        _this2.animationForWrap.pause(0);
      }
    } else {
      _this2.animation.reverse();
      _this2.menu.classList.remove('open');
      _this2.blockerScroll.openScroll();
      if (_this2.subMenusFlag) {
        _this2.animationForWrap.reverse();
      }
    }

    if (_this2.subMenusFlag) {
      if (!document.querySelector('.header').classList.contains('default-white')) document.querySelector('.header').classList.remove('white');
      logo.show();
      if (!g_isDesktop) languages.hide();
    }
  };

  var updateMenuForDesk = function updateMenuForDesk() {
    if (g_isDesktop) {
      $('li', _this2.menu).each(function (i, li) {
        var ul = li.querySelector('ul');

        if (ul) {
          // console.dir(ul);
          li.classList.add('long');
          if (ul.childElementCount > 4) {
            ul.style.width = '600px';
          }
          if (ul.childElementCount > 7) {
            ul.style.width = '900px';
          }
        }
      });
    }
  };
  updateMenuForDesk();

  if (this.subMenusFlag) {
    this.subMenus = [];
    var subMenus = this.menu.querySelectorAll(' li > ul');
    // console.dir(subMenus);

    $(subMenus).each(function (i, subMenu) {
      var trigger = subMenu.parentElement.querySelector('a');
      var closeBtn = document.createElement('a');
      closeBtn.innerHTML = trigger.innerHTML;
      var li = document.createElement('li');
      li.appendChild(closeBtn);
      subMenu.appendChild(li);

      trigger.addEventListener('click', function (e) {
        e.preventDefault();
      });
      closeBtn.addEventListener('click', function (e) {
        e.preventDefault();
      });

      _this2.subMenus.push(new MotherMenu(subMenu, trigger, closeBtn));
    });

    triggerBtn.addEventListener('click', function () {
      $(_this2.subMenus).each(function (i, subMenu) {
        subMenu.close();
      });
    });
  }

  var updateOnResize = function updateOnResize() {
    // console.log('bigResize', bigResize);

    if (bigResize && !search.search.classList.contains('opening')) {
      _this2.close();
      if (_this2.triggerBtnM) _this2.triggerBtnM.close();

      gsap.set(_this2.menu, { clearProps: 'all' });
      _this2.animation.clear();
      _this2.animation = gsap.timeline({ paused: true });
      _this2.animation.to(_this2.menu, { duration: 0.3, x: 0 });

      gsap.set($('section'), { clearProps: 'all' });
      gsap.set($('.footer .footer-wrap'), { clearProps: 'all' });
      _this2.animationForWrap.clear();
      _this2.animationForWrap = gsap.timeline({ paused: true });
      _this2.animationForWrap.to($('section'), 0.3, { x: '-50%' }, 0).to($('.footer .footer-wrap'), 0.3, { x: '-50%' }, 0);

      updateMenuForDesk();

      menuWidth = _this2.menu.offsetWidth;
      // console.log(this.animation);
    }
  };

  window.addEventListener('resize', _.throttle(updateOnResize, 150));
  window.addEventListener('orientationchange', _.throttle(updateOnResize, 150));

  /////////////////////////////////////// touchmove

  var touch = {};
  var menuWidth = this.menu.offsetWidth;
  var scrollTop = this.menu.scrollTop;
  var isTouch = false;
  var dierection = false;
  var procentX = 0;
  var deltaX = 0;
  var deltaY = 0;

  var footer = document.querySelector('.footer .footer-wrap');

  var rendering = function rendering(a, i, t) {
    if (isTouch && dierection === 'x') {

      // this.animation.progress((100 - procentX)/100).pause();
      _this2.menu.style.transform = 'translateX(' + deltaX + 'px)';
      if (subMenusFlag) {
        // this.whiteLabel.style.transform = `translateX(${deltaX}px)`;
        languages.animationHide.progress(procentX / 100).pause();
        logo.animationLogohide.progress((100 - procentX) / 100).pause();

        $('section').each(function (i, section) {
          section.style.transform = 'translateX(' + (-50 + procentX / 2) + '%)';
        });

        footer.style.transform = 'translateX(' + (-50 + procentX / 2) + '%)';
      }

      if (_this2.triggerBtnM) {
        _this2.triggerBtnM.animation.progress((100 - procentX) / 100).pause();
      }
    }
    // console.log(t);
  };

  var touchstartHandler = function touchstartHandler(e) {
    e.stopPropagation();
    if (_this2.menu.classList.contains('open')) {

      scrollTop = _this2.menu.scrollTop;
      isTouch = true;
      procentX = 0;
      touch.x = e.touches[0].clientX;
      touch.y = e.touches[0].clientY;

      gsap.ticker.add(rendering);
    }
  };

  var touchmoveHandler = function touchmoveHandler(e) {
    e.stopPropagation();
    if (_this2.menu.classList.contains('open')) {
      deltaX = e.touches[0].clientX - touch.x;
      deltaY = e.touches[0].clientY - touch.y;

      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (!dierection) {
          dierection = 'x';_this2.blockerScroll.fullBlock();
        }
      } else {
        if (!dierection) dierection = 'y';
      }

      if (dierection === 'x') {
        procentX = +(deltaX * 100 / menuWidth).toFixed(2);
        procentX = procentX > 0 ? procentX : 0;
        deltaX = deltaX > 0 ? deltaX : 0;
      }

      // console.log(procentX);
    }
  };

  var touchendHandler = function touchendHandler(e) {
    e.stopPropagation();
    dierection = false;isTouch = false;

    gsap.ticker.remove(rendering);

    if (procentX >= 30) {
      // this.close();
      if (_this2.triggerBtnM) _this2.triggerBtnM.close();
      if (subMenusFlag) logo.show();
      if (subMenusFlag) languages.hide();
      _this2.menu.style.transition = 'all 0.3s ease-in-out';
      // if(subMenusFlag) this.whiteLabel.style.transition = 'all 0.3s ease-in-out';
      _this2.menu.style.transform = 'translate3d(' + menuWidth + 'px,0,0)';
      // if(subMenusFlag) this.whiteLabel.style.transform = 'translate3d(' + menuWidth + 'px,0,0)';
      $('section').each(function (i, section) {
        section.style.transition = 'all 0.3s ease-in-out';
        section.style.transform = 'translateX(0)';
      });
      footer.style.transition = 'all 0.3s ease-in-out';
      footer.style.transform = 'translateX(0)';
      setTimeout(function () {
        _this2.menu.style.transition = '';_this2.close(0);
        $('section').each(function (i, section) {
          section.style.transition = '';
        });
        footer.style.transition = '';

        // if(subMenusFlag) this.whiteLabel.style.transition = ''; this.close(0);
      }, 300);
    } else if (procentX >= 1) {
      // this.open();
      if (subMenusFlag) logo.hide();
      if (subMenusFlag) languages.show();
      if (_this2.triggerBtnM) _this2.triggerBtnM.open();
      _this2.menu.style.transition = 'all 0.3s ease-in-out';
      // if(subMenusFlag) this.whiteLabel.style.transition = 'all 0.3s ease-in-out';
      _this2.menu.style.transform = 'translate3d(' + 0 + 'px,0,0)';
      // if(subMenusFlag) this.whiteLabel.style.transform = 'translate3d(' + 0 + 'px,0,0)';
      $('section').each(function (i, section) {
        section.style.transition = 'all 0.3s ease-in-out';
        section.style.transform = 'translateX(-50%)';
      });
      footer.style.transition = 'all 0.3s ease-in-out';
      footer.style.transform = 'translateX(-50%)';
      setTimeout(function () {
        _this2.menu.style.transition = '';
        // if(subMenusFlag) this.whiteLabel.style.transition = '';
        $('section').each(function (i, section) {
          section.style.transition = '';
        });
        footer.style.transition = '';
      }, 300);
    }
    _this2.blockerScroll.openScroll();
    _this2.blockerScroll.blockScroll();
  };

  this.menu.addEventListener('touchstart', touchstartHandler);
  this.menu.addEventListener('touchmove', touchmoveHandler);
  this.menu.addEventListener('touchend', touchendHandler);
};

var Search = function Search(search) {
  var _this3 = this;

  _classCallCheck(this, Search);

  // console.log(logo);
  this.search = search;
  this.sheet = search.querySelector('.search__sheet');
  this.btnSearch = search.querySelector('.search-btn');
  this.btnClose = search.querySelector('.close-btn');
  this.input = search.querySelector('input');
  this.blur = search.querySelector('.bg-blur');
  this.srchScrollBlocker = new ScrollBlocker(this.sheet);
  this.btnSearch.addEventListener('click', function (event) {
    event.preventDefault();
    event.stopPropagation();
    _this3.open();
  });

  this.btnClose.addEventListener('click', function (event) {
    event.preventDefault();
    event.stopPropagation();

    _this3.close();
  });

  this.open = function () {
    _this3.srchScrollBlocker.blockScroll();
    _this3.animationOpen.play();
    _this3.search.classList.add('open');
    // console.dir(logo);
    _this3.search.classList.add('opening');
    setTimeout(function () {
      _this3.search.classList.remove('opening');
    }, 300);
    _this3.input.focus();
    if (!g_isDesktop) logo.hide();
    if (!g_isDesktop) menu.hide();
    if (!g_isDesktop) languages.hide();
    if (!g_isDesktop) uiSystem.hide();
  };
  this.close = function () {
    _this3.input.blur();
    _this3.srchScrollBlocker.openScroll();
    _this3.animationOpen.reverse();
    _this3.search.classList.remove('open');
    if (!menu.triggerBtn.classList.contains('open')) {
      logo.show();
    } else {
      languages.show();
    }

    menu.show();
    uiSystem.show();
  };

  this.blur.addEventListener('click', function () {
    _this3.close();
  });

  var createAnim = function createAnim() {

    _this3.animationOpen = gsap.timeline({ paused: true });

    if (g_isDesktop) {
      var nav = document.querySelector('#header__nav');
      var leftNav = g_offset(nav).left;
      var leftSearch = g_offset(_this3.search).left;
      var width = leftSearch - leftNav;
      _this3.animationOpen.to(_this3.sheet, 0.3, { right: 0, left: -width }, 0).to(_this3.btnClose, 0.3, { width: 45 }, 0).to(_this3.input, 0.3, { opacity: 1, display: "block" }, 0);
      // .to(this.btnSearch, 0, {x:-10}, 0);
    } else {
      _this3.animationOpen.to(_this3.sheet, 0.3, { right: 0, left: 0 }, 0).to(_this3.btnClose, 0.3, { width: 45 }, 0);
    }
  };

  createAnim();

  window.addEventListener('resize', _.throttle(function () {
    if (!_this3.search.classList.contains('opening')) {
      _this3.close();

      gsap.set(_this3.sheet, { clearProps: 'all' });
      gsap.set(_this3.btnClose, { clearProps: 'all' });
      gsap.set(_this3.input, { clearProps: 'all' });
      _this3.animationOpen.clear();
      createAnim();
    }
  }, 150));
};

var Logo = function Logo(logo) {
  var _this4 = this;

  _classCallCheck(this, Logo);

  this.logo = logo;

  this.animationLogohide = gsap.timeline({ paused: true });
  this.animationLogohide.to(this.logo, 0.3, { y: '-100%' });

  this.hide = function () {
    _this4.animationLogohide.play();
    _this4.logo.classList.add('hide');
  };
  this.show = function () {
    _this4.animationLogohide.reverse();
    _this4.logo.classList.remove('hide');
  };
};

var UiSystem = function UiSystem(uiSystem) {
  var _this5 = this;

  _classCallCheck(this, UiSystem);

  this.uiSystem = uiSystem;

  this.animationHide = gsap.timeline({ paused: true });
  this.animationHide.to(this.uiSystem, 0.3, { x: '100%', opacity: 0 });

  this.hide = function () {
    _this5.animationHide.play();
    _this5.uiSystem.classList.add('hide');
  };
  this.show = function () {
    _this5.animationHide.reverse();
    _this5.uiSystem.classList.remove('hide');
  };
};