'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

$(document).ready(function () {
    _update_global_vars();
    // document.querySelector('body').style.setProperty( '--vh1', `${g_vh}px` );
    $('.open-close-btn').each(function (i, openCloseBtn) {
        g_openCloseBtns.push(new OpenCloseBtn(openCloseBtn, i));
    });

    dataPickers = document.querySelectorAll('.data-picker-wrap');
    $(dataPickers).each(function (i, dataPicker) {
        new DataPicker(dataPicker);
    });
});

window.addEventListener('resize', _.throttle(_update_global_vars, 150));
window.addEventListener('orientationchange', _.throttle(_update_global_vars, 150));

var g_desktop = 1366;
var g_openCloseBtns = [];
var gSecFirstHeight = document.documentElement.clientHeight;
var g_wrap = document.querySelector('.main-wrap');
var dataPickers = void 0;
var g_rem = void 0,
    g_innerW = void 0,
    g_innerH = void 0,
    g_vw = void 0,
    g_vh = void 0,
    g_clientW = void 0,
    g_clientH = void 0,
    g_isDesktop = void 0,
    g_asideW = void 0;
var g_vh1 = +(window.innerHeight * 0.01).toFixed(3);
var g_vh2 = +(window.innerHeight * 0.01).toFixed(3);
var bigResize = false;

function _update_global_vars() {
    g_rem = parseInt($('html').css('fontSize'));

    g_innerW = window.innerWidth;
    g_innerH = window.innerHeight;

    g_vw = +(g_innerW * 0.01).toFixed(3);
    g_vh = +(g_innerH * 0.01).toFixed(3);

    if (Math.abs(g_vh2 - g_vh) > 1.5) {
        bigResize = true;
        g_vh2 = g_vh;
        setTimeout(function () {
            bigResize = false;
        }, 300);
    }

    g_vh1 = Math.abs(g_vh1 - g_vh) > 1.5 ? g_vh : g_vh1;

    g_clientW = document.documentElement.clientWidth;
    g_clientH = document.documentElement.clientHeight;

    g_isDesktop = g_innerW < g_desktop ? false : true;

    g_asideW = (g_clientW - document.querySelector('.container').offsetWidth) / 2;
    // console.log(document.querySelector('.container').offsetWidth);

    document.querySelector('body').style.setProperty('--vh', g_vh + 'px');
    document.querySelector('body').style.setProperty('--vh1', g_vh1 + 'px');

    console.log('%cGlobal vars were updated', 'background: #6E038C; color: #fff; padding: 10px; font-weight: 700;');
}

function g_offset(element) {
    var offsetElement = element,
        offsetLeft = offsetElement.offsetLeft,
        offsetTop = offsetElement.offsetTop;

    while (offsetElement = offsetElement.offsetParent) {
        offsetLeft += offsetElement.offsetLeft;
    }offsetElement = element;

    while (offsetElement = offsetElement.offsetParent) {
        offsetTop += offsetElement.offsetTop;
    }return { top: offsetTop, left: offsetLeft };
}

function g_getToday(sp) {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //As January is 0.
    var yyyy = today.getFullYear();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    return dd + sp + mm + sp + yyyy;
};

function g_getNeededDay(date, sp) {
    var dd = date.getDate();
    var mm = date.getMonth() + 1; //As January is 0.
    var yyyy = date.getFullYear();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    return dd + sp + mm + sp + yyyy;
}

function findFather(item, classNameParent) {
    var current = item;
    if (current.parentElement) {
        while (!current.parentElement.classList.contains(classNameParent)) {
            current = current.parentElement;
            if (!current.parentElement) return null;
        }
        return current.parentElement;
    }
}

