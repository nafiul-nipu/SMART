// Creates a list of the categories that the user can reorder to change the mosaic plot
function mosaicList(where, list){
	var that = this;

	var padding = 10;
	var listH = 30;
	var titleH = 40;
	var listW = 100;
	var iconW = 20;

	this.list = list;
	this.onChangeFunc = function(){};

	this.data = [];

	for (var i = 0;i<list.length;i++){
		this.data.push({"text": list[i],"oldY":i,"newY":i});
	}

	var container = where.append("svg")
	  .attr("class","fullDiv")
		.attr("viewBox","0" + -titleH + " " + listW + " " + ((listH + padding) * list.length));

	var padding = 2;

	//var drag = d3.behavior.drag()  // d3 v3
	var drag = d3.drag()  // d3 v4
    .on("drag", function(d,i) {
			var y = d3.event.y;

      var listY = Math.floor(y / (listH + padding));

      container.selectAll("rect")
			  .style("fill",function(d2,i2){
					if (i2 == d["oldY"]){
        		return "#336699";
        	}
        	if (i2 == d["newY"]){
        		return "#993333";
        	}
      		return "transparent";
      	})

    	if (d["newY"] != listY && listY >= 0 && listY<that.list.length){
    		d["newY"] = listY;
        		//that.update();
    	}
    })
		// .on("dragend", function(d,i){
    .on("end", function(d,i){
    	that.update(d,i);
    	container.selectAll("rect").style("fill","transparent");
    });


  container.selectAll(".icon")
	  .data(this.data)
		.enter()
		.append("text")
		.attr("class","icon")
		.attr("x",0)
		.attr("y",function(d,i){
		 	return (listH + padding) * i+listH;
		 })
		.attr("width",listW)
		.attr("height",listH)
		.text(function(d,i){return (i+1)+"."})


	container.selectAll(".boxes")
	  .data(this.data)
	  .enter()
	  .append("rect")
		.attr("class","boxes")
		.attr("x",iconW-2)
		.attr("y",function(d,i){
		 	return (listH + padding) * i + listH/2;
		 })
		.style("fill","transparent")
		.attr("stroke","black")
		.attr("width",listW+iconW)
		.attr("height",listH/3*2)
		.on("mouseover",function(){
		 	d3.select(this).style("fill","lightblue")
		 })
		.on("mouseout",function(){
		 	d3.select(this).style("fill","transparent")
		 })
		.call(drag)
		.style("cursor","ns-resize")


	this.texts = container.selectAll(".listEl")
	  .data(this.data)
		.enter()
		.append("text")
		.attr("class","listEl")
		.attr("x",iconW)
		.attr("y",function(d,i){
		 	return (listH + padding) * i +listH;
		 })
		.attr("fill","black")
		.text(function(d){return d.text})
		.call(drag);


	this.title = container.append("text")
	  .attr("x",0)
		.attr("y",-padding)
		.text("Order the categories")
		.style("font-weight","bold")


	this.update = function(d,i){

		if (d["newY"]!=d["oldY"]){
			var temp = this.data[d["newY"]]["text"]
			this.data[d["newY"]].text = d["text"];
			this.data[d["oldY"]].text = temp;
		}

		// container.selectAll(".icon")
		// 	 	 .data(this.data)
		// 	 	 .attr("x",0)
		// 		 .attr("y",function(d,i){
		// 		 	return (listH + padding) * i +listH;
		// 		 })
		// 		 .attr("width",listW)
		// 		 .attr("height",listH)
		// 	 	 .text(function(d){return d.text})

		container.selectAll(".listEl")
			.data(this.data)
			.attr("x",iconW)
			.attr("y",function(d,i){
			 	return (listH + padding) * i +listH;
			 })
			.text(function(d){return d.text})
			.call(drag)

		this.list = [];
		for (var i = 0;i<this.data.length;i++){
			this.list.push(this.data[i].text);
		}

		// console.log("mosaic-backButton-list: " + this.list);
		this.onChangeFunc(this.list);
	} // this.update end

	this.onChange = function(fun){
		this.onChangeFunc = fun;
	}

}
