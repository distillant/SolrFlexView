define(function (require) {

    "use strict";

    var $           = require('jquery'),
        Backbone    = require('backbone'),
        tpl         = require('text!tpl/cores.html'),
        CoreItemView= require('app/views/CoreItemView'),
        template = _.template(tpl);
    return  function AppView(){
        this.showView =function(view){
            if (this.currentView){
                this.currentView.close();
            }

            this.currentView = view;
            this.currentView.render();

            $("#content").html(this.currentView.el);
        }

    };



});