var ScrollBlocker = function () {
    function ScrollBlocker(scroller) {
        var _this = this;

        _classCallCheck(this, ScrollBlocker);

        this.scroller = scroller;
        this.startPoint = {};
        this.nowPoint;
        this.ldelay;
        this.handlerTouchmove = function (event) {
            // event.preventDefault();
            event.stopPropagation();
            var otk = {};
            _this.nowPoint = event.changedTouches[0];

            otk.y = _this.nowPoint.pageY - _this.startPoint.y;
            otk.x = _this.nowPoint.pageX - _this.startPoint.x;

            // 
            var offsetHeight = scroller.offsetHeight;
            var scrollTop = scroller.scrollTop;
            var scrollHeight = scroller.scrollHeight;
            // 
            // 


            if (Math.abs(otk.x) < Math.abs(otk.y) && offsetHeight + scrollTop + 1 >= scrollHeight && otk.y < 0) {
                // 
                event.preventDefault ? event.preventDefault() : event.returnValue = false;
            }
            // 
            if (Math.abs(otk.x) < Math.abs(otk.y) && scrollTop <= 0 && otk.y > 0) {
                // 
                event.preventDefault ? event.preventDefault() : event.returnValue = false;
            }
        };

        this.handlerTouchStart = function (event) {
            // event.preventDefault();
            event.stopPropagation();

            _this.startPoint.y = event.changedTouches[0].pageY;
            _this.startPoint.x = event.changedTouches[0].pageX;
            _this.ldelay = new Date();
        };
        this.handlerWheel = function (e) {
            e = e || window.event;
            // console.log('wheel');
            e.stopPropagation();
            // e.preventDefault ? e.preventDefault() : (e.returnValue = false);
            var delta = e.deltaY || e.detail || e.wheelDelta;
            var offsetHeight = scroller.offsetHeight;
            var scrollTop = scroller.scrollTop;
            var scrollHeight = scroller.scrollHeight;

            // console.log(delta);
            // 
            // 
            // 
            if (offsetHeight + scrollTop + 1 >= scrollHeight && delta > 0) {
                // 
                event.preventDefault ? event.preventDefault() : event.returnValue = false;
            }
            if (scrollTop <= 0 && delta < 0) {
                // 
                event.preventDefault ? event.preventDefault() : event.returnValue = false;
            }

            // e.stopPropagation();
            // 
        };
        this.blockMF = function (e) {
            e = e || window.event;
            // e.stopPropagation();
            e.preventDefault ? e.preventDefault() : e.returnValue = false;
            return false;
        };
    }

    _createClass(ScrollBlocker, [{
        key: 'blockScroll',
        value: function blockScroll() {
            //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            window.addEventListener('wheel', this.blockMF, { passive: false });
            window.addEventListener('touchmove', this.blockMF, { passive: false });

            this.scroller.addEventListener('touchstart', this.handlerTouchStart, { passive: false });
            this.scroller.addEventListener('touchmove', this.handlerTouchmove, { passive: false });
            this.scroller.addEventListener('wheel', this.handlerWheel, { passive: false });
        }
    }, {
        key: 'openScroll',
        value: function openScroll() {
            this.scroller.removeEventListener('touchstart', this.handlerTouchStart, { passive: false });
            this.scroller.removeEventListener('touchmove', this.handlerTouchmove, { passive: false });
            this.scroller.removeEventListener('wheel', this.handlerWheel, { passive: false });

            this.scroller.removeEventListener('wheel', this.blockMF, { passive: false });
            this.scroller.removeEventListener('touchmove', this.blockMF, { passive: false });

            window.removeEventListener('wheel', this.blockMF, { passive: false });
            window.removeEventListener('touchmove', this.blockMF, { passive: false });
        }
    }, {
        key: 'fullBlock',
        value: function fullBlock() {
            this.openScroll();
            // console.log('gull block');
            window.addEventListener('wheel', this.blockMF, { passive: false });
            window.addEventListener('touchmove', this.blockMF, { passive: false });
            this.scroller.addEventListener('wheel', this.blockMF, { passive: false });
            this.scroller.addEventListener('touchmove', this.blockMF, { passive: false });
        }
    }]);

    return ScrollBlocker;
}();

