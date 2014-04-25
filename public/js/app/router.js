define(function (require) {

    "use strict";

    var $           = require('jquery'),
        Backbone    = require('backbone'),
        ShellView   = require('app/views/Shell'),
        HomeView    = require('app/views/Home'),

        $body = $('body'),
        shellView = new ShellView({el: $body}).render(),
        $content = $("#content", shellView.el),
        homeView = new HomeView({el: $content});

    // Close the search dropdown on click anywhere in the UI
    $body.click(function () {
        $('.dropdown').removeClass("open");
    });
/*
    $("body").on("click", "#showMeBtn", function (event) {
        event.preventDefault();
        shellView.search();
    });*/



    return Backbone.Router.extend({

        routes: {
            "": "home",
            "contact": "contact",
            "employees/:id": "employeeDetails",
            "cores": "showCoreList",
            "AdvancedSearch/:coreName": "AdvancedSearchEntry",
            "showVideo": "showVideo",
            "CoreCharts": "CoreCharts"

        },
        initialize: function (options){
            this.appView = options.appView;
        },
        showVideo: function(){
            var iframeHTML= "<iframe width='420' height='315' src='//www.youtube.com/embed/EkS6R0YtobQ' frameborder='0' ></iframe>";
            $('#introVideo').html(iframeHTML );

        },
        home: function () {
            homeView.delegateEvents(); // delegate events when the view is recycled
            homeView.render();
            shellView.selectMenuItem('home-menu');
        },
        CoreCharts:function()
        {

            require(["app/views/CoreCharts", "app/models/cores"],function(ChartView, coreModels)
            {
                var coresCollection= new coreModels.CoresCollection;
                coresCollection.fetch(
                {
                    success: function (model, response, options) {
                        var view = new ChartView({collection: model, el: $content});
                        view.render();
                    },
                    error: function (model, response, options) {
                        var err =response.responseText;
                        alert("error getting while getting cores Data from app server: "+ err);
                    }
                });
            });

        },
        showCoreList : function () {
            require(["app/views/coreListView", "app/models/cores"],function(CoreListView, coreModels)
            {
                var coresCollection= new coreModels.CoresCollection;
                coresCollection.fetch(
                {
                    success: function (model, response, options) {
                        var view = new CoreListView({collection: model, el: $content});
                        view.render();
                    },
                    error: function (model, response, options) {
                        var err =response.responseText;
                       alert("error getting while getting cores Data from app server: "+ err);
                    }
                });
            });
        },
        AdvancedSearchEntry:function(coreName){
           var self=this;
            require(["app/views/AdvancedSearchEntry"], function (AdvancedSearchView) {
             //   var view = new AdvancedSearchView({coreName:coreName, el: $content});
                var view = new AdvancedSearchView({coreName:coreName });
                self.appView.showView(view);
                //view.render();
            });
        } /*,
        contact: function () {
            require(["app/views/Contact"], function (ContactView) {
                var view = new ContactView({el: $content});
                view.render();
                shellView.selectMenuItem('contact-menu');
            });
        },

        employeeDetails: function (id) {
            require(["app/views/Employee", "app/models/employee"], function (EmployeeView, models) {
                var employee = new models.Employee({id: id});
                employee.fetch({
                    success: function (data) {
                        // Note that we could also 'recycle' the same instance of EmployeeFullView
                        // instead of creating new instances
                        var view = new EmployeeView({model: data, el: $content});
                        view.render();
                    }
                });
                shellView.selectMenuItem();
            });
        }*/

    });

});