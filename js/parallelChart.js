
// Global colors for the categories, they will be shared by all the visualizations
// var colors = d3.scale.category10()
var colors = d3.scaleOrdinal(d3.schemeCategory10); // version 4

// Creates a parallel chart using
function parallelChart(where,data,categ,toHigh) {
	this.container = d3.select(where);
	this.container.selectAll("*").remove();
	var cat = categ;

	var colorFun = function(d) {
		 return colors(d[cat]);
	 };

	var graph = d3.parcoords()(where)
	  .data(data)
    .margin({top: 30, left: 30, bottom: 40, right: 0})
    .alpha(0.6)
    .mode("queue")
    //.rate(5)
    .color(colorFun)
    .render()
    .brushMode("1D-axes")  // enable brushing
    //.reorderable() // I removed this for now as it can mess up with tooltips
    .interactive();

  var filter = this.container.selectAll("svg").append("defs").append("filter").attr("x",0).attr("y",0).attr("width",1).attr("height",1).attr("id","backFill")
  var flood = filter.append("feFlood").attr("flood-color","rgba(255,255,255,0.2)");
  filter.append("feComposite").attr("in","SourceGraphic");

  // Hardcoded way to hide the labels in ecog, sadly there's no easy way to control the axis using this library :(
  var ticks = this.container.selectAll(".tick").selectAll("text")
	  .style("visibility",function(){
      var txt = d3.select(this).text();

      if ( txt == "1.5" || txt == "0.5" || txt =="2.5"){
        return "hidden";
	  	}else{
        return "visible"
      }
    })
		.attr("filter","url(#backFill)");

  ticks.on("mouseover",function(){
		flood.attr("flood-color","rgba(255,255,255,1)")
    ticks.style("font-size","130%")
  })
    .on("mouseout",function(){
			flood.attr("flood-color","rgba(255,255,255,0.2)")
      ticks.style("font-size","100%")
    });

  this.container.selectAll(".label")
	  .text(function(){
     var txt = d3.select(this).text();
      if (txt == "Probability of Survival"){
        return "Survival Rate"
      }
      return txt;
    });

  if (toHigh){
    graph.highlight(toHigh);
    this.container.selectAll(".foreground").attr("class","foreground")
  }

}
