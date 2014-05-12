/**
 * Created by patrick conroy on 4/25/14.
 */
define(function (require) {

    "use strict";
    var d3=require('js/lib/d3.v3.min.js');
    var $           = require('jquery'),
        _           = require('underscore'),
        Backbone    = require('backbone'),
        BarChart    = require('js/lib/distillant-d3-Barchart.js'),
        tpl         = require('text!tpl/CoresCharts.html'),
        template = _.template(tpl);
    return Backbone.View.extend({
        initialize: function(options){
            this.$el=options.el;
            this.$el.html(template());

            var coreStats=[];
            options.collection.each(function(model){

                var coreStat ={};
                coreStat.name=model.get("name");
                coreStat.numDocs= model.get("index").numDocs;
                coreStat.sizeInMB=((model.get("index").sizeInBytes)/Math.pow(1024,2));
                coreStat.instanceDir=model.get("instanceDir");
                coreStat.size=model.get("index").size;
                coreStats.push(coreStat);
            });

            var chart1 = {
            margin: {top: 20, right: 20, bottom: 30,left: 60},
            target: "#CoreDocsChart",
                totalWidth: 500,
                totalHeight: 400,
                data: coreStats,
                yLabel: "Documents",
                yField: "numDocs",
                xField: "name",
                Yticks: 10
             };

            var chart2 ={
                margin: {top: 20, right: 20, bottom: 30,left: 60},
                target: "#IndexSizeChart",
                totalWidth: 500,
                totalHeight: 400,
                data: coreStats,
                yLabel: "MegaBytes",
                yField: "sizeInMB",
                xField: "name",
                Yticks: 10
            };
            BarChart(chart1);
            BarChart(chart2);
        }
    });
});