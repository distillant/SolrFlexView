/**
 * Created by conroyp on 11/19/13.
 */
define(function (require) {
    "use strict";
    var $           = require('jquery'),
        Backbone    = require('backbone'),
        QueryResult = Backbone.Model.extend({

            initialize: function () {
                //  this.reports = new EmployeeCollection();
                //  this.reports.url = this.urlRoot + "/" + this.id + "/reports";
            }
        }),
        QueryResults = Backbone.Collection.extend({
           // model: QueryResult,
            initialize: function(){
                this._meta = {
                    core:null,
                    totalHits:null,
                    itemStartNum:null,
                    rowsRequested:null
                }
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
        QueryResults: QueryResults,  QueryResult:QueryResult
    }

});