#!/bin/bash

_RESPONSE="$(php -f app.php $*)"

#_RESPONSE=$(echo $_RESPONSE | jq -r ".[0][2][0][1].src")

echo "$_RESPONSE"
