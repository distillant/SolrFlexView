/**
 * Created by conroyp on 6/10/2014.
 */
var fs=require('fs')
exports.LFP=function(path){
    var lfpPath="";
    var outputStream;
    var initialize=function(path){
        lfpPath=path;
        try
        {
            outputStream =fs.createWriteStream(lfpPath);
        }
        catch(err)
        {
            console.log("error while opening LFP for writing" +err)
            return err;
        }
    };
    this.getOptions=function()
    {
        return ( {
            alias: null,
            volume: "Vol001",
            path: null,
            docBreak: null,
            folderBreak: null,
            BoxBreak: null,
            Pages: null
        });
    }

    this.writeLine=function(o){
        //write Out lfpLine from options

        var outputLine= [o.alias,
            o.volume,
            o.path,
            o.docBreak,
            o.folderBreak,
            o.BoxBrea,
            o.Pages].join(",");
        outputStream.write(outputLine);

    };

    this.close=function()
    {
        outputStream.close();
        //close file
    };
    initialize(path);
};