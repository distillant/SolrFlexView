/**
 * Created by conroyp on 11/15/13.
 */
define(function (require) {

    "use strict";

    var $           = require('jquery'),
        Backbone    = require('backbone'),

        SearchCriteriaItem = Backbone.Model.extend({
            defaults:
            {
                fieldName:null,
                fieldType:null,
                connector:null,
                SearchValue:null
            },
            initialize: function () {
            }
        }),

        SearchCriteriaCollection = Backbone.Collection.extend({
            model: SearchCriteriaItem
        });

    return {
        SearchCriteriaItem: SearchCriteriaItem,
        SearchCriteriaCollection:SearchCriteriaCollection
    };

});