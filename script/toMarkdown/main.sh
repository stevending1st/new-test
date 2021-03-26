#!/bin/bash

issueTitle="$1";
issueBody="$2";

if [ "$issueTitle" ] && [ "$issueBody" ]; then
  if [[ "$issueTitle" =~ ^\[action\]* ]]; then
    node ./script/toMarkdown/index.js "$issueBody";
    exit 0
  else
    echo "This issue does not need to generate a markdown file."
    exit 0
  fi;
else
  echo "The content or title of the issue is empty."
  exit 0
fi;
