$(document).ready( function() {
    _update_global_vars();
    // document.querySelector('body').style.setProperty( '--vh1', `${g_vh}px` );
    $('.open-close-btn').each((i, openCloseBtn)=>{
        g_openCloseBtns.push(new OpenCloseBtn(openCloseBtn, i));
    });

    dataPickers = document.querySelectorAll('.data-picker-wrap');
    $(dataPickers).each( (i, dataPicker) => {
        new DataPicker(dataPicker);
    } );

} );

window.addEventListener('resize', _.throttle(_update_global_vars, 150));
window.addEventListener('orientationchange', _.throttle(_update_global_vars, 150));

const g_desktop = 1366;
const g_openCloseBtns = [];
let gSecFirstHeight = document.documentElement.clientHeight;
const g_wrap =  document.querySelector('.main-wrap');
let dataPickers;
let g_rem, g_innerW, g_innerH, g_vw, g_vh, g_clientW, g_clientH, g_isDesktop, g_asideW;
let g_vh1 = +( window.innerHeight * 0.01 ).toFixed(3);
let g_vh2 = +( window.innerHeight * 0.01 ).toFixed(3);
let bigResize = false;

function _update_global_vars() {
    g_rem = parseInt( $('html').css('fontSize') );

    g_innerW = window.innerWidth;
    g_innerH = window.innerHeight;

    g_vw = +( g_innerW * 0.01 ).toFixed(3);
    g_vh = +( g_innerH * 0.01 ).toFixed(3);

    
    if(Math.abs(g_vh2 - g_vh) > 1.5) {
        bigResize = true;
        g_vh2 = g_vh;
        setTimeout(()=> {
            bigResize = false; 
        }, 300);
    }
    

    g_vh1 = (Math.abs(g_vh1 - g_vh) > 1.5 ) ? g_vh : g_vh1;
    

    g_clientW = document.documentElement.clientWidth;
    g_clientH = document.documentElement.clientHeight;

    g_isDesktop = ( g_innerW < g_desktop ) ? false : true;

    g_asideW = (g_clientW - document.querySelector('.container').offsetWidth)/2;
    // console.log(document.querySelector('.container').offsetWidth);

    document.querySelector('body').style.setProperty( '--vh', `${g_vh}px` );
    document.querySelector('body').style.setProperty( '--vh1', `${g_vh1}px` );

    console.log('%cGlobal vars were updated', 'background: #6E038C; color: #fff; padding: 10px; font-weight: 700;');
}

function g_offset(element){
    let offsetElement = element,
        offsetLeft = offsetElement.offsetLeft,
        offsetTop = offsetElement.offsetTop;

    while (offsetElement = offsetElement.offsetParent)
        offsetLeft += offsetElement.offsetLeft;

    offsetElement = element;

    while (offsetElement=offsetElement.offsetParent)
        offsetTop += offsetElement.offsetTop;

    return {top: offsetTop, left: offsetLeft};
}

function g_getToday(sp){
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1; //As January is 0.
    let yyyy = today.getFullYear();
    
    if(dd<10) dd='0'+dd;
    if(mm<10) mm='0'+mm;
    return (dd+sp+mm+sp+yyyy);
};

function g_getNeededDay(date, sp) {
    let dd = date.getDate();
    let mm = date.getMonth()+1; //As January is 0.
    let yyyy = date.getFullYear();

    if(dd<10) dd='0'+dd;
    if(mm<10) mm='0'+mm;
    return (dd+sp+mm+sp+yyyy);
}

function findFather(item, classNameParent) {
    let current = item;
    if(current.parentElement) {
        while(!current.parentElement.classList.contains(classNameParent)) {
            current = current.parentElement;
            if(!current.parentElement) return null;
        }
        return current.parentElement
    }
}

class ScrollBlocker {
    constructor(scroller){
        this.scroller = scroller;
        this.startPoint={};
        this.nowPoint;
        this.ldelay;
        this.handlerTouchmove = (event)=> {
            // event.preventDefault();
            event.stopPropagation();
            var otk={};
            this.nowPoint=event.changedTouches[0];
        
            otk.y=this.nowPoint.pageY-this.startPoint.y;
            otk.x=this.nowPoint.pageX-this.startPoint.x;
        
            // 
            var offsetHeight = scroller.offsetHeight;
            var scrollTop = scroller.scrollTop;
            var scrollHeight = scroller.scrollHeight;
            // 
            // 
            
            
            if(Math.abs(otk.x) < Math.abs(otk.y) && offsetHeight + scrollTop + 1 >= scrollHeight && otk.y < 0) {
                // 
                event.preventDefault ? event.preventDefault() : (event.returnValue = false);
            }
            // 
            if( Math.abs(otk.x) < Math.abs(otk.y) && scrollTop <= 0 && otk.y > 0) {
                // 
                event.preventDefault ? event.preventDefault() : (event.returnValue = false);
            }
        }

        this.handlerTouchStart = (event)=> {
            // event.preventDefault();
            event.stopPropagation();

            this.startPoint.y=event.changedTouches[0].pageY;
            this.startPoint.x=event.changedTouches[0].pageX;
            this.ldelay=new Date();
        }
        this.handlerWheel = (e)=> {
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
            if(offsetHeight + scrollTop + 1 >= scrollHeight && delta > 0) {
                // 
                event.preventDefault ? event.preventDefault() : (event.returnValue = false);
            }
            if(scrollTop <= 0 && delta < 0) {
                // 
                event.preventDefault ? event.preventDefault() : (event.returnValue = false);
            }

            // e.stopPropagation();
            // 
        }
        this.blockMF = (e) => {
            e = e || window.event;
            // e.stopPropagation();
            e.preventDefault ? e.preventDefault() : (e.returnValue = false);
            return false;
        }
    }

