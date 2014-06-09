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

            "cores": "showCoreList",
            "AdvancedSearch/:coreName": "AdvancedSearchEntry",
            "showVideo": "showVideo",
            "CoreCharts": "CoreCharts",
            "document/:core/:uniqueField/:key": "viewRecord",
            "Export": "Export"

        },

        initialize: function (options){
            this.appView = options.appView;

        },
        solrSearch:{}, //this will store the solrSearch object
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
        },
        viewRecord:function(core,uniqueField,key)
        {
            require(['app/models/Record','app/views/Record'],function (Record, RecordView){

                var options ={
                    core: core,
                    uniqueField:uniqueField,
                    keyId : key
                };
                var record = new Record(options);
                var recordView=new RecordView({model :record, el:"#recordView"});

                record.fetch({success:function(){

                    recordView.render();
                    $("#queryResultsView").hide();
                    $("#lnkShowQueryResults").show();
                    $("#lnkShowQueryResults").on("click",function(event){
                        event.preventDefault();
                        $("#queryResultsView").show();
                    });

                }});
            });
        },
        Export:function(){
            var self=this;
            require(['app/models/Export'],function (ExportModel) {
                var exportModel = new ExportModel({model: self.solrSearch.toJSON()});
                exportModel.set("end",router.queryResults.meta("totalHits"));
                exportModel.fetch();
            });
        }

    });

});