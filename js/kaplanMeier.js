var selectedCat;


function kaplanMeierPlot(where,data){

	var container = d3.select(where);
	var that = this;

	this.data = data;

	this.filtersApplied = [];
	this.groupedData = [];

	that.catChangedFunc = function(){};

	this.maxSurvival = 0;
	this.activeCat = "Ethnicity";

	this.axisW = 50;
	this.axisH = 50;
	this.lineStroke = 3;

	this.w = 600;
	this.h = 500;
	this.padding = 10;

	var svg = container.append("svg").attr("class","fullDiv")
									.attr("preserveAspectRatio", "xMidYMid")
									.attr("viewBox",-this.axisW +" "+ -this.axisH+" " + (this.w + this.axisW)+ " " + (this.h + 2*this.axisH));
	this.svg=svg;


	this.legendDiv = container.append("div").attr("class","kaplanLegendDiv");
	this.chooserDiv = container.append("div").attr("class","kaplanChooserDiv");


	this.tip = d3.tip()
					.attr('class', 'd3-tip')
          .attr('id', 'mosaicPlotTip')
          .html(function(d) { return d.val });

	/* Invoke the tip in the context of your visualization */
	this.svg.call(this.tip)

	var ratio = (this.h + 2*this.axisH) / (this.w + this.axisW);
	var contRatio = parseFloat(container.style("height")) / parseFloat(container.style("width"));

	var legendTop = Math.abs(ratio - contRatio) / 2 * parseFloat(container.style("width")) ;

	this.legendDiv.style("top",legendTop);

	this.filter([],[this.activeCat,"Local_Therapy"]);

}


function lessPatient(p1,p2){
	return parseFloat(p1["OS"]) < parseFloat(p2["OS"]);
}


function medianSwap(list,start,end){
	var j = start;

	for (var i=start;i<end -1;i++){
		if (lessPatient(list[i],list[end])) {
			var temp = list[j];
			list[j] = list[i];
			list[i] = temp;
			j++;
		}
	}

	var temp = list[j];
	list[j] = list[end];
	list[end] = temp;
	return j;
}


function sort(list){
	// Insertion sort because quicksort exceeds call stack :(
	for (var i=0;i<list.length;i++){
		var j=i;
		while (j>0 && !lessPatient(list[j-1],list[j])){
			var temp = list[j];
			list[j] = list[j-1];
			list[j-1] = temp;
			j--;
		}
	}
}


kaplanMeierPlot.prototype.groupBy = function(cat){

	var groups = {};
	for (var i=0;i<this.filteredData.length;i++){
		var d = this.filteredData[i];
		if (groups[d[cat]]) {
			groups[d[cat]].push(d);
		} else{
			groups[d[cat]] = [d];
		}
	}

	this.KMdata = [];

	for (var i in groups){
		var res = {"val" : i, "steps": []};
		sort(groups[i]);
		var count = groups[i].length;
		res.steps.push({"t":0,"d":0,"n":count});

		for (var j=0;j<groups[i].length;j++){
			var pat = groups[i][j];
			var last = res.steps[res.steps.length-1];

				// Event Death Occured
			if (last.t == pat.OS){
				count-=1;
				last.d += (pat.Censor == 1) ? 0: 1;
			} else{
				res.steps.push({"t":parseFloat(pat.OS),"d":(pat.Censor == 1) ? 0: 1,"n":count});
				count-=1;
			}
		}

		this.KMdata.push(res);
	}

	this.addKaplanMeasures();
}


kaplanMeierPlot.prototype.addKaplanMeasures = function(){

	for (var a = 0; a < this.KMdata.length; a++) {

		var steps = this.KMdata[a].steps;

    for (var b = 0; b < steps.length; b++) {
      var reed = steps[b];
      var brad = (b > 0) ? steps[b - 1].n - reed.d : reed.n;

		  reed.progression = reed.d / reed.n;
      reed.survival = 1 - reed.progression;
      reed.prob = (b == 0) ? reed.survival : steps[b - 1].prob * reed.survival;
      this.maxSurvival = (this.maxSurvival  < reed.t) ? reed.t : this.maxSurvival ;
      reed.censored = (reed.n < brad) ? true : false;
      reed.sumTilHere = (b > 0) ? steps[b - 1].sumTilHere + (reed.d/(reed.n * (reed.n - reed.d))) : 0

      if ((reed.n - reed.d) == 0){
      	reed.sumTilHere = 0;
      }
      reed.variance = reed.prob * reed.prob * reed.sumTilHere;
      //reed.variance += (b > 0) ? steps[b - 1].variance : 0;
		}
  }
}


kaplanMeierPlot.prototype.drawPlot = function(){

	var that = this;
	this.svg.selectAll("*").remove();

	if (this.filteredData.length < 5){
		this.svg.append("text")
      .attr("x", (this.w / 2))
      .attr("y", (this.h /2 ))
      .style("text-anchor", "middle")
      .style("font-weight","bold")
      .text("Not Enough Data");

		return;
	}

	// // d3 verson 3
	// var x = d3.scale.linear().domain([0, this.maxSurvival]).range([0, this.w]);
  // var y = d3.scale.linear().domain([1, 0]).range([0, this.h]);
  // //Define axses
  // var xAxis = d3.svg.axis()
  //   .scale(x)
  //   .tickSize(2)
  //   .tickPadding(6)
  //   .orient("bottom");
	//
	// var yAxis = d3.svg.axis()
  //   .scale(y)
  //   .tickSize(2)
  //   .tickPadding(6)
  //   .orient("left");

  // d3 verson 4
	var x = d3.scaleLinear().domain([0, this.maxSurvival]).range([0, this.w]);
	var y = d3.scaleLinear().domain([1, 0]).range([0, this.h]);

	var xAxis = d3.axisBottom()
    .scale(x)
    .tickSize(2)
    .tickPadding(6);

  var yAxis = d3.axisLeft()
    .scale(y)
    .tickSize(2)
    .tickPadding(6);

  //var colors = d3.scale.category10();
	// var colors = d3.scaleOrdinal(d3.schemeCategory10);
	// var colors = d3.scaleOrdinal(category10colors);

  for (var i = 0; i<this.KMdata.length;i++){
  	var g = this.KMdata[i].steps;
  	var col = colors(this.KMdata[i].val);

  	for (var j=1;j<g.length;j++){
  		var x1 = x(g[j-1].t);
  		var x2 = x(g[j].t);
  		var y1 = y(Math.max(0,g[j].prob - 1.96 * Math.sqrt(g[j].variance)));
  		var y2 = y(Math.min(1,g[j].prob + 1.96 * Math.sqrt(g[j].variance)));

  		if (!y1){	}

    	this.svg.append("rect")
    		.datum(col)
    		.attr("class","kaplanBox")
    		.attr("x",x1)
    		.attr("width",x2-x1)
    		.attr("y",y2)
    		.attr("height",y1-y2)
    		.style("fill",col);

    }
  }

  this.lines = this.svg.selectAll(".kaplanLine")
	  .data(this.KMdata)
  	.enter()
    .append("path")
    .attr("class","kaplanLine")
    .attr("stroke", function(d,i){
    	return colors(d.val);
    })
		.attr("stroke-width", this.lineStroke)
		.attr("fill", "none")
		.attr("d",function(d,i){
  	  var dString="M"+ x(d.steps[0].t) + " " + y(d.steps[0].prob) + " ";
  	  for (var i=1; i< d["steps"].length;i++){
	  		dString +="L"+ x(d.steps[i-1].t) + " " + y(d.steps[i].prob) + " ";
	  		dString +="L"+ x(d.steps[i].t) + " " + y(d.steps[i].prob) + " ";
  	  }
  	  return dString;
    })
    .on("mouseover",that.tip.show)
    .on("mouseout",that.tip.hide);

	//Draw the x-axis
  var theXAxis = this.svg.append("g")
    .attr("class", "xaxis")
    .attr("transform", "translate(" + 0 + "," + this.h + ")")
    .call(xAxis);

	theXAxis
	  .selectAll("text")
  	.style("font-size", "20");

  //Draw the y-axis
  var theYAxis = this.svg.append("g")
    .attr("class", "yaxis")
    .attr("transform", "translate(" + 0 + ", " +0+ ")")
    .call(yAxis);

	theYAxis
		.selectAll("text")
		.style("font-size", "20");

  this.svg.append("text")
    .attr("x", (this.w / 2))
    .attr("y", (this.h + 5 * this.padding))
    .style("text-anchor", "middle")
    .style("font-weight","bold")
		.style("font-size", "24")
    .text("Overall Survival Rate in months");

  this.svg.append("text")
    .attr("transform", "translate("+ (-this.axisW -25) + ", "+ (this.h/2)+") rotate(-90)")
    .attr("x", 0)
    .attr("y", 0)
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .style("font-weight","bold")
		.style("font-size", "24")
    .text("Probability of Survival");

  this.legendDiv.html("");

  for (var i=0;i<this.KMdata.length;i++){
  	var g = this.KMdata[i];
  	var divHtml = "       <div class='color-box' style='background-color:"+ colors(g["val"]) +"'></div>"
  	this.legendDiv.html( this.legendDiv.html() +"  " + divHtml + " " + g.val + "</br>")
  }

}


kaplanMeierPlot.prototype.filter = function(filters,newCat){
	var that = this;
	this.filtersApplied = filters;
	var d = this.data;
	this.filteredData = [];

	for (var i=0;i<d.length;i++){
		var accepted = true;
		for (var j=0;j<filters.length;j++){
			if (d[i][filters[j].cat] != filters[j].val){
				accepted = false;
				break;
			}
		}
		if (accepted) {
			this.filteredData.push(d[i]);
		}
	}
	this.maxSurvival = 0;

	this.chooserDiv.selectAll("*").remove();

  var op = this.chooserDiv.append("select")
	  .attr("id","kaplanChooser")
		.on("change",function(){
			var sel = document.getElementById('kaplanChooser');
		  that.activeCat = sel.options[sel.selectedIndex].value;
		  selectedCat = that.activeCat;
		  that.groupBy(that.activeCat);
		  that.drawPlot();
		  that.catChangedFunc(that.activeCat);
    })

  for (var i=0;i<newCat.length;i++){
  	op.append("option").text(newCat[i]);
  }

	this.activeCat = newCat[0];
	selectedCat = this.activeCat;
	this.groupBy(this.activeCat);
	this.drawPlot();
}


kaplanMeierPlot.prototype.catChanged = function(fun){
	this.catChangedFunc = fun;
}
