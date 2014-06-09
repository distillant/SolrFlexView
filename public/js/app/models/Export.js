/**
 * Created by patrick conroy on 5/16/14.
 */
/**
 * Created by conroyp on 11/22/13.
 */
define(function (require) {

    "use strict";

    var $           = require('jquery'),
        Backbone    = require('backbone'),
        QueryResultsCollection=require("app/models/queryResults").QueryResults,
        QueryResultsModels= require("app/models/queryResults"),
        QueryResultsView=require("app/views/queryResults");

    return Backbone.Model.extend({

        defaults:
        {
            core:null,
            uniqueField:null,
            searchArray:[],
            displayFields:[],
            start:0,
            end:10,
            error:null

        },
        url: "/Export",
        sync: function(){
            var self=this;
            $.post(this.url, this.toJSON(), function(data, textStatus, jqXHR){

                if (textStatus!="success")
                {
                    self.set("error",jqXHR);
                    return;
                }
                data=JSON.parse(data);
                if (data.message) //catch errors
                {
                    alert(data.message)
                    return;
                }
                /*
                // this.queryResultsReturn(data);

                //creating model with dynamic default properties off of display fields from search request
                var QueryResultCustom= Backbone.Model.extend({defaults:self.createDefaults()});
                var queryResults=new QueryResultsCollection();
                //set the model to this new special model;
                queryResults.model=QueryResultCustom;
                // populate the collection

                queryResults.meta('totalHits',data.response.numFound);
                queryResults.meta('itemStartNum',data.response.start);
                queryResults.meta('rowsRequested',data.response.docs.length);
                queryResults.meta('core',self.get('core'));
                queryResults.meta('uniqueField',self.get('uniqueField'));

                queryResults.add(data.response.docs);
                router.queryResults=queryResults;
                self.trigger('newResultsReady');
                */
            } );
        },
        events:{
            "newResultsReady":"queryResultsReturn"
        },
        initialize: function (options) {
            options=options.model;
            this.core= options.core;
            this.uniqueField= options.uniqueField;
            this.searchArray=options.searchArray;
            this.displayFields=options.displayFields;
            this.displayFields.push(this.uniqueField); //make sure the key field is added
            this.queryResults={};
            this.set(options);
            this.on('newResultsReady', this.queryResultsReturn, this );
        },
        createDefaults: function()
        {
            var fieldsArray=this.get("displayFields");
            var defaults={};
            for (var x in fieldsArray)
            {
                //pull value from fields array, convert it to object name, set to null
                defaults[fieldsArray[x]]=null;
            }
            return defaults;
        },
        queryResultsReturn: function()
        {

            var queryResultsView =new QueryResultsView( {collection:router.queryResults});
            $('#content').html( queryResultsView.render().$el);

        }
    })
});