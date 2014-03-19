/**
 * Created by conroyp on 11/25/13.
 */
define(function (require) {

    "use strict";

    var $           = require('jquery'),
        Backbone    = require('backbone'),
        tpl         = require('text!tpl/TiffViewer.html'),
        //CoreItemView= require('app/views/CoreItemView'),
        template = _.template(tpl);
    return  Backbone.View.extend(
        {
            render: function () {
                this.$el.html(template({}));

                /*
                this.collection.each(function(coreModel) {
                    var coreItemView=new CoreItemView({ model: coreModel });
                    var $core=coreItemView.render().$el;
                    // this.$el.append($core);
                    this.$el.find("#coresList ul").append($core);
                },this);
                */

            }
        });

});