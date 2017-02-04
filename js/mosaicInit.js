var App = App || {};

(function() {
	// create placeholders for when I attach window event listener
	App.nomogram = new Nomogram();
	App.nomogramKnn = new Nomogram();

	window.addEventListener("resize", function() {
		if (myNomogram.svg) {
			myNomogram.resize();
		}

		if (knnNomogram.svg) {
			knnNomogram.resize();
		}

		// if (d3.select("#domainSlider").select("svg")) {
		// 	d3.select("#domainSlider").select("svg")
		// 	  .attr("width", Math.floor(d3.select("#domainSlider").node().parentNode.clientWidth / 3))
		// 		.attr("height", d3.select("#domainSlider").node().parentNode.clientHeight);
		// }
		//
		// if (d3.select("#linkSlider").select("svg")) {
		// 	d3.select("#linkSlider").select("svg")
		// 	  .attr("width", Math.floor(d3.select("#linkSlider").node().parentNode.clientWidth / 3))
		// 		.attr("height", d3.select("#linkSlider").node().parentNode.clientHeight);
		// }

		if (d3.select("#rangeSlider").select("svg")) {
			d3.select("#rangeSlider").select("svg")
			  .attr("width", Math.floor(d3.select("#rangeSlider").node().parentNode.clientWidth / 3))
				.attr("height", d3.select("#rangeSlider").node().parentNode.clientHeight);
		}

		if (d3.select("#nomogramLegend").select("svg")) {
			d3.select("#nomogramLegend").select("svg")
			  .attr("width", d3.select("#nomogramLegend").node().clientWidth)
				.attr("height", d3.select("#nomogramLegend").node().clientHeight);
		}

	});

})();

// Visualization entry point

var copyAllData;  // 12.9.16 pass csv to it for func applyKnnFilters

//Called onload
function init(){

	d3.select(".mosaicBackButtonDiv")
		.on("mouseover", function(d) {
			var evt = d3.event;

			console.log(evt.screenX, evt.screenY);
		});

	// GET parameters
	var queryString = window.location.search.substring(1);
  var params = queryString.split('&');
  var id = params[0];
  var gender = params[1].replace("%20", " ");
  var age = params[2];
  var ethnicity = params[3].toLowerCase();
  var site = params[4].toLowerCase();
  var tstage = params[5];
  var action = params[6];

	// Create the proper filters to start with
  if (action == "explore"){
		var startFilters = [{"cat":"Ethnicity", "val": ethnicity},{"cat": "Site","val" : site}];
  } else{
    var startFilters = [{"cat":"Ethnicity", "val": ethnicity},{"cat": "Site","val" : site},
    						        {"cat": "Tcategory","val" : tstage},{"cat": "Gender","val" : gender}];
  }


  // Load data from the files
	d3.csv("data/correctKaplanMeier.csv",function(error,csv){

		// Create the kaplan meier graph from kaplan meier data
		var kaplan = new kaplanMeierPlot(".centerDiv",csv);

		d3.csv("SurvivalProbability.csv",function(error,csv){

			/******************** initialization ********************/
			csv.forEach(function(d){
				d['AgeAtTx'] = +d['AgeAtTx'];
				d['Probability of Survival'] = +d['Probability of Survival'];
			});

			Object.keys(csv[0]).forEach((el) => {
				axes[el] = true;
				axesMosaic[el] = true;
				// hard coded
				if (el === "AgeAtTx") {
					dataDomain[el] = [90, 25];
					dataRange[el] = [0, 1];
				} else if (el === "Gender") {
					dataDomain[el] = ["male", "female"];
					dataRange[el] = [0, 0.1];
				} else if (el === "Ethnicity") {
					dataDomain[el] = ["white", "other", "hispanic", "asian", "african-american"];
					dataRange[el] = [0, 0.4];
				} else if (el === "Tcategory") {
					dataDomain[el] = ["T4", "T3"];
					dataRange[el] = [0, 0.077];
				} else if (el === "Site") {
					dataDomain[el] = ["transglottic", "supraglottic", "subglottic", "glottic"];
					dataRange[el] = [0, 0.4];
				} else if (el === "Nodal_Disease") {
					dataDomain[el] = ["N+", "N0"];
					dataRange[el] = [0, 0.15];
				} else if (el === "ecog") {
					dataDomain[el] = ["0","1", "2", "3"];
					dataRange[el] = [0, 0.2];
				} else if (el === "Chemotherapy") {
					dataDomain[el] = ["no chemo", "induction", "concurrent", "induction+chemoRT"];
					dataRange[el] = [0, 0.3];
				} else if (el === "Local_Therapy") {
					dataDomain[el] = ["PLRT", "LP/RT alone", "LP/chemoRT"];
					dataRange[el] = [0, 0.15];
				} else if (el === "Probability of Survival") {
					dataDomain[el] = [0, 1];
					dataRange[el] = [0, 1];
				}
			});

			axesDomain = JSON.parse(JSON.stringify(dataDomain));
			axesKnnDomain = JSON.parse(JSON.stringify(dataDomain));
			axesRange = JSON.parse(JSON.stringify(dataRange));

			copyAllData = csv;

			/************************************************************/

			// Create the visualizations from the loaded data.
			// And connect them with each other

			var mosaic = new mosaicPlot(".leftDiv",csv,
				function(filters,cat,data){

					kaplan.filter(filters,cat);
          // console.log(cat[0]);
					// var parallel = new parallelChart(".bottomDiv",data,cat[0])
					var nomogram = new nomogramPlots(".bottomDiv","#chart4",data,csv,cat[0]);
					App.nomogram = nomogram.nomogram;

					kaplan.catChanged(function(catSel){

						nomogram = new nomogramPlots(".bottomDiv","#chart4",data,csv,catSel);
						App.nomogram = nomogram.nomogram;

						var nomogramKnn = new knnNomogramPlots(".bottomDiv","#parallelChartForKNN",knnData,catSel);
						App.nomogramKnn = nomogramKnn.nomogram;
						changeParallelDisplayed(d3.select("#title4").selectAll('input').property('checked'));
					});

					var title = new titleView(".titleView",filters);

					title.onFilterSelected(function(d){
						mosaic.filter(d);
					})

					// console.log(filters);
					// var star = new knnPlot(".rightDiv",csv,filters);  // shouldn't apply the filters to knnPlot
					// var star = new knnPlot(".rightDiv",csv,[]);

					if (d3.select("#knnFilters").property('checked')) {
						var star = new knnPlot(".rightDiv",csv,knnFilters);
					} else {
						var star = new knnPlot(".rightDiv",csv,[]);
					}

					changeParallelDisplayed(d3.select("#title4").selectAll('input').property('checked'));
				}
				,startFilters); // mosaicPlot() end

				// for changing domain
				// drawSlider("#domainSlider", dataDomain["AgeAtTx"], "linear");
				// for changing rangeShrink
				drawSlider("#rangeSlider", [0, 1], "linear", [0, 1]);
				// sliderLinking();

		});
	}); // Load data done

}


var knnData;
var knnCat;


function changeParallelDisplayed(knn){
	// toggle between the overall parallel chart and the only knn parallel chart
	d3.select("#chart4").style("visibility",!knn?"visible":"hidden")
	.style("pointer-events", !knn?"all":"none")
	.selectAll("*").style("pointer-events", "inherit");

	d3.select("#parallelChartForKNN").style("visibility",knn?"visible":"hidden")
	.style("pointer-events", knn?"all":"none")
	.selectAll("*").style("pointer-events", "inherit");
}


function applyKnnFilters(removeKnnFilter) {
	Object.keys(axes).forEach((el) => {
		if(!axes[el]) {
			knnFilters.push({"cat": el, "val":copyAllData[selectedID][el]});
		}
	});

	if (removeKnnFilter) {
		var star = new knnPlot(".rightDiv",copyAllData,knnFilters);
	} else {
		var star = new knnPlot(".rightDiv",copyAllData,[]);
	}
	knnFilters = [];
	console.log(removeKnnFilter);
}
