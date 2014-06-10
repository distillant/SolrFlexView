/**
 * Created by patrick conroy on 4/30/14.
 */

/**** sample Export Json Input
export request example
{
    ExportType: ["all" or "selected"]
    query:[ {id: id1 OR id2 OR id3} / q{criteria}
    fl:{"id","url"},
    exportFormat:{
        wt:"CSV",
            parameters:{
            "csv.encapsulator":null,
                "csv.escape":null,
                "csv.separator":null,
                "csv.header":null,
                "csv.newline":null,
                "csv.null":null,
                "csv.mv.encapsulator":null,
                "csv.mv.escape":null,
                "csv.mv.separator":null
        },
    },
    exportImages:false,
    exportOCR:false,
    exportImages:false,
    exportData:true;
    exportLocation:null,
    exportTitle:"Title of export"
    ImageFormat:["single page Tiff"/, "multipage tiff","PDF"]
    ImageNaming:["Sequential","BatesBeginBegin"]

}
***/

/****
 how will this work
1) export should be broken into different tasks
    a) data
    b) images
    c) ocr


1) start by implementing 1 standard export of images and data using all search criteria
2) create a separate process to perform the export.
3) system should report back to client using some sort of api that checks on bactch status
 probably need an in memory database for this.
4) add cancel ability
5) add additional export functionality.
6)

*/
var SolrExport=require("./solr/search").SolrExport;
var SolrSearch=require("./solr/search").SolrExport;

exports.simpleExport = function(req, res){
    var delimeters ={
        header: "true",
        separator: String.fromCharCode(254),
        encapsulator: String.fromCharCode(255),
        null: "",
        newline: null
    };
    var qParams=req.body;
    if (typeof(qParams.core) =="undefined")
    {
        res.setHeader("Content-Type", "text/html");
        res.write("error: database core name was not included in request");
        res.end();
        return;
    }
    var core=qParams.core;
    var uniqueField=qParams.uniqueField;
    var advancedQuery={};
    var start=qParams.start= 0;
    var end =qParams.end || 50;
    for (var x =0;  x < qParams.searchArray.length; x++)
    {
        var fieldName=qParams.searchArray[x].fieldName;
        var searchTerms=qParams.searchArray[x].searchTerms;
        advancedQuery[fieldName]="(" +searchTerms + ")";
    }
    var displayFields="";
    for(var x=0; x<qParams.displayFields.length; x++)
    {
        //builds string for display fields (fl) parameter
        displayFields += x>0?  ",":"";
        displayFields+=qParams.displayFields[x];
    }
   // var now=new Date();
    var outputFilePath=global.AppConfig.defaultExportDir+"Export" +  Math.random().toString() +".dat";

    var responseHandler=function responseHandler(err,obj)
    {
        if(err){
            res.setHeader("Content-Type", "text/html");
            res.write(JSON.stringify(err));
            res.end();
            console.log(err);
        }
        else{

           // delimeters.header="false";
          /*  fs.appendFileSync(outputFilePath, obj, function(err)
            {  if (err) throw err;}
            );*/
            res.setHeader("Content-Type", "text/html");
            res.write(JSON.stringify(obj)); //send entire object to include start & end for paging
            res.end();
        }
    };

        SolrExport(core,advancedQuery,displayFields,start,end,delimeters, responseHandler );
        SolrSearch(core,advancedQuery,"uniqueField",start,end, function(err,obj){ console.log(err),console.log(obj)})

    var setSize=50;


    //for (var start=0; start < end; start += setSize)
    // {

   // }
    /*
    res.setHeader("Content-Type", "text/html");
    res.write(JSON.stringify("completed export")); //send entire object to include start & end for paging
    res.end();
    */
    //SolrExport(core,advancedQuery,displayFields,start,end,delimeters, responseHandler  );
};




/*
var serialize = function(obj, prefix) {
    var str = [];
    for(var p in obj) {
        var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
        str.push(typeof v == "object" ?
            serialize(v, k) :
            encodeURIComponent(k) + "=" + encodeURIComponent(v));
    }
    return str.join("&");
}
var GetCSV=function(core,advancedQuery,displayFields,start,end, responseHandler){
    http://localhost:8983/solr/collection1/select?q=id%3A*&start=0&rows=10&fl=id%2Ccat%2Ccategory%2Ccomments%2Ccontent%2Ccontent_type%2Cdescription%2Cfeatures&wt=csv&indent=true
    console.log("serializng query params");
    console.log(serialize(advancedQuery));

    console.log("displayFields");
    console.log(displayFields);
    console.log("serializng displayFields");
    console.log(serialize(displayFields));
*/
/*
    var http = require('http');

    var options = {
        host:  AppConfig.solrIP,
        port: AppConfig.solrPort
    };

    options.path= AppConfig.solrDirectory +'/'core'/'?wt=csv';

    var callback = function(response) {
        var str = '';

        //another chunk of data has been recieved, so append it to `str`
        response.on('data', function (chunk) {
            str += chunk;
        });

        //the whole response has been recieved, so we just print it out here
        response.on('end', function () {

            res.send(str);

        });
        response.on('error', function(e) {
            console.log('problem with request: ' + e.message);
            res.send("{error: \"error while attempting to retrive corelist from SOLR: "+e.message+ "\"}");

        });
    };
    try
    {
        http.request(options, callback).end();

    }
    catch(err)
    {
        console.log("error");
        console.log(err);

    }
    //  res.send("respond with a resource");

};*/