    blockScroll(){
        //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        window.addEventListener('wheel', this.blockMF, {passive: false});
        window.addEventListener('touchmove', this.blockMF, {passive: false});

        this.scroller.addEventListener('touchstart', this.handlerTouchStart, {passive: false});
        this.scroller.addEventListener('touchmove', this.handlerTouchmove, {passive: false});
        this.scroller.addEventListener('wheel', this.handlerWheel, {passive: false});
        
        
    }

    openScroll(){
        this.scroller.removeEventListener('touchstart', this.handlerTouchStart, {passive: false});
        this.scroller.removeEventListener('touchmove', this.handlerTouchmove, {passive: false});
        this.scroller.removeEventListener('wheel', this.handlerWheel, {passive: false});

        this.scroller.removeEventListener('wheel', this.blockMF, {passive: false});
        this.scroller.removeEventListener('touchmove', this.blockMF, {passive: false});

        window.removeEventListener('wheel', this.blockMF, {passive: false});
        window.removeEventListener('touchmove', this.blockMF, {passive: false});
    }

    fullBlock() {
        this.openScroll();
        // console.log('gull block');
        window.addEventListener('wheel', this.blockMF, {passive: false});
        window.addEventListener('touchmove', this.blockMF, {passive: false});
        this.scroller.addEventListener('wheel', this.blockMF, {passive: false});
        this.scroller.addEventListener('touchmove', this.blockMF, {passive: false});
    }
}

