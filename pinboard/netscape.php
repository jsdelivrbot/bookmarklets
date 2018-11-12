#!/usr/bin/php
<?php
function app($input = null){
  array_shift($input);

  $input = (object) [
    'format' => strtolower($input[0]),
    'path'   => realpath($input[1]),
    'data'   => null
  ];
  $in = &$input;
  $in->data = file_get_contents($in->path);
  $in->data = (array) json_decode((string) $in->data);
  switch($input->format) {
    case 'html':
      foreach ($in->data as &$entry) {
        unset($entry->shared);
        unset($entry->toread);
        unset($entry->hash);
        
        $entry->time = new DateTime($entry->time, new DateTimeZone('Europe/Moscow'));
        $entry->time = $entry->time->getTimestamp();
        $entry->tags = str_replace(' ', ',', $entry->tags);
        $entry->description = htmlentities($entry->description);
        
        $entry = "<dt><a href=\"{$entry->href}\" add_date=\"{$entry->time}\" private=\"0\" toread=\"0\" tags=\"{$entry->tags}\">{$entry->description}</a>\n<dd>{$entry->extended}\n";
      }
      unset($entry);
      return "<!doctype netscape-bookmark-file-1>\n<meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\">\n<title>Pinboard Bookmarks</title>\n<h1>Bookmarks</h1>\n<dl><p>".implode("\n", $in->data)."</p></dl>\n";
      break;
  }
}
print app((array) $argv);
print "\n";
?>
