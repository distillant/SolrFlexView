/**
 * Created by conroyp on 11/26/13.
 */
//var search=require("./solr/search").solrSearch;

exports.recordData= function(req, res){
    var search=require("./solr/search").solrSearch;
    var key,uniqueField,core;
    for(param in ["key","uniqueField","core"])
    {
        if (!req.params[param])
        {
            console.log("query missing parameter: "+param);
            res.setHeader("Content-Type", "text/html");
            res.write(JSON.stringify("Error: query missing Parameter:"+param));
            res.end();
            return;
        }
    }

    var key=req.params.key.toString();
    var uniqueField=req.params.uniqueField;
    var core=req.params.core;
    searchCriteria={};
    searchCriteria[uniqueField]=key;

    responseHandler=function(err,obj)
    {
        if(err){
            res.setHeader("Content-Type", "text/html");
            res.write(JSON.stringify(err));
            res.end();
            console.log(err);
        }
        else{
            res.setHeader("Content-Type", "text/html");
            res.write(JSON.stringify(obj.response.docs[0]));
            res.end();
            console.log(obj);
        }
    }
    var start=0;
    var end=1;
    search.SolrRecord(core,searchCriteria,start,end,responseHandler);
};


/*
 Advanced search requires a posted object structured as follows:
 {core:"Core_NAME",
 start:0,
 end:50,
 searchArray:[{fieldName: "Author", searchTerms: "conroy"}]
 displayFields:["docID","Author","URL"]
 }
 */
exports.AdvancedSearchSolr = function(req, res){
    var search=require("./solr/search").SolrSearch;

        var qParams=req.body;
        if (typeof(qParams.core) =="undefined")
        {
            res.setHeader("Content-Type", "text/html");
            res.write("error: database core name was not included in request");
            res.end();
            return;
        }
        var core=qParams.core;
        var advancedQuery={};
        var start=qParams.start || 0;
        var end =qParams.end || 50;
        for (x =0;  x < qParams.searchArray.length; x++)
        {
            var fieldName=qParams.searchArray[x].fieldName;
            var searchTerms=qParams.searchArray[x].searchTerms;
            advancedQuery[fieldName]="(" +searchTerms + ")";
        }
        var displayFields="";
        for(x=0;x<qParams.displayFields.length;x++)
        {
            //builds string for display fields (fl) parameter
            displayFields += x>0?  ",":"";
            displayFields+=qParams.displayFields[x];
        }
        var responseHandler=function responseHandler(err,obj)
        {
            if(err){
                res.setHeader("Content-Type", "text/html");
                res.write(JSON.stringify(err));
                res.end();
                console.log(err);
            }
            else{
                res.setHeader("Content-Type", "text/html");
                res.write(JSON.stringify(obj)); //send entire object to include start & end for paging
                res.end();

            }
        }

        search(core,advancedQuery,displayFields,start,end, responseHandler );

};