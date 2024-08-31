#!/bin/bash

GITHUB_REPO=$1
DOCKERHUB_REPO=$2

git clone https://github.com/$GITHUB_REPO tmp
cd tmp

docker build -t $DOCKERHUB_REPO .

docker push $DOCKERHUB_REPO

cd ..
rm -rf tmp