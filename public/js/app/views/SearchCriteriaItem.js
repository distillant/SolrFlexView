/**
 * Created by mallard on 11/15/13.
 */
/**
 * Created by conroyp on 11/13/13.
 */
define(function (require) {

    "use strict";

    var $           = require('jquery'),
        Backbone    = require('backbone'),
        //SearchCriteriaItem= require('app/models/SearchCriteriaItem').SearchCriteriaItem,
        tpl         = require('text!tpl/AdvancedSearchItem.html'),
        template = _.template(tpl);
    return  Backbone.View.extend(
        {
            events:{
                "click .RemoveRow": "removeRow",
                //"change select":"fieldChange",
                "change input, select": "updateModel"
            },
            updateModel: function(event)
            {
                var fieldToChange=event.target.id;
                var newValue=this.$(event.target).val().toString();
                var options= {};
                options[fieldToChange]=newValue;
                this.model.set(options);
                //this.model.attributes[fieldToChange]=newValue;

            },
            addFields :function()
            {
                for (var field in this.options.fields)
                {
                    var outputLine = "<option value='"+ field + "'>"+ field+"</option>";
                    this.$el.find("#fieldName").append(outputLine);
                }

                var outputLine = "<option value='"+ field +"'>"+ field+"</option>";
                $(this.el).find("#fieldName").append(outputLine );
            },
            fieldChange: function()
            {
                var selectedValue=this.model.get("fieldName");
                if(selectedValue!=null &&  selectedValue!="null" && (typeof(this.options.fields[selectedValue])!= "undefined"))
                var DataType = this.options.fields[selectedValue].type;
            },
            RemoveRow: function ()
            {
                //remove event listeners
                //delete "this"
                event.preventDefault()
            },
            initialize:function(){

                this.$el.html(tpl);
                this.addFields();
                this.model.on('change:fieldName',this.fieldChange, this)

            },
            render: function () {
                return this.$el;

            }
        });

});