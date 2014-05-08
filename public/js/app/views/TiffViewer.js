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

                $("mainViewPane").ready(function(){
                    //change all of this to use backbone events.
                    $("#ZoomLevel").on('change', function() {
                        console.log(this);
                        $("#tiffViewSpace img").css("transform","scale(" + (parseInt($(this).val())/100).toString() + ")" );
                    });
                    $(".icon-zoom-in").on('click', function() {
                        var selectedIndex= $(this).parent().find("#ZoomLevel").prop("selectedIndex");
                        $("#ZoomLevel").prop("selectedIndex",selectedIndex-1);
                        $("#ZoomLevel").trigger("change");
                    });
                    $(".icon-zoom-out").on('click', function() {
                        var selectedIndex= $(this).parent().find("#ZoomLevel").prop("selectedIndex");
                        $("#ZoomLevel").prop("selectedIndex",selectedIndex+1);
                        $("#ZoomLevel").trigger("change");
                    });
                    $(".icon-repeat").on('click', function() {
                        $("#tiffViewSpace img").css("transform","rotate(90deg)");

                    });
                    $("#tiffSidebar").on('click','.mini-page-view img',function(){
                        var source=$(this).attr('src');
                        $("#tiffViewSpace img").attr("src",source);
                    });
                    /*
                    this.collection.each(function(coreModel) {
                        var coreItemView=new CoreItemView({ model: coreModel });
                        var $core=coreItemView.render().$el;
                        // this.$el.append($core);
                        this.$el.find("#coresList ul").append($core);
                    },this);
                    */
                });
            }
        });

});