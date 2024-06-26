"use strict";

/**
 * app.js
 *
 * Use `app.js` to run your app without `sails lift`.
 * To start the server, run: `node app.js`.
 *
 * This is handy in situations where the sails CLI is not relevant or useful.
 *
 * For example:
 *   => `node app.js`
 *   => `forever start app.js`
 *   => `node debug app.js`
 *   => `modulus deploy`
 *   => `heroku scale`
 *
 *
 * The same command-line arguments are supported, e.g.:
 * `node app.js --silent --port=80 --prod`
 */
require("dotenv").config();

// Ensure a "sails" can be located:
let sails;

try {
  sails = require("sails");
} catch (e) {
  console.error(
    "To run an app using `node app.js`, you usually need to have a version of `sails` installed in the same directory as your app."
  );
  console.error("To do that, run `npm install sails`");
  console.error("");
  console.error(
    "Alternatively, if you have sails installed globally (i.e. you did `npm install -g sails`), you can use `sails lift`."
  );
  console.error(
    "When you run `sails lift`, your app will still use a local `./node_modules/sails` dependency if it exists,"
  );
  console.error(
    "but if it doesn't, the app will run with the global sails instead!"
  );
  return;
}

// Validate node version
const Utils = require("./api/services/Utils");
if (!Utils.isRuntimeVersionSupported()) {
  sails.log.error(
    "Incompatible Node.js version. Please make sure that you have Node.js >= 8 installed."
  );
  process.exit(1);
}

// Try to get `rc` dependency
let rc;

try {
  rc = require("run-con");
} catch (e0) {
  console.error("Could not find dependency: `rc`.");
  console.error("Your `.sailsrc` file(s) will be ignored.");
  console.error("To resolve this, run:");
  console.error("npm install rc --save");

  rc = function () {
    return {};
  };
}

require("./makedb")(function (err) {
  if (err) {
    process.exit();
  }

  // Start server
  sails.lift(rc("sails"));
});
