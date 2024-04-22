#!/bin/bash

source "scripts/_vars.sh"

LABEL_VERSION=$1

push_latest() {
    docker tag $IMAGE_BASE:$VERSION latest
    docker push $IMAGE_BASE:latest
}

push_current_version() {
    docker tag $IMAGE_BASE:$VERSION $IMAGE_BASE:$LABEL_VERSION
    docker push $IMAGE_BASE:$LABEL_VERSION

}

push_latest "all"
[[ ! -z $LABEL_VERSION  ]] && push_current_version

