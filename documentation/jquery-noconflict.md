jQuery noConflics
=================

```javascript
jQuery.noConflict();
(function( $ ) {
  $(function() {
    // More code using $ as alias to jQuery
  });
})(jQuery);
 
// Other code using $ as an alias to the other library
```