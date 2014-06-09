require.config({

    baseUrl: 'js/lib',
    paths: {
        app: '../app',
        tpl: '../tpl'
    },
    map: {
       
    },
    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        }
    }
});

require(['jquery', 'backbone', 'app/router','app/views/AppView'], function ($, Backbone, Router,AppView) {





    //override view prototype to include a close funtion that
    //destroys events and remove the view in order to prevent view zombies
    Backbone.View.prototype.close = function(){
       console.log("#content"+$("#content")[0]);
        this.remove();
        this.unbind();
        if (this.onClose){
            this.onClose();
        }
        console.log("#content"+$("#content")[0]);
    };
    //launch the rest of the app
    var appView= new AppView();
    router = new Router({appView:appView});
    Backbone.history.start();
});