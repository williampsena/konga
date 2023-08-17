#!/bin/bash
database="${1:-all}"

case "$database" in
mongo)
    npm uninstall sails-sqlserver sails-mysql sails-postgresql sails-disk
    ;;

sqlserver)
    npm uninstall sails-mongo sails-mysql sails-postgresql sails-disk
    ;;

postgresql)
    npm uninstall sails-mongo sails-sqlserver sails-mysql sails-disk
    ;;

mysql)
    npm uninstall sails-mongo sails-sqlserver sails-postgresql sails-disk
    ;;
disk)
    npm uninstall sails-mongo sails-sqlserver sails-postgresql sails-mysql
    ;;
*)
    echo "no packages to cleanup"
    ;;
esac
