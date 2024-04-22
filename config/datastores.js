"use strict";

/**
 * Datastores
 * (sails.config.datastores)
 *
 * A set of datastore configurations which tell Sails where to fetch or save
 * data when you execute built-in model methods like `.find()` and `.create()`.
 *
 *  > This file is mainly useful for configuring your development database,
 *  > as well as any additional one-off databases used by individual models.
 *  > Ready to go live?  Head towards `config/env/production.js`.
 *
 * For more information on configuring datastores, check out:
 * https://sailsjs.com/config/datastores
 */

function buildDataStoreConfig() {
  var config = {
    adapter:
      "sails-" +
      (process.env.DB_ADAPTER
        ? process.env.DB_ADAPTER == "postgres"
          ? "postgresql"
          : process.env.DB_ADAPTER
        : "disk"),
    url:
      process.env.DB_URI ||
      `${
        process.env.DB_ADAPTER == "postgres"
          ? "postgresql"
          : process.env.DB_ADAPTER == "mongo"
          ? "mongodb"
          : process.env.DB_ADAPTER
      }://${process.env.DB_USER || "konga"}:${
        process.env.DB_PASSWORD || "konga"
      }@${process.env.DB_HOST || "localhost"}:${
        process.env.DB_PORT || "3306"
      }/${process.env.DB_DATABASE || "konga"}`,
    schema: process.env.DB_PG_SCHEMA || "public",
    ssl: process.env.DB_SSL ? true : false,
  };

  if (config.adapter == "sails-disk") {
    config = {
      ...config,
      filePath:
        process.env.NODE_ENV == "test"
          ? "./.tmp/"
          : process.env.STORAGE_PATH || "./kongadata/",
      fileName: process.env.NODE_ENV == "test" ? "localDiskDb.db" : "konga.db",
    };
  }

  return config;
}

module.exports.datastores = {
  /**
   * Local disk storage for DEVELOPMENT ONLY
   *
   * Installed by default.
   */
  default: buildDataStoreConfig(),
};
