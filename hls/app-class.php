<?php
require_once "command-function.php";
require_once "../../bookmarklets/vendor/autoload.php";

use GuzzleHttp\Client;

foreach($p->request as $key => &$val)
   $val = urldecode((string) $val);
   
$p->request = (object) array_merge((array) $p->request, (array) $_POST);

foreach($p->request as $key => &$val)
    $val = trim((string) $val);

$p->base = (object) array(
  "path" => realpath(dirname(__FILE__)."/../../")
);

class App  {
  private $prop     = null,
          $client   = null,
          $resource = null,
          $is_hls   = null;
  
  
  private function _init($p = null){
    if (is_null($p)) 
        $p = (object) [];
    
    if (!empty($p))
        $this->prop = $p;
        
    $this->is_hls = false;
    $this->client = new Client();
  }
  
  public function __construct(){
    $this->_init();
  }
  
  public function hls(){  
    $this->resource = $this->client->request(
                          'GET', $this->prop->request->source
                         );
                    
    $this->is_hls   = true;
    
    switch ($this->is_hls) {
      case true:
        $playlist = trim($this->resource->getBody());
        
        $playlist = explode("\n", $playlist);
        $playlist = array_splice($playlist, $l - 4);
        $l = count($playlist);
        $location = (string) $playlist[$l - 1];
        $location = "Location: {$location}";
        echo $location; exit();
        //header($location);
        $playlist = implode("\n", $playlist)."\n";
        print $playlist;
        break;
      
      case false:
        print "{$this->prop->request->source}\n";
        break;
    }
  }
}
?>
