function connect() {
    var url = "http://127.0.0.1:5000/roc/"
    var scaling = document.getElementById("scaling").value;
    var c = document.getElementById("c").value;

    url1 = url.concat(scaling).concat("/").concat(c);

    
    d3.json(url1).then(function(data) {
	document.getElementById('chart').innerHTML = "";
	drawLine(JSON.parse(data));
    });
}


function drawLine(data){

    var margin = {top: 30, right: 61, bottom: 70, left: 61}, 
	width = 640 - margin.left - margin.right,
	height = 480 - margin.top - margin.bottom;
    
    var xScale = d3.scaleLinear()
	.domain([0,1])
	.range([0, width])

    var yScale = d3.scaleLinear()
	.domain([0,1])
	.range([height, 0]);

    var roc = d3.line()
	.x(function(d) { return xScale(d.fpr)})
	.y(function(d) { return yScale(d.tpr)})
        .curve(d3.curveLinear); 

    var svg = d3.select("#chart").append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.attr("align","center")
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");       

    svg.append("g")
	.attr("class", "x axis")
	.attr("transform", "translate(0," + height + ")")
	.call(d3.axisBottom(xScale));

    svg.append("g")
	.attr("class", "y axis")
	.call(d3.axisLeft(yScale)); 

    svg.append("path")
	.datum(data) 
	.attr("class", "line")
	.attr("d", roc)

    // svg.append("line")
    // 	.attr("x1", xScale(0))
    // 	.attr("y1", yScale(0))
    // 	.attr("x2", xScale(1))
    // 	.attr("y2", yScale(1))
//	.attr("stroke-width", 2)
//	.attr("stroke", "black")
//	.attr("stroke-dasharray", "5,5");  
    
    
    svg.append("text")
	.attr("transform", "rotate(0)")
	.attr("y", (margin.bottom+350))
	.attr("x",350)
	.attr("dy", "1em")
	.style("text-anchor", "middle")
	.text("False Positive Rate ");

    svg.append("text")
	.attr("transform", "rotate(-90)")
	.attr("y", 0 - (margin.left/0.95))
	.attr("x",0 - (height / 2))
	.attr("dy", "1em")
	.style("text-anchor", "middle")
	.text("True Positive Rate ");  
} 
