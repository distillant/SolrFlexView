/**
 * Created by conroyp on 11/22/13.
 */
define(function (require) {

    "use strict";

    var $           = require('jquery'),
        _           = require('underscore'),
        tpl         = require('text!tpl/TiffViewer.html'),
        bootstrap   = require('/bootstrap/js/bootstrap.min.js'),
        ImageCollection         = require('app/models/images'),
        template = _.template(tpl);
    require('backbone');
    return Backbone.View.extend({
        initialize:function(){

        },

        render: function () {


            this.addImages();
            return this;
        },

        addImages:function(){

            var imageCollection =new ImageCollection([],{
                core: this.model.get('core'),
                uniqueField: this.model.get('uniqueField'),
                keyId: this.model.get('keyId')
            });
            this.imageCollection=imageCollection;
            var self=this;
            imageCollection.fetch().complete(function(imageData)
            {
                var options={
                    data:self.model.toJSON(),
                        images: (typeof(imageData.toJSON) =="undefined") ? [] : imageData.toJSON()
                };
                console.log("showing options")
                console.log(options);
                self.$el.html(template(options));

            })

        }
    });

});