
// Creates a single star plot in the d3 object where
function starPlot(where,data, number){

	var container = where;
	var that=this;

	var w = 200;
	var h = 200;
	this.svgW = w;
	this.svgH = h;

	container.selectAll("*").remove();

	var svg = container.append("svg")
	  .attr("class","fullDiv")
		.attr("preserveAspectRatio","xMinYMin")
		.attr("viewBox",(-w/2)+" "+ (-h/2) +" " + (w)+ " " + (h));

	var key0 = Object.keys(data)[0];


	this.allCategories = ["Ethnicity","Site","Tcategory","Gender","Nodal_Disease","ecog","Chemotherapy","Local_Therapy"];
	// var surviveScale = d3.scale.linear().domain([0,1]).range(["#d18161","#70a4c2"]);
	var surviveScale = d3.scaleLinear().domain([0,1]).range(["#d18161","#70a4c2"]);

	this.categories = ["Ethnicity", "Site", "Tcategory", "Gender", "Nodal_Disease", "ecog", "Chemotherapy", "Local_Therapy"];
	abbreviations = ["Eth","Site","Tcat","Gend","Nod","ecog","Chem","L_Ther"];
	var categories = this.categories;

	this.tip = d3.tip()
		.attr('class', 'd3-tip')
    .attr('id', 'mosaicPlotTip' + number)
    .html(function(d) { return d.cat + ": "+d.val ;});

	/* Invoke the tip in the context of your visualization */
	svg.call(this.tip)

	var nCat = this.categories.length;

	var angleStep = 2 * Math.PI / nCat;

	// simply creates an axis for each category, then creates a path with a vertex on every axis in the right position

	if (number in data){
		var d="";
		for (var i=0; i< nCat;i++){
			var key = this.categories[i];
			var val = scaleXCat[i](data[number][key]);

			d += (i==0? "M":"L") +  (Math.cos( i * angleStep) * w/2 * (val/maxXCat[i])) + " " + (Math.sin( i * angleStep) * h/2 * (val/maxXCat[i])) + " ";
		}

		d+= "Z";

		var line = svg.append("path")
		  .attr("d",d)
			.attr("class","starPlotPath")
			.style("fill",surviveScale(parseFloat(data[number]["Probability of Survival"])));
			// .on("mouseover",this.tip.hide);

		for (var i=0; i< nCat;i++){

			svg.append("line")
			  .attr("x1",0)
				.attr("y1",0)
				.attr("stroke-dasharray", 1 +","+ 1)
				// .style("stroke-opacity", 0.5)
				// .attr("stroke-linecap", "round")
				.attr("x2",Math.cos( i * angleStep) * w/2)
				.attr("y2",Math.sin( i * angleStep) * h/2)
				.attr("class","starPlotAxis")
				.datum({"cat": this.categories[i] , "val": data[number][this.categories[i]]})
				.style("pointer-events", "none");
				// .on("mouseover",this.tip.hide);
				// .on("mouseover",this.tip.show);
				// .on("mouseout",this.tip.hide);

			let labelDistanceFactor = 1.2/3;

			svg.append("text")
				.attr("class", "kiviatLabel")
			  .attr("x",Math.cos( i * angleStep) * labelDistanceFactor * w)
			  .attr("y",Math.sin( i * angleStep) * labelDistanceFactor * h)
			  .datum({"cat": this.categories[i] , "val": data[number][this.categories[i]]})
			  // .style("font-size","110%")
			  .text(abbreviations[i]);
			  // .on("mouseover",this.tip.show)
			  // .on("mouseout",this.tip.hide);

			svg.append("circle")
				.attr("cx",Math.cos( i * angleStep) * labelDistanceFactor * w + 8)
				.attr("cy",Math.sin( i * angleStep) * labelDistanceFactor * h - 8)
				.attr("r", 20)
				.style("fill-opacity", 0)
				.datum({"cat": this.categories[i] , "val": data[number][this.categories[i]]})
				.on("mouseover",this.tip.show)
				.on("mouseout",this.tip.hide);
		}
	}

}
