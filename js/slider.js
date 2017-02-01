
function drawSlider(id, domain, type) {

  // d3.select(id).selectAll("*").remove();

  // var width = window.innerWidth * 0.01,
  //     height = window.innerHeight * 0.27;

  var width = Math.floor(d3.select(id).node().parentNode.clientWidth / 3),
      height = d3.select(id).node().parentNode.clientHeight;

  // var margin = {top: 20, right: 20, bottom: 50, left: 70},
  //     width = 960 - margin.left - margin.right,
  //     height = 500 - margin.top - margin.bottom;

  var x = d3.scaleLinear()
    .domain([0, 1])
    .rangeRound([0, width]);

  var y = d3.scaleLinear()
    .domain([0, 1])
    .rangeRound([height, 0]);

  var svg = d3.select(id).append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("preserveAspectRatio", "none")
      .attr("viewBox", "0 0 " + width + " " + height);
    // .append("g")
      //.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // svg.append("g")
  //   .attr("class", "axis--grid")
  //   .call(d3.axisLeft(y)
  //     // .ticks(domain.length - 1)
  //     .tickSize(-height));

  var domainBar = svg.append("g").append("rect")
    .attr("x", width / 4)
    .attr("y", 0)
    .attr("width", width / 2)
    .attr("height", height)
    .attr("fill", "#cccccc")
    .attr("stroke", "none");

  var domainBrush = svg.append("g")
    .attr("class", "brush")
    .call(d3.brushY()
      .extent([[0, 0], [width, height]])
      .on("end", brushended));

  // var svg2 = d3.select(id).append("svg")
  //   .attr("width", width)
  //   .attr("height", height)
  //   .append("g")
  //   .attr("transform", "translate(" + width / 2 + ", 0)");
  //
  // var rangeBar = svg2.append("g").append("rect")
  //   .attr("x", width / 2 + width / 16)
  //   .attr("y", 0)
  //   .attr("width", width / 8)
  //   .attr("height", height)
  //   .attr("fill", "#cccccc")
  //   .attr("stroke", "none");
  //
  // var rangeBrush = svg2.append("g")
  //   .attr("class", "brush")
  //   .call(d3.brushY()
  //     .extent([[0, 0], [width / 4, height]])
  //     .on("end", brushended));


  function brushended() {

    if (!d3.event.sourceEvent) return; // Only transition after input.

    if (!d3.event.selection) {

      Object.keys(axes).forEach((el) => {
        if (axes[el] && axesMosaic[el]) {
          axesFiltered.push(el);
        }

        var radioID;
        if (el === "Probability of Survival") {
          radioID = "#radio-Survival";
        } else {
          radioID = "#radio-" + el;
        }

        if (d3.select(radioID).property("checked")) {
          if (id === "#domainSlider") {
            axesDomain[el] = dataDomain[el];
          } else if (id === "#rangeSlider") {
            axesRange[el] = [0, 1];
          }
        }
      });

      updatePCP();
      updateKnnNomogram();
      changeParallelDisplayed(d3.select("#title4").selectAll('input').property('checked'));

      // d3.select("#linkSlider").selectAll("*").remove();
      d3.select("#linkSlider").style("visibility", "hidden");
      sliderLeft = [0, 1];
  		sliderRight = [0, 1];

      return;
    }

    //var range = d3.event.selection.map(x.invert);
    var rangeTemp = d3.event.selection.map(y.invert);
    var range = rangeTemp.reverse();
    // console.log(range);

    Object.keys(axes).forEach((el) => {
      if(axes[el] && axesMosaic[el]){
        axesFiltered.push(el);
      }

      var radioID;
      if (el === "Probability of Survival") {
        radioID = "#radio-Survival";
      } else {
        radioID = "#radio-" + el;
      }
      // console.log(d3.select(radioID).property("checked"));

      if(d3.select(radioID).property("checked")){
        // console.log(el);

        if (id === "#domainSlider") {

          if(type === "linear"){

            if(el === "AgeAtTx"){
              // axesDomain[el] = [range[0] * 100, range[1] * 100];
              axesDomain[el] = [90 - range[0] * 65, 90 - range[1] * 65];
            } else{
              axesDomain[el] = range;
            }

          } else if(type === "ordinal"){

            var left_index, right_index;

            for (var i=0; i<domain.length; i++) {
              if (range[0] <= i / (domain.length - 1)) {
                left_index = i;
                break;
              }
            }
            for (var j=domain.length-1; j>=0; j--) {
              if (range[1] >= j / (domain.length -1)) {
                right_index = j;
                break;
              }
            }

            var newDomain = [];
            for (var i=left_index; i<=right_index; i++) {
              newDomain.push(domain[i]);
            }

            axesDomain[el] = newDomain;

            if (right_index <= left_index) {
              axesDomain[el] = domain;
            }

          }
          sliderLeft = range;

        } else if (id === "#rangeSlider") {
          axesRange[el] = range;
          sliderRight = range;
        }

      }

    });

    // console.log(axesDomain);
    // console.log(axesRange);

    sliderLinking();
    updatePCP();
    updateKnnNomogram();
    changeParallelDisplayed(d3.select("#title4").selectAll('input').property('checked'));

    //d3.select(this).transition().call(d3.event.target.move, range.map(x));
    //d3.select(this).transition().call(d3.event.target.move, range.map(y));
  }

}
