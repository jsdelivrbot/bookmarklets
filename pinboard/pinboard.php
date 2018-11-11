<?php
use \Composer\Semver\Comparator;

header('Content-Type:text/plain');
$client  = new \GuzzleHttp\Client();
$version = (string) phpversion();

function app($input){
  global $client,
         $version;
  $input = explode(":", $input, 2);
  $action = $input[0];
  $input  = $input[1];
  switch($action) {
    case 'add':
      parse_str($input, $i);
      $input = array();
      foreach($i as $prop => $val){
        $prop = trim(urldecode($prop));
        $val  = trim(urldecode($val)));
        $input[$prop] = $val;
      } unset($i);
      $input = (object) $input;
      break;
    case 'list':
      
      break;
  }

  // $curl = $client->request('GET', $input);  
  // $out = (string) $cutl->getBody();
  return strval($out);
?>


