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

            this.$el.html(template({data:this.model.toJSON()}));
            
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
            imageCollection.fetch().complete(
                function()
                {   console.log("display what self.imageCollection is after fetch() below");
                    console.log(self.imageCollection);
                    if (self.imageCollection.length >0)
                    {   //display first page
                        $("#tiffViewSpace img").attr("src","/Image?file="+self.imageCollection.models[0].get('Full_DOS_Path'));
                    }
                    for(var x=0; x<self.imageCollection.length; x++)
                    {
                        var model =self.imageCollection.models[x];

                        var imagePath= "/Image?file="+model.get('Full_DOS_Path');

                        var pageHTML = "<div class='mini-page-item'><div class='preview-page-num'>"+model.get('Bates')+
                            "</div><div class='mini-page-view'><img src='" +imagePath + "'></div></div>";
                        self.$el.find("#tiffSidebar").append(pageHTML);
                        $("#tiffSidebar").append(pageHTML);
                    }

                }


            )

        }
    });

});