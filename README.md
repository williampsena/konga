# Attention

> This fork is an attempt to address Konga's security vulnerabilities by lowering the number of default node packages. As a database, I propose Mongo or Sqlite.

A pushed image at https://hub.docker.com/repository/docker/willsenabr/konga is the outcome of this.

# Changes
## Grunt / Bower

I discovered some security vulnerabilities with Grunt, and Bower is too old, so why not use static assets and delete these dependencies?

## NPM packages that have not been updated

Because the project relies on a large number of vulnerable outdated packages, I uninstalled, replaced, and upgraded them whenever feasible.

## Konga Updates

I have no plans to add new Konga features; I only want to maintain the project operational after Kong made modifications and the project died 💀.


## Environment variables
These are the general environment variables Konga uses.

| VAR                | DESCRIPTION                                                                                                                | VALUES                                 | DEFAULT                                      |
|--------------------|----------------------------------------------------------------------------------------------------------------------------|----------------------------------------|----------------------------------------------|
| HOST               | The IP address that will be bind by Konga's server                                                                               | -                                      | '0.0.0.0'                                         |
| PORT               | The port that will be used by Konga's server                                                                               | -                                      | 1337                                         |
| NODE_ENV           | The environment                                                                                                            | `production`,`development`             | `development`                                |
| SSL_KEY_PATH       | If you want to use SSL, this will be the absolute path to the .key file. Both `SSL_KEY_PATH` & `SSL_CRT_PATH` must be set. | -                                      | null                                         |
| SSL_CRT_PATH       | If you want to use SSL, this will be the absolute path to the .crt file. Both `SSL_KEY_PATH` & `SSL_CRT_PATH` must be set. | -                                      | null                                         |
| KONGA_URL | The base frontend url | - | http://localhost:1337
| KONGA_HOOK_TIMEOUT | The time in ms that Konga will wait for startup tasks to finish before exiting the process.                                | -                                      | 60000                                        |
| DB_ADAPTER         | The database that Konga will use. If not set, the localDisk db will be used.              | `mongo`,`mysql`,`postgres`     | -                                            |
| DB_URI             | The full db connection string. Depends on `DB_ADAPTER`. If this is set, no other DB related var is needed.                 | -                                      | -                                            |
| DB_HOST            | If `DB_URI` is not specified, this is the database host. Depends on `DB_ADAPTER`.                                          | -                                      | localhost                                    |
| DB_PORT            | If `DB_URI` is not specified, this is the database port.  Depends on `DB_ADAPTER`.                                         | -                                      | DB default.                                  |
| DB_USER            | If `DB_URI` is not specified, this is the database user. Depends on `DB_ADAPTER`.                                          | -                                      | -                                            |
| DB_PASSWORD        | If `DB_URI` is not specified, this is the database user's password. Depends on `DB_ADAPTER`.                               | -                                      | -                                            |
| DB_DATABASE        | If `DB_URI` is not specified, this is the name of Konga's db.  Depends on `DB_ADAPTER`.                                    | -                                      | `konga_database`                             |
| DB_IS_PG12_OR_NEWER| If `true` will set `isVersion12OrNewer: true` to sails-postgresql in order to work with Postgres12 or newer.               | true/false |                           | false                                        |
| KONGA_LOG_LEVEL    | The logging level                                                                                                          | `silly`,`debug`,`info`,`warn`,`error`  | `debug` on dev environment & `warn` on prod. |
| TOKEN_SECRET       | The secret that will be used to sign JWT tokens issued by Konga | - | - |
| NO_AUTH            | Run Konga without Authentication                                                                                           | true/false                             | -                                         |

2. ##### Start Konga

The following command will start Kong in PostgreSQL database mode; port 8001 is used to manage Kong API Gateway; keep in mind that this port is not secure, so keep it as private as possible in production.

```shell
docker compose up -d
```

Let's start Konga locally after starting Kong prerequisites.

```shell
# you should use Node (20x) required at .nvmrc
# install packages before
npm install

# then run node
npm start
```

You can start by using docker and the production image.

```shell
 docker compose -f dev.docker-compose.yml up -d
```


Konga will be listened on port 1337.

> If you're using docker compose examples, remember to change your Kong address to http://172.17.0.1:8001 to connect Konga.

#  Official documentation

More information is available at the base forked repository [pantsel/konga](https://github.com/pantsel/konga).


