#!/usr/bin/env sh

set -e

git push origin master
git push cn-origin master

npm run build

cd dist

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:Yoshino-s/guessit.git master:gh-pages
git push -f https://git.coding.net/Yoshino-s/guessit.git master:gh-pages

cd -