<?php
use \Composer\Semver\Comparator;

header('Content-Type:text/plain');
$client  = new \GuzzleHttp\Client();
$version = (string) phpversion();

function app($input){
  global $client,
         $version;
  $input = explode(":", $input, 2);
  $link= 'https://pinboard.in/add?replace=yes&shared=no&tags=.adult%20video%20vk&url=https%3A%2F%2Fm.vk.com%2Fvideo-148989495_456245395&title=Blue%20Pill%20Men%20%2F%20Голубые%20Таблетки%20Для%20Мужчин%20(Aaliyah%20Hadid%2C%20Victoria%20Valencia%2C%20Stacie)&description=https%3A%2F%2Fpp.userapi.com%2Fc850636%2Fv850636637%2F1ed13%2FuyjS7X60oqA.jpg';
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
  }

  // $curl = $client->request('GET', $input);  
  // $out = (string) $cutl->getBody();
  return strval($out);
?>

