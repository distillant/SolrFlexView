/**
 * Created by patrick conroy on 4/30/14.
 */

/**** sample Export Json Input
export request example
{
    ExportType: ["all" or "selected"]
    query:[ {id: id1 OR id2 OR id3} / q{criteria}
    fl:{"id","url"},
    exportFormat:{
        wt:"CSV",
            parameters:{
            "csv.encapsulator":null,
                "csv.escape":null,
                "csv.separator":null,
                "csv.header":null,
                "csv.newline":null,
                "csv.null":null,
                "csv.mv.encapsulator":null,
                "csv.mv.escape":null,
                "csv.mv.separator":null
        },
    },
    exportImages:false,
    exportOCR:false,
    exportImages:false,
    exportData:true;
    exportLocation:null,
    exportTitle:"Title of export"
    ImageFormat:["single page Tiff"/, "multipage tiff","PDF"]
    ImageNaming:["Sequential","BatesBeginBegin"]

}
***/

/****
 how will this work
1) export should be broken into different tasks
    a) data
    b) images
    c) ocr


1) start by implementing 1 standard export of images and data using all search criteria
2) create a separate process to perform the export.
3) system should report back to client using some sort of api that checks on bactch status
 probably need an in memory database for this.
4) add cancel ability
5) add additional export functionality.
6)