
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
    // console.log(colors(d[cat]));
    if(+d.id === selectedID) {
      return "black";
    } else {
      return colors(d[cat]);
    }
	};


  /******************** only draw axes with multiple values ********************/
  // var ageMin = d3.min(data, function(d) { return d.AgeAtTx; });
  // var ageMax = d3.max(data, function(d) { return d.AgeAtTx; });
  // axesKnnDomain["AgeAtTx"] = [Math.floor(ageMin), Math.ceil(ageMax)];
  //
  // var survivalMin = d3.min(data, function(d) { return d["Probability of Survival"]; });
  // var survivalMax = d3.max(data, function(d) { return d["Probability of Survival"]; });
  // axesKnnDomain["Probability of Survival"] = [survivalMin, survivalMax];

  // console.log(ageMin);
  // console.log(ageMax);
  // console.log(survivalMin);
  // console.log(survivalMax);

  // Object.keys(axes).forEach((el) => {
  //   axesKnnCount[el] = 0;
  // });
  //
  // for(var i=1; i<data.length; i++) {
  //   for(var j=0; j<i; j++) {
  //     Object.keys(axes).forEach((el) => {
  //       if (data[i][el] != data[j][el]) {
  //         axesKnnCount[el]++;
  //       }
  //     });
  //   }
  // }
  // console.log(axesKnnCount);

  // Object.keys(axes).forEach((el) => {
  //   if(axesKnnCount[el]){
  //     axesKnnFiltered.push(el);
  //   }
  // });
 /************************************************************/
  Object.keys(axes).forEach((el) => {
    if(axes[el]) {
      axesKnnFiltered.push(el);
    }
  });

  // let axisLabels = {};

	Object.keys(axes).forEach(el => {
		axisLabels[el] = null;
	})

	// axisLabels["Probability of Survival"] = "5 Year Probability of Survival";
  axisLabels["Probability of Survival"] = "5-year Survival Pbty";


  this.nomogram = knnNomogram = new Nomogram()
    .data(data)
    .target(id)
    .setAxes(axesKnnFiltered.map(el => {
	      return { name: el,
                 label: axisLabels[el],
	              //  domain: axesKnnDomain[el],
                 domain: axesDomain[el],
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
    .strokeWidth((d) => {
      return +d.id === selectedID ? 5:3;
    })
    .brushable(true)
    .onMouseOver("hide-other")
		.onMouseOut("reset-paths")
    .draw();

  axesKnnFiltered = [];

}


// func
function updateKnnNomogram() {

  Object.keys(axes).forEach((el) => {
    if(axes[el]){
      axesKnnFiltered.push(el);
    }
  });

  knnNomogram.setAxes(axesKnnFiltered.map(el => {
      return { name: el,
               label: axisLabels[el],
               domain: axesDomain[el],
               rangeShrink: axesRange[el] };
    }),"reduce")
    .draw();

  axesKnnFiltered = [];
}
