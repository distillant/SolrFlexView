/**
 * Created with JetBrains PhpStorm.
 * User: conroyp
 * Date: 9/17/13
 * Time: 11:59 AM
 * To change this template use File | Settings | File Templates.
 */
var TDSConnection = require('tedious').Connection;
var TDSRequest = require('tedious').Request;

var config = {
    server:  "AGI155", //this will get overridden later
    userName: "sa",
    password: "unknown"
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

exports.getTiffsInfo = function(req,res)
{

    var sqlDb=global.AppConfig.sqlDb;
    var replacementStrings=global.AppConfig.replacementStrings;


    if(req.params.key && req.params.core )
    {
        var docID=req.params.key;
        var core=req.params.core;
        if (!sqlDb[req.params.core])
        {
            res.end({error:"database name'"+ core+"'not known:"});
        }
        var table=sqlDb[core].TIFFtable;
        //override SQL server properties using the one from the config file for this core;
        config.server=sqlDb[core].server;
        var db=sqlDb[core].db;
        config.userName=global.AppConfig.SQLUserName;
        config.password=global.AppConfig.SQLPassword;
    }
    else
    {
        res.end({error:"DocID or core not correctly specified:"});
        return;
    }
    var replacementString =replacementStrings[core];
    testCommand ="SELECT ID, DocID, Bates, Full_DOS_Path FROM " +db +".." +table +"  where docid ='" +docID +"' Order by bates;";
    var tdsconnection = new TDSConnection(config);

    tdsconnection.on('connect', function(err) {
            if (err)
                console.log(err);
            // If no error, then good to go...
            //*****LAUNCH SQL QUERY**************
            executeStatement(tdsconnection,testCommand, replacementString,res);
        }
    );
    tdsconnection.on('debug', function(text) {
            // console.log(text);
        }
    );
}



function executeStatement(tdsconnection,testCommand, replacementString,resp) {
var tiffsArray=[];
   var tdsrequest = new TDSRequest(testCommand, function(err, rowCount) {
        if (err) {
            console.log(err);
        } else {
            console.log(rowCount + ' rows');
        }

        tdsconnection.close();
    });

    tdsrequest.on('row', function(columns) {
        var tiffRow={};
        columns.forEach(function(column) {
            if (column.value === null) {
                console.log('NULL');
                tiffRow[column.metadata.name]=null;
            } else {
                console.log(column.value);
                if(column.metadata.colName=='Full_DOS_Path')
                {   //replace path prefix for PPLPs current network paths.
                    tiffRow['Full_DOS_Path']=column.value.toString().replace(replacementString.oldPrefix, replacementString.newPrefix)
                }
                else
                    tiffRow[column.metadata.colName]=column.value;
            }
        });

        tiffsArray.push(tiffRow);
    });

    tdsrequest.on('done', function(rowCount, more) {
        console.log(rowCount + ' rows returned');
        console.log( new Date().toISOString());
        resp.setHeader("Content-Type", "application/json");
        resp.write(JSON.stringify(tiffsArray));
        resp.end();
    });

    // In SQL Server 2000 you may need: connection.execSqlBatch(tdsrequest);
//    connection.execSql(tdsrequest);

    console.log( new Date().toISOString());
    tdsconnection.execSqlBatch(tdsrequest);

}
/*
 var cnstr = "Data Source=agi55;Initial Catalog=DGSInventory;User ID=sa;Password=unknown";
 var sqlcmd = "SELECT top 20 [EmpID] as 'Value', [EmployeeName] as 'Description' " +
 "FROM [DGSInventory].[dbo].[webEmployeeIDList] " +
 "where EmployeeName like ' " + prefixText + "%'";
 */