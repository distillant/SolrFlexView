/**
 * Created by conroyp on 12/2/13.
 */
var fs = require('fs');
exports.coreList = function(req,res)
{
    var CCPaperResponse =fs.readFile('./test/mocks/cores.json', function (err,data) {
        if (err) {
            res.writeHead(404);
            res.end(JSON.stringify(err));
            return;
        }
        res.writeHead(200, {"Content-Type": "application/json"});
        var lukeCoresData=JSON.parse(data);
        var coresArray =[];
        for  (var core in lukeCoresData.status)
        {
            coresArray.push( lukeCoresData.status[core]);
        }
        res.write(JSON.stringify(coresArray));

        res.end();
    });
};

exports.advancedSearch=function(req,res)
{
    var CCPaperResponse =fs.readFile('./test/mocks/CCPaperResponse.json', function (err,data) {
        if (err) {
            res.writeHead(404);
            res.end(JSON.stringify(err));
            return;
        }
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(data);
    });
}

exports.OCRText=function(req,res)
{
    var CCPaperResponse =fs.readFile('./test/mocks/ocrText.json', function (err,data) {
        if (err) {
            res.writeHead(404);
            res.end(JSON.stringify(err));
            return;
        }
        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(data);
    });
};
exports.NativeFile=function(req,res){ };
exports.SinglePageImage=function(req,res){
    var pictures =['./test/mocks/Photo_on_12-4-13_at_6.26 PM.jpg',
    './test/mocks/picture2.jpg'];
    var filepath= pictures[req.params.Page-1]
    var CCPaperResponse =fs.readFile(filepath, function (err,data) {
    if (err) {
        res.writeHead(404);
        res.end(JSON.stringify(err));
        return;
    }
    res.writeHead(200, {"Content-Type": "image/jpg"});

    res.end(data);
});

};
exports.DocumentImages=function(req,res){ };
exports.fields=function(req,res){
    var CCPaperResponse =fs.readFile('./test/mocks/CCEDATA_schema.json', function (err,data) {
    if (err) {
        res.writeHead(404);
        res.end(JSON.stringify(err));
        return;
    }
    res.writeHead(200, {"Content-Type": "application/json"});
    res.end(data);
});
};

exports.recordData=function(req,res)
{
    CCPaperResponse =fs.readFile('./test/mocks/RecordData.json', function (err,data) {
        if (err) {
            res.writeHead(404);
            res.end(JSON.stringify(err));
            return;
        }
        res.writeHead(200, {"Content-Type": "application/json"});
        var recordData=JSON.parse(data);
        var DataArray =[];
        if (!recordData.response.docs[0])
        {
            res.writeHead(404);
            res.end(JSON.stringify({}));
            return;
        }/*
        for  (var item in recordData.response.docs[0])
        {
            recordData.push( lukeCoresData.status[core]);
        }*/
        res.write(JSON.stringify(recordData.response.docs[0]));

        res.end();
    });
};