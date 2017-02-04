
function drawSlider(id, domain, type, startSizeSetter) {

  var width = Math.floor(d3.select(id).node().parentNode.clientWidth / 3),
      height = d3.select(id).node().parentNode.clientHeight;

  var x = d3.scaleLinear()
    .domain([0, 1])
    .rangeRound([0, width]);

  var y = d3.scaleLinear()
    .domain([0, 1])
    .rangeRound([height  - 3, 3]);

  var svg = d3.select(id).append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("preserveAspectRatio", "none")
      .attr("viewBox", "0 0 " + width + " " + height);

  var domainBar = svg.append("g").append("rect")
    .attr("x", width / 4)
    .attr("y", 0)
    .attr("width", width / 2)
    .attr("height", height)
    .attr("fill", "#cccccc")
    .attr("stroke", "none");

  var brushFunc = d3.brushY()
    .extent([[0, 3], [width, height-3]])
    .on("end", brushended)

  var domainBrush = svg.append("g")
    .attr("class", "brush")
    .call(brushFunc);

  if (startSizeSetter) {
    
    var startingSize = startSizeSetter.map((d, i) => d * y.range()[i]);

    let sliderHeight = y.range()[0] - y.range()[1];

    domainBrush
      .call(brushFunc.move, [
        y.range()[0] - (startSizeSetter[1] * sliderHeight),
        y.range()[0] - (startSizeSetter[0] * sliderHeight)
       ]);
  }



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

      // d3.select("#linkSlider").style("visibility", "hidden");
      // sliderLeft = [0, 1];
  		// sliderRight = [0, 1];

      return;
    }

    var selectedAxis;

    var rangeTemp = d3.event.selection.map(y.invert);
    var range = rangeTemp.reverse();

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

      if(d3.select(radioID).property("checked")){

        selectedAxis = el;

        if (id === "#domainSlider") {

          if(type === "linear"){

            if(el === "AgeAtTx"){
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

    // delete myNomogram.filters[selectedAxis];
    // delete knnNomogram.filters[selectedAxis];

    // sliderLinking();
    updatePCP();
    updateKnnNomogram();
    changeParallelDisplayed(d3.select("#title4").selectAll('input').property('checked'));

    //d3.select(this).transition().call(d3.event.target.move, range.map(x));
    //d3.select(this).transition().call(d3.event.target.move, range.map(y));
  }

}
