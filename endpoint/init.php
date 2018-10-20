<?php
$prop = (object) [
  "app"  => "bookmarklets",
  "request" => null,
  "manifest" => "../../composer.json",
  "vendor" => null,
  "base" => null,
  "on" => [ "init" =>  [
                         "modules", "../../vendor/autoload.php" ],
                         "main"
		       ] ]; $p = &$prop;

$p->request = (array) $_GET;

foreach($p->request as $key => &$val)
   $val = urldecode((string) $val);
   
$p->request = (object) array_merge((array) $p->request, (array) $_POST);

foreach($p->request as $key => &$val)
    $val = trim((string) $val);

$p->base = (object) array(
  "path" => realpath(dirname(__FILE__)."/../../")
);
?>
