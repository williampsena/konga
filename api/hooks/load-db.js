'use strict';

var _ = require('lodash');
var defSeedData = require('../../config/default-seed-data.js');
const { v4: uuidv4 } = require('uuid');

/**
 * load-db.js
 *
 * This file contains a custom hook, that will be run after sails.js orm hook is loaded. Purpose of this hook is to
 * check that database contains necessary initial data for application.
 */
module.exports = function hook(sails) {
  return {
    /**
     * Private hook method to do actual database data population. Note that fixture data are only loaded if there
     * isn't any users in current database.
     *     
     */
    process: async function process() {

      if(sails.config.environment != 'test') {

          var seedPassports = async function() {
            var users = await sails.models.user.find();
            users.forEach(async function(user){
              var passwordToSetArr = defSeedData.userSeedData.filter( function (orig) {
                return (orig.username == user.username)
              });
              var passwordToSet = undefined;
              if (passwordToSetArr.length == [1]) {
                passwordToSet = passwordToSetArr[0].password;
              }
              if (typeof(passwordToSet) != 'undefined') {
                await sails.models.passport
                    .create({
                        protocol: "local",
                        password : passwordToSet,
                        user : user.id
                    });                    
              }
            });                    
          }

          await sails.models.user.seed();
          await seedPassports();
          await sails.models.kongnode.seed();
          await sails.models.emailtransport.seed();

          var seeds = sails.models.settings.seedData[0];

          var data = await sails.models.settings.find().limit(1);

          var _data = _.merge(seeds,data[0] || {});

          await new Promise((resolve, reject) =>{
            sails.models.settings.updateOrCreate({
              id : _data.id || 0
            }, _data, function(err){
              if(err){
                return reject(err);
              }
              return resolve();
            });
          });
          
          await sails.models.user
          .update({
              activationToken : undefined
          },{active : true,activationToken : uuidv4()});
      }else{
          var users = await sails.models.user.find();

          if (users.length !== 0 && JSON.stringify(users[0]) !== '{}'){
            return;
          }

          sails.log.verbose(__filename + ':' + __line + ' [Hook.load-db] Populating database with fixture data...');

          
          const Fixted = require('fixted');
          const fixted = new Fixted();
          var fixtures = _.keys(fixted.data);

          await new Promise((resolve, reject) => {
            fixted.populate(['user'], function(error) {
              if(error){
                return reject(error);
              }
              
              fixtures = _.without(fixtures, 'user');

              fixted.populate(fixtures, function(err){
                if(err){
                  return reject(err);
                }
                
                return resolve(true);
              }, false);
            }, false);
          });
      }
    },

    /**
     * Method that runs automatically when the hook initializes itself.
     *
     * @param {Function}  next  Callback function to call after all is done
     */
    initialize: async function initialize() {
      var self = this;

      // Wait for sails orm hook to be loaded
      sails.after('hook:orm:loaded', async function onAfter() {
        await self.process();
      });
    }
  };
};
