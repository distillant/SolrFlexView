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

                this.$el.html(template({fields:this.options.fields.toJSON()}));
                this.model.on('change:fieldName',this.fieldChange, this)

            },
            render: function () {
                return this.$el;

            }
        });

});