function drawLegend(id, cat) {

 d3.select(id).selectAll("*").remove();

  // var width = window.innerWidth * 0.12,
  //     height = window.innerHeight * 0.10;
  var width = d3.select(id).node().clientWidth,
      height = d3.select(id).node().clientHeight;

  var svg = d3.select(id).append("svg")
      .attr("width", width)
      .attr("height", height)
      // .attr("preserveAspectRatio", "none")
      .attr("viewBox", "0 0 " + width + " " + height);

  for (var i=0; i<dataDomain[cat].length; i++) {
    // console.log(dataDomain[cat][i]);
    // console.log(colors(dataDomain[cat][i]));
    var legendLine = svg.append("line")
                        .attr("x1", width/20)
                        .attr("y1", height/12 + i*height/6)
                        .attr("x2", width/6)
                        .attr("y2", height/12 + i*height/6)
                        .attr("stroke-width", Math.min(width, height) * 0.025)
                        .attr("stroke", colors(dataDomain[cat][i]));

    var legendText = svg.append("text")
                        .attr("x", width/4)
                        .attr("y", height/8 + i*height/6)
                        .style("font-size", Math.min(width, height) * 0.15)
                        .style("vertical-align", "top")
                        .text(dataDomain[cat][i]);
  }

}
