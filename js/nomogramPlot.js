// Global colors for the categories, they will be shared by all the visualizations
// var colors = d3.scaleOrdinal(d3.schemeCategory10);

var category10colors = ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#393b79", "#637939", "#7f7f7f", "#bcbd22", "#843c39"];
// ["#843c39", "#637939", "#393b79", "#7b4173", "#8c6d31", "#d6616b", "#b5cf6b", "#6b6ecf", "#ce6dbd", "#e7ba52"];
var colors = d3.scaleOrdinal(category10colors);

var axes = {};
var axesMosaic = {};
var axesFiltered = [];
var axesRange;
var dataRange = {};
var axesDomain;
var dataDomain = {};
var axisLabels = {};

var myNomogram;


// Create the interactive nomograms that have the flexibity for the translations,scaling and removing axes
function nomogramPlots(where,id,data,allData,categ){

	// this.container = d3.select(where);
	// this.container.selectAll("*").remove();
	d3.select(id).selectAll("*").remove();

	// console.log(d3.schemeCategory10);
	// var colors = d3.scaleOrdinal(category10colors);
	var cat = categ;

	var colorFun = function(d) {
	  // console.log(colors(d[cat]));
		return colors(d[cat]);
	};

	drawLegend(nomogramLegend, cat);


	Object.keys(axes).forEach((el) => {
		if(axes[el]){
			axesFiltered.push(el);
		}

		var radioID;
		// console.log(el);
		if (el === "Probability of Survival") {
			radioID = "#radio-Survival";
		} else {
			radioID = "#radio-" + el;
		}

		// if(axesMosaic[el]){
		if(axes[el]){  // show knn always
			d3.select("#" + el).property("checked", true);
			// d3.select("#" + el).property("disabled", false);
			// d3.select(radioID).property("disabled", false);
		} else{
			d3.select("#" + el).property("checked", false);
			// d3.select("#" + el).property("disabled", true);
			// d3.select(radioID).property("disabled", true);
		}

		if(!axes[el]) {
			d3.select("#" + el).property("checked", false);
		}

		if (d3.select(radioID).property("checked")) {
			// for changing domain
			if (el === "AgeAtTx") {
				drawSlider("#domainSlider", dataDomain[el], "linear");
			} else if (el === "Probability of Survival") {
				drawSlider("#domainSlider", dataDomain[el], "linear");
			} else {
				drawSlider("#domainSlider", dataDomain[el], "ordinal");
			}
			// for changing rangeShrink
			drawSlider("#rangeSlider", [0, 1], "linear");
		}

	});
	// console.log(axesFiltered);
  // console.log(axesMosaic);

	// drawSlider("#domainSlider", [30, 90], "linear");  // for changing domain --- default: AgeAtTx[30, 90]
	// drawSlider("#rangeSlider", [0, 1], "linear");  // for changing rangeShrink
	// let axisLabels = {};

	Object.keys(axes).forEach(el => {
		axisLabels[el] = null;
	})

	// axisLabels["Probability of Survival"] = "5 Year Probability of Survival";
  axisLabels["Probability of Survival"] = "5-year Survival Pbty";


	this.nomogram = myNomogram = new Nomogram()
    .data(data)
    .target(id)
    // .size({
    //   width: window.innerWidth * 0.88,
    //   height: window.innerHeight * 0.25
    // })
    .setAxes(axesFiltered.map(el => {
	      return { name: el,
								 label: axisLabels[el],
	               domain: axesDomain[el].map(d => d),
	               rangeShrink: axesRange[el] };
	    }),"reduce")
		.margins({
			top: 20,
			left: 40,
			bottom: 50,
			right: 80
		})
		.titlePosition("bottom")
		.titleRotation(-10)
		.titleFontSize(14)
		.tickFontSize(12)
    .color(colorFun)
    .opacity(0.7)
    .filteredOpacity(0)
    .strokeWidth(3)
    .brushable(true)
		.onMouseOver("hide-other")
		.onMouseOut("reset-paths")
    .draw();

	d3.select(id).on("resize", function() {
		console.log("Parent Resized");
		myNomogram.draw();
	});

	axesFiltered = [];


	// update button
	d3.select("#updateAxes").on("click", function() {

		// console.log(allData);
		Object.keys(axes).forEach((el) => {
			if(axes[el] && axesMosaic[el]){
				axesFiltered.push(el);
			} else if(!axes[el]) {
				// console.log(data);
				// console.log(allData[selectedID]);
				knnFilters.push({"cat": el, "val":allData[selectedID][el]});
			}
		});
		// console.log(knnFilters);
		// console.log(axes);
		// console.log(axesFiltered);
		updatePCP();
		updateKnnNomogram();
		changeParallelDisplayed(d3.select("#title4").selectAll('input').property('checked'));

		// var star = new knnPlot(".rightDiv",allData,knnFilters);
		if (d3.select("#knnFilters").property('checked')) {
			var star = new knnPlot(".rightDiv",allData,knnFilters);
		} else {
			var star = new knnPlot(".rightDiv",allData,[]);
		}
		knnFilters = [];
	});


	// reset button
	d3.select("#resetAxes").on("click", function() {

		d3.select("#domainSlider").selectAll("*").remove();
		d3.select("#rangeSlider").selectAll("*").remove();

		d3.select("#knnFilters").property("checked", false);

		Object.keys(axes).forEach((el) => {
			axes[el] = true;
			// axesRange[el] = [0, 1];

			var radioID;
      if (el === "Probability of Survival") {
        radioID = "#radio-Survival";
      } else {
        radioID = "#radio-" + el;
      }

			// if(axesMosaic[el]){
			if(axes[el]){  // show knn always
				axesFiltered.push(el);
				d3.select("#" + el).property("checked", true);
				d3.select("#" + el).property("disabled", false);
				d3.select(radioID).property("disabled", false);
			} else{
				d3.select("#" + el).property("checked", false);
				d3.select("#" + el).property("disabled", true);
				d3.select(radioID).property("disabled", true);
			}

			if(!axes[el]) {
				d3.select("#" + el).property("checked", false);
			}

			if (d3.select(radioID).property("checked")) {
				// for changing domain
				if (el === "AgeAtTx" || el === "Probability of Survival") {
					drawSlider("#domainSlider", dataDomain[el], "linear");
				} else {
					drawSlider("#domainSlider", dataDomain[el], "ordinal");
				}
				// for changing rangeShrink
				drawSlider("#rangeSlider", [0, 1], "linear");
			}
		});

		axesDomain = JSON.parse(JSON.stringify(dataDomain));
		axesRange = JSON.parse(JSON.stringify(dataRange));

		updatePCP();
		updateKnnNomogram();
		changeParallelDisplayed(d3.select("#title4").selectAll('input').property('checked'));

		if (d3.select("#knnFilters").property('checked')) {
			var star = new knnPlot(".rightDiv",allData,knnFilters);
		} else {
			var star = new knnPlot(".rightDiv",allData,[]);
		}
		knnFilters = [];

		// d3.select("#title4").selectAll('input').property('checked', false);
		// changeParallelDisplayed(d3.select("#title4").selectAll('input').property('checked'));
    d3.select("#linkSlider").selectAll("*").remove();
		sliderLeft = [0, 1];
		sliderRight = [0, 1];
	});

}


