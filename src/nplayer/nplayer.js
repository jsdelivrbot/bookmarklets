$('video').each(function () {
    var $video = $(this),
        src = $video.find('source').first().prop('src');

    if (!src) src = $video.prop('src');

    document.location.href = 'nplayer-' + src;
  });

