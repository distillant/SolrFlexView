/**
 * Created by conroyp on 11/14/13.
 */
define(function (require) {

    "use strict";

    var $           = require('jquery'),
        Backbone    = require('backbone'),
        tpl         = require('text!tpl/coresListItem.html'),
        template = _.template(tpl);
    return  Backbone.View.extend(
        {
            events:{
                "click .linkCoreDetails": "showCoreDetails",
                "click .linkSearchCore": "SearchCore"
            },
            render: function (model) {
                 this.$el.html(template(this.model.attributes));
                 return this;
            },
            showCoreDetails: function(event)
            {
                var selectedModel=this.model.attributes.name;
                var outputText;
                var coreData= this.model.attributes.index;
                for(var coreItem in coreData )
                {
                    var CurrentItem =coreData[coreItem];
                    outputText += "<li>"+coreItem + ":"+CurrentItem +" </li>";
                }
                $("#coreDetails ul").html(outputText);

            },
            SearchCore:  function(event)
            {
                var selectedModel=this.model.attributes.name;
            }
        });

});