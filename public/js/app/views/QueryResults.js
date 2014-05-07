/**
 * Created by conroyp on 11/19/13.
 */
define(function (require) {

    "use strict";

    var $           = require('jquery'),
        Backbone    = require('backbone'),
        tpl         = require('text!tpl/queryResults.html'),
        ResultItemView= require('app/views/QueryResultItem'),
       // ResultItem= require('app/models/queryResults').QueryResult,
        template = _.template(tpl);
    return  Backbone.View.extend(
        {

            render: function () {
                this.$el.html(template({displayFields: this.collection.model.prototype.defaults, data: this.collection.toJSON(), meta:this.collection._meta}));
                this.$el.find('#serverMessages').html("");
                this.$el.find('#serverMessages').append("Hits: "+this.collection.meta('totalHits') + " - Results "+
                    this.collection.meta('itemStartNum')  + " to "+ this.collection.meta('rowsRequested'));
                //this.$el.find("table").append(this.createTableHead());
                this.collection.each(function(resultItem) {
                    var resultItemView=new ResultItemView({ model: resultItem });
                    var $ResultItem=resultItemView.render().$el;
                    // this.$el.append($core);
                    this.$el.find("table").append($ResultItem);
                },this);
                return this;


            }
        });

});
