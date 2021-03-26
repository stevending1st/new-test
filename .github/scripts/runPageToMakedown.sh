#!/bin/bash

issueTitle="$1";
issueBody="$2";

if [ "$issueTitle" ] && [ "$issueBody" ]; then
  if [[ "$issueTitle" =~ ^\[action\]* ]]; then
    node ./script/index.js "$issueBody";
    exit 0
  else
    echo "no-title-" "$issueTitle" "-"
    exit 1
  fi;
else
  echo "no"
  exit 1
fi;
