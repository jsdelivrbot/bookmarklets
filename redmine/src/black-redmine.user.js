// ==UserScript==
// @name          redmine-basecamp
// @namespace     appasset
// @description   Userstyle
// @icon          http://findicons.com/files/icons/2779/simple_icons/1024/basecamp_1024_black.png
// @include       *://10.10.80.88:5555/*
// @include       *://shilov.iif-msk.net:5555/*
// @include       *://192.168.150.70/redmine/*
// @include       *://ps70/redmine/*
// @run-at        document-idle
// @connect       gist.githubusercontent.com
// @connect       cdnjs.cloudflare.com
// @require       https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @connect       rawgit.com
// @grant         GM_xmlhttpRequest
// @grant         GM_setValue
// @grant         GM_getValue
// @grant         GM_listValues
// @grant         GM_setClipboard
// @grant         GM_addStyle
// @grant         GM_log
// @grant         unsafeWindow
// @author        moalex <trofimoff@live.ru>
// @version       0.9
// @noframes
// ==/UserScript==

jQuery(document).ready(function($){
  GM_xmlhttpRequest({
    url:    'https://gist.githubusercontent.com/moalex/107cfdb75dc50628712c56df6236dd4f/raw/2ed42f15423e51906354ecd6b30a99bdc2ccdedc/redmine-basecamp.user.css',
    method: 'GET',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    onload: function(response){
      GM_addStyle(response.responseText);
    }
  });
});
