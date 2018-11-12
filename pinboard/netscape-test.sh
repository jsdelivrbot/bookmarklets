#!/bin/bash
cd "$HOME/projects/bookmarklets/pinboard" > /dev/null
php -f "netscape.php" html "pinboard-adult-20181112/pinboard-adult-20181112.min.json" > "result.html"
cat "result.html" | less
cd - > /dev/null