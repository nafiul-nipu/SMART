var scaleXCat;
var maxXCat;

// Calculates the nearest neighbors to the patient with id number
// Then creates a starplot for each of them

function knnPlot(where,data,filters,number){
	var container = d3.select(where);
	var wholeContainer = d3.select(where)
	container.selectAll("*").remove();

	wholeContainer = wholeContainer.append("div").attr("class","knnLegendDiv")
	var header  = container.append("div").attr("class","knnHeader");

	var elementDiv = wholeContainer.append("div").attr("class","knnHeaderElem")
	container = container.append("div").attr("class","knnContent");

	container.selectAll("*").remove();

	this.categories = ["Ethnicity","Site","Tcategory","Gender","Nodal_Disease","ecog","Chemotherapy","Local_Therapy"];
	this.allCategories = ["Ethnicity","Site","Tcategory","Gender","Nodal_Disease","ecog","Chemotherapy","Local_Therapy"];
	this.data = data;
	this.filters = filters;
	this.k = 5;

	this.applyFilters(filters);

	// var number = number || this.filteredData[0].id;
	var number = number || selectedID;  // not reset to 0

  // console.log(this.filteredData);
	var neigh = this.findKNearest(number,this.k);
	//data[number].id = number;
	//neigh.push(data[number]);
	//this.k +=1;

	var categories = this.allCategories;
	var nCat = this.categories.length;

	this.possibleValues = {};
	var possibleValues = this.possibleValues;

	for (var j=0;j<categories.length;j++) {
			possibleValues[categories[j]] = {};
	}

	for (var i=0;i<data.length;i++){
		for (var j=0;j<categories.length;j++) {
			var cat = categories[j];
			possibleValues[cat][data[i][cat]] = 1;
		}
	}

	scaleXCat = [];
	maxXCat = [];

	for (var j=0;j<categories.length;j++) {
			possibleValues[categories[j]] = Object.keys(possibleValues[categories[j]]);

			// var scale = d3.scale.ordinal().domain(possibleValues[categories[j]]).range(getRangeTo(possibleValues[categories[j]].length));
			var scale = d3.scaleOrdinal().domain(possibleValues[categories[j]]).range(getRangeTo(possibleValues[categories[j]].length));

			maxXCat.push(possibleValues[categories[j]].length)
			scaleXCat.push(scale);
	}

	var headerList = header;
	var select  = headerList.append("select").on("change",function(d){
							var selectedIndex = parseInt(d3.select(this)
												    .selectAll("option")
												    .filter(function (d, i) {
												        return this.selected;
												    }).attr("value"));
							var knn = new knnPlot(where,data,filters ,selectedIndex);
						});

	headerList.append("b");

  for (var i=0; i<data.length; i++) {
	// for (var i in data){
		// if (this.isInsideFiltered(i)){
			var op = select.append("option").attr("value",i).text(i);
			if (number == i){
				op.attr("selected","selected");
			}
		// }
	}

	for (var i=0; i<data.length; i++) {
		d3.select("#mosaicPlotTip" + i).remove();
	}

	var c = new starPlot(elementDiv,data,number);

	var y = 0;

	for (var i in neigh){
		var d = container.append("div").style("position","absolute")
										.style("width","100%")
										.style("height", (100/this.k) + "%")
										.style("top", (100/this.k * i) + "%")
										.style("font-size","120%")
		var c = new starPlot(d,data,neigh[i].id);
	}


	this.legendW = 100;
	this.legendH = 25;
	var lW = 150;
	var lH = 200;

	this.legend = wholeContainer.append("div")
							.style("position","absolute")
							.style("left",(10) + "%")
							.style("top",(35) + "%")
							.style("width",(this.legendW) + "%")
							.style("height",(this.legendH) + "%")
							.append("svg")
							.attr("class","fullDiv")
							.attr("viewBox","0 0 "+lW + " "+lH)
							.attr("preserveAspectRatio", "xMinYMin")

	this.legend.append("linearGradient")
      .attr("id", "temperature-gradient")
      //.attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", 0).attr("y1", "20%")
      .attr("x2", 0).attr("y2", "80%")
      .selectAll("stop")
      .data([
        {offset: "0%", color: "#ef8a62"},
        //{offset: "50%", color: "gray"},
        {offset: "100%", color: "#67a9cf"}
      ])
      .enter().append("stop")
      .attr("offset", function(d) { return d.offset; })
      .attr("stop-color", function(d) { return d.color; });

  this.legend.append("rect")
    			.attr("x",10)
    			.attr("y",0)
    			.attr("width",20)
    			.attr("height",lH)
    			.style("fill","url(#temperature-gradient)");

  this.legend.append("text")
    			.attr("x",40)
    			.attr("y",13)
    			.text("0")

  this.legend.append("text")
    			.attr("x",40)
    			.attr("y",lH)
    			.text("1")

  this.legend.append("text")
    			.attr("x",40)
    			.attr("y",lH/2 + 5)
			  	.style("font-weight","bold")
					// .style("font-size","90%")
    			.text("Surv. Rate")

  // List of Categories
  this.oldLegH = this.legendH;
  this.legendW = 100;
	this.legendH = 40;
	var lW = 150;
	var lH = 200;

	this.legend = wholeContainer.append("div")
							.style("position","absolute")
							.style("left",(10) + "%")
							.style("top",(60) + "%")
							.style("width",(this.legendW) + "%")
							.style("height",(this.legendH) + "%")
							.append("svg")
							.attr("class","fullDiv")
							.attr("viewBox","0 0 "+lW + " "+lH)
							.attr("preserveAspectRatio", "xMinYMin")

	var padding  = 4
	var textH = (lH - (this.allCategories.length+1) * padding ) / (this.allCategories.length+1);

	for (i in this.allCategories){
		this.legend.append("text").datum(this.allCategories[i])
								.attr("x",6)
								.attr("y",function(d){
									return (textH + padding) * (parseInt(i)+1);
								})
								.text(function(d){
									return i+": "+d;
								})
								.style("font-size","75%");
	}

	//****************** Parallel Chart ******************//
	var dataForParallel = [];

	for (var i in neigh){
		for (var j in data){
			if (j == neigh[i].id){
				var toInsert = {"id":j};

				for (var catToIns in Object.keys(data[j])){
					toInsert[Object.keys(data[j])[catToIns]] = data[j][Object.keys(data[j])[catToIns]];
				}
        //console.log(toInsert);
				dataForParallel.push(toInsert);
				break;
			}
		}
	}

	toInsert = {"id":number};
	for (var catToIns in Object.keys(data[number])){
		toInsert[Object.keys(data[number])[catToIns]] = data[number][Object.keys(data[number])[catToIns]];
	}
	dataForParallel.push(toInsert);

	//var parall = new parallelChart("#parallelChartForKNN",dataForParallel,selectedCat,[toInsert]);
  // var parall = new parallelChart("#parallelChartForKNN",dataForParallel,selectedCat);
	// console.log(selectedCat);
	// console.log(dataForParallel);
	// integrate the new nomogram plots !!!

	knnData = dataForParallel;
	knnCat = selectedCat;
	selectedID = number;
	// console.log(dataForParallel);
	// console.log(neigh);
	// var parall = new nomogramPlots(".bottomDiv","#parallelChartForKNN",dataForParallel,selectedCat,"knn");
	var nomogram = new knnNomogramPlots(".bottomDiv","#parallelChartForKNN",knnData,knnCat);
  changeParallelDisplayed(d3.select("#title4").selectAll('input').property('checked'));
}


// func
knnPlot.prototype.similarity = function(p1,p2){
	var sim = 0;
	var tieBreaker = - (Math.abs(p1.pat["AgeAtTx"] - p2.pat["AgeAtTx"])) / 150; // 150 max age diff
	sim += tieBreaker;

	// console.log(this.categories);

	for (var i in this.categories){
		var cat = this.categories[i];
		if (p1.pat[cat] == p2.pat[cat]){
			sim+=1;
		}
	}

	// for (var i in this.allCategories){
	// 	var cat = this.allCategories[i];
	// 	if (p1.pat[cat] == p2.pat[cat]){
	// 		sim+=1;
	// 	}
	// }

	return sim;
}

// func
knnPlot.prototype.findKNearest = function(patient, k){
	// console.log(this.data.length);
	var pat = {"pat":this.data[patient]};
	var sortedNeigh =[];

	// console.log(this.filters);

	for (var i in this.data){
	  /*** compute knn in the filtered data ***/
		// var count = 0;
		// for (var c in this.filters) {
		// 	var curCat = "" + this.filters[c].cat;
		// 	if (this.data[i][curCat] === this.filters[c].val) {
		// 		count++;
		// 	}
		// }
		/************************************/

		// if (i!= patient && count === this.filters.length){
		if (i!= patient){
			var curr = {"pat" : this.data[i]};
			curr.id = i;
			curr.sim = this.similarity(curr,pat);
			if (sortedNeigh.length < k ){
				sortedNeigh = insertSorted(curr,sortedNeigh,false);
			} else if (sortedNeigh[0].sim < curr.sim){
				sortedNeigh = insertSorted(curr,sortedNeigh,true);
			}
		}
	}
  // console.log(sortedNeigh);

	return sortedNeigh;
}

// func
knnPlot.prototype.applyFilters = function(filters){
		this.filtersApplied = filters;

		var d = this.data;
		this.filteredData = [];

		var c = this.allCategories;
		this.categories=[]

		for (var i=0;i<c.length;i++){
			var accepted = true;
			for (var j=0;j<filters.length;j++){
				if (c[i] == filters[j].cat){
					accepted = false;
					break;
				}
			}
			if (accepted) {
				this.categories.push(c[i]);
			}
		}

		for (var i=0;i<d.length;i++){
			var accepted = true;
			for (var j=0;j<filters.length;j++){
				if (d[i][filters[j].cat] != filters[j].val){
					accepted = false;
					break;
				}
			}
			if (accepted) {
				var toInsert = {"id":i};
				for (var catToIns in Object.keys(d[i])){
					toInsert[Object.keys(d[i])[catToIns]] = d[i][Object.keys(d[i])[catToIns]];
				}
				this.filteredData.push(toInsert);
			}
		}
}

// func
knnPlot.prototype.isInsideFiltered = function(i){
	for (var j=0;j<this.filteredData.length;j++){
		if (i == this.filteredData[j].id){
			return true;
		}
	}
	return false
}

// func
function insertSorted(el,arr,elimFirst){
	var tmp = arr;
	arr = [];
	var j=elimFirst ? 1: 0;
	var used = false;

	while (j < tmp.length){
		if (tmp[j].sim < el.sim || used){
			arr.push(tmp[j]);
			j +=1;
		} else{
			arr.push(el);
			used = true;
		}
	}

	if (!used){
		arr.push(el);
	}

	return arr;
}

// func
function getRangeTo(x){
	res = [];
	for (var i=1;i<=x;i++){
		res.push(i);
	}
	return res;
}
