Template.show.rendered = function() {
    document.title = "Graph Display";
    var width = 960,
    height = 500;

    var color = d3.scale.category20();

    var force = d3.layout.force()
    .charge(-120)
    .linkDistance(30)
    .size([width, height]);

    $('#renderer').html('');
    var svg = d3.select("#renderer").append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr('id', 'renderer');

    // i2g_testgraph_img2graph_v29_gala_node_paramset_3_img2graph_v29_syn_obj_edge_paramset_9.attredge
    d3.csv('/graphs/' + this.data.filename, function(error, data) {
        graph = { "nodes": [], "links": [] };

        data.forEach(function(d) {
            graph.nodes.push({ "name": d['#source'].trim() });
            graph.nodes.push({ "name": d[' target'].trim() });
            graph.links.push({
                source:             d['#source'].trim(),
                target:             d[' target'].trim(),
                synapse_id:         d[' synapse_id'].trim(),
                weight:             10,
                direction:          d[' direction'].trim(),
                synapse_truth_id:   d[' synapse_truth_id'].trim()
            });
        });

        var nodesmap = d3.nest()
        .key(function (d) { return d.name; })
        .rollup(function (d) { return { "name": d[0].name, "group": 1 }; })
        .map(graph.nodes);

                //thanks Mike Bostock https://groups.google.com/d/msg/d3-js/pl297cFtIQk/Eso4q_eBu1IJ
                //this handy little function returns only the distinct / unique nodes
                graph.nodes = d3.keys(d3.nest()
                   .key(function (d) { return d.name; })
                   .map(graph.nodes));


                //it appears d3 with force layout wants a numeric source and target
                //so loop through each link replacing the text with its index from node
                graph.links.forEach(function (d, i) {
                    graph.links[i].source = graph.nodes.indexOf(graph.links[i].source);
                    graph.links[i].target = graph.nodes.indexOf(graph.links[i].target);
                });

                //this is not in the least bit pretty
                //will get graph.nodes in its final useable form
                //loop through each unique node and replace with an object with same numeric key and name/group as properties
                //that will come from the nodesmap that we defined earlier
                graph.nodes.forEach(function (d,i) { graph.nodes[i]={ "name": nodesmap[d].name, "group": nodesmap[d].group }; })

                force
                .nodes(graph.nodes)
                .links(graph.links)
                .linkDistance(10)
                .gravity(0.5)
                .start();

                var link = svg.selectAll(".link")
                .data(graph.links)
                .enter().append("line")
                .attr("class", "link")
                .style("stroke-width", 1)
                .style('stroke', "rgb(153, 153, 153)");

                var node = svg.selectAll(".node")
                .data(graph.nodes)
                .enter().append("circle")
                .attr("class", "node")
                .attr("r", 5)
                .style("fill", function (d) { return color(d.group); })
                .call(force.drag);

                node.append("title")
                .text(function (d) { return d.name; });

                force.on("tick", function () {
                    link.attr("x1", function (d) { return d.source.x; })
                    .attr("y1", function (d) { return d.source.y; })
                    .attr("x2", function (d) { return d.target.x; })
                    .attr("y2", function (d) { return d.target.y; });

                    node.attr("cx", function (d) { if (d.x < 0) { d.x = 0; } return d.x; })
                    .attr("cy", function (d) { if (d.y < 0) { d.y = 0; } return d.y; });
                });
            });
}
