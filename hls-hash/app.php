<head><?php
  // $p->request = (array) $_GET;
  require_once "app-class.php"; ?>
  <style type="text/css">
    html, body {
      position: relative;
    }
    body {
      background: #000103;
      color: #FFF;
    }
    .input-source {
      display: none;
    }
    .play-action{
      position: relative;
      width:  160px;
      height: 160px;
      color: #fff;
      display: block;
      margin: 100px auto;
      text-decoration: underline;
    }
  </style>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js" language="javascript" type="text/javascript"></script>
  <script language="javascript" type="text/javascript">
  $(document).ready(function() {
    var input  = $('.input-source').first().find('code').html(),
        source = 'nplayer-' + input;
    
    //document.location.href = source;
    $('.play-action').first().attr({ href: source });
  });
  </script>
</head>
<body>
<div style="margin: auto 50px;">
  <div class="input-source"><pre><code><?= _command_curl(rawurldecode($_GET['source'])) ?></code></pre></div>
  <a class="play-action" href="nplayer-"><img width="160" height="160" src="/resources/nplayer-dark.gif"/></a>
</div>
</body>
</html>
