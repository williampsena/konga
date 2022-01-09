'use strict';

var _ = require('lodash');

/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
module.exports = _.merge(_.cloneDeep(require('../base/Controller')), {

    subscribe: function(req, res) {

        if (!req.isSocket) {
            sails.log.error("UserController:subscribe failed")
            return res.badRequest('Only a client socket can subscribe.');
        }

        var roomName = 'user.' + req.param("id") + '.updated';
        sails.sockets.join(req.socket, roomName);
        res.json({
            room: roomName
        });
    },

    update : async function(req,res) {
        sails.log(req.body);

        try {
            var user = req.body;
            var node = req.body.node;
            var passports = req.body.passports
    
            // Delete unwanted properties
            delete user.passports;
            delete user.password_confirmation;

            var updatedUsers = await sails.models.user
                .update({id : req.param('id')}, {...user, node: _.get(user, "node.id", null)});
    
            user = updatedUsers[0];
    
            if(!user) {
                return res.json();
            }
    
            if(node) {
                var updatedNodes = await sails.models.kongnode.update({id: node.id}, {...node, createdUser: _.get(node, "createdUser.id", null), updatedUser: _.get(node, "updatedUser.id", null)});
                user.node = updatedNodes[0];
            }
    
            sails.sockets.blast('user.' + user.id + '.updated', user);
    
            if(!passports) {
                return res.json(user)
            }
    
            await sails.models.passport
                .update({user:req.param('id')}, {password: passports.password});
                
            return res.json(user);
        }catch(err){
            sails.log.error('error on update user', err);
            return res.negotiate(err);
        }        
    }
});
