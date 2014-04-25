/**
 * Created by conroyp on 4/5/14.
 */
/** basic barchart module utilizes d3.js to dynamically create a svg barchart from object data.
 * target element is specified in options, and chart is created there. data array can use whatever
 * field names you choose but they must be specifed in options.
 * requires you supply options object as below. currently implemented as a function rather than class.
 * will change this later in order to make chart updatable.
 * your html page should load d3.js before loading this code.
 * also see barchart.css for styling
 * example options object below
options=
{
 margin: {top: 20, right: 20, bottom: 30,left: 60},
 target: "#CoreDocsChart",
 totalWidth: 500,
 totalHeight: 400,
 data: [{name:"sent", numDocs:30}, {name:"inbox", numDocs:20},{name:"deleted", numDocs:100}],
 yLabel: "Documents",
 yField: "numDocs",
 xField: "name",
 Yticks: 10
 }
 */
define(function (require) {

var d3=require('js/lib/d3.v3.min.js');
    function BarChart(options )
    {

        _options=options;


        var margin= _options.margin,
            width=_options.totalWidth - margin.left - margin.right,
            height=_options.totalHeight - margin.top -margin.bottom;

        _options.data=_options.data.map(function(d) {
            d.xField=d[_options.xField];
            d.yField=d[_options.yField];
            return d;
        })
        var x = d3.scale.ordinal()
            .rangeRoundBands([0, width], .1);

        var y = d3.scale.linear().range([height,0]);


        x.domain(_options.data.map(function(d) {
            return d.xField;}));
        y.domain([0,d3.max(_options.data,function(d){
            return d.yField;
        })]);


        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left")
            .ticks(10);

        var svg= d3.select(_options.target).append("svg")

            .attr("width", width + margin.left + margin.right)
            .attr("height", height +margin.top + margin.bottom )
            .append("g")
            .attr("transform","translate(" + margin.left +"," + margin.top+")");



        svg.append("g")
            .attr("class", "x axis")
            .attr("transform","translate(0,"+height+")")
            .call(xAxis);

        svg.append("g")
            .attr("class","y axis")
            .call(yAxis)
            .append("text")
            .attr("transform","rotate(-90)")
            .attr("y",6)
            .attr("dy",".71em")
            .style("text-anchor","end")
            .text(_options.yLabel);

        /*  svg.data(function(data){
         x.domain(data.map(function(d) { return d.name; }));
         y.domain([0,d3.max(data,function(d){return d.numDocs;})]);

         */
        svg.selectAll(".bar")
            .data(_options.data)
            .enter()
            .append("rect")
            .attr("class","bar")
            .attr("x", function(d){ return x(d.xField); })
            .attr("y", function(d){ return y(d.yField); })
            .attr("height", function(d) { return height - y(d.yField); })
            .attr("width", x.rangeBand());



        /*
        var type =function(d)
        {
            d.name= d.letter;
            d.value = +d.frequency; //coerce to number
            return d;
        }
    */
    }
    return BarChart;
});
