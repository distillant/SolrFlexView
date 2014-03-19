/**
 * Created with JetBrains PhpStorm.
 * User: conroyp
 * Date: 9/19/13
 * Time: 7:38 PM
 * To change this template use File | Settings | File Templates.
 */
var myConfigVars=
{
    imageMagickConvertAppPath:"C:\\temp\\ImageMagick\\convert.exe",
    imageMagickIdentityAppPath:   "C:\\temp\\ImageMagick\\identify.exe"

};
var fs = require('fs'),
    im = require('imagemagick');

im.identify.path=myConfigVars.imageMagickIdentityAppPath;
im.convert.path= myConfigVars.imageMagickConvertAppPath;


exports.getPNG =function (req, res) {
        var ratio=100;
        var inputpath=req.query.file;
        if (typeof(req.query.ratio)!= "undefined")
            ratio=req.query.ratio;
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