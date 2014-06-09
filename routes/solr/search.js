/**
 * Created by patrick conroy on 4/26/14.
 */


/*********customization by Patrick***********
 *
 *
 *
 *
 */
var http=require('http');
var solr = require('solr-client');

var queryRequestCSV = function(params,callback){
    var options = {
        host : params.host,
        port : params.port,
        path : params.fullPath,
        auth: AppConfig.solrUser+":"+AppConfig.solrPassword

    };

    if(params.authorization){
        var headers = {
            'authorization' : params.authorization
        };
        options.headers = headers;
    }

    var callbackResponse = function(res){
        var buffer = '';
        var err = null;
        res.on('data',function(chunk){
            buffer += chunk;
        });

        res.on('end',function(){
            if(res.statusCode !== 200){
                err = new SolrError(res.statusCode,buffer);
                if (callback)  callback(err,null);
            }else{

                var data = buffer;
                if (callback)  callback(err,data);
            }
        });

    };
    var request = http.get(options,callbackResponse);

    request.on('error',function(err){
        if (callback) callback(err,null);
    });

};
/**
 * Search documents matching the `query`
 *
 * @param {Query|String} query
 * @param {Function} callback(err,obj) - a function executed when the Solr server responds or an error occurs
 * @param {Error} callback().err
 * @param {Object} callback().obj - JSON response sent by the Solr server deserialized
 *
 * @return {Client}
 * @api public
 */

var ExportCSV = function(query,callback){
    var self = this;
    // Allow to be more flexible allow query to be a string and not only a Query object
    var parameters = query.build ? query.build() : query;
    this.options.fullPath = [this.options.path,this.options.core,'select?' + parameters + '&wt=csv']
        .filter(function(element){
            if(element) return true;
            return false;
        })
        .join('/');
    queryRequestCSV(this.options,callback);
    return self;
};

exports.SolrSearch=function(core,searchCriteria,displayFields,start,end,callback)
{

        var solrIP=global.AppConfig.solrIP;
        var solrPort=global.AppConfig.solrPort;
        var solrDirectory=global.AppConfig.solrDirectory;
        var client = solr.createClient(solrIP,solrPort,core,solrDirectory);
	client.basicAuth(global.AppConfig.solrUser,global.AppConfig.solrPassword);

        var query = client.createQuery()
            .q(searchCriteria)
            .start(start)
            .rows(end);

        //filter return fields if displayFields specified.
        if (displayFields)
            query.fl(displayFields);
        client.search(query, function(err,obj){callback(err,obj);});

/*
 client.ExportCSV=ExportCSV;

        client.ExportCSV(query, function(err,obj){
            console.log(obj);
            console.log(err);
            //callback(err,obj);
        });
*/
};