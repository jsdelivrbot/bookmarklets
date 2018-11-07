<?php

function _command($cmd){
  $output = null;
  
  exec($cmd, $result, $error);
  
  if (!empty($result)) {
      $result = implode("\n", (array) $result);
      $output .= $result;
  }
  
  return trim((string) $output);
}

function _command_curl($input){
  $result = file_get_contents($input);
  $result = trim($result);
  $result = explode("\n", $result);
  
  if (empty($result)) return false;
  
  $last = count($result) - 1;
  
  $result = $result[$last];
  
  return $result;
}