/**
 * Created with JetBrains PhpStorm.
 * User: conroyp
 * Date: 9/17/13
 * Time: 11:59 AM
 * To change this template use File | Settings | File Templates.
 */
var TDSConnection = require('tedious').Connection;
var TDSRequest = require('tedious').Request;

var Config =function(serverName,user, pass) {
    return {
        server: serverName, //this will get overridden later
        userName: user,
        password: pass,
        options: {
            tdsVersion: '7_1', //this is for sql 2000.
            debug: {
                packet: true,
                data: true,
                payload: true,
                token: false,
                log: true
            }
        }
    }
};

exports.getTiffsInfo = function(req,res) {
    if (!(req.params.key && req.params.core)) {
        res.end({error: "missing key or core parameters"});
        return;
    }
    var docID = req.params.key;
    var core = req.params.core;

    var responseHandler=function responseHandler(err,obj)
    {
        if(err){
            res.setHeader("Content-Type", "text/html");
            res.write(JSON.stringify(err));
            res.end();
            console.log(err);
        }
        else{
            res.setHeader("Content-Type", "text/html");
            res.write(JSON.stringify(obj)); //send entire object to include start & end for paging
            res.end();

        }
    };
    exports.tiffQuery(core, docID, responseHandler);
};

exports.tiffQuery=function(core, docID, responseHandler)
{
    var sqlDb=global.AppConfig.sqlDb;
    if (!sqlDb[core])
    {
        responseHandler({error:"database name'"+ core+"'not known:"},null);
        return;
    }
    var table=sqlDb[core].TIFFtable;
    //override SQL server properties using the one from the config file for this core;

    var config= Config(sqlDb[core].server, global.AppConfig.SQLUserName, global.AppConfig.SQLPassword );
    var db=sqlDb[core].db;

    var replacementString =global.AppConfig.replacementStrings[core];
    testCommand ="SELECT ID, DocID, Bates, Full_DOS_Path FROM " +db +".." +table +"  where docid ='" +docID +"' Order by bates;";
    var tdsconnection = new TDSConnection(config);
    tdsconnection.on('connect', function(err) {
            if (err)
            {
                console.log(err);
                responseHandler(err,null);
                return;
            }
            // If no error, then good to go...
            //*****LAUNCH SQL QUERY**************
            executeStatement(tdsconnection,testCommand, replacementString,responseHandler);
        }
    );
    tdsconnection.on('debug', function(text) {
            // console.log(text);
        }
    );
};



function executeStatement(tdsconnection,testCommand, replacementString,callback) {
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
        //return the data
        callback(null,tiffsArray);

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