/**
 * Created by patrick conroy on 5/5/14.
 */
define(function (require) {
    "use strict";
    var $           = require('jquery'),
    Backbone    = require('backbone'),
        Field = Backbone.Model.extend({
            //url:"field",

            initialize: function () {

            }
        }),
        Fields = Backbone.Collection.extend({
            // model: QueryResult,
            urlRoot: "/fields",
            model:Field,
            core:"collection1",
            url: function(){

                return this.urlRoot + "/"+ this.core;
            },
            initialize: function(options){
                if (options.core)
                    this.core=options.core;
            },
            meta: function(prop, value) {
                if (value === undefined) {
                    return this._meta[prop]
                } else {
                    this._meta[prop] = value;
                }
            }
        });
    return {
        Fields: Fields,Field:Field
    }

});