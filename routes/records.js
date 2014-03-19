/**
 * Created by conroyp on 11/26/13.
 */

/*
var events = require('events');
dataResponsesListener = new events.EventEmitter();

exports.documentData= function(req,res)
{
    var core=req.params.core;
    var uniqueField=req.params.uniqueField;
    var key=req.params.key.toString();

    var documentFullData={
        metaData:{},
        tiffimages:[],
        nativeFile:null,
        OCRtext:null
    };
    employeeAddedListener.addListener("addedEmployee",function(){ //send if done
     });

    getMetaData();
    //get imagedata
    //get
};

var getMetaData = function(core,uniqueField,DocID, documentFullData)
{
    try{
        var solrIP=global.AppConfig.solrIP;
        var solrPort=global.AppConfig.solrPort;
        var solrDirectory=global.AppConfig.solrDirectory;
        var solr = require('solr-client');
        var client = solr.createClient(solrIP,solrPort,core,solrDirectory);
        var queryOptions ={};
        //set query to retrive record using its uniqueKey for that particular core.
        queryOptions[uniqueField]=key;
        var query = client.createQuery()
            .q(queryOptions)
            .start(0)
            .rows(1);

        client.search(query,function(err,obj){
            if(err){
                console.log("received error while retrieving record from SOLR server");
                console.log(err);
                documentFullData.metaData=err;
                dataResponsesListener.emit("metaDataAdded");
            }else{
                console.log("retrieved record");
                documentFullData.metaData=obj.response.docs[0];
            }
        });
    }
    catch(err)
    {
        documentFullData.metaData=err;
        console.log(err);
    }
};

 */
exports.recordData= function(req, res){
    try{
        var solrIP=global.AppConfig.solrIP;
        var solrPort=global.AppConfig.solrPort;
        var solrDirectory=global.AppConfig.solrDirectory;
        var core=req.params.core;
        var solr = require('solr-client');
        var client = solr.createClient(solrIP,solrPort,core,solrDirectory);
        var uniqueField=req.params.uniqueField;
        var key=req.params.key.toString();
        var queryOptions ={};
        //set query to retrive record using its uniqueKey for that particular core.
        queryOptions[uniqueField]=key;
        var query = client.createQuery()
            .q(queryOptions)
            .start(0)
            .rows(1);

        client.search(query,function(err,obj){
            if(err){
                res.setHeader("Content-Type", "text/html");
                res.write(JSON.stringify(err));
                res.end();
                console.log(err);
            }else{
                res.setHeader("Content-Type", "text/html");
                res.write(JSON.stringify(obj.response.docs[0]));
                res.end();
                console.log(obj);

            }
        });
    }
    catch(err)
    {
        console.log(err);
    }
};

exports.AdvancedSearchSolr = function(req, res){

    try{

        var solr = require('solr-client');
        //var client = solr.createClient("127.0.0.1",'8983','DTIStuff','/solr');

        var qParams=req.body;

        if (typeof(qParams.core) =="undefined")
        {
            res.setHeader("Content-Type", "text/html");
            res.write("error: database core name was not included in request");
            res.end();
            return;

        }
        var core=qParams.core;
        var AdvancedQuery={};
        for (x =0;  x < qParams.searchArray.length; x++)
        {
            var fieldName=qParams.searchArray[x].fieldName;
            var searchTerms=qParams.searchArray[x].searchTerms;
            AdvancedQuery[fieldName]="(" +searchTerms + ")";
        }
        var displayFields="";
        for(x=0;x<qParams.displayFields.length;x++)
        {
            //builds string for display fields (fl) parameter
            displayFields += x>0?  ",":"";
            displayFields+=qParams.displayFields[x];
        }
        var client = solr.createClient(global.AppConfig.solrIP,global.AppConfig.solrPort,core,global.AppConfig.solrDirectory);

        var query = client.createQuery()
            .q(AdvancedQuery)
            //.rangeFilter({field:'PARENTDATE',  start:tempStartDate,end:tempEndDate})
            //.q({AUTHOR : addressee})
            .fl(displayFields)
            .start(0)
            .rows(50);
        client.search(query,function(err,obj){
            if(err){
                res.setHeader("Content-Type", "text/JSON");
                res.write(JSON.stringify(err));
                res.end();
                console.log(err);
            }else{
                res.setHeader("Content-Type", "text/JSON");
                res.write(JSON.stringify(obj));
                res.end();
                console.log(obj);

            }
        });
    }
    catch(err)
    {
        console.log(err);
    }
};