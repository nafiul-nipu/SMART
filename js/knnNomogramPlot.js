
var axesKnnDomain;
var axesKnnCount = {};
var axesKnnFiltered = [];
var selectedID = 0;
var knnFilters = [];

var knnNomogram;

// Create the KNN interactive nomograms
function knnNomogramPlots(where,id,data,categ){

  d3.select(id).selectAll("*").remove();

  var cat = categ;

	var colorFun = function(d) {
    if(+d.id === selectedID) {
      return "black";
    } else {
      return colors(d[cat]);
    }
	};


  Object.keys(axes).forEach((el) => {
    if(axes[el]) {
      axesKnnFiltered.push(el);
    }
  });


	Object.keys(axes).forEach(el => {
		axisLabels[el] = null;
	})
  axisLabels["Probability of Survival"] = "5-year Survival Pbty";


  var titlefontSize = 0.045 * Math.min(d3.select(id).node().clientWidth, d3.select(id).node().clientHeight);
  var tickfontSize = titlefontSize * 0.9;
  var strokewidth = 0.01 * Math.min(d3.select(id).node().clientWidth, d3.select(id).node().clientHeight);


  this.nomogram = knnNomogram = new Nomogram()
    .data(data)
    .target(id)
    .setAxes(axesKnnFiltered.map(el => {
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
    .titleFontSize(titlefontSize)
		.tickFontSize(tickfontSize)
    .color(colorFun)
    .opacity(0.7)
    .filteredOpacity(0)
    .strokeWidth((d) => {
      return +d.id === selectedID ? strokewidth*5/3:strokewidth;
    })
    .brushable(true)
    .onMouseOver("hide-other")
		.onMouseOut("reset-paths")
    .draw();

  d3.select(id).on("resize", function() {
		console.log("Parent Resized");
		knnNomogram.draw();
	});

  axesKnnFiltered = [];
}


// func
function updateKnnNomogram() {

  axesKnnFiltered = [];
  Object.keys(axes).forEach((el) => {
    if(axes[el]){
      axesKnnFiltered.push(el);
    }
  });

  knnNomogram.setAxes(axesKnnFiltered.map(el => {
			return { name: el,
							 label: axisLabels[el],
							 domain: axesDomain[el].map(d => d),
							 rangeShrink: axesRange[el] };
		}),"reduce")
    .draw();

  axesKnnFiltered = [];
}
