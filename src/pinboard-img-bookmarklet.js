/**
 * @link https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js
 */
$('<link/>').attr({
  href: 'https://cdn.rawgit.com/appasset/bookmarklets/43958ee1/src/pinboard-img-bookmarklet.css',
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