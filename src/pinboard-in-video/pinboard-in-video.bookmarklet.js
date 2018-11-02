/**
 * pinboard-in-img
 * @link https://mrcoles.com/bookmarklet/
 * @require https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js
 */
var action = 'https://b.appasset.ru/pinboard/?collection=posts&action=add&shared=yes',
    Tags = ['.adult', 'video'];

var defauls_query = {
  collection: 'posts',
  action:     'add',
  shared:     true,
  toread:     false
};
    
switch(document.location.hostname) {
    case 'vk.com':
    case 'm.vk.com':
        Tags.push('vk');
        break;
    
    case 'hqporner.com':
    case 'mydaddy.cc':
        Tags.push('hqporner');

    case 'porno365.xxx':
        Tags.push('porno365');
        break;
}

action += '&tags=' + encodeURIComponent(Tags.join(' '));

function add($v) {
    var entry = {
      id:         null,
      url:        document.location.href,
      source:     $v.attr('src'),
      poster:     $v.attr('poster'),
      title:      document.title,
      pinboard:   '',
      desription: ''
    };

    $('.video_box_wrap').each(function() {
        entry.id  = $(this).attr('id').substr(14);
        entry.url = 'http://vk.com/video' + entry.id;
        
        return false;
    });
    
    $('.vv_summary').each(function() {
        entry.title = $.trim($(this).text());
        
        return false;
    });
    
    $('.mv_title').each(function() {
        entry.title = $.trim($(this).text());
        
        return false;
    });
    
    $('.mv_desription_block').each(function() {
        entry.desription = $.trim($(this).text());
        
        return false;
    });
    
    $v.find('source').each(function() {
        entry.source = $(this).attr('src');
        
        return false;
    });
    
    entry.pinboard = action + '&url=' + encodeURIComponent(entry.url) + '&title=' + encodeURIComponent(entry.title) + '&description=' + encodeURIComponent($.trim(entry.desription + ' ' + entry.poster));
    
    return entry.pinboard;
}


if ($('video').length > 0) {
    action = add($('video').first());
    
    window.open(action, '_blank');
}