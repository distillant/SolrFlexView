#SolrFlexView
Node.js/backbone based flexible search tool/viewer for searching for documents & metadata accross multiple SOLR cores

This tool allows flexible searching and display of data from solr, allowing one to add new cores without altering this application. the tool utilizes Some of solr's json feeds to read database schema's avoiding the need to include this info in the config. 

This implementation also includes features related to our particular use case.
	-It provides the ablity to view related tiff images/ converting them on the fly to pngs, with a viewer that also provides dynamic navigation, zooming, and rotation features.
	-Tt provides the ablity to extract documents matching particular criteria in a standard format.

##Requirements: 
Node.js version 1 or higher;
Solr server version 3.5 and higher loaded with a solr core; with access open to the server where you install this application.
a modern web browser

##Getting started:
copy the code to your server using git:

````bash
git clone https://github.com/distillant/SolrFlexView.git
cd SolrFlexView/
npm install
````

node package manager will download the dependancies;
after this completes navigate to the express directory and install its dependeancies
ie. 


````bash
cd SolrFlexView/node_modules/express/ 
npm install
````

sample Configuration is under appConfigDev.js rename it to appConfig.js and alter it with your environment's settings. this file will contain your passwords, solr ip and url, and sql credentials if needed.
currently it looks something like this.

````javascript
module.exports={
    solrIP:"localhost",
    solrDirectory:'/solr',
    solrPort:'8080'
}
````
Assuming your solr server is up and running, start the application using node. Within the SolrFlexView folder type "node app.js";

you can access the application with in the browser at:
http://localhost:3000/index.html

The front end code is located in the public folder. This system uses backbone.js for a front end mvc framework storing data recived from the server in collections and models. This system uses require.js to dynamically load modular html templates, and javascript code as needed on the fly.
the front end folder structure is as follows:

    public
    │   ├── bootstrap (bootstrap only code)
    │   │   ├── css
    │   │   ├── img
    │   │   └── js
    │   ├── css (stylesheets)
    │   └── js  (this where the magic happens)
    │       ├── app
    │       │   ├── router.js   (most functionality starts here)
    │       │   ├── models   (backbone Models)
    │       │   └── views   (backbone views)
    │       ├── require.js
    │       ├── app.js   (require config,  starts the single page app)
    │       ├── lib   (jquery, backbone, custom d3 charting code, etc)
    │       └── tpl   (html fragments and underscore html templates)
    └── index.html   (the single page in single page app. loads require.js)

#Architecture
Aritecture model for this project is focused on providing an extensable, reusable, open architecture with plugins for the implementation specific components.
in particular the image and native file lookup mechanism is something that
requires custom implemnetation code. so there will be a public
image retrival interface but a non-standard backend lookup mechanism.

#API:

###CoreList:
get solr core list:
http://[host_url]/coreList

response:

###retrieve native file


    app.get('/coreList', user.cores );
    app.get('/fields/:core', user.fields );
    app.get('/record/:core/:uniqueField/:key', records.recordData );
    app.post('/AdvancedSearch',records.AdvancedSearchSolr);
    app.get('/Images/:core/:uniqueField/:key', CCTiffLookup.getTiffsInfo);
    app.get('/Images/:DB/:DocID', testfeeds.DocumentImages); //not implementaed
    app.get('/Image', image.getPNG);
    app.get('/Image/:DB/:DOCID/:Page', testfeeds.SinglePageImage); //not implemented
Image retrieval interface

###Get list of images for document:
http://[host_url]/image?core=[core_name]&docID=[Document_ID]
ex.
http://localhost:3000/images?core=EnglishBooks&key=12327685785
Response:
{images:[http://localhost:3000/getpng/EnglishBooks/12323123123.png
]}

###get image:
[host_url]\getPNG?core=[core_name]&file="FilePath"
or
"[host_url]\getPNG\[Core]\[DocID]"

ex.
http://localhost:3000/images?core=EnglishBooks&key=12327685785
Response:(PNG binary code)


    app.get('/OCR/:core/:key', OCR.GetSQLOCR);
    app.get('/Native/:DB/:DOCID' //not implemented