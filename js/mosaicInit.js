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

	// hard coded
	// axes["AgeAtTx"] = true;
	// axes["Gender"] = true;
	// axes["Ethnicity"] = true;
	// axes["Tcategory"] = true;
	// axes["Site"] = true;
	// axes["Nodal_Disease"] = true;
  // axes["ecog"] = true;
	// axes["Chemotherapy"] = true;
	// axes["Local_Therapy"] = true;
	// axes["Probability of Survival"] = true;

  // Load data from the files
	d3.csv("data/correctKaplanMeier.csv",function(error,csv){

		// Create the kaplan meier graph from kaplan meier data
		var kaplan = new kaplanMeierPlot(".centerDiv",csv);

		d3.csv("SurvivalProbability.csv",function(error,csv){

			/******************** initialization ********************/
			// console.log(d3.schemeCategory10);
			csv.forEach(function(d){
				d['AgeAtTx'] = +d['AgeAtTx'];
				d['Probability of Survival'] = +d['Probability of Survival'];
			});

			// console.log(csv);

			Object.keys(csv[0]).forEach((el) => {
				axes[el] = true;
				axesMosaic[el] = true;
	      // axesRange[el] = [0, 1];
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

			// console.log(axesDomain);
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
						// console.log(catSel);
						// parallel = new parallelChart(".bottomDiv",data,catSel);
						d3.select("#domainSlider").selectAll("*").remove();
						d3.select("#rangeSlider").selectAll("*").remove();
						d3.select("#linkSlider").selectAll("*").remove();
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
					console.log(knnFilters);

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

	/*if (knn) {

		// d3.select("#chart4").selectAll("*").style("visibility", "hidden");
		// d3.select("#chart4").style("visibility", "hidden");
		// var nomogram = new knnNomogramPlots(".bottomDiv","#parallelChartForKNN",knnData,knnCat);

		Object.keys(axes).forEach((el) => {
			d3.select("#" + el).property("checked", true);
			d3.select("#" + el).property("disabled", true);
			d3.select("#Probability of Survival").property("disabled", true);

			if (el === "Probability of Survival") {
					radioID = "#radio-Survival";
			} else {
					radioID = "#radio-" + el;
			}
			d3.select(radioID).property("disabled", true);
		});

	} else {

    // d3.select("#parallelChartForKNN").selectAll("*").remove();
		// d3.select("#chart4").style("visibility", "visible");
		// d3.select("#chart4").selectAll("*").style("visibility", "visible");

		Object.keys(axes).forEach((el) => {
			if(!axes[el]){
				d3.select("#" + el).property("checked", false);
			}

			if (el === "Probability of Survival") {
					radioID = "#radio-Survival";
			} else {
					radioID = "#radio-" + el;
			}

			if(axesMosaic[el]){
				d3.select("#" + el).property("disabled", false);
			} else{
				d3.select(radioID).property("disabled", true);
			}
		});

	}*/
}


function applyKnnFilters(removeKnnFilter) {
	Object.keys(axes).forEach((el) => {
		// if(axes[el] && axesMosaic[el]){
		// 	axesFiltered.push(el);
		// } else
		if(!axes[el]) {
			// console.log(data);
			// console.log(allData[selectedID]);
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
