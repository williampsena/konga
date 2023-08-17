#!/bin/bash

VERSION="${1:-nigthly}"

do_build_docker() {
    local image="willsenabr/konga:$2"

    docker build --build-arg DB_ADAPTER=$1 -t $image -f Dockerfile .
    docker push $image
}

do_build_docker "all" $VERSION
do_build_docker "mongo" "mongo"
