
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
        host: '10.106.4.112',
        port:'8080',
        path: '/solr/admin/cores?wt=json'
    };

    var callback = function(response) {
        var str = '';

        //another chunk of data has been recieved, so append it to `str`
        response.on('data', function (chunk) {
            str += chunk;
        });

        //the whole response has been recieved, so we just print it out here
        response.on('end', function () {
            var lukeCoresData=JSON.parse(str);
            var coresArray =[];
           for  (var core in lukeCoresData.status)
           {
               coresArray.push( lukeCoresData.status[core]);
           }
            res.send(JSON.stringify(coresArray));
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
        host: '10.106.4.112',
        port:'8080',
        path: '/solr/'+ coreName+'/admin/luke?show=schema&wt=json'

    };

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