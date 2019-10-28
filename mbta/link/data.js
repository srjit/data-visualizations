
var dispatch = d3.dispatch("dataLoaded","stationHovered", "nodesUpdated");


d3.json("stations.json", function(error, stations)
{
    var data = {};
    data.nodes = stations.nodes;
    data.links = stations.links;

    for(var i = 0; i < data.nodes.length; i++)
    {
        var links = stations.links.filter(function(link)
        {
            return link.source === i || link.target === i;
        });

        var linksColors = links.map(function(link) { return link.color; });
        var allEqual = linksColors.filter(function(color) { return color !== linksColors[0]; }).length === 0;

        data.nodes[i].color = allEqual ? linksColors[0] : '000';
    }

    if (error) throw error;
    else
    {
        d3.json("turnstile-gtfs-mapping.json", function(error, mapping)
        {
            if (error) throw error;
            else
            {
                d3.json("turnstile-heatmap.json", function(error, entrances)
                {
                    if (error) throw error;
                    else
                    {
                        entrances.stops.forEach(function(stop)
                        {
                            var stationId = mapping[stop.name];

                            data.nodes.filter(function(station)
                            {
                                return station.id === stationId;
                            })[0]['entrances'] = stop.entrancesByType.all;
                        });

                        //setupNodelink(data);
			dispatch.call('dataLoaded', null, data); 
                    }
                });
            }
        });
    }
});


dispatch.on("dataLoaded.nodelink", function(data) {
    setupNodelink(data);
});


var allNodes;
dispatch.on("dataLoaded.pie", function(data) { 
    allNodes = data.nodes; 
    visUpdated(data.nodes);
});


dispatch.on("stationHovered.pie", function(station) {
    var arcs = pieG.selectAll(".arc");

    if (station) {
	arcs.select("path").attr("fill-opacity", 0.7);
	arcs.filter(function(d) {return d.data.id === station.id;
				}).select("path").attr("fill-opacity", 1);
    } else {
	arcs.select("path").attr("fill-opacity", 1);
    }
});


dispatch.on("stationHovered.nodelink", function(station) {
    var nodes = nodelinkSvg.selectAll("circle");
    if (station) {
	nodes.filter(function(d){
	    return d.id === station.id;
				      }).attr("fill","FFFF00");
    } else {
	nodes.attr("fill", function(d) { return '#' + d.color; });
    }
});


dispatch.on("nodesUpdated.nodelink", function(_selectedNodes){
    visUpdated(_selectedNodes)   
});