var OpenCloseBtn = function () {
    function OpenCloseBtn(btn, id) {
        var _this2 = this;

        _classCallCheck(this, OpenCloseBtn);

        this.btn = btn;
        this.id = id;

        this.btn.setAttribute('data-btn-id', this.id);

        this.sp1 = this.btn.querySelector('.sp-1');
        this.sp2 = this.btn.querySelector('.sp-2');
        this.spCenter = this.btn.querySelector('.sp-center');

        this.animation = gsap.timeline({ paused: true }); //create the timeline
        this.animation.to(this.sp1, { duration: 0.2, rotation: '+=90', ease: "none" }, 0).to(this.sp1, { duration: 0.1, rotation: '+=45', ease: "none" }, 0.2).to(this.sp1, { duration: 0.1, left: '+=-10%', ease: "power1.out" }, 0).to(this.sp1, { duration: 0.2, top: '+=-10%', ease: "power1.out" }, 0).to(this.sp1, { duration: 0.2, left: '50%', ease: "power1.out" }, 0.1).to(this.sp1, { duration: 0.1, top: '50%', ease: "power1.out" }, 0.2).to(this.sp2, { duration: 0.2, rotation: '+=-90', ease: "none" }, 0).to(this.sp2, { duration: 0.1, rotation: '+=-45', ease: "none" }, 0.2).to(this.sp2, { duration: 0.1, left: '+=10%', ease: "power1.out" }, 0).to(this.sp2, { duration: 0.2, top: '+=10%', ease: "power1.out" }, 0).to(this.sp2, { duration: 0.2, left: '50%', ease: "power1.out" }, 0.1).to(this.sp2, { duration: 0.1, top: '50%', ease: "power1.out" }, 0.2).to(this.spCenter, { duration: 0.1, left: '50%', x: '0', width: '0', opacity: '0', ease: Power3.easeInOut }, 0);

        this.animationHover = gsap.timeline({ paused: true });
        this.animationHover.to(this.sp1, { duration: 0.2, width: '+=10%', ease: "none" }, 0).to(this.sp2, { duration: 0.2, width: '+=10%', ease: "none" }, 0);

        this.btn.addEventListener('click', function (e) {
            e.stopPropagation();
            _this2.btn.classList.toggle('open');
            if (_this2.btn.classList.contains('open')) {
                _this2.animation.play();
            } else {
                _this2.animation.reverse();
            }
        });

        this.btn.addEventListener('mouseenter', function () {
            if (g_isDesktop) {
                _this2.btn.classList.add('hover');
                _this2.animationHover.play();
            }
        });
        this.btn.addEventListener('mouseleave', function () {
            if (g_isDesktop) {
                _this2.btn.classList.remove('hover');
                _this2.animationHover.reverse();
            }
        });

        window.addEventListener('resize', _.throttle(function () {
            gsap.set(_this2.sp1, { clearProps: 'all' });
            gsap.set(_this2.sp2, { clearProps: 'all' });
            gsap.set(_this2.spCenter, { clearProps: 'all' });
            _this2.animation.clear();
            _this2.animationHover.clear();
            _this2.animation = gsap.timeline({ paused: true });
            _this2.animation.to(_this2.sp1, { duration: 0.2, rotation: '+=90', ease: "none" }, 0).to(_this2.sp1, { duration: 0.1, rotation: '+=45', ease: "none" }, 0.2).to(_this2.sp1, { duration: 0.1, left: '+=-10%', ease: "power1.out" }, 0).to(_this2.sp1, { duration: 0.2, top: '+=-10%', ease: "power1.out" }, 0).to(_this2.sp1, { duration: 0.2, left: '50%', ease: "power1.out" }, 0.1).to(_this2.sp1, { duration: 0.1, top: '50%', ease: "power1.out" }, 0.2).to(_this2.sp2, { duration: 0.2, rotation: '+=-90', ease: "none" }, 0).to(_this2.sp2, { duration: 0.1, rotation: '+=-45', ease: "none" }, 0.2).to(_this2.sp2, { duration: 0.1, left: '+=10%', ease: "power1.out" }, 0).to(_this2.sp2, { duration: 0.2, top: '+=10%', ease: "power1.out" }, 0).to(_this2.sp2, { duration: 0.2, left: '50%', ease: "power1.out" }, 0.1).to(_this2.sp2, { duration: 0.1, top: '50%', ease: "power1.out" }, 0.2).to(_this2.spCenter, { duration: 0.1, left: '50%', x: '0', width: '0', opacity: '0', ease: Power3.easeInOut }, 0);
            _this2.animationHover = gsap.timeline({ paused: true });
            _this2.animationHover.to(_this2.sp1, { duration: 0.2, width: '+=10%', ease: "none" }, 0).to(_this2.sp2, { duration: 0.2, width: '+=10%', ease: "none" }, 0);

            if (_this2.btn.classList.contains('open')) {
                _this2.animation.pause(0.3);
            }
        }, 150));
    }

    _createClass(OpenCloseBtn, [{
        key: 'close',
        value: function close() {
            this.animation.reverse();
            this.btn.classList.remove('open');
        }
    }, {
        key: 'open',
        value: function open() {
            this.animation.play();
            this.btn.classList.add('open');
        }
    }, {
        key: 'reverse',
        value: function reverse(time) {
            if (time == 0) {
                this.animation.pause(0);
            } else {
                this.animation.reverse();
            }
            this.btn.classList.remove('open');
        }
    }]);

    return OpenCloseBtn;
}();

