<?php
function _command_curl($input){
  $args = (array) get_defined_vars();
  if (!isset($args[1])) {
    $entry = 'file_get_contents';
    $input = $args[0];
  } else {
    $entry = $args[0];
    $input = $args[1];
  }
  
  switch ($entry) {
    case 'file_get_contents':
      $result = file_get_contents($input);
      $result = trim($result);
      $result = explode("\n", $result);
      
      if (empty($result)) return false;
      
      $last = count($result) - 1;
      
      $result = $result[$last];
      
      return $result;
      break;
      
    case 'curl':
      $c = curl_init();
      $options = curl_setopt_array($c, array(
        
      ));
      break;
}
