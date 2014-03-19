/**
 * Created by conroyp on 11/13/13.
 */
define(function (require) {

    "use strict";

    var $           = require('jquery'),
        Backbone    = require('backbone'),
        CoreItemView= require('app/views/CoreItemView'),
        tpl         = require('text!tpl/AdvancedSearch.html'),
        SearchCriteriaItems= require('app/models/SearchCriteriaItem'),
        SearchCriteriaItemView= require('app/views/SearchCriteriaItem'),
        QueryResultsView= require('app/views/QueryResults'),
        QueryResultsModels =require('app/models/queryResults'),
      // AppView= require('app/views/AppView'),
        template = _.template(tpl);

    var QueryResultsCollection=QueryResultsModels.QueryResults,
    QueryResult=QueryResultsModels.QueryResult;
    return  Backbone.View.extend(
    {
        events:{
            "click #addSearchField":"addSearchCriteria",
            "click #btnAdvanceSearch":"startQuery",
            "click #btnCancel": "cancel"
        },
        addDisplayFields: function ()
        {
            if (typeof(event)!="undefined")
                event.preventDefault();
            for (var field in this.fields)
            {
                var outputLine = "<option value='"+ field + "'>"+ field+"</option>";
                this.$el.find('#displayFields').append(outputLine );
            }
        },
        addSearchCriteria: function(event)
        {
            event.preventDefault();
            var searchCriteriaModel =new SearchCriteriaItems.SearchCriteriaItem();
            this.collection.add(searchCriteriaModel);
            searchCriteriaModel.collection=this.collection;
            var searchCriteriaItemView= new SearchCriteriaItemView({model:searchCriteriaModel, fields: this.fields});
            //this might be wrong below
            $(this.el).find("#SearchCriteria").append(searchCriteriaItemView.render());
        },
        getAvailableFields: function()
        {
            var self=this;
            // get field list for this core from app server
            /*$.getJSON("/fields/"+this.options.coreName,
                function(data){
                    self.fields= data.schema.fields;
                    self.uniqueField=data.schema.uniqueKeyField;
                    self.addDisplayFields();
                });*/
            $.ajax({
                url: "/fields/"+this.options.coreName,
                dataType: 'json',
                async: false,
                data: {},
                success:  function(data){
                    self.fields= data.schema.fields;
                    self.uniqueField=data.schema.uniqueKeyField;
                    self.addDisplayFields();
                }
            });
        },
        initialize:function(core){
            return this;

        },
        render:function()
        {
            this.collection = new SearchCriteriaItems.SearchCriteriaCollection();
            this.$el.html(tpl);
            this.getAvailableFields();
            return this;
        },
        onClose:function()
        {
            //delete this.collection;
        },
        cancel:function()
        {
            this.close();
            //redirect back to cores page
            window.location='index.html';
        },
        createDefaults :function(fieldsArray)
        {
            var defaults={};
            for (var x in fieldsArray )
            {
                //pull value from fields array, convert it to object name, set to null
                defaults[fieldsArray[x]]=null;
            }
            return defaults;
        },
        queryResultsReturn: function(data)
        {
            if (typeof(data)=="undefined")
                return;
            data=JSON.parse(data);
            if (data.name)
            {
                $('#serverMessages')[0].innerHTML="";
                $('#serverMessages').append(data.name +" : "+data.message || "" );
                return;
            }
            //initialize collection


            //var options= { defaults: this.createDefaults(this.solrSearch.displayFields)};

            //create model, set it for the collection.
           // var customQueryResultModel=new QueryResult({},options);
           // var customQueryResultModel=new QueryResult({},options);
            var displayfields =this.createDefaults(this.solrSearch.displayFields);
            var QueryResultCustom= Backbone.Model.extend({defaults:displayfields});


            var queryResults=new QueryResultsCollection();
            queryResults.model=QueryResultCustom;
            queryResults.add(data.response.docs);

            //set special metadata attributes for Query Results collection
            queryResults.meta('totalHits',data.response.numFound);
            queryResults.meta('itemStartNum',data.response.start);
            queryResults.meta('rowsRequested',data.response.docs.length);
            queryResults.meta('core',this.options.coreName);
            queryResults.meta('uniqueField',this.uniqueField);

            var queryResultsView =new QueryResultsView({collection:queryResults});
            this.$el.html( queryResultsView.render().$el);

        },
        startQuery:function(){

            var solrSearch={};
            solrSearch.core= this.options.coreName;
           // solrSearch.searchArray={};
            solrSearch.searchArray=this.collection.toJSON();
            solrSearch.displayFields = $("#AdvancedSearch #displayFields").val();
            /* $(".dynamicFieldVisible").each(function(){
                var searchItem={};
                solrSearch.searchArray[$(this).children("#fieldName").val()]=$(this).children("#searchTerms").val();
                //searchItem.value=$(this).children("#searchTerms").val();
                //solrSearch.searchArray.push(searchItem);
            });*/
            var self=this;
            this.solrSearch =solrSearch;
            $.post("AdvancedSearch", solrSearch, function(data, textStatus, jqXHR){
                self.queryResultsReturn(data);
            } );

        }

    });
});