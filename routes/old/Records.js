/**
 * Created with JetBrains PhpStorm.
 * User: conroyp
 * Date: 2/13/13
 * Time: 6:07 PM
 * To change this template use File | Settings | File Templates.
 */
var solrIP="10.106.4.112";
var solrPort='8080';
exports.BasicSearchSolr = function(req, res){

    try{

        var solr = require('solr-client');
        var client = solr.createClient(solrIP,solrPort,'DTIStuff','/solr');

        var searchBody= req.body.searchBody;
        var subject =req.body.subject;
        var from= req.body.from;
        var to = req.body.to;
        var addressee= req.body.addressee;
        var searchDatabase=req.body.searchDatabase;
        var startDate=req.body.startDate;
        var endDate =req.body.endDate;
        basicQuery={};
        if (from.length)
            basicQuery.AUTHOR="("+from+")";
        if (searchBody.length)
            basicQuery.FULLTEXT="("+searchBody+")";
        if (subject.length)
            basicQuery.TITLE="("+subject+")";
        if (to.length)
            basicQuery.RECIPIENTS="("+to+")";
        var tempStartDate;
        var tempEndDate;

            // parse dates
            if (startDate.length)
            {
                tempStartDate =new Date(startDate);
               // tempStartDate=tempStartDate.getYear().toString() +tempStartDate.getMonth().toString()+ tempStartDate.getDay().toString();
            }
            else
                tempStartDate=new Date("1/1/1970"); //default to 1970 if no value;
            if (endDate.length)
            {
                tempEndDate =new Date(endDate);
               // tempStartDate=tempStartDate.getYear().toString() +tempStartDate.getMonth().toString()+ tempStartDate.getDay().toString();
            }
            else
            {
                 tempEndDate =new Date(); //default current day if no value;
                //tempStartDate=tempStartDate.getYear().toString() +tempStartDate.getMonth().toString()+ tempStartDate.getDay().toString();
            }



        basicQuery.isParent="true";



        /*//need to add multiple fields as OR terms for Addressee queries.
         //figure it out later
        if (addressee !=null)
        {
           BasicQuery.from = req.body.addressee;
        }*/
            var query = client.createQuery()
            .q(basicQuery)

                .rangeFilter({field:'PARENTDATE',  start:tempStartDate,end:tempEndDate})
            //.q({AUTHOR : addressee})
            .fl("RN,PARENTDATE,AUTHOR,TITLE")
            .start(0)
            .rows(50);
        client.search(query,function(err,obj){
            if(err){
                res.setHeader("Content-Type", "text/html");
                res.write(JSON.stringify(err));
                res.end();
                console.log(err);
            }else{
                res.setHeader("Content-Type", "text/html");
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


exports.getRecord= function(req, res){
    try{
        var solr = require('solr-client');
        var client = solr.createClient(solrIP,solrPort,'DTIStuff','/solr');
        var recordNumber=req.query["RN"].toString();
        var query = client.createQuery()
            .q({RN : recordNumber})
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




/*
exports.listRecords = function(req, res){

    try{

    var mongojs= require('mongojs');
    var collections=['RecordsTable1'];
    var db= mongojs('IconnectTest',collections);
    //var db = mongojs('conroyp:mymongo@10.100.37.202:27017/DataStoreNavigator', collections);


    var transcriptListing= db.RecordsTable1.find({},{"RN":true, "TITLE":true, "AUTHOR":true, "DOCDATE":true},  function(err, result) {


        res.setHeader("Content-Type", "text/html");
        res.write(JSON.stringify(result));
        res.end();
    });


    //'application/json'

}
catch(err)
{
    console.log(err);
}
};
*/





/*
exports.getRecord= function(req, res){
try{
    var mongojs= require('mongojs');
    var collections=['RecordsTable1'];
    var db= mongojs('IconnectTest',collections);
  //  var db = mongojs('conroyp:mymongo@10.100.37.202:27017/DataStoreNavigator', collections);

    var recordNumber=req.query["RN"].toString();
    //var myobjID=db.ObjectId("50f9d96b1b47e2e821000003");
    //var myobjID=db.ObjectId(reqTranscriptID);
    //50f9d96b1b47e2e821000003
    //  db.transcripts.find({"_id" : ObjectId("50f9d96b1b47e2e821000003")},{"transcriptText": true});




    db.RecordsTable1.find({"RN" :recordNumber},{}, function(err, result) {
        if( err)
        {
            console.log(err);
        }
        //console.log(result);
        res.setHeader("Content-Type", "text/html");
        res.write(JSON.stringify(result));
        res.end();
    });
}
catch(err)
{
    console.log(err);
}
};

*/

exports.ServeEmail =function(req,res)
{
    try
    {

    //"\\arc05\PPLP\images_nxt5\pur_n50001\pur_n50001-002\load001\NativeFiles\BID_050\0007\P451B50I4653S0.htm"

        var ReqUrl= req.params[0];
        res.sendfile("\\\\nacl17\\lgl12\\VendorHosting_Archive\\DTI_iCONECT_NON-PRIORITY\\Export\\"+ReqUrl);
    }
    catch(err)
    {

    }

};

exports.AdvancedSearchSolr = function(req, res){

    try{

        var solr = require('solr-client');
        //var client = solr.createClient("127.0.0.1",'8983','DTIStuff','/solr');

         var qParams=req.body;

        if (typeof(qParams.core) =="undefined")
        {
            res.setHeader(400, {"Content-Type": "application/json"});
            res.write("{error: database core name was not included in request}");
            res.end();
            return;

        }
        var core=qParams.core;
        var AdvancedQuery={};
         for (x in qParams.searchArray)
         {

             AdvancedQuery[x]="(" +qParams.searchArray[x] + ")";
         }
        var displayFields="";
        for(x=0;x<qParams.displayFields.length;x++)
        {
            //builds string for display fields (fl) parameter
            displayFields += x>0?  ",":"";
            displayFields+=qParams.displayFields[x];
        }
        var client = solr.createClient(solrIP,solrPort,core,'/solr');
        /*
        var tempStartDate;
        var tempEndDate;

        // parse dates
        if (startDate.length)
        {
            tempStartDate =new Date(startDate);
            // tempStartDate=tempStartDate.getYear().toString() +tempStartDate.getMonth().toString()+ tempStartDate.getDay().toString();
        }
        else
            tempStartDate=new Date("1/1/1970"); //default to 1970 if no value;
        if (endDate.length)
        {
            tempEndDate =new Date(endDate);
            // tempStartDate=tempStartDate.getYear().toString() +tempStartDate.getMonth().toString()+ tempStartDate.getDay().toString();
        }
        else
        {
            tempEndDate =new Date(); //default current day if no value;
            //tempStartDate=tempStartDate.getYear().toString() +tempStartDate.getMonth().toString()+ tempStartDate.getDay().toString();
        }
         AdvancedQuery.isParent="true";
        */





        /*//need to add multiple fields as OR terms for Addressee queries.
         //figure it out later
         if (addressee !=null)
         {
         BasicQuery.from = req.body.addressee;
         }*/
        var query = client.createQuery()
            .q(AdvancedQuery)
            //.rangeFilter({field:'PARENTDATE',  start:tempStartDate,end:tempEndDate})
            //.q({AUTHOR : addressee})
            .fl(displayFields)
            .start(0)
            .rows(50);
        client.search(query,function(err,obj){
            if(err){
                res.setHeader(500,{"Content-Type": "application/json"});
                res.write(JSON.stringify(err));
                res.end();
                console.log(err);
            }else{

                res.setHeader(200,{"Content-Type": "application/json"});
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