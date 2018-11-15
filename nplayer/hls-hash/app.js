$(document).ready(function() {
    var input  = $('.input-source').find('code').html(),
        source = 'nplayer-' + input;
    
    $('a.play-action').attr({ href: source });
    
    document.location.href = source;
});
