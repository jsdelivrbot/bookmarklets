<?php
require_once "../../vendor/autoload.php";

use GuzzleHttp\Client;
$prop = (object) [
  'request' => null,
  'base'    => null
]; $p = &$prop;

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
}
header('Content-Type:text/html');
$app = new App($p);
?>
