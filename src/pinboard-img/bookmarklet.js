/**
 * @link https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js
 */
var head = $('head')[0],
  poster_stylesheet = {
    position: "relative",
    width: "100%",
    'max-width': "100%",
    display: "block"
  },
  userstyle = {
    prefix: "http://appasset.store/pinboard-img/cdn/",
    source: ["import.css", "pinboard-img.css"]
  };
$('<link/>')
  .attr({
    href: userstyle.prefix + userstyle.source[1],
    type: 'text/css',
    rel: 'stylesheet'
  })
  .appendTo(head);
$(".bookmark")
  .each(function () {
    var $poster = $();
    $.each(["jpg", "jpeg", "png", "gif"], function (i, ext) {
      $poster = $poster.add($("#bookmarks")
        .find(".description")
        .find("a[href$=" + ext + "]"));
    });
    $poster.each(function () {
      var $wrapper = $("<div/>")
        .addClass("poster-wrapper");
      $("<img/>")
        .attr({
          src: $(this)
            .attr("href")
        })
        .css(poster_stylesheet)
        .appendTo($wrapper);
      $(this)
        .replaceWith($wrapper);
      $wrapper.css(poster_stylesheet);
    });
    $()
      .add('.user_navbar')
      .add('.star')
      .addClass('hide');
  });
