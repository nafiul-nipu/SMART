// Create a mosaic plot with the given data at where element
// Callback will be called when the user clicks on a mosaic tile
function mosaicPlot(where,data,callback,startFilters) {

	var allContainer = d3.select(where);
	var that = this;

	this.listDiv = allContainer.append("div").attr("class","mosaicListContainer");
	container = allContainer.append("div").attr("class","mosaicSVGContainer");

	this.data = data;
	this.filteredData = data;
	this.filtersApplied = startFilters? startFilters : [];
	this.onFilterFunc = callback ? callback : function() {};

	var axisW = 100;
	var axisH = 30;

	var sliderH = 50;
	var sliderTextW = 50;

	var w = 500;
	var h = 500;
	var padding = 10;

	// create the svg for the mosaic plot
	var svg = container.append("svg")
	  .attr("class","fullDiv")
		// .attr("preserveAspectRatio", "none")
		.attr("viewBox",-axisW + " " + -axisH + " " + (w + axisW) + " " + (h + axisH + sliderH));

	this.svg = svg;

	this.tip = d3.tip()
		.attr('class', 'd3-tip')
    .attr('id', 'mosaicPlotTip')
    .html(function(d) { return d.cat1 + ": " + d.val1 + "</br> " + d.cat2 + ": " + d.val2 + "</br>"
					+ "Num of Patients: " + d.num + "</br> 5 Year Survival Probability: " + Math.round(d.survival * 100) / 100 +
						"</br> Standard Deviation: " + Math.round(d.std * 100) / 100});

	/* Invoke the tip in the context of your visualization */
	this.svg.call(this.tip)

	//this.mosaicColors = ["#ef8a62","#67a9cf", "#000000"];
	this.mosaicColors = ["#d1ab9c","#91b0c2", "#000000"];    // lower the saturation [(17, 25%, 82%), (202, 25%, 76%)]

	this.sliderValue = 0.5;

	this.allCategories = ["Ethnicity","Site","Tcategory","Gender","Nodal_Disease","ecog","Chemotherapy","Local_Therapy"];
	this.categories = ["Ethnicity","Site","Tcategory","Gender","Nodal_Disease","ecog","Chemotherapy","Local_Therapy"];

	this.list = new mosaicList(this.listDiv,this.categories);

	this.list.onChange(function(l){
		that.categories = l;
		that.filteredData = that.data;
		that.filtersApplied = [];
		//
		// d3.select("#domainSlider").selectAll("*").remove();
		// d3.select("#rangeSlider").selectAll("*").remove();
		// d3.select("#linkSlider").selectAll("*").remove();
		// sliderLeft = [0, 1];
		// sliderRight = [0, 1];
		/******************************/
		that.showPlot();
	})

	var categories = this.categories;

	this.showingPlot = true;

	this.backButton = allContainer.append("div")
	  .attr("class","mosaicBackButtonDiv")
		.on("click",function(){
			that.showingPlot = !that.showingPlot;
			that.listDiv.style("width", that.showingPlot? "0%" : "100%");
			container.style("width", that.showingPlot? "100%" : "0%");
		})
		.on("mouseover", function(d) {
			var evt = d3.event;

			d3.select(".randomTooltip")
				.style("display","initial")
				.style("top", function(d) {
					return evt.clientY - d3.select(this).node().clientHeight - 40 + "px";
				})
				.style("left", function(d) {
					// return evt.clientX - d3.select(this).node().clientWidth - 20 + "px";
					return evt.clientX - d3.select(this).node().clientWidth/2 + "px";
				});
		})
		.on("mouseout", function(d) {
			d3.select(".randomTooltip")
				.style("display", "none");
		});

	// this.backButton.append("i").attr("class","fa fa-2x fa-bars");
  var backButtonSvg = this.backButton.append("svg")
	  .attr("x", 0)
	  .attr("width", "5vmin")
		.attr("height", "5vmin");

	for (var i=0; i<3; i++) {
		backButtonSvg.append("rect")
			.attr("x", "0.4vw")
			.attr("y", (0.6+i)+"vh")
			.attr("width", "1.8vw")
			.attr("height", "0.6vh")
			.style("border-radius", 5)
			.style("fill", "gray");
	}

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

	for (var j=0;j<categories.length;j++) {
			possibleValues[categories[j]] = Object.keys(possibleValues[categories[j]]);
	}


	this.showPlot = function() {
		this.svg.selectAll(".axisText").remove();
		this.svg.selectAll(".mosaicTile").remove();

		var categories = this.categories;
		var possibleValues = this.possibleValues;

		var xCat = categories[0];
		var yCat = categories[1];

		// Prepare data object structure
		var dataForCombo = {};
		for (var i=0;i<possibleValues[xCat].length;i++){

			var xVal = possibleValues[xCat][i];
			dataForCombo[xVal] = { "total": 0};

			for (var j=0;j<possibleValues[yCat].length;j++){
				var yVal = possibleValues[yCat][j];
				dataForCombo[xVal][yVal] = 0
			}
		}

		// populate data
		for (var i=0;i<this.filteredData.length;i++){
			dataForCombo[this.filteredData[i][xCat]][this.filteredData[i][yCat]] +=1;
			dataForCombo[this.filteredData[i][xCat]]["total"] +=1;
		}

		var totX = 0;
		for (var i=0;i<possibleValues[xCat].length;i++){
			var xVal = possibleValues[xCat][i];
			totX += dataForCombo[xVal]["total"];
		}

		//Draw Graph
		var xScale = function(x){
			return x/totX * (w - ( Object.keys(possibleValues[xCat]).length + 2) * padding);
		}

		var cumX = padding;
		var meanYValue = {};

		for (var i=0;i<possibleValues[xCat].length;i++){
			var xVal = possibleValues[xCat][i];
			var barW = xScale(dataForCombo[xVal]["total"]);
			var cumY = padding;

			// Threshold for bar width, if the bar is less than 2% wide just go to the next category
			//if (barW < w * 0.02) { continue;}
			if (barW < w * 0.012) { barW = barW * 4.5;}
			if (barW < w * 0.02 && barW >= w * 0.012) { barW = barW * 2.5;}

			for (var j=0;j<possibleValues[yCat].length;j++){
				var yVal = possibleValues[yCat][j];

				if (dataForCombo[xVal]["total"]!=0){
					var barH = dataForCombo[xVal][yVal] / dataForCombo[xVal]["total"] * (w - ( Object.keys(possibleValues[yCat]).length + 2) * padding * 1.8);

		      // Threshold for bar height, if the bar is less than 2% height just go to the next category
					if (barH < h * 0.02) { barH = barH*2.5;}
					if (barH == 0) { barH = h * 0.005;}

		 			var mean = that.calculateMean(xCat,xVal,yCat,yVal);
					var barData = {"cat1": xCat, "cat2":yCat, "val1":xVal,"val2":yVal, "survival": mean, "std": that.calculateStd(xCat,xVal,yCat,yVal,mean), "num": dataForCombo[xVal][yVal]};

					svg.append("rect")
					  .datum(barData)
						.attr("class","mosaicTile")
						.attr("x",cumX)
						// .attr("y",cumY)
						.attr("y",cumY + padding * 1.5)
						.attr("height",barH)
						.attr("width",barW)
						.attr("fill",function(d){
						  if (barH == h * 0.005) {
								return that.mosaicColors[2];
							} else if (d["survival"] >= that.sliderValue){
							 	return that.mosaicColors[1];
							} else if (d["survival"] < that.sliderValue && d["survival"] > 0) {
							 	return that.mosaicColors[0];
							} else if (d["survival"] <= 0) {
							 	return that.mosaicColors[2];
							}
						})
						.on("click",function(d){
							if (that.categories.length>=4){
						    that.onClickFunction(d["cat1"],d["val1"],d["cat2"],d["val2"]);
							}
						})
						.on('mouseover', that.tip.show)
  					.on('mouseout', that.tip.hide);

					// Calculate mean y for the axis text
					if (!meanYValue[yVal] ){
						meanYValue[yVal] = { "weighted": dataForCombo[xVal][yVal] * (cumY + barH/2), "total": dataForCombo[xVal][yVal], "text":yVal }
					} else {
						meanYValue[yVal]["weighted"] += dataForCombo[xVal][yVal] * (cumY + barH/2);
						meanYValue[yVal]["total"] += dataForCombo[xVal][yVal];
					}

					cumY += barH + padding;
				}
			}

			// Axis Text
			if (dataForCombo[xVal]["total"]!=0){
				svg.append("text").text(xVal)
				   .attr("transform", "translate("+(cumX + barW * 0.6)+",0) rotate(-25)")
					 .attr("y", padding + 6)
					 .attr("class","axisText")
					 .style("font-size", "24");
			}

			cumX += barW + padding;
		}

		// Y axis text
		var lastY = 0;
		for(var i in meanYValue){
			if (meanYValue[i]["total"]!=0){
				var y = meanYValue[i]["weighted"] / meanYValue[i]["total"];
				if (y-lastY<padding ){
					y = lastY + padding;
				}
				svg.append("text").text(meanYValue[i]["text"])
				  .attr("x",0).attr("y",y + padding * 1.5)
					.attr("class","axisText y") // modify attr("x",axisW) to attr("x",0)
					.style("font-size", "24");

				lastY = y;
			}
		}

		// console.log(this.filtersApplied);
		// console.log([this.categories[0],this.categories[1]]);
		// console.log(this.filteredData);
		this.onFilterFunc(this.filtersApplied,[this.categories[0],this.categories[1]],this.filteredData);
	}  // end - showPlot


	this.onClickFunction = function (cat1,val1,cat2,val2){

		this.filterData(cat1,val1,cat2,val2);
		// Erase the two categories from the list
		var c = this.categories;
		this.categories = [];

		for (var i=0;i<c.length;i++){
			if (c[i]!= cat1 && c[i]!= cat2){
				this.categories.push(c[i]);
			}
		}

		// console.log(this.categories);
		/***** added for nomogramPlots *****/
		Object.keys(axes).forEach((el) => {
			// axes[el] = false;
			axesMosaic[el] = false;

			if(!axes[el]) {
				knnFilters.push({"cat": el, "val":data[selectedID][el]});
			}
		});

		// axes["AgeAtTx"] = true;
		axesMosaic["AgeAtTx"] = true;

		this.categories.map(el => {
			// axes[el] = true;
			axesMosaic[el] = true;
		});

		// axes["Probability of Survival"] = true;
		axesMosaic["Probability of Survival"] = true;

		// d3.select("#domainSlider").selectAll("*").remove();
		// d3.select("#rangeSlider").selectAll("*").remove();
		// d3.select("#linkSlider").selectAll("*").remove();
		// sliderLeft = [0, 1];
		// sliderRight = [0, 1];
		/******************************/

		this.showPlot();
	}


	this.filterData = function(cat1,val1,cat2,val2){

		// Filters the data based on the categories and the values
		this.filtersApplied.push({"cat":cat1,"val":val1});
		this.filtersApplied.push({"cat":cat2,"val":val2});

		var d = this.filteredData;
		this.filteredData = [];

		for (var i=0;i<d.length;i++){
			if (d[i][cat1] == val1 && d[i][cat2] == val2){
				this.filteredData.push(d[i]);
			}
		}
		//console.log(this.filteredData);
	}


	this.filter = function(filters) {

		// Applies the filters in filters object to the data
		this.filtersApplied = filters;

		// console.log("mosaic-filtersApplied: " + this.filtersApplied);

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
				this.filteredData.push(d[i]);
			}
		}

		// console.log(this.categories);
		/***** added for nomogramPlots *****/
		Object.keys(axes).forEach((el) => {
			// axes[el] = false;
			axesMosaic[el] = false;

			if(!axes[el]) {
				knnFilters.push({"cat": el, "val":data[selectedID][el]});
			}
		});

		// axes["AgeAtTx"] = true;
		axesMosaic["AgeAtTx"] = true;

		this.categories.map(el => {
			// axes[el] = true;
			axesMosaic[el] = true;
		});

		// axes["Probability of Survival"] = true;
		axesMosaic["Probability of Survival"] = true;

		// d3.select("#domainSlider").selectAll("*").remove();
		// d3.select("#rangeSlider").selectAll("*").remove();
		// d3.select("#linkSlider").selectAll("*").remove();
		// sliderLeft = [0, 1];
		// sliderRight = [0, 1];
    /******************************/

		this.showPlot();
	}


	this.onFilter = function(fun){
		// function fun now will be called everytime a filter is applied
		this.onFilterFunc = fun;
	}


	this.calculateMean = function(cat1,val1,cat2,val2){

		var count=0;
		var tot = 0;

		for (var i= 0;i<this.filteredData.length;i++){
			var d = this.filteredData[i];
			if (d[cat1]==val1 && d[cat2] == val2){
				count +=1;
				tot+= parseFloat(d["Probability of Survival"]);
			}
		}

		if (count != 0){
			return tot/count;
		} else{
			return 0;
		}
	}


	this.calculateStd= function(cat1,val1,cat2,val2,mean){

		var count=0;
		var tot = 0;

		for (var i= 0;i<this.filteredData.length;i++){
			var d = this.filteredData[i];
			if (d[cat1]==val1 && d[cat2] == val2){
				count +=1;
				var surv = parseFloat(d["Probability of Survival"]);
				tot+= (surv-mean)*(surv-mean);
			}
		}

		if (count != 0){
			return Math.sqrt(tot/count);
		} else{
			return 0;
		}
	}


	var sliderText;
	this.updateColor = function(){

		svg.selectAll(".mosaicTile")
			.attr("fill",function(d){
					  	 /*if (d["survival"] >= that.sliderValue){
					  	 	return that.mosaicColors[1];
					  	 } else{
					  	 	return that.mosaicColors[0];
					  	 }*/
			if (d["survival"] >= that.sliderValue){
				return that.mosaicColors[1];
			} else if (d["survival"] < that.sliderValue && d["survival"] > 0) {
				return that.mosaicColors[0];
			} else if (d["survival"] <= 0) {
				return that.mosaicColors[2];
			}
		});
	}


	this.changeThreshold = function(pct){
		sliderText.text(Math.round(pct * 100) / 100);
		this.sliderValue = pct;
		this.updateColor();
	}


	this.filter(this.filtersApplied);

	// Slider at the bottom of viz
	var slideTitle = svg.append("text")
	  .attr("class","sliderText")
		// .attr("x",-axisW)
		// .attr("y",h + sliderH - 2*padding)
		.attr("x", -padding * 12)
		.attr("y",h + sliderH - padding * 6)
		.style("font-weight","bold")
		.style("font-size", "26")
		.text("5 Year Survival:");

	var sliderBar = svg.append("rect")
	  .attr("class","MosaicSliderBar")
		// .attr("x",padding *3)
		// .attr("y",h + sliderH - 3*padding)
		.attr("x", padding * 8)
		.attr("y",h + sliderH - padding * 7)
		.attr("rx",padding)
		// .attr("width",w- 5*padding - sliderTextW)
		.attr("width",w - padding * 9 - sliderTextW)
		.attr("height",2*padding);

	sliderText = svg.append("text")
	  // .attr("x", w -padding - sliderTextW )
		// .attr("y",h + sliderH - 2*padding)
		.attr("x", w - sliderTextW)
		.attr("y",h + sliderH - padding * 6)
		.attr("class","sliderText")
		.style("font-size", "26")
		.text("0.5");

	var st = parseInt(sliderBar.attr("x"));
	var en = st + parseInt(sliderBar.attr("width"));
	// var sliderPerc = d3.scale.linear().domain([st ,en])
	// 								  .range([0,1]);
	var sliderPerc = d3.scaleLinear()
	  .domain([st ,en])
		.range([0,1]);

	// var drag = d3.behavior.drag()
	var drag = d3.drag()
	  .on("drag", function(d,i) {
      var newX = parseInt(d3.select(this).attr("cx")) + d3.event.dx;
      newX = (newX > en )? en : newX;
      newX = (newX < st)?st:newX;
      d3.select(this).attr("cx", newX);
      that.changeThreshold(sliderPerc(parseInt(d3.select(this).attr("cx"))));
    });

	var sliderHandle = svg.append("circle")
	  .attr("class","MosaicSliderHandle")
		// .attr("cx",padding*3 + sliderBar.attr("width")/2)
		// .attr("cy",h + sliderH - 2*padding)
		.attr("cx",padding * 8 + sliderBar.attr("width")/2)
		.attr("cy",h + sliderH - padding * 6)
		.attr("r",padding * 1.5)
	  .call(drag);

}
