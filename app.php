#!/usr/bin/php
<?php
$BASE = realpath(__DIR__);
require_once "{$BASE}/vendor/autoload.php";

$result = strval(require("{$BASE}/main.php"));

print $result;
?>


