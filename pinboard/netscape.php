#!/usr/bin/php
<?php
function app($input = null){
	array_shift($input);

	$input = (object) [
		'format' = strtolower($input[0]),
		'path'   = realpath($input[1]),
		'data'   = null
	];
    $in = &$input;

	switch($input->format) {
		case 'html':
		  
		  break;
	}
}
print app((array) $argv);
print "\n";
?>