var DataPicker = function DataPicker(dataPickerWrap) {
    var _this3 = this;

    _classCallCheck(this, DataPicker);

    this.dataPickerWrap = dataPickerWrap;
    this.lng = dataPickerWrap.getAttribute('data-lang');
    this.el = dataPickerWrap.querySelector('.picker');
    this.input = dataPickerWrap.querySelector('.data-input');
    this.label = dataPickerWrap.querySelector('.toggle-label');
    this.labelInputed = dataPickerWrap.querySelector('.toggle-label .inputed');
    this.createDataPicker = function () {
        if (g_isDesktop) {
            if (!_this3.picker) {
                console.log('create');
                _this3.picker = new WindowDatePicker({
                    el: _this3.el,
                    toggleEl: _this3.label,
                    inputEl: _this3.input,
                    type: "DATE",
                    dateType: "DD/MM/YYYY",
                    lang: _this3.lng
                });
            }

            _this3.picker.el.addEventListener('wdp.change', function () {
                _this3.labelInputed.innerHTML = _this3.picker.get().value.replace('/', '.').replace('/', '.');
            });

            _this3.picker.set(g_getToday('-'));
        } else {
            _this3.input.addEventListener('focus', function () {
                _this3.label.classList.add('wdp-active');
            });
            _this3.input.addEventListener('blur', function () {
                _this3.label.classList.remove('wdp-active');
            });
            if (_this3.picker) {
                _this3.picker.destroy();
                _this3.picker = null;
                console.log('destroy');
            }
            _this3.input.addEventListener('change', function () {
                // console.log('change by input');
                // console.dir(this.input);
                // console.dir(this.input.valueAsDate);
                // console.dir(this.input.valueAsDate.getDate());
                _this3.labelInputed.innerHTML = g_getNeededDay(_this3.input.valueAsDate, '.');
            });
        }

        _this3.labelInputed.innerHTML = g_getToday('.');
    };
    this.createDataPicker();
    window.addEventListener('resize', _.throttle(this.createDataPicker, 150));
    window.addEventListener('orientationchange', _.throttle(this.createDataPicker, 150));
};