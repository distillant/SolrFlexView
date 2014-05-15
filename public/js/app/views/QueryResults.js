/**
 * Created by conroyp on 11/19/13.
 */
define(function (require) {

    "use strict";

    var $           = require('jquery'),
        Backbone    = require('backbone'),
        tpl         = require('text!tpl/queryResults.html'),

        template = _.template(tpl);
    return  Backbone.View.extend({
            events:{"click #nextSet": "nextSet",
                "click #previousSet": "prevSet"
            },
            render: function () {
                this.$el.html(template({
                    displayFields: this.collection.model.prototype.defaults,
                    data: this.collection.toJSON(),
                    meta: this.collection._meta
                }));
                return this;
            },
            nextSet:function(event){
                event.preventDefault();
                var total=this.collection.meta('totalHits');
                var currentBegin =this.collection.meta('itemStartNum');
                var itemsReturned = this.collection.meta('rowsRequested');
                var currentEnd=currentBegin + itemsReturned;


                if (currentEnd <= total)
                {
                    router.solrSearch.set('start',currentEnd);//uses 0 index;
                    router.solrSearch.fetch();
                }
                else
                    alert("no more records available");
            },
            prevSet:function(event){
                event.preventDefault();
                var currentBegin =this.collection.meta('itemStartNum');
                if (currentBegin > 0)
                {
                    var newStart= (currentBegin-10 <0)? 0: currentBegin-10;
                    router.solrSearch.set('start',newStart );//uses 0 index;
                    router.solrSearch.fetch();
                }
                else
                    alert("no more records available");
            }

        });

});
