#!/bin/bash
yarn install                                        &&
yarn build                                          &&
mv build .build                                     &&
git checkout gh-pages                               &&
rm -rf *                                            &&
mv .build/* .                                       &&
rm -r .build                                        &&
git add .                                           &&
git commit -m `date -Ins`                           &&
git checkout master