<?php
header("Content-Type:text/plain; Charset=UTF-8");
require_once "../../vendor/autoload.php";
require_once "init.php";
?>
<?php
class Action {
  function play(){
    global $prop, $p;
    
    $application = 'nPlayer';
    $location    = $prop->request->source;
    
    switch (strtolower($application)) {
      case 'nplayer':
        (
    }
  }
  
  function hls(){
    global $prop, $p;
    
    $hls = false;
    
    $c = new GuzzleHttp\Client();
    $res = $c->request('GET', $p->request->source);
    $hls = true;
    switch ($hls) {
      case true:
        $playlist = trim($res->getBody());
        $playlist = explode("\n", $playlist);
        $playlist = array_splice($playlist, $l - 4);
        $l = count($playlist);
        $location = (string) $playlist[$l - 1];
        header("Location: {$location}");
        $playlist = implode("\n", $playlist)."\n";
        return $playlist;
        break;
      
      case false:
        return "{$p->request->source}\n";
    }
  }
}

?>
