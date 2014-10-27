/**
 * Created with JetBrains PhpStorm.
 * User: conroyp
 * Date: 9/17/13
 * Time: 11:59 AM
 * To change this template use File | Settings | File Templates.
 */
var TDSConnection = require('tedious').Connection;
var TDSRequest = require('tedious').Request;
var TDSTYPES = require('tedious').TYPES;
var config = {
    server:  AppConfig.SQLServer, //this will get overridden later
    userName: AppConfig.SQLUserName,
    password: AppConfig.SQLPassword
    ,options: {
        tdsVersion: '7_1', //this is for sql 2000.
        debug: {
            packet: true,
            data: true,
            payload: true,
            token: false,
            log: true
        }
    }
};

exports.GetSQLOCR = function(req,res)
{

    var sqlDb=global.AppConfig.sqlDb;

    if(req.params.key && req.params.core )
    {
        var docID=req.params.key;
        var core=req.params.core;
        if (!sqlDb[req.params.core])
        {
            res.end({error:"database name'"+ core+"'not known:"});
        }
        var table= sqlDb[core].db+".."+ sqlDb[core].OCRTable;
        //override SQL server properties using the one from the config file for this core;
        config.server=sqlDb[core].server;
    }
    else
    {
        res.end({error:"DocID or core not correctly specified:"});
        return;
    }
    var testCommand ="SELECT @OCR =  OCR from " + table +"  where docid ='" +docID +"'";

    //var testCommand ="SELECT OCR from " + table +"  where docid ='" +docID +"'";
    var tdsconnection = new TDSConnection(config);

    tdsconnection.on('connect', function(err) {
            if (err)
                console.log("ERROR- See below");
                console.log(err);
            // If no error, then good to go...
            //*****LAUNCH SQL QUERY**************
            executeStatement(tdsconnection,testCommand, res);
        }
    );
    tdsconnection.on('debug', function(text) {
//           console.log(text);
        }
    );
};

function executeStatement(tdsconnection,testCommand, resp) {
    var returnData1={};
    tdsrequest = new TDSRequest(testCommand, function(err, rowCount) {
        if (err) {
            console.log(err);
        } else {
            console.log(rowCount + ' rows');
        }
    });

    tdsrequest.addOutputParameter('OCR', TDSTYPES.NText);

    tdsrequest.on('returnValue', function(parameterName, value, metadata) {
        console.log(parameterName + ' = ' + value);      // number = 42
        // string = qaz
    });

    // In SQL Server 2000 you may need: connection.execSqlBatch(tdsrequest);
//    tdsconnection.execSql(tdsrequest);

    console.log( new Date().toISOString());
    tdsconnection.execSqlBatch(tdsrequest);

}
