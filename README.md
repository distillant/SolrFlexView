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
git fetch https://github.com/distillant/SolrFlexView.git;
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
