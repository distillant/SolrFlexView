/**
 * Created by patrick conroy on 3/19/14.
 */
module.exports={
    solrIP:"localhost",
    solrDirectory:'/solr',
    solrPort:'8983',
    solrUser:'solrUserName',
    solrPassword:'password',
    //non-generic section
    SQLUserName: 'admin',
    SQLPassword: 'password',
    sqlDb:{
        "core_name_here":{server    :"localhost", db:"[db_Name]", TIFFtable:"name_ofTiffTable", OCRTable:"text"}
    },
    replacementStrings:{
        "core_name_here" : { oldPrefix:"\\\\dbfileLocation\\398", newPrefix : "\\\\localhost\\testing"},
    },
    imageMagick:
    {
        identityAppPath:"identity",
        convertAppPath:"convert"
    },
    defaultExportDir:"c:\\temp\\"

};