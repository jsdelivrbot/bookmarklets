/**
 * hls-hash
 * @link https://mrcoles.com/bookmarklet/
 * @require https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js
 */
$('video').each(function() {
    var endpoint = 'http://b.appasset.ru/hls-hash/',
        $video = $(this),
        src = $video.find('source').first().prop('src');

    if (!src)
      src = $video.prop('src');

    var location = endpoint + '#source' + encodeURIComponent(src);
    
    window.open(location, '_blank');
});
