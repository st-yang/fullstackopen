#!/bin/sh

: ${DOCKER_USER:?is not given.}
: ${DOCKER_PWD:?is not given.}

GITHUB_REPO=$1
DOCKERHUB_REPO=$2

git clone https://github.com/$GITHUB_REPO workspace
cd workspace

docker build -t $DOCKERHUB_REPO .

docker login --username $DOCKER_USER --password $DOCKER_PWD

docker push $DOCKERHUB_REPO

cd ..
rm -rf workspace