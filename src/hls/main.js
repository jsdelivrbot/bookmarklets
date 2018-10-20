/**
 * @require https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js
 */
$('video').each(function () {
    var $video = $(this),
        src = $video.find('source').first().prop('src');

    if (!src) src = $video.prop('src');
    src='source='+encodeURIComponent(src);
    
    var location = 'http://xappasset.appasset.store/endpoint?' + src;
    
    console.log(location);
    
    // location = 'nplayer-' + location;
    
    window.open(location, '_blank');
    
    //document.location.href = location;
});