// func
function updatePCP() {
	// console.log(axesFiltered);
	// sliderLinking();

  myNomogram.setAxes(axesFiltered.map(el => {
      return { name: el,
				       label: axisLabels[el],
               domain: axesDomain[el].map(d => d),
               rangeShrink: axesRange[el] };
    }),"reduce")
    .draw();

  slider = axesFiltered;
  axesFiltered = [];
}


// func
function checkbox(id, val) {
	axes[id] = val;
	// console.log(axes);
}


// func
function radiobutton(id, val, check) {

	Object.keys(axes).forEach((el) => {
		if (el != val) {
			var radioID;
			if (el === "Probability of Survival") {
				radioID = "#radio-Survival";
			} else {
				radioID = "#radio-" + el;
			}
			d3.select(radioID).property("checked", false);
		}
		// console.log(d3.select("#radio-" + el).property("checked"));
	});

	d3.select("#domainSlider").selectAll("*").remove();
	d3.select("#rangeSlider").selectAll("*").remove();

	if (val === "AgeAtTx" || val === "Probability of Survival") {
		drawSlider("#domainSlider", dataDomain[val], "linear");
	} else {
		drawSlider("#domainSlider", dataDomain[val], "ordinal");
		// console.log(dataDomain[val].length);
	}
	drawSlider("#rangeSlider", [0, 1], "linear");  // for changing rangeShrink

	d3.select("#linkSlider").selectAll("*").remove();
	sliderLeft = [0, 1];
	sliderRight = [0, 1];
}


// func
var sliderLeft = [0, 1];
var sliderRight = [0, 1];

function sliderLinking() {

	d3.select("#linkSlider").selectAll("*").remove();

	// console.log(sliderLeft);
	// console.log(sliderRight);

	var width = window.innerWidth * 0.01,
      height = window.innerHeight * 0.27;

	var linkData = [{"x": 0, "y": height * (1 - sliderLeft[1])},
	                {"x": width, "y": height * (1 - sliderRight[1])},
									{"x": width, "y": height * (1 - sliderRight[0])},
									{"x": 0, "y": height * (1 - sliderLeft[0])},
								  {"x": 0, "y": height * (1 - sliderLeft[1])}];

	var linkFunc = d3.line()
	    .x(function(d) { return d.x; })
			.y(function(d) { return d.y; });
			// .interpolate("linear");

	// console.log(linkData);

	var svg = d3.select("#linkSlider").append("svg")
      .attr("width", width)
      .attr("height", height);

  if (sliderLeft[0] != 0 || sliderLeft[1] != 1) {
	  var links = svg.append("path")
	      .attr("d", linkFunc(linkData))
			  // .attr("stroke", "black")
			  // .attr("stroke-width", "1")
			  .attr("stroke", "none")
			  .attr("fill", "#dddddd")
			  .attr("opacity", "0.75");
	}

}
