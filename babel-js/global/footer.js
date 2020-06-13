'use strict';

$(document).ready(function () {
  var titles = document.querySelectorAll('.footer-list__item .title');
  var lists = document.querySelectorAll('.footer-list__item .footer-list__item-list');

  $(titles).each(function (i, title) {
    title.addEventListener('click', function () {
      var index = i;
      if (!g_isDesktop) {
        title.classList.toggle('open');
        $(lists[index]).slideToggle();
      }
    });
  });

  window.addEventListener('resize', _.throttle(clearLists, 150));
  window.addEventListener('orientationchange', _.throttle(clearLists, 150));

  function clearLists() {
    if (g_isDesktop) {
      $(titles).each(function (i, title) {
        var index = i;
        title.classList.remove('open');
        $(lists[index]).slideDown();
      });
    }
  }
});