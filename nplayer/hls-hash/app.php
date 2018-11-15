<head><?php require_once "command-function.php"; require_once "app-class.php"; ?>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js" language="javascript" type="text/javascript"></script>
  <link href="./app.css" type="text/css" rel="stylesheet"/>
  <script src="./app.js" language="javascript" type="text/javascript"></script>
</head>
<body>
<div style="margin: auto 50px;">
  <div class="input-source"><pre><code><?= _command_curl('file_get_contents', rawurldecode($_GET['source'])) ?></code></pre></div>
  <a class="play-action" href="nplayer-"><img width="160" height="160" src="/resources/nplayer-dark.gif"/></a>
</div>
</body>
</html>
