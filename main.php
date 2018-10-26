<?php
use \Composer\Semver\Comparator;

$version = (string) phpversion();
$args = (array) $argv;
array_shift($args);

$pretty = null;

$args = (string) implode(' ', (array) $args);

$cmd = "/usr/bin/curl -s -k \"{$args}\"";
$out = array();
exec($cmd, $out, $err);

$out = implode("\n", $out);
$out = strip_tags($out);
$out = explode("srca = [", $out, 2);
$out = "[".$out[1];
$out = explode("];", $out, 2);
$out = $out[0]."]";

$collection = array();

$video = array( 'video', (object) array( 'poster' => null  ), array() );
$sources =  (array) json5_decode($out);
array_pop($sources);

foreach($sources as $val) {
  $val = $val->file;
  $val = str_replace('https://', '//', $val);
  $val = str_replace('http://', '//', $val);

  $type = strtolower(pathinfo($val, PATHINFO_EXTENSION));
  $type = "video/{$type}";
  $type = str_replace('/mpeg4', '/mp4', $type);
  $type = str_replace('/m4v', '/mp4', $type);
  $type = str_replace('/mov', '/mp4', $type);

  $val = str_replace('//', 'http://', $val);

  $item = array('source',  (object) array(
     'title'  => (integer) intval(pathinfo($val, PATHINFO_FILENAME)),
     'src'    => (string) $val,
     'type'   => (string) $type
  ));
  
  array_push($video[2], $item);
}
$hash = basename(dirname($video[2][0][1]->src));
$video[1]->poster = "http://s6.bigcdn.cc/pub/cid/{$hash}/main.jpg";
if (isset($video[2])) {
  foreach((array) $video[2] as &$entry) {
    $entry = (object) $entry;

    if (!isset($entry->title)) continue;

    $entry->title = strval($entry->title)."p";
  }
  unset($entry);
  
  $video[2] = array_reverse($video[2]);
}


array_push($collection, $video);

if (!Comparator::greaterThanOrEqualTo($version, '5.4'))
    return json_encode($collection);

if (!$pretty)
    return json_encode($collection, JSON_UNESCAPED_SLASHES, JSON_UNESCAPED_UNICODE);

return json_encode($collection, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
?>

