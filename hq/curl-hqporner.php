#!/usr/bin/php
<?php
$application = null;

function _application($input = null){
    global $application;

	$application = (string) array_shift($input);
	$application = (object) array(
		'path'		=> (string) realpath($application),
		'filename'  => (string) pathinfo($application, PATHINFO_FILENAME),
		'extension' => (string) pathinfo($application, PATHINFO_EXTENSION),
		'dirname'   => (string) realpath(dirname($application)),
		'input'     => (array)  $input
	); $a = $application; unset($input);	
	
	if(empty($a->input))
		return false;

	return true;		
}

function main(){
	global $application; $a = &$application;
	
	$link   = (string) $a->input[0];
	$output = $link;

	return strval($output);
}

if (_application((array) $argv))
	print main()."\n";
?>