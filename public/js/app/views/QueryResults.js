/**
 * Created by conroyp on 11/19/13.
 */
define(function (require) {

    "use strict";

    var $           = require('jquery'),
        Backbone    = require('backbone'),
        tpl         = require('text!tpl/queryResults.html'),

        template = _.template(tpl);
    return  Backbone.View.extend(
        {

            render: function () {
                this.$el.html(template({displayFields: this.collection.model.prototype.defaults, data: this.collection.toJSON(), meta:this.collection._meta}));

                return this;


            }
        });

});
