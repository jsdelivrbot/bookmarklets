/**
 * @require https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js
 */
var prefix   = 'http://xappasset.appasset.store/cdn',
    location = null;
    library  = new Array();

library.push('xapp-init.js');
location = prefix + '/' + library[0];

$.getScript(location, function(response, message, xhr ){
      console.log({
          location: location,
          code:     xhr.status,
          message:  message,
          response: response
      });
});
