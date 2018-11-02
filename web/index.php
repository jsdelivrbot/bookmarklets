<?php
require_once "../vendor/autoload.php";

$route = 'default';

if (!empty($_GET['r']))
  $route = urldecode($_GET['r']);

$controller = (object) [
  'route'  => $route, 
  'view'   => "../{$route}/app.php",
  'result' => null
]; unset($route);

$c       = &$controller;
$c->view = realpath($c->view);

if ($c->view)
  $c->result = include($c->view);

print strlen($c->result);
?>


