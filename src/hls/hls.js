/**
 * @link https://mrcoles.com/bookmarklet/
 * @link https://beautifier.io/?without-codemirror
 * @link http://www.codenet.ru/services/urlencode-urldecode/
 * @require https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js
 */
$('video').each(function () {
    var $video = $(this),
        src = $video.find('source').first().prop('src');

    if (!src) src = $video.prop('src');
    src='source='+encodeURIComponent(src);
    
    var location = 'http://bookmarklets.appasset.ru/hls/?' + src;


    window.open(location, '_blank');
});