class OpenCloseBtn {
    constructor(btn, id) {
        this.btn = btn;
        this.id = id;

        this.btn.setAttribute('data-btn-id', this.id);

        this.sp1 = this.btn.querySelector('.sp-1');
        this.sp2 = this.btn.querySelector('.sp-2');
        this.spCenter = this.btn.querySelector('.sp-center');
        
        this.animation = gsap.timeline({paused: true}); //create the timeline
        this.animation
            .to(this.sp1, {duration: 0.2, rotation: '+=90', ease: "none"} , 0)
            .to(this.sp1, {duration: 0.1, rotation: '+=45', ease: "none"}, 0.2)
            .to(this.sp1, {duration: 0.1, left: '+=-10%', ease: "power1.out"}, 0)
            .to(this.sp1, {duration: 0.2, top: '+=-10%', ease: "power1.out"}, 0)
            .to(this.sp1, {duration: 0.2, left: '50%', ease: "power1.out"}, 0.1)
            .to(this.sp1, {duration: 0.1, top: '50%', ease: "power1.out"}, 0.2)
            
            .to(this.sp2, {duration: 0.2, rotation: '+=-90', ease: "none"}, 0)
            .to(this.sp2, {duration: 0.1, rotation: '+=-45', ease: "none"}, 0.2)
            .to(this.sp2, {duration: 0.1, left: '+=10%', ease: "power1.out"}, 0)
            .to(this.sp2, {duration: 0.2, top: '+=10%', ease: "power1.out"}, 0)
            .to(this.sp2, {duration: 0.2, left: '50%', ease: "power1.out"}, 0.1)
            .to(this.sp2, {duration: 0.1, top: '50%', ease: "power1.out"}, 0.2)
            
            .to(this.spCenter, {duration: 0.1, left: '50%', x: '0', width: '0',opacity: '0', ease: Power3.easeInOut}, 0)
            ;

        this.animationHover = gsap.timeline({paused: true});
        this.animationHover
            .to(this.sp1, {duration: 0.2, width: '+=10%', ease: "none"} , 0)
            .to(this.sp2, {duration: 0.2, width: '+=10%', ease: "none"} , 0)
        ;

        this.btn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.btn.classList.toggle('open');
            if(this.btn.classList.contains('open')){
                this.animation.play(); 
            } else {
                this.animation.reverse();
            }  
        });

        this.btn.addEventListener('mouseenter', () => {
            if(g_isDesktop){
                this.btn.classList.add('hover');
                this.animationHover.play(); 
            }
            
        });
        this.btn.addEventListener('mouseleave', () => {
            if(g_isDesktop){
                this.btn.classList.remove('hover');
                this.animationHover.reverse(); 
            }
        });

        window.addEventListener('resize', _.throttle(() => {
            gsap.set(this.sp1, {clearProps: 'all'});
            gsap.set(this.sp2, {clearProps: 'all'});
            gsap.set(this.spCenter, {clearProps: 'all'});
            this.animation.clear();
            this.animationHover.clear();
            this.animation = gsap.timeline({paused: true});
            this.animation
            .to(this.sp1, {duration: 0.2, rotation: '+=90', ease: "none"} , 0)
            .to(this.sp1, {duration: 0.1, rotation: '+=45', ease: "none"}, 0.2)
            .to(this.sp1, {duration: 0.1, left: '+=-10%', ease: "power1.out"}, 0)
            .to(this.sp1, {duration: 0.2, top: '+=-10%', ease: "power1.out"}, 0)
            .to(this.sp1, {duration: 0.2, left: '50%', ease: "power1.out"}, 0.1)
            .to(this.sp1, {duration: 0.1, top: '50%', ease: "power1.out"}, 0.2)
            
            .to(this.sp2, {duration: 0.2, rotation: '+=-90', ease: "none"}, 0)
            .to(this.sp2, {duration: 0.1, rotation: '+=-45', ease: "none"}, 0.2)
            .to(this.sp2, {duration: 0.1, left: '+=10%', ease: "power1.out"}, 0)
            .to(this.sp2, {duration: 0.2, top: '+=10%', ease: "power1.out"}, 0)
            .to(this.sp2, {duration: 0.2, left: '50%', ease: "power1.out"}, 0.1)
            .to(this.sp2, {duration: 0.1, top: '50%', ease: "power1.out"}, 0.2)
            
            .to(this.spCenter, {duration: 0.1, left: '50%', x: '0', width: '0',opacity: '0', ease: Power3.easeInOut}, 0)
            ;
            this.animationHover = gsap.timeline({paused: true});
            this.animationHover
                .to(this.sp1, {duration: 0.2, width: '+=10%', ease: "none"} , 0)
                .to(this.sp2, {duration: 0.2, width: '+=10%', ease: "none"} , 0)
            ;
            
            if(this.btn.classList.contains('open')) {
                this.animation.pause(0.3);
            }
        }, 150));
    }

    close() {
        this.animation.reverse();
        this.btn.classList.remove('open');
    }
    open() {
        this.animation.play();
        this.btn.classList.add('open');
    }

    reverse(time) {
        if(time == 0){
            this.animation.pause(0);
        } else {
            this.animation.reverse();
        }
        this.btn.classList.remove('open');
    }

}

class DataPicker {
    constructor(dataPickerWrap) {
        this.dataPickerWrap = dataPickerWrap;
        this.lng = dataPickerWrap.getAttribute('data-lang');
        this.el = dataPickerWrap.querySelector('.picker');
        this.input = dataPickerWrap.querySelector('.data-input');
        this.label = dataPickerWrap.querySelector('.toggle-label');
        this.labelInputed = dataPickerWrap.querySelector('.toggle-label .inputed');
        this.createDataPicker = () => {
            if(g_isDesktop) {
                if(!this.picker) {
                    console.log('create');
                    this.picker = new WindowDatePicker({
                        el: this.el,
                        toggleEl: this.label,
                        inputEl: this.input,
                        type: "DATE",
                        dateType: "DD/MM/YYYY",
                        lang: this.lng,
                    });
                }
                    
                
            
            
            this.picker.el.addEventListener('wdp.change', () => {
                this.labelInputed.innerHTML = this.picker.get().value.replace('/', '.').replace('/', '.');
            });

            this.picker.set(g_getToday('-'));
            } else {
                this.input.addEventListener('focus', () => {
                    this.label.classList.add('wdp-active');
                })
                this.input.addEventListener('blur', () => {
                    this.label.classList.remove('wdp-active');
                })
                if( this.picker ) {
                    this.picker.destroy();
                    this.picker = null;
                    console.log('destroy')
                }
                this.input.addEventListener('change', ()=> {
                    // console.log('change by input');
                    // console.dir(this.input);
                    // console.dir(this.input.valueAsDate);
                    // console.dir(this.input.valueAsDate.getDate());
                    this.labelInputed.innerHTML = g_getNeededDay(this.input.valueAsDate, '.');
                    
                })
            }

            this.labelInputed.innerHTML = g_getToday('.');
            
        }
        this.createDataPicker();
        window.addEventListener('resize', _.throttle(this.createDataPicker, 150));
        window.addEventListener('orientationchange', _.throttle(this.createDataPicker, 150));
    
    
    }
}

