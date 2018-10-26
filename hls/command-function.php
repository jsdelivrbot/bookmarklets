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