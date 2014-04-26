/**
 * Created by patrick conroy on 4/26/14.
 */
exports.SolrRecord=function(core,uniqueField,key,callback)
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

        client.search(query, callback(err,obj));
    }
    catch(err)
    {
        console.log(err);
    }
}