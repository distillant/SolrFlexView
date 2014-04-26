
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var cores = require('./routes/cores');
var records = require('./routes/records');
var testfeeds = require('./routes/testFeeds');
var CCTiffLookup = require('./routes/CCTiffLookup');
var image = require('./routes/Image');
var OCR = require('./routes/OCR');

var http = require('http');
var path = require('path');

var app = express();
global.AppConfig = require('./AppConfig.js');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var arg1=null;
if (process.argv.length>=3 && process.argv[2])
{
    arg1=  process.argv[2];
}
if (arg1=="testing")
{
    app.get('/coreList', testfeeds.coreList);
    app.get('/OCR/:DB/:DOCID', testfeeds.OCRText);
    app.get('/Native/:DB/:DOCID', testfeeds.NativeFile);
    app.get('/Images/:DB/:DocID', testfeeds.DocumentImages);
    app.get('/Image/:DB/:DOCID/:Page', testfeeds.SinglePageImage);
    app.post('/AdvancedSearch', testfeeds.advancedSearch);
    app.get('/fields/:core', testfeeds.fields );
    app.get('/record/:core/:uniqueField/:key', testfeeds.recordData );
}
else
{
    app.get('/coreList', cores.cores );
    app.get('/fields/:core', cores.fields );
    app.get('/record/:core/:uniqueField/:key', records.recordData );
    app.post('/AdvancedSearch',records.AdvancedSearchSolr);
    app.get('/Images/:core/:uniqueField/:key', CCTiffLookup.getTiffsInfo);
    app.get('/Image', image.getPNG);
    app.get('/OCR/:core/:key', OCR.GetSQLOCR);
}

//app.get('/', routes.index);
//app.get('/users', user.list);
//test feeds

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
