#!/bin/bash
curl -s "$1" > temp.html
result=$(cat temp.html | grep -oP '\/{2}[^\"]+(1080|720)'\.mp4 | head -n 2)
rm -f temp.html
echo $result