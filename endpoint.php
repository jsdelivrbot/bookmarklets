<?php
use \Composer\Semver\Comparator;

header('Content-Type:text/plain');
$client  = new \GuzzleHttp\Client();
$version = (string) phpversion();

function app($input){
  global $client,
         $version;


  $input = trim(urldecode($input));

  $curl = $client->request('GET', $input);
  
  $out = (string) $cutl->getBody();
  $out = explode("\n", $out);
  $len = count($out);
  $m3u8 = '';
  $extinf = $out[$len - 2];
  $source = $out[$len - 1];
  $end = "";

  $out = "{$m3u8}\n{$extinf}\n{$source}\n{$end}\n";
  return trim($out);
};

$location =  app((string) $_SERVER['QUERY_STRING']);
header("Location: $location");
?>

