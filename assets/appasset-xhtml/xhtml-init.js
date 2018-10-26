var app = {
   title: 'xHTML 4.01 Transitional with jQuery'
};

jQuery(document).ready(function($){
  var $content   = $('.content'),
      $title = $('<h1/>');

  $('<div/>').addClass('title-wrap')
             .append($title)
             .prependTo($content);

  pageTitle.text(title);
  
  window.document.title = $title.text(app.title);
});
