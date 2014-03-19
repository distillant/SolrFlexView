/**
 * Created by conroyp on 11/22/13.
 */
define(function (require) {

    "use strict";

    var $           = require('jquery'),
        Backbone    = require('backbone');

    return Backbone.Model.extend({
        defaults:
        {
           core:'X',
           uniqueField:'X',
           keyId:'X'
        },

        urlRoot: "/record",
        url: function(){ return this.urlRoot + "/"+ this.get('core') + "/" + this.get('uniqueField') + "/"+ this.get('keyId').toString()},
        initialize: function () {
        //  this.reports = new EmployeeCollection();
        //  this.reports.url = this.urlRoot + "/" + this.id + "/reports";
        }
    })
});