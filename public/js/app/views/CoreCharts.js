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
        var bob = {"responseHeader": {    "status": 0, "QTime": 125    }, "defaultCoreName": "CCVFR", "initFailures": {}, "status": {    "CCPaper": {        "name": "CCPaper", "isDefaultCore": false, "instanceDir": "E:\\SolrIndexes\\CCPaper\\", "dataDir": "E:\\SolrIndexes\\CCPaper\\data\\", "config": "solrconfig.xml", "schema": "schema.xml", "startTime": "2013-11-18T14:54:38.796Z", "uptime": 89766, "index": {            "numDocs": 2214733, "maxDoc": 2214733, "deletedDocs": 0, "version": 1025, "segmentCount": 22, "current": true, "hasDeletions": false, "directory": "org.apache.lucene.store.NRTCachingDirectory:NRTCachingDirectory(org.apache.lucene.store.SimpleFSDirectory@E:\\SolrIndexes\\CCPaper\\data\\index lockFactory=org.apache.lucene.store.NativeFSLockFactory@176ee6; maxCacheMB=48.0 maxMergeSizeMB=4.0)", "userData": {                "commitTimeMSec": "1370368323343"            }, "lastModified": "2013-06-04T17:52:03.343Z", "sizeInBytes": 717520154, "size": "684.28 MB"        }    }, "CCVFR": {        "name": "CCVFR", "isDefaultCore": true, "instanceDir": "E:\\SolrIndexes\\CCVFR\\", "dataDir": "E:\\SolrIndexes\\CCVFR\\data\\", "config": "solrconfig.xml", "schema": "schema.xml", "startTime": "2013-11-18T14:54:38.781Z", "uptime": 89797, "index": {            "numDocs": 78919, "maxDoc": 78919, "deletedDocs": 0, "version": 25, "segmentCount": 2, "current": true, "hasDeletions": false, "directory": "org.apache.lucene.store.NRTCachingDirectory:NRTCachingDirectory(org.apache.lucene.store.SimpleFSDirectory@E:\\SolrIndexes\\CCVFR\\data\\index lockFactory=org.apache.lucene.store.NativeFSLockFactory@71d29a; maxCacheMB=48.0 maxMergeSizeMB=4.0)", "userData": {                "commitTimeMSec": "1369861365734"            }, "lastModified": "2013-05-29T21:02:45.734Z", "sizeInBytes": 33955377, "size": "32.38 MB"        }    }, "CCEdata": {        "name": "CCEdata", "isDefaultCore": false, "instanceDir": "E:\\SolrIndexes\\CCEdata\\", "dataDir": "E:\\SolrIndexes\\CCEdata\\data\\", "config": "solrconfig.xml", "schema": "schema.xml", "startTime": "2013-11-18T14:54:38.89Z", "uptime": 89688, "index": {            "numDocs": 6568690, "maxDoc": 6568690, "deletedDocs": 0, "version": 9153, "segmentCount": 26, "current": true, "hasDeletions": false, "directory": "org.apache.lucene.store.NRTCachingDirectory:NRTCachingDirectory(org.apache.lucene.store.SimpleFSDirectory@E:\\SolrIndexes\\CCEdata\\data\\index lockFactory=org.apache.lucene.store.NativeFSLockFactory@b98a06; maxCacheMB=48.0 maxMergeSizeMB=4.0)", "userData": {                "commitTimeMSec": "1370006660187"            }, "lastModified": "2013-05-31T13:24:20.187Z", "sizeInBytes": 19781982159, "size": "18.42 GB"        }    }}};
        console.log(bob);

        console.log(bob.status.CCEdata.index.numDocs);
        var coreStats=[];
        for (var item in bob.status)
        {
            var core= bob.status[item];
            var coreStat ={}
            coreStat.name=item;
            coreStat.numDocs= core.index.numDocs;
            coreStat.sizeInMB=(core.index.sizeInBytes/Math.pow(1024,2));
            coreStat.instanceDir=core.instanceDir;
            coreStat.size=core.index.size;
            coreStats.push(coreStat);
        };


        BarChart({
            margin: {top: 20, right: 20, bottom: 30,left: 60},
            target: "#CoreDocsChart",
            totalWidth: 500,
            totalHeight: 400,
            data: coreStats,
            yLabel: "Documents",
            yField: "numDocs",
            xField: "name",
            Yticks: 10
        });
        BarChart({
            margin: {top: 20, right: 20, bottom: 30,left: 60},
            target: "#IndexSizeChart",
            totalWidth: 500,
            totalHeight: 400,
            data: coreStats,
            yLabel: "MegaBytes",
            yField: "sizeInMB",
            xField: "name",
            Yticks: 10
        });
    }
});
});