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

        Fields=require("app/models/Fields"),
        template = _.template(tpl);


    return  Backbone.View.extend(
    {
        events:{
            "click #addSearchField":"addSearchCriteria",
            "click #btnAdvanceSearch":"startQuery",
            "click #btnCancel": "cancel",
            "click #btnSelectAll": "selectAllFields"
        },
        selectAllFields:function(){
            $('#displayFields option').prop('selected', true);
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
            var fields=new Fields.Fields({core:this.options.coreName});

            fields.fetch({
                success:function(data){
                    self.fields= data;
                    self.$el.html(template({fields:data.toJSON()}));
                    _(data.models).each(function(model){
                    //iterate through collection to identify the key field and store name.
                          if (model.get("uniqueKey")==true)
                          {
                              self.uniqueField=model.get("field");
                          }
                    });


                    if (typeof(router.solrSearch.core)!='undefined')
                    {
                        for(var df in router.solrSearch.displayFields )
                        {
                            var displayField= router.solrSearch.displayFields[df];
                            self.$el.find('#displayFields  option[value="'+displayField+'"]').prop('selected', true);
                        }   
                    }
                }
            });
        },
        initialize:function(){
            return this;

        },
        render:function()
        {
            this.collection = new SearchCriteriaItems.SearchCriteriaCollection();
          //  this.$el.html(tpl);
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


        startQuery:function(){

            var solrSearch={};
            solrSearch.core= this.options.coreName;
            solrSearch.uniqueField= this.uniqueField;
            solrSearch.searchArray=this.collection.toJSON();
            solrSearch.displayFields = $("#AdvancedSearch #displayFields").val();
            solrSearch.displayFields.push(solrSearch.uniqueField); //make sure the key field is added

            var self=this;
            router.solrSearch =solrSearch;
            $.post("AdvancedSearch", solrSearch, function(data, textStatus, jqXHR){
                router.queryResultsReturn(data );
            } );

        }

    });
});