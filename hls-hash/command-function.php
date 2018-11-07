<?php
function _command_curl($input){
  $result = file_get_contents($input);
  $result = trim($result);
  $result = explode("\n", $result);
  
  if (empty($result)) return false;
  
  $last = count($result) - 1;
  
  $result = $result[$last];
  
  return $result;
}
