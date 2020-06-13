$(document).ready( function() {
  let titles = document.querySelectorAll('.footer-list__item .title');
  let lists = document.querySelectorAll('.footer-list__item .footer-list__item-list');

  
  $(titles).each((i, title)=>{
    title.addEventListener('click', ()=>{
      let index = i;
      if(!g_isDesktop) {
        title.classList.toggle('open');
        $(lists[index]).slideToggle();
      }
    });
  });  
  
  window.addEventListener('resize', _.throttle(clearLists, 150));
  window.addEventListener('orientationchange', _.throttle(clearLists, 150));

  function clearLists() {
    if(g_isDesktop) {
      $(titles).each((i, title)=>{
        let index = i;
        title.classList.remove('open');
        $(lists[index]).slideDown();
        
      });
    } 
  }

});

