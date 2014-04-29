/**
 * Created by patrick conroy on 4/26/14.
 */
exports.SolrSearch=function(core,searchCriteria,displayFields,start,end,callback)
{

        var solrIP=global.AppConfig.solrIP;
        var solrPort=global.AppConfig.solrPort;
        var solrDirectory=global.AppConfig.solrDirectory;

        var solr = require('solr-client');
        var client = solr.createClient(solrIP,solrPort,core,solrDirectory);

        var query = client.createQuery()
            .q(searchCriteria)
            .start(start)
            .rows(end);

        //filter return fields if displayFields specified.
        if (displayFields)
            query.fl(displayFields);
        client.search(query, function(err,obj){callback(err,obj);});
}