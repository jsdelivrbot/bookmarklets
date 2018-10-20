$('iframe').each(function() {
  var $frame = $(this),
      source = $frame.prop('src');
  
  window.open(source, '_blank');
});
