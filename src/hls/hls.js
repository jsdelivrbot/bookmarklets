$('video').each(function () {
    var $video = $(this),
        src = $video.find('source').first().prop('src');

    if (!src) src = $video.prop('src');
    src='source='+encodeURIComponent(src);
    
    var location = 'http://hqporn.appasset.store/hls?' + src;


    window.open(location, '_blank');
  });
