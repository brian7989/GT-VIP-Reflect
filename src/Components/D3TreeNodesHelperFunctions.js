
import React, {Component} from 'react';
import * as d3 from "d3";
import $ from "jquery";


// pass a  new instance of this object around to ensure i is unique for each node rendered.
const d3TreeNodesHelperFunctions  = {};

//use a simple heuristic to figure out how much height should exist between nodes of the same tree
//height = [60, 120, 180, 240, 300]
const countNumberOfLinesAndGetHeightForNodes = (text, heightsList) => {
    let text_array = text.split(" ");
    let length = text_array.length;
    // console.log(text);
    // console.log(length);
    if (length < 15) {
        return heightsList[0]
    } else if(length > 15 && length <= 30) {
        return heightsList[1];

    } else if ( length < 45) {
        return heightsList[2];
    } else if (length > 45 && length <= 60) {
        return heightsList[3];
    } else {
        return heightsList[4];
    }

}




// Get stakeholder data
d3TreeNodesHelperFunctions.getDataAndNodeHeights = (props) => {
    let data = [];
    let offsetHeight = 0;
    for (let x in props.stakeholders) {
        let height = 0;
        let stakeholder = props.stakeholders[x];
        let stakeholderObj = {};
        stakeholderObj.id = stakeholder.id;
        stakeholderObj.name = stakeholder.name;
        stakeholderObj.isActive = stakeholder.isActive;
        stakeholderObj.children = [];
        for (let y in stakeholder.stakeholderProposals.nodes) {
            let proposal = stakeholder.stakeholderProposals.nodes[y];
            let proposalObj = {};
            proposalObj.id = proposal.proposal.id;
            proposalObj.name = proposal.proposal.proposalText;
            proposalObj.isActive = proposal.proposal.isActive;
            proposalObj.children = [];
            for (let z in proposal.proposal.reasons.nodes) {
                let reason = proposal.proposal.reasons.nodes[z];
                let reasonObj = {};
                reasonObj.id = reason.id;
                reasonObj.name = reason.reasonText;
                reasonObj.isActive = reason.isActive;
                reasonObj.children = [];
                for (let h in reason.interests.nodes) {
                    let interest = reason.interests.nodes[h];
                    let interestObj = {};
                    interestObj.id = interest.id;
                    interestObj.name = interest.interestText;
                    interestObj.isActive = interest.isActive;

                    if(interestObj.isActive)
                        reasonObj.children.push(interestObj);
                    height += 25;
                }
                if(reasonObj.isActive)
                    proposalObj.children.push(reasonObj);
                height += 60;// countNumberOfLinesAndGetHeightForNodes(reasonObj.name, [60, 120, 180, 240, 300]);
            }
            if(proposalObj.isActive)
                stakeholderObj.children.push(proposalObj);
            height +=  200;//countNumberOfLinesAndGetHeightForNodes(proposalObj.name, [100, 200, 250, 330, 400]);;
        }
        if(stakeholderObj.isActive)
        //set a default height for stakeholders that have no children nodes
            var data_object = {stakeholderObj:stakeholderObj, height:height, offsetHeight:offsetHeight}
        if (stakeholderObj.children.length == 0)
            data_object.height = 50;
        data.push(data_object);
        offsetHeight += (height + 3);
    }
    return data;
}

d3TreeNodesHelperFunctions.wrap = (text, id, fillColor, link_width, margin, offsetHeight) =>  {
    var wrap_text = link_width - 30;
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
            if (tspan.node().getComputedTextLength() > wrap_text) {
                line.pop();
                tspan.text(line.join(" "));
                if (lineNumber > 8) {
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


//ensure only a deep clone is exported from here to avoid sharing references with other instances.
let nodeHelperFunctions = {};
$.extend(true, nodeHelperFunctions, d3TreeNodesHelperFunctions)

export default nodeHelperFunctions;
