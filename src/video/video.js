**
 * @link https://mrcoles.com/bookmarklet/
 * @link https://beautifier.io/?without-codemirror
 * @link http://www.codenet.ru/services/urlencode-urldecode/
 * @require https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js
 */
$('video').each(function () {
    var video = this,
        source = null;

    
    source = $(video).find('source').first().prop('src');
    if (!source) source = $(video).prop('src');

    window.open(src, '_blank');
});

