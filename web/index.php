<?php
require_once "../vendor/autoload.php";
$route = 'hls';

if (!empty($_GET['r']))
  $route = urldecode($_GET['r']);

$controller = (object) [
  'route'  => $route, 
  'view'   => "{$route}/app.php",
  'result' => null
]; unset($route);

$c       = &$controller;
$c->view = realpath($c->view);
header("Content-Type:text/html; Charset=UTF-8");
require($c->view);exit();

print strlen($c->result);
?>


