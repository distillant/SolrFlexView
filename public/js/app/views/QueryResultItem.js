/**
 * Created by conroyp on 11/21/13.
 */
define(function (require) {

    "use strict";

    var $           = require('jquery'),
        Backbone    = require('backbone'),
        Record    = require('app/models/Record'),
        RecordView    = require('app/views/Record');
    return  Backbone.View.extend(
        {
            tagName:"tr",
            events:{
                "click .viewRecord": 'viewRecord'
            },
            viewRecord:function(event)
            {

                event.preventDefault();

                var options ={
                        core: this.model.collection.meta('core'),
                        uniqueField:this.model.collection.meta('uniqueField'),
                        keyId : this.model.get(this.model.collection.meta('uniqueField'))
                };
                var record = new Record(options);
                var recordView=new RecordView({model :record});
                record.fetch({success:function(){
                    //$('#content').html(recordView.render().el);
                    var $recordViewHTML =recordView.render().$el.html();
                    $("#recordView").html($recordViewHTML);
                   /*
                    var w = window.open();
                    var html = $("#toNewWindow").html($recordViewHTML);

                    w.document.write();
                    w.document.close();*/
                }});

            },
            render: function () {
                var currentLine="<td><input class='selectRecord' type='checkbox'></td><td><a class='viewRecord' href='#'>view</td>";

                for( var item in this.model.defaults)
                {
                    currentLine+= "<td>"+ (this.model.attributes[item] || "").toString().substr(0,100)+"</td>";
                }
                this.$el.html(currentLine);
                return this;
            }

        });

});