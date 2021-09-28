// Code from https://bl.ocks.org/d3noob/43a860bc0024792f8803bba8ca0d5ecd

var d3 = require('d3');

function StakeholderAnalysis(id, treeData, color, fillColor, stakeholderHeight, offsetHeight) {

    // Set the dimensions and margins of the diagram
    var margin = {top: 25, right: 250, bottom: 25, left: 250},
        width = window.innerWidth - margin.left - margin.right,
        height = stakeholderHeight - margin.top - margin.bottom;

    // append the svg object to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin

    var svg;
    var i;
    var duration;
    var root;
    var treemap;
    var link_width = window.innerWidth/4 - (margin.left/4 + margin.right/4);
    var wrap_text = link_width - 55;

    this.destroy = function() {
        exitTreemap()
    }

    function exitTreemap() {
        d3.select("svg").remove();
    }

    createTree();

    // Collapse after the second level
    //root.children.forEach(collapse);

    update(root);

    function createTree() {
        svg = d3.select(id).append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
          .append("g")
            .attr("transform", "translate("
                  + margin.left + "," + margin.top + ")")
            .attr("width", width + margin.left + margin.right);


        i = 0;
        duration = 750;

        // declares a tree layout and assigns the size
        treemap = d3.tree().size([height, width]);

        // Assigns parent, children, height, depth
        root = d3.hierarchy(treeData, function(d) { return d.children; });
        root.x0 = height / 2;
        root.y0 = 0;
    }


    // Collapse the node and all it's children
    function collapse(d) {
      if(d.children) {
        d._children = d.children
        d._children.forEach(collapse)
        d.children = null
      }
    }

    function update(source) {

      // Assigns the x and y position for the nodes
      var treeData = treemap(root);

      // Compute the new tree layout.
      var nodes = treeData.descendants(),
          links = treeData.descendants().slice(1);

      // Normalize for fixed-depth.
      nodes.forEach(function(d){ d.y = d.depth * link_width});

      // ****************** Nodes section ***************************

      // Update the nodes...
      var node = svg.selectAll('g.node')
          .data(nodes, function(d) {return d.id || (d.id = ++i); });

      // Enter any new modes at the parent's previous position.
      var nodeEnter = node.enter().append('g')
          .attr('class', 'node')
          .attr("transform", function(d) {
            return "translate(" + source.y0 + "," + source.x0 + ")";
        })
        .on('click', click);



      // Add Circle for the nodes
      nodeEnter.append('circle')
          .attr('class', 'node')
          .attr('r', 1e-6)
          .style("stroke", color)
          .style("fill", function(d) {
              return d._children ? fillColor : "#fff";
          });


      // Add labels for the nodes
      nodeEnter.append('text')
          .attr("dy", ".35em")
          .attr("x", function(d) {
              return d == root ? -13 : 13;
          })
          .attr("text-anchor", function(d) {
              return d == root ? "end" : "start";
          })
          .text(function(d) { return d.data.name; })
          .call(wrap, wrap_text);



      // UPDATE
      var nodeUpdate = nodeEnter.merge(node);

      //Transition to the proper position for the node
      nodeUpdate.transition()
        .duration(0)
        .attr("transform", function(d) {
            return "translate(" + d.y + "," + d.x + ")";
         });

      // Update the node attributes and style
      nodeUpdate.select('circle.node')
        .attr('r', 10)
        .style("fill", function(d) {
            return d._children ? fillColor : "#fff";
        })
        .attr('cursor', 'pointer');


      // Remove any exiting nodes
      var nodeExit = node.exit().transition()
          .duration(0)
          .attr("transform", function(d) {
              return "translate(" + source.y + "," + source.x + ")";
          })
          .remove();

      // On exit reduce the node circles size to 0
      nodeExit.select('circle')
        .attr('r', 1e-6);

      // On exit reduce the opacity of text labels
      nodeExit.select('text')
        .style('fill-opacity', 1e-6);

      // ****************** links section ***************************

      // Update the links...
      var link = svg.selectAll('path.link')
          .data(links, function(d) { return d.id; });

      // Enter any new links at the parent's previous position.
      var linkEnter = link.enter().insert('path', "g")
          .attr("class", "link")
          .attr('d', function(d){
            var o = {x: source.x0, y: source.y0}
            return diagonal(o, o)
          });

      // UPDATE
      var linkUpdate = linkEnter.merge(link);

      // Transition back to the parent element position
      linkUpdate.transition()
          .duration(0)
          .attr('d', function(d){ return diagonal(d, d.parent) });

      // Remove any exiting links
      var linkExit = link.exit().transition()
          .duration(0)
          .attr('d', function(d) {
            var o = {x: source.x, y: source.y}
            return diagonal(o, o)
          })
          .remove();

      // Store the old positions for transition.
      nodes.forEach(function(d){
        d.x0 = d.x;
        d.y0 = d.y;
      });

      // Creates a curved (diagonal) path from parent to the child nodes
      function diagonal(s, d) {

        var path = `M ${s.y} ${s.x}
                C ${(s.y + d.y) / 2} ${s.x},
                  ${(s.y + d.y) / 2} ${d.x},
                  ${d.y} ${d.x}`

        return path
      }

      // Toggle children on click.
      function click(d) {
        if (d.children) {
            d._children = d.children;
            d.children = null;
          } else {
            d.children = d._children;
            d._children = null;
          }
        update(d);
      }
    }

    function wrap(text, width) {
      var tooltip = d3.select(id).append('div')
          .attr('class', 'tooltip_react')
          .style('display', 'none');
      var expandColor = fillColor;

      text.each(function() {
        var text = d3.select(this),
            words = text.text().split(/\s+/).reverse(),
            word,
            line = [],
            lineNumber = 0,
            lineHeight = 0.6, // ems
            y = text.attr("y"),
            x = text.attr("x"),
            dy = parseFloat(text.attr("dy")),
            tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em"),
            parentNode = d3.select(this.parentNode);
        while (word = words.pop()) {
          line.push(word);
          tspan.text(line.join(" "));
          if (tspan.node().getComputedTextLength() > width) {
            line.pop();
            tspan.text(line.join(" "));
            if (lineNumber > 1) {
                tspan.text(line.join(" ") + "...");
                text.append('tspan')
                    .attr("x", x)
                    .attr("y", y)
                    .attr("dy", lineHeight + dy + "em")
                    .style("fill", expandColor)
                    .style("cursor", "pointer")
                    .text("More")
                    .on("mouseover", function(d) {
                          var tooltipText = d.data.name;
                          var tooltipX = (d.depth + 1) * link_width + margin.left - 5;
                          var tooltipY = offsetHeight + d.x + 10;
                          tooltip.html(tooltipText)
                              .style("display", "block")
                              .style("left", (tooltipX) + "px")
                              .style("top", (tooltipY) + "px");
                    })
                    .on("mouseout", function() {
                        tooltip.style("display", "none");
                    });
                break;
            } else {
                line = [word];
                tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", lineHeight + dy + "em").text(word);
                lineNumber++;
            }

          }
        }
      });
    }
}

module.exports = StakeholderAnalysis;