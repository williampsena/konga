#!/bin/bash
database="${1:-all}"

case "$database" in
mongo)
    npm uninstall sails-disk
    ;;

sqlserver)
    npm uninstall sails-disk
    npm install sails-sqlserver
    ;;

postgresql)
    npm uninstall sails-disk
    npm install sails-postgresql
    ;;

mysql)
    npm uninstall sails-disk
    npm install sails-mysql
    ;;
disk)
    npm uninstall sails-mongo
    ;;
*)
    echo "no packages to cleanup"
    ;;
esac
