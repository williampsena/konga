#!/bin/bash

VERSION="${1:-nigthly}"
IMAGE_BASE="willsenabr/konga"

build_docker() {
    local tag=$1
    local image=$IMAGE_BASE

    echo "building image $image:$tag with database adapter $tag..."

    docker build --build-arg DB_ADAPTER=$tag -t $image -f Dockerfile .
    docker tag $image $tag

    [[ $VERSION == "all" ]] && docker tag $image latest
}

push_latest() {
    docker tag $IMAGE_BASE:$VERSION latest
}

build_docker "all" $VERSION

