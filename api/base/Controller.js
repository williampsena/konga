'use strict';

var actionUtil = require('sails/lib/hooks/blueprints/actionUtil');

/**
 * BaseController.js
 *
 * Base controller for all sails.js controllers. This just contains some common code
 * that every controller uses
 */
module.exports = {
  /**
   * Generic count action for controller.
   *
   * @param   {Request}   request
   * @param   {Response}  response
   */
  count: function count(request, response) {
    var model = request.options.action.split('/')[0];
    if (!model) { throw new Error(util.format('No "model" specified in route options.')); }

    // Get the model class.
    var Model = request._sails.models[model];

    if ( !Model ) { throw new Error(util.format('Invalid route option, "model".\nI don\'t know about any models named: `%s`',model)); }

    Model
      .count(actionUtil.parseCriteria(request))
      .exec(function found(error, count) {
        if (error) {
          response.negotiate(error);
        } else {
          response.ok({count: count});
        }
      })
    ;
  }
};