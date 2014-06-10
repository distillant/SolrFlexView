/**
 * Created by conroyp on 6/10/2014.
 */
var tiffQuery=require('./routes/TiffLookup.js').tiffQuery;
exports.Document=function(DocumentData)
{
    var LFP;
    var LFPOptions;
    this.initialize=function(DocumentData)
    {
        this.core = DocumentData.core;
        this.docID = DocumentData.DocID;
        LFP = DocumentData.LFP;
        this.imageArray = [];
        this.LNU = DocumentData.LNU;
        LFPOptions = LFP.getOptions();
        LFPOptions.volume=DocumentData=volume;

    },
    this.lookup=function()
    {
        var self=this;
        var responseHandler=function responseHandler(err,obj)
        {
            if(err){
                throw(err);
            }
            else{
                self.imageArray =obj;
            }
        };

        tiffQuery(this.core, this.docID, responseHandler);
        //pull info from SQL
    },
    this.copyPages=function()
    {
        var counter=0;

        var base=DocumentData.BasePath +DocumentData.subFolder;
        for(var page in this.imageArray)
        {
            var outputFileName= (LNU + counter++).toString() +".tiff";
            var outputPath=base + OutputFileName;
            imageWriter(page.url, outputPath);
            this.writeData( counter,DocumentData.subFolder+outputFileName );

        }
         this.LNU=DocumentData.LNU+=counter;
    },
    this.writeData=function(counter,coutputFileName)
    {
        this.LFPOptions.path=coutputFileName;
        this.LFPOptions.docBreak= (counter==0) ? "Y" : null;
        this.LFP.Write(this.LFPOptions);
    }

    this.initialize(DocumentData.core,DocumentData.docID,DocumentData.LFP );
    this.lookup()
}

var imageWriter=function(source,target)
{

}