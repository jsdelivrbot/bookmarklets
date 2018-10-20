var xapp = {
    home:     'http://xappasset.appasset.store',
    prefix:   'src/',
    endpoint: 'endpoint/',
    action:    new Array()
};

xapp.prefix   = xapp.home + '/' + xapp.prefix;
xapp.endpoint = xapp.home + '/' + xapp.endpoint;

console.log(xapp);
