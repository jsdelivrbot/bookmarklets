$('iframe').each(function() {
  var $frame = $(this),
      source = $frame.prop('src');
  
  window.open(src, '_blank');
});
