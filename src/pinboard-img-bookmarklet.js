$('<link/>').attr({
  href: 'pinboard-img-bookmarklet.js',
  type: 'text/css',
  rel:  'stylesheet'
}).appendTo(head);

$(".bookmark").each(function() {
  var $poster = $();
  
  $.each(["jpg", "jpeg", "png", "gif"], function(i, ext) {
    $poster = $poster.add(
      $("#bookmarks").find(".description")
                     .find("a[href$=" + ext + "]")
    );
  });
  
  $poster.each(function() {
    var $wrapper = $("<div/>").addClass("poster-wrapper");
    
    $("<img/>").attr({
          src: $(this).attr("href")
        }).appendTo($wrapper);
    
    $(this).replaceWith($wrapper);
  });
});