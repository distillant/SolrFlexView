/**
 * Created by conroyp on 12/5/13.
 */



var myConfigVars=
{
    imageMagickConvertAppPath:"convert.exe",
    imageMagickIdentityAppPath:   "identify.exe"

};
var fs = require('fs'),
    im = require('imagemagick');

im.identify.path=myConfigVars.imageMagickIdentityAppPath;
im.convert.path= myConfigVars.imageMagickConvertAppPath;
/*
exports.image(req,res)
{
    var core=req.params.core;
    var uniqueField=req.params.uniqueField;
    var key=req.params.key.toString();

};*/
exports.getPNG =function (req, res) {
    var ratio=100;
    var inputpath=req.query.file;

    var myTiff = fs.readFileSync(inputpath);
    res.writeHead(200, {
        'Content-Type': 'image/png'
        //'Content-Type': mime.lookup(filePath),
        // ,'Content-Length': stat.size
    });

    var conv = im.convert(['tiff:-', '-resize', ratio.toString() +'%', 'png:-']);
    conv.on('data', function(data) {
        // console.log('data');
        // console.log(data);
        res.write(data, 'binary');
    });
    conv.on('end', function() {
        // console.log('end');
        res.end();
    });
    conv.stdin.write(myTiff);
    conv.stdin.end();
};