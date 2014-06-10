/**
 * Created by conroyp on 6/10/2014.
 */
LFPWriter=require('./routes/ExportManager/LFP.js');
ExportManager= function(ExportParams, ResponseHandler)
{

    responseHandler.send("startingExport");
    LPPath=ExportParams.BaseDir+""
    var LFP= new LFPWriter(LFPPath);

};
