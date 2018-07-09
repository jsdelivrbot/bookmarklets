[Bookmarklets][github]
======================

### [CodeNet URLEncode](http://www.codenet.ru/services/urlencode-urldecode/)

### [JS Beautifier](http://jsbeautifier.org/?without-codemirror)

### [Mr. Coles Bookmarkleter](https://mrcoles.com/bookmarklet/)

* * *

Source
------

### [video-bookmarklet.js](./src/video-bookmarklet.js)

```javascript
$('video').each(function() {
  var $video = $(this),
      src = $video.find('source').first().prop('src');
      
  if (!src) src = $video.prop('src');
  window.open(src, '_blank');
});
```


### [iframe-bookmarklet.js](./src/iframe-bookmarklet.js)

```javascript
$('iframe').each(function() {
  var $frame = $(this),
      source = $frame.prop('src');
  
  window.open(src, '_blank');
});
```

[github]: 