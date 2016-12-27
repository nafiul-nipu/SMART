function drawLegend(id, cat) {

 d3.select(id).selectAll("*").remove();

  var width = window.innerWidth * 0.12,
      height = window.innerHeight * 0.10;

  var svg = d3.select(id).append("svg")
      .attr("width", width)
      .attr("height", height);

  for (var i=0; i<dataDomain[cat].length; i++) {
    // console.log(dataDomain[cat][i]);
    // console.log(colors(dataDomain[cat][i]));
    var legendLine = svg.append("line")
                        .attr("x1", 5)
                        .attr("y1", 6 + i*15)
                        .attr("x2", 25)
                        .attr("y2", 6 + i*15)
                        .attr("stroke-width", 4)
                        .attr("stroke", colors(dataDomain[cat][i]));

    var legendText = svg.append("text")
                        .attr("x", 30)
                        .attr("y", 10 + i*15)
                        .style("font-size", "14")
                        .text(dataDomain[cat][i]);
  }

}
