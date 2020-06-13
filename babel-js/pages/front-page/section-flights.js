'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var flightsMoreInfo = void 0;
$(document).ready(function () {
  flightsMoreInfo = new MoreInfoForFlightsTable(document.querySelector('.flights-more-info'));

  var tableItems = document.querySelectorAll('.flights-table .flights-item');

  $(tableItems).each(function (i, tableItem) {
    tableItem.addEventListener('click', function () {
      if (!flightsMoreInfo.flightsMoreInfo.classList.contains('open')) {
        flightsMoreInfo.open();
      }
    });
  });
});

var MoreInfoForFlightsTable = function MoreInfoForFlightsTable(flightsMoreInfo) {
  var _this = this;

  _classCallCheck(this, MoreInfoForFlightsTable);

  this.flightsMoreInfo = flightsMoreInfo;

  this.btnBack = flightsMoreInfo.querySelector('.btn-back');
  this.blockerScroll = new ScrollBlocker(flightsMoreInfo);

  var header = document.querySelector('#header');

  var buildAnimation = function buildAnimation() {
    _this.animation = gsap.timeline({ paused: true });
    if (g_isDesktop) {
      _this.animation.to(_this.flightsMoreInfo, 0.6, { alpha: 1 }, 0).to($('.main-wrap'), 0.5, { x: -(g_clientW - 120), alpha: 0.3, boxShadow: '0 0 30px 3px rgba(0,0,0,0.3)', ease: Power1.easeInOut }, 0).to($('.section-flights .container'), 0.5, { x: 100 + g_asideW }, 0);
    } else {
      _this.animation.to(_this.flightsMoreInfo, 0.3, { x: 0 }, 0).to($('section'), 0.3, { x: '-50%' }, 0);
    }
  };
  buildAnimation();

  this.animationHover = gsap.timeline({ paused: true });

  this.animationHover.to($('.main-wrap'), 0.3, { alpha: 0.6, ease: Power0.easeNone }, 0);

  var mouseEnterHandler = function mouseEnterHandler() {
    _this.animationHover.play();
  };
  var mouseLeaveHandler = function mouseLeaveHandler() {
    _this.animationHover.reverse();
  };

  this.open = function () {
    _this.flightsMoreInfo.classList.add('open');
    _this.animation.play();
    _this.blockerScroll.blockScroll();

    header.classList.add('white');

    setTimeout(function () {
      g_wrap.addEventListener('click', _this.close);
      g_wrap.addEventListener('mouseenter', mouseEnterHandler);
      g_wrap.addEventListener('mouseleave', mouseLeaveHandler);
      g_wrap.classList.add('shifted');
      // setTimeout(()=>{
      //   g_wrap.classList.add('on-hover');
      // }, 150);

      // g_wrap.style.cursor = 'pointer';
    }, 100);
  };
  this.close = function (time) {
    if (!header.classList.contains('default-white')) {
      header.classList.remove('white');
    }
    _this.flightsMoreInfo.classList.remove('open');
    if (time === 0) {
      _this.animation.pause(0);
    } else {
      _this.animation.reverse();
    }

    _this.blockerScroll.openScroll();
    // g_wrap.style.cursor = 'default';
    g_wrap.removeEventListener('click', _this.close);
    g_wrap.removeEventListener('mouseenter', mouseEnterHandler);
    g_wrap.removeEventListener('mouseleave', mouseLeaveHandler);
    mouseLeaveHandler();
    g_wrap.classList.remove('shifted');
    // g_wrap.classList.remove('on-hover');

    if (g_isDesktop) {
      setTimeout(function () {
        $('.section-flights .container').css({ transform: '' });
      }, 800);
    }
  };

  this.btnBack.addEventListener('click', function () {
    if (_this.flightsMoreInfo.classList.contains('open')) {
      _this.close();
    }
  });

  var updateOnResizeHandler = function updateOnResizeHandler(e) {
    menuWidth = _this.flightsMoreInfo.offsetWidth;
    gsap.set(_this.flightsMoreInfo, { clearProps: 'all' });
    gsap.set($('section'), { clearProps: 'all' });
    gsap.set(g_wrap, { clearProps: 'all' });
    gsap.set($('.section-flights .container'), { clearProps: 'all' });
    _this.animation.clear();
    buildAnimation();
    if (g_isDesktop) {
      if (_this.flightsMoreInfo.classList.contains('open')) {
        _this.animation.pause(0.6);
      }
    } else {
      if (_this.flightsMoreInfo.classList.contains('open')) {
        _this.animation.pause(0.3);
      }
      // document.querySelector('.section-first').style.height = gSecFirstHeight + 'px';        
    }
  };

  window.addEventListener('resize', _.throttle(updateOnResizeHandler, 150));
  window.addEventListener('orientationchange', _.throttle(updateOnResizeHandler, 150));
  window.addEventListener('orientationchange', _.throttle(function () {
    // setTimeout(()=>{
    // document.querySelector('body').style.setProperty( '--vh1', `${g_vh}px` );
    // }, 150);

  }, 150));

  //---------------touchmove
  var touch = {};
  var menuWidth = this.flightsMoreInfo.offsetWidth;
  var isTouch = false;
  var dierection = false;
  var procentX = 0;
  var deltaX = 0;
  var deltaY = 0;

  var rendering = function rendering(a, i, t) {
    if (isTouch && dierection === 'x') {

      // this.animation.progress((100 - procentX)/100).pause();
      // console.log(procentX);
      _this.flightsMoreInfo.style.transform = 'translateX(' + deltaX + 'px)';

      $('section').each(function (i, section) {
        section.style.transform = 'translateX(' + (-50 + procentX / 2) + '%)';
      });
    }
  };

  var touchstartHandler = function touchstartHandler(e) {
    e.stopPropagation();
    if (_this.flightsMoreInfo.classList.contains('open') && !g_isDesktop) {

      // scrollTop = this.flightsMoreInfo.scrollTop;
      isTouch = true;
      procentX = 0;
      touch.x = e.touches[0].clientX;
      touch.y = e.touches[0].clientY;

      gsap.ticker.add(rendering);
    }
  };

  var touchmoveHandler = function touchmoveHandler(e) {
    e.stopPropagation();
    if (_this.flightsMoreInfo.classList.contains('open') && !g_isDesktop) {
      deltaX = e.touches[0].clientX - touch.x;
      deltaY = e.touches[0].clientY - touch.y;

      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (!dierection) {
          dierection = 'x';_this.blockerScroll.fullBlock();
        }
      } else {
        if (!dierection) dierection = 'y';
      }

      if (dierection === 'x') {
        procentX = +(deltaX * 100 / menuWidth).toFixed(2);
        procentX = procentX > 0 ? procentX : 0;
        procentX = procentX < 100 ? procentX : 100;
        deltaX = deltaX > 0 ? deltaX : 0;
      }

      // console.log(procentX);
    }
  };

  var touchendHandler = function touchendHandler(e) {
    e.stopPropagation();
    // if(!g_isDesktop) {

    // }
    dierection = false;isTouch = false;

    gsap.ticker.remove(rendering);

    if (procentX >= 30) {

      console.log('procentX >= 30');
      _this.flightsMoreInfo.style.transition = 'all 0.3s ease-in-out';
      _this.flightsMoreInfo.style.transform = 'translate3d(' + menuWidth + 'px,0,0)';

      $('section').each(function (i, section) {
        section.style.transition = 'all 0.3s ease-in-out';
        section.style.transform = 'translateX(0)';
      });

      setTimeout(function () {
        _this.flightsMoreInfo.style.transition = '';_this.close(0);
        $('section').each(function (i, section) {
          section.style.transition = '';
        });
      }, 300);
    } else if (procentX >= 1) {

      _this.flightsMoreInfo.style.transition = 'all 0.3s ease-in-out';
      _this.flightsMoreInfo.style.transform = 'translate3d(' + 0 + 'px,0,0)';

      $('section').each(function (i, section) {
        section.style.transition = 'all 0.3s ease-in-out';
        section.style.transform = 'translateX(-50%)';
      });

      setTimeout(function () {
        _this.flightsMoreInfo.style.transition = '';
        $('section').each(function (i, section) {
          section.style.transition = '';
        });
      }, 300);
    }
    _this.blockerScroll.openScroll();
    _this.blockerScroll.blockScroll();
  };

  this.flightsMoreInfo.addEventListener('touchstart', touchstartHandler);
  this.flightsMoreInfo.addEventListener('touchmove', touchmoveHandler);
  this.flightsMoreInfo.addEventListener('touchend', touchendHandler);
};