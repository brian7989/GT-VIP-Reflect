
import React, {Component} from 'react';
import * as d3 from "d3";


import _ from 'lodash';
import nodeHelperFunctions from "./D3TreeNodesHelperFunctions";
//treeData, color, fillColor, stakeholderHeight, offsetHeight, contextMenuDiv, margin, link_width
class ES6D3Tree extends Component {

    constructor(props) {
        super(props);

        //let svg;
        // let i;
        // let duration;
        this.root  = null;
        this.svg = null;
        this.i = 0;
        this.treemap = null;


        //console.log(props);
        this.node = React.createRef();

        // console.log("These are the props passed to the tree!!!!!!!!!!");
        // console.log(props);

        // Set the dimensions and margins of the diagram
        this.width = window.innerWidth - props.margin.left - props.margin.right;
        this.height = props.stakeholderHeight - props.margin.top - props.margin.bottom;
    }

    shouldComponentUpdate(nextProps, nextState) {

        let next = nextProps.treeData;
        let current = this.props.treeData;
        let shouldUpdate = (next.name != current.name );
        // visit the children of this tree to see if a change such as a change in a node's text has happened
        while ( next.children && current.children && next.children.length > 0) {
            shouldUpdate = shouldUpdate || (next.name != current.name || next.children.length != current.children.length);
            next = next.children;
            current = current.children;
        }
        //if next  and current have are different after the loop above, then it means a new node was added or deleted
        shouldUpdate = shouldUpdate || (next != current )
        // console.log("this is the data returned for child tree node:!!!!!!!!!!!!! shouldUpdate= " +  shouldUpdate + " and force-Re-render== " + this.props.forceRerender);
        // console.log(nextProps.treeData);
        // console.log(this.props.treeData);

        //only re-render if the data is different
        return  shouldUpdate || this.props.forceRerender;
    }


    componentDidUpdate() {
        //console.log("Calling from component did update!!!!!!!!!!!!!!!!!!!!");
        //this.generateStakeholdersTree();
        //destroy the component before re-rendering
        //this.destroy();
        this.renderThisComponent();
    }

    componentDidMount() {
        //console.log("Calling from component did  mount!!!!!!!!!");
        //this.generateStakeholdersTree();
        //this.destroy();
        this.renderThisComponent();
    }


    addMouseHoverListenerToNodes(contextMenuDiv){
        // Enter any new modes at the parent's previous position.
        //let menu = contextMenu().items('first item', 'second option', 'whatever, man');
        d3.selectAll("svg").selectAll('g.node > circle')
            .on("mouseover", (d) => {
                // alert("This mouse overed!!!!");
                //if one right-clicks back to back on different nodes or the same node then re-display it, hence
                //why we first set state to false and then back to true
                //d3.event.preventDefault();
                if (this.props.readOnlyMode) return;
                contextMenuDiv.setVisibleContextMenuToFalse();
                //d3.event.preventDefault();
                contextMenuDiv.setNodeClickEventParamaeters(d, d3.event);
            })

    }

    createTree() {
        const node = this.node.current;
        let svgDiv = "#" + this.props.id + " > svg";
        d3.select(svgDiv).remove();
        this.svg =  d3.select(node).append("svg")
            .attr("width", this.width + this.props.margin.left + this.props.margin.right)
            .attr("height", this.height + this.props.margin.top + this.props.margin.bottom)
            .append("g")
            .attr("transform", "translate("
                + this.props.margin.left + "," + this.props.margin.top + ")")
            .attr("width", this.width + this.props.margin.left + this.props.margin.right);

        //duration = 750;

        // declares a tree layout and assigns the size
        this.treemap = d3.tree().size([this.height, this.width]);

        // Assigns parent, children, height, depth
        this.root = d3.hierarchy(this.props.treeData, (d) => { return d.children;});
        //set the root of the node at the middle of the svg containing it
        this.root.x0 = this.height / 2;
        this.root.y0 = 0;

        return this.root;

    }


    // Collapse the node and all it's children
    collapse(d) {
        if(d.children) {
            d._children = d.children
            d._children.forEach(this.collapse)
            d.children = null
        }
    }


