<?php
use \Composer\Semver\Comparator;

header('Content-Type:text/plain');
$client  = new \GuzzleHttp\Client();
$version = (string) phpversion();

function app($input){
  global $client,
         $version;

  //$input = explode(":", $input, 2);
  $action = $_GET['action'];
  $input  = $input;

  switch($action) {
    case 'add':
      parse_str($input, $i);
      $input = array();
      foreach($i as $prop => $val){
        $prop = trim(urldecode($prop));
        $val  = trim(urldecode($val));
        $input[$prop] = $val;
      } unset($i);
      $input = (object) $input;
      break;
      
    case 'list':
      $input = (object) parse_url($_SERVER['QUERY_STRING']);
      var_dump($input); exit();
      break;
  }

  // $curl = $client->request('GET', $input);  
  // $out = (string) $cutl->getBody();
  return strval($out);
};
return app($_REQUEST);
?>


