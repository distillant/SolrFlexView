/**
 * Created by conroyp on 11/13/13.
 */
define(function (require) {

    "use strict";

    var $           = require('jquery'),
        Backbone    = require('backbone'),

        Core = Backbone.Model.extend({

            urlRoot: "/coreList",

            initialize: function () {
              //  this.reports = new EmployeeCollection();
              //  this.reports.url = this.urlRoot + "/" + this.id + "/reports";
            }

        }),

        Cores = Backbone.Collection.extend({

            model: Core,

            url: "/coreList"

        });

    return {

        CoresCollection: Cores
    };

});