
/*
 * GET users listing.
 */

exports.list = function(req, res){
  res.send("respond with a resource");
};

exports.cores=function(req,res)
{
    var http = require('http');

        var options = {
        host:  AppConfig.solrIP,
        port: AppConfig.solrPort,
        path: AppConfig.solrDirectory +'/admin/cores?wt=json',
	
	auth: AppConfig.solrUser+":"+AppConfig.solrPassword
	/*headers:{
	     'Authorization': 'Basic' +new Buffer(AppConfig.solrUser+":"+AppConfig.solrPassword).toString('base64')
	}*/
    };
	console.log(options);

    var callback = function(response) {
        var str = '';

        //another chunk of data has been recieved, so append it to `str`
        response.on('data', function (chunk) {
            str += chunk;
        });

        //the whole response has been recieved, so we just print it out here
        response.on('end', function () {
	try
	{
            var lukeCoresData=JSON.parse(str);
            var coresArray =[];
           for  (var core in lukeCoresData.status)
           {
               coresArray.push( lukeCoresData.status[core]);
           }
            res.send(JSON.stringify(coresArray));
	}
	catch(err)
	{
		console.log(err);
		console.log(str);
	}
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
};


exports.fields=function(req,res)
{
    var http = require('http');
    var coreName=req.params.core;
    //The url we want is: 'www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'
    var options = {
        host:  AppConfig.solrIP,
        port: AppConfig.solrPort,
        path: AppConfig.solrDirectory +'/'+ coreName+'/admin/luke?show=schema&wt=json',	
	auth: AppConfig.solrUser+":"+AppConfig.solrPassword

    };

    var callback = function(response) {
        var str = '';

        //another chunk of data has been recieved, so append it to `str`
        response.on('data', function (chunk) {
            str += chunk;
        });

        //the whole response has been recieved, so we just print it out here
        response.on('end', function () {
        var SolrSchema;
        try{
                SolrSchema=JSON.parse(str);
        }
        catch(err)
        {
            console.log("error parsing fields response:"+err);
            console.log("solr Response: "+ str);
            res.setHeader("Content-Type", "text/html");
            res.send("error parsing fields response from solr, contact administrator");
            res.end();
            return;
        }
            if (SolrSchema.schema)
            {
                var fields=[];
                for (field in SolrSchema.schema.fields)
                { var fieldObj=SolrSchema.schema.fields[field];
                    fieldObj.field=field;
                    fields.push(fieldObj);
                }
                console.log(JSON.stringify(fields));
                res.setHeader("Content-Type", "text/html");
                res.write(JSON.stringify(fields));
                res.end();

            }
            else
            {
                errorMsg="error: error parsing Solr fields from response";
                res.send(errorMsg);
                console.log(errorMsg);
            }
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
};