    // Toggle children on click.
    click(d) {
        //hide the context menu if it is being shown if not in readonly mode
        if (!this.props.readOnlyMode) {
            this.props.contextMenuDiv.setVisibleContextMenuToFalse();
        }
        if (d.children) {
            d._children = d.children;
            d.children = null;
        } else {
            d.children = d._children;
            d._children = null;
        }
        this.update(d); /// this.update(this.root, wrap_text);
        this.addMouseHoverListenerToNodes(this.props.contextMenuDiv);

    }

    // Creates a curved (diagonal) path from parent to the child nodes
    diagonal(s, d) {

        let path = `M ${s.y} ${s.x}
                    C ${(s.y + d.y) / 2} ${s.x},
                      ${(s.y + d.y) / 2} ${d.x},
                      ${d.y} ${d.x}`
        return path
    }



    update = (source) => {

        // Assigns the x and y position for the nodes
        var treeData = this.treemap(this.root);

        // Compute the new tree layout.
        var nodes = treeData.descendants(),
            links = treeData.descendants().slice(1);

        // Normalize for fixed-depth.
        nodes.forEach((d) => {
            d.y = d.depth * this.props.link_width;
        });

        // ****************** Nodes section ***************************

        // Update the nodes...
        var node = this.svg.selectAll('g.node')
            .data(nodes, (d) => {return d.id || (d.id = ++this.i); });

        // Enter any new modes at the parent's previous position.
        var nodeEnter = node.enter().append('g')
            .attr('class', 'node')
            .attr("transform", (d) => {
                return "translate(" + source.y0 + "," + source.x0 + ")";
            })
            .on('click', (d) => this.click(d));



        // Add Circle for the nodes
        nodeEnter.append('circle')
            .attr('class', 'node')
            .attr('r', 1e-6)
            // .style("stroke", this.props.color)
            .style("stroke", "#0066CC")
            .style("fill", (d) => {
                return d._children ? this.props.fillColor : "#fff";
            });

        //nodeEnter.call(this.customizedWrapDiv);



        // Add labels for the nodes
        nodeEnter.append('text')
            .attr("dy", ".35em")
            .attr("x", (d) => {
                return d == this.root ? -13 : 13;
            })
            .attr("text-anchor", (d) => {
                return d == this.root ? "end" : "start";
            })
            .text(function(d) {
                return d.data.name;
            }).style("font-size", "14px")
            .call(nodeHelperFunctions.wrap, this.node.current, this.props.fillColor,
            this.props.link_width, this.props.margin, this.props.offsetHeight);


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
            .style("fill", (d) => {
                return d._children ? this.props.fillColor : "#fff";
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
        var link = this.svg.selectAll('path.link')
            .data(links, function(d) { return d.id; });

        // Enter any new links at the parent's previous position.
        var linkEnter = link.enter().insert('path', "g")
            .attr("class", "link")
            .attr('d',  (d) => {
                var o = {x: source.x0, y: source.y0}
                return this.diagonal(o, o)
            }).style("stroke-width", function(d){
                return 0.2
            }).style("stroke", function(d){
                return 'black'
            });

        // UPDATE
        var linkUpdate = linkEnter.merge(link);

        // Transition back to the parent element position
        linkUpdate.transition()
            .duration(0)
            .attr('d', (d) => { return this.diagonal(d, d.parent) });

        // Remove any exiting links
        var linkExit = link.exit().transition()
            .duration(0)
            .attr('d',  (d) => {
                var o = {x: source.x, y: source.y}
                return this.diagonal(o, o)
            })
            .remove();

        // Store the old positions for transition.
        nodes.forEach(function(d){
            d.x0 = d.x;
            d.y0 = d.y;
        });

    }


    renderThisComponent() {
        let  root = this.createTree();
        this.update(root);
        this.addMouseHoverListenerToNodes(this.props.contextMenuDiv);
    }


    render() {
        console.log("About to render svg: " + this.props.id );

        //render a text for every node and it's corresponding child

        return (
            <div>
                <div id={this.props.id}  ref={this.node}></div>

            </div>
        )

    }
}


export default ES6D3Tree;
