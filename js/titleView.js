// Creates the title bar on top that summarize the filters applied
function titleView(where,filters){
	var that = this;
	this.container = d3.select(where);

	this.container.selectAll("*").remove();
	this.container.append("h6").attr("class","filterTitle").text("Showing: Total Data ")
	              // .attr("font-size", 10)
								// .attr("font-size", 1.5vmin)
								.on("click",function(d){
										that.onFilterSelectedFunc([]);
									});

	this.filters = filters;
	this.onFilterSelectedFunc = function(){};

	for (var i=0;i<filters.length / 2;i++){

		var fil = this.container.append("h6").datum(i*2 +1).attr("class","filterTitle").text(""+filters[i*2].val+", "+filters[i*2 + 1].val + " ")
		              // .attr("font-size", 10)
									.on("click",function(d){
										var fil = [];
										for (var j=0; j<=d;j++){
											fil.push(that.filters[j]);
										}
										that.onFilterSelectedFunc(fil);
									})
									.append("i").datum((i-1)*2 +1).text("x")
									.on("click",function(d){
										d3.event.stopPropagation();
										var fil = [];

										for (var j=0; j<=d;j++){
											fil.push(that.filters[j]);
										}
										that.onFilterSelectedFunc(fil);
									});

	}
}

titleView.prototype.onFilterSelected = function(fun){
	this.onFilterSelectedFunc = fun;
}
