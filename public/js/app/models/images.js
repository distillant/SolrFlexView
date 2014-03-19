/**
 * Created by conroyp on 12/17/13.
 */
define(function (require) {

    "use strict";

    var $           = require('jquery'),
        Backbone    = require('backbone');

    return Backbone.Collection.extend({

        core:'X',
        uniqueField:'X',
        keyId:'X',

        urlRoot: "/Images",
      //  url: function(){ return this.urlRoot + "/"+ this.get('core') + "/" + this.get('uniqueField') + "/"+ this.get('keyId').toString()},
        url: function(){ return this.urlRoot + "/"+ this.core + "/" + this.uniqueField + "/"+ this.keyId.toString()},
        initialize: function (models, options) {
            options || (options = {});
            if (options.keyId && options.core && options.uniqueField) {
                this.keyId = options.keyId;
                this.core = options.core;
                this.uniqueField = options.uniqueField;
            }
        }
    })
});