/*************** Arrows & texts in Star ***************/
function drawArrowStar(id) {
  d3.select(id).selectAll("*").remove();

  var  width = window.innerWidth,
       height = window.innerHeight;

  var svg = d3.select(id).append("svg")
    // .append("g")
    // .attr("viewBox", "0 0 300 840")
    .attr("width", width)
    .attr("height", height)
    .style("background-color", "none");

  /*************** text ***************/
  var size = d3.min([width, height])/50;
  var textX = width * 0.22;
  var textY = height * 0.11;

  var arrowTextL1 = svg.append("text")
    .attr("x", textX)
    .attr("y", textY)
    .attr("fill", "white")
    .style("font-size", ""+size)
    .text("The patient you selected");

  /********************/
  var textX = width * 0.22;
  var textY = height * 0.21;

  var arrowTextL1 = svg.append("text")
    .attr("x", textX)
    .attr("y", textY)
    .attr("fill", "white")
    .style("font-size", ""+size)
    .text("Glyph encoding 8 characteristics of the patient");

  //
  var textX = width * 0.3;

  var arrowTextL1 = svg.append("text")
    .attr("x", textX)
    .attr("y", textY + size * 1.5)
    .attr("fill", "white")
    .style("font-size", ""+size)
    .text("Ethnicity");

  var arrowTextL2 = svg.append("text")
    .attr("x", textX)
    .attr("y", textY + size * 2.5)
    .attr("fill", "white")
    .style("font-size", ""+size)
    .text("Site");

  var arrowTextL3 = svg.append("text")
    .attr("x", textX)
    .attr("y", textY + size * 3.5)
    .attr("fill", "white")
    .style("font-size", ""+size)
    .text("Tcategory");

  var arrowTextL4 = svg.append("text")
    .attr("x", textX)
    .attr("y", textY + size * 4.5)
    .attr("fill", "white")
    .style("font-size", ""+size)
    .text("Gender");

  var arrowTextL5 = svg.append("text")
    .attr("x", textX)
    .attr("y", textY + size * 5.5)
    .attr("fill", "white")
    .style("font-size", ""+size)
    .text("Nodal_Disease");

  var arrowTextL6 = svg.append("text")
    .attr("x", textX)
    .attr("y", textY + size * 6.5)
    .attr("fill", "white")
    .style("font-size", ""+size)
    .text("ecog");

  var arrowTextL7 = svg.append("text")
    .attr("x", textX)
    .attr("y", textY + size * 7.5)
    .attr("fill", "white")
    .style("font-size", ""+size)
    .text("Chemotherapy");

  var arrowTextL8 = svg.append("text")
    .attr("x", textX)
    .attr("y", textY + size * 8.5)
    .attr("fill", "white")
    .style("font-size", ""+size)
    .text("Local_Therapy");

  /********************/
  var textX = width * 0.25;
  var textY = height * 0.43;

  var arrowTextL1 = svg.append("text")
    .attr("x", textX)
    .attr("y", textY)
    .attr("fill", "white")
    .style("font-size", ""+size)
    .text("The glyph color indicates probability of survival");

  /********************/
  var textX = width * 0.25;
  var textY = height * 0.55;

  var arrowTextL1 = svg.append("text")
    .attr("x", textX)
    .attr("y", textY)
    .attr("fill", "white")
    .style("font-size", ""+size)
    .text("The 5 most similar patients in the repository");

  /********************/
  var textX = width * 0.25;
  var textY = height * 0.65;

  var arrowTextL1 = svg.append("text")
    .attr("x", textX)
    .attr("y", textY)
    .attr("fill", "white")
    .style("font-size", ""+size)
    .text("Mouse over glyphs for details");

  /******************** Arrows ********************/
  var pathFunc = d3.line()
    .x(function(d) {return d.x;})
    .y(function(d) {return d.y;});

  var arrow1Path1 = [{"x": width * 0.25, "y": height * 0.12},
                     {"x": width * 0.25, "y": height * 0.145},
                     {"x": width * 0.115, "y": height * 0.145}];

  var arrow1_1 = svg.append("path")
    .attr("d", pathFunc(arrow1Path1))
    .style("stroke", "white")
    .style("stroke-width", 2)
    .style("fill", "none");

  var arrow1Path2 = [{"x": width * 0.125, "y": height * 0.135},
                     {"x": width * 0.115, "y": height * 0.145},
                     {"x": width * 0.125, "y": height * 0.155}];

  var arrow1_2 = svg.append("path")
    .attr("d", pathFunc(arrow1Path2))
    .style("stroke", "white")
    .style("stroke-width", 2)
    .style("fill", "none");

  /********************/
  var arrow2Path1 = [{"x": width * 0.27, "y": height * 0.22},
                     {"x": width * 0.27, "y": height * 0.31},
                     {"x": width * 0.095, "y": height * 0.31}];

  var arrow2_1 = svg.append("path")
    .attr("d", pathFunc(arrow2Path1))
    .style("stroke", "white")
    .style("stroke-width", 2)
    .style("fill", "none");

  var arrow2Path2 = [{"x": width * 0.105, "y": height * 0.3},
                     {"x": width * 0.095, "y": height * 0.31},
                     {"x": width * 0.105, "y": height * 0.32}];

  var arrow2_2 = svg.append("path")
    .attr("d", pathFunc(arrow2Path2))
    .style("stroke", "white")
    .style("stroke-width", 2)
    .style("fill", "none");

  /********************/
  var arrow3Path1 = [{"x": width * 0.3, "y": height * 0.44},
                     {"x": width * 0.3, "y": height * 0.47},
                     {"x": width * 0.05, "y": height * 0.47}];

  var arrow3_1 = svg.append("path")
    .attr("d", pathFunc(arrow3Path1))
    .style("stroke", "white")
    .style("stroke-width", 2)
    .style("fill", "none");

  var arrow3Path2 = [{"x": width * 0.06, "y": height * 0.46},
                     {"x": width * 0.05, "y": height * 0.47},
                     {"x": width * 0.06, "y": height * 0.48}];

  var arrow3_2 = svg.append("path")
    .attr("d", pathFunc(arrow3Path2))
    .style("stroke", "white")
    .style("stroke-width", 2)
    .style("fill", "none");

  /********************/
  var arrow4Path1 = [{"x": width * 0.245, "y": height * 0.545},
                     {"x": width * 0.23, "y": height * 0.545},
                     {"x": width * 0.23, "y": height * 0.25},
                     {"x": width * 0.21, "y": height * 0.25}];

  var arrow4_1 = svg.append("path")
    .attr("d", pathFunc(arrow4Path1))
    .style("stroke", "white")
    .style("stroke-width", 2)
    .style("fill", "none");

  var arrow4Path2 = [{"x": width * 0.22, "y": height * 0.24},
                     {"x": width * 0.21, "y": height * 0.25},
                     {"x": width * 0.22, "y": height * 0.26}];

  var arrow4_2 = svg.append("path")
    .attr("d", pathFunc(arrow4Path2))
    .style("stroke", "white")
    .style("stroke-width", 2)
    .style("fill", "none");

  //
  var arrow4Path3 = [{"x": width * 0.23, "y": height * 0.545},
                     {"x": width * 0.23, "y": height * 0.86},
                     {"x": width * 0.21, "y": height * 0.86}];

  var arrow4_3 = svg.append("path")
    .attr("d", pathFunc(arrow4Path3))
    .style("stroke", "white")
    .style("stroke-width", 2)
    .style("fill", "none");

  var arrow4Path4 = [{"x": width * 0.22, "y": height * 0.85},
                     {"x": width * 0.21, "y": height * 0.86},
                     {"x": width * 0.22, "y": height * 0.87}];

  var arrow4_4 = svg.append("path")
    .attr("d", pathFunc(arrow4Path4))
    .style("stroke", "white")
    .style("stroke-width", 2)
    .style("fill", "none");

}


/*************** Arrows & texts in Nomogram ***************/
function drawArrowNomogram(id) {
  d3.select(id).selectAll("*").remove();

  var  width = window.innerWidth,
       height = window.innerHeight;

  var svg = d3.select(id).append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("background-color", "none");

  // add more
  // Each scale height is proportional to the weight of that variable in the predictive model.
  // Click and drag along a scale to filter the data


  /********************/
  var box = svg.append("rect")
    .attr("rx", 10)
    .attr("ry", 10)
    .attr("x", width * 0.265)
    .attr("y", height * 0.14)
    .attr("width", width * 0.145)
    .attr("height", height * 0.29)
    .attr("stroke", "gray")
    .attr("stroke-width", 2)
    .attr("fill", "none");

  /*************** text ***************/
  var size = d3.min([width, height])/50;
  var textX = width * 0.3;
  var textY = height * 0.03;
  var arrowTextL1 = svg.append("text")
    .attr("x", textX)
    .attr("y", textY)
    .attr("fill", "white")
    .style("font-size", ""+size)
    .text("The nomogram is a graphical calculating device. Each vertical scale corresponds to one patient variable.");

  var arrowTextL2 = svg.append("text")
    .attr("x", textX)
    .attr("y", textY + size)
    .attr("fill", "white")
    .style("font-size", ""+size)
    .text("The rightmost scale corresponds to the computed probability of survival.");

  /********************/
  var textX = width * 0.61;
  var textY = height * 0.5;
  var arrowTextL1 = svg.append("text")
    .attr("x", textX)
    .attr("y", textY)
    .attr("fill", "white")
    .style("font-size", ""+size)
    .text("The thick dark polyline corresponds to the patient you selected.");

  var arrowTextL2 = svg.append("text")
    .attr("x", textX)
    .attr("y", textY + size)
    .attr("fill", "white")
    .style("font-size", ""+size)
    .text("The remaning polylines correspond to the 5 most similar patients.");

  var arrowTextL3 = svg.append("text")
    .attr("x", textX)
    .attr("y", textY + size * 2)
    .attr("fill", "white")
    .style("font-size", ""+size)
    .text("Color encodes the currently selected variable (e.g., Tcategory).");

  /********************/
  var textX = width * 0.65;
  var textY = height * 0.18;

  var arrowTextL1 = svg.append("text")
    .attr("x", textX)
    .attr("y", textY)
    .attr("fill", "white")
    .style("font-size", ""+size)
    .text("Uncheck to show all patients");

  var arrowTextL1 = svg.append("text")
    .attr("x", textX)
    .attr("y", textY + size * 1.5)
    .attr("fill", "white")
    .style("font-size", ""+size)
    .text("Check to remove filters from KNN search (e.g., remove Gender");

  var arrowTextL2 = svg.append("text")
    .attr("x", textX)
    .attr("y", textY + size * 2.5)
    .attr("fill", "white")
    .style("font-size", ""+size)
    .text("to search over both men and women patients)");

  /********************/
  var textX = width * 0.45;
  var textY = height * 0.25;
  var arrowTextL1 = svg.append("text")
    .attr("x", textX)
    .attr("y", textY)
    .attr("fill", "white")
    .style("font-size", ""+size)
    .text("Use this panel to control which");

  var arrowTextL2 = svg.append("text")
    .attr("x", textX)
    .attr("y", textY + size)
    .attr("fill", "white")
    .style("font-size", ""+size)
    .text("scales and scale-intervals are shown");

  /******************** Arrows ********************/
  var pathFunc = d3.line()
    .x(function(d) {return d.x;})
    .y(function(d) {return d.y;});

  //
  var arrow1Path1 = [{"x": width * 0.432, "y": height * 0.32},
                     {"x": width * 0.45, "y": height * 0.32},
                     {"x": width * 0.45, "y": height * 0.495}];

  var arrow1_1 = svg.append("path")
    .attr("d", pathFunc(arrow1Path1))
    .style("stroke", "white")
    .style("stroke-width", 2)
    .style("fill", "none");

  var arrow1Path2 = [{"x": width * 0.44, "y": height * 0.31},
                     {"x": width * 0.432, "y": height * 0.32},
                     {"x": width * 0.44, "y": height * 0.33}];

  var arrow1_2 = svg.append("path")
    .attr("d", pathFunc(arrow1Path2))
    .style("stroke", "white")
    .style("stroke-width", 2)
    .style("fill", "none");

  var arrowTextL2 = svg.append("text")
    .attr("x", width * 0.45)
    .attr("y", height * 0.5 + size)
    .attr("fill", "white")
    .style("font-size", ""+size)
    .style("text-anchor", "middle")
    .text("Click and drag along a scale to filter the data");

  /********************/
  //
  var arrow1Path1 = [{"x": width * 0.545, "y": height * 0.31},
                     {"x": width * 0.56, "y": height * 0.31},
                     {"x": width * 0.56, "y": height * 0.56}];

  var arrow1_1 = svg.append("path")
    .attr("d", pathFunc(arrow1Path1))
    .style("stroke", "white")
    .style("stroke-width", 2)
    .style("fill", "none");

  var arrow1Path2 = [{"x": width * 0.555, "y": height * 0.3},
                     {"x": width * 0.545, "y": height * 0.31},
                     {"x": width * 0.555, "y": height * 0.32}];

  var arrow1_2 = svg.append("path")
    .attr("d", pathFunc(arrow1Path2))
    .style("stroke", "white")
    .style("stroke-width", 2)
    .style("fill", "none");

  var arrowTextL2 = svg.append("text")
    .attr("x", width * 0.56)
    .attr("y", height * 0.52 + size * 3)
    .attr("fill", "white")
    .style("font-size", ""+size)
    .style("text-anchor", "middle")
    .text("Each scale height is proportional to the weight of that variable in the predictive model.");

  /********************/

  var arrow1Path1 = [{"x": width * 0.645, "y": height * 0.175},
                     {"x": width * 0.49, "y": height * 0.175},
                     {"x": width * 0.49, "y": height * 0.145}];

  var arrow1_1 = svg.append("path")
    .attr("d", pathFunc(arrow1Path1))
    .style("stroke", "white")
    .style("stroke-width", 2)
    .style("fill", "none");

  var arrow1Path2 = [{"x": width * 0.485, "y": height * 0.16},
                     {"x": width * 0.49, "y": height * 0.145},
                     {"x": width * 0.495, "y": height * 0.16}];

  var arrow1_2 = svg.append("path")
    .attr("d", pathFunc(arrow1Path2))
    .style("stroke", "white")
    .style("stroke-width", 2)
    .style("fill", "none");

  /********************/
  var arrow2Path1 = [{"x": width * 0.645, "y": height * 0.205},
                     {"x": width * 0.62, "y": height * 0.205},
                     {"x": width * 0.62, "y": height * 0.145}];

  var arrow2_1 = svg.append("path")
    .attr("d", pathFunc(arrow2Path1))
    .style("stroke", "white")
    .style("stroke-width", 2)
    .style("fill", "none");

  var arrow2Path2 = [{"x": width * 0.615, "y": height * 0.16},
                     {"x": width * 0.62, "y": height * 0.145},
                     {"x": width * 0.625, "y": height * 0.16}];

  var arrow2_2 = svg.append("path")
    .attr("d", pathFunc(arrow2Path2))
    .style("stroke", "white")
    .style("stroke-width", 2)
    .style("fill", "none");

  /********************/
  var arrow3Path1 = [{"x": width * 0.605, "y": height * 0.495},
                     {"x": width * 0.57, "y": height * 0.495},
                     {"x": width * 0.57, "y": height * 0.41}];

  var arrow3_1 = svg.append("path")
    .attr("d", pathFunc(arrow3Path1))
    .style("stroke", "white")
    .style("stroke-width", 2)
    .style("fill", "none");

  var arrow3Path2 = [{"x": width * 0.565, "y": height * 0.425},
                     {"x": width * 0.57, "y": height * 0.41},
                     {"x": width * 0.575, "y": height * 0.4255}];

  var arrow3_2 = svg.append("path")
    .attr("d", pathFunc(arrow3Path2))
    .style("stroke", "white")
    .style("stroke-width", 2)
    .style("fill", "none");

  /********************/
  var arrow4Path1 = [{"x": width * 0.49, "y": height * 0.235},
                     {"x": width * 0.49, "y": height * 0.21},
                     {"x": width * 0.35, "y": height * 0.21}];

  var arrow4_1 = svg.append("path")
    .attr("d", pathFunc(arrow4Path1))
    .style("stroke", "white")
    .style("stroke-width", 2)
    .style("fill", "none");

  var arrow4Path2 = [{"x": width * 0.36, "y": height * 0.2},
                     {"x": width * 0.35, "y": height * 0.21},
                     {"x": width * 0.36, "y": height * 0.22}];

  var arrow4_2 = svg.append("path")
    .attr("d", pathFunc(arrow4Path2))
    .style("stroke", "white")
    .style("stroke-width", 2)
    .style("fill", "none");
}


/*************** Arrows & texts in Survival ***************/
function drawArrowSurvival(id) {
  d3.select(id).selectAll("*").remove();

  var  width = window.innerWidth,
       height = window.innerHeight;

  var svg = d3.select(id).append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("background-color", "none");

  /*************** text ***************/
  var size = d3.min([width, height])/50;
  var textX = width * 0.25;
  var textY = height * 0.53;

  var arrowTextL1 = svg.append("text")
    .attr("x", textX)
    .attr("y", textY)
    .attr("fill", "white")
    .style("font-size", ""+size)
    .text("Kaplan Meier plot showing survival");

  var arrowTextL2 = svg.append("text")
    .attr("x", textX)
    .attr("y", textY + size)
    .attr("fill", "white")
    .style("font-size", ""+size)
    .text("over time per patient group,");

  var arrowTextL3 = svg.append("text")
    .attr("x", textX)
    .attr("y", textY + size * 2)
    .attr("fill", "white")
    .style("font-size", ""+size)
    .text("depending on the selected attribute.");

  /******************** Arrows ********************/
  var pathFunc = d3.line()
    .x(function(d) {return d.x;})
    .y(function(d) {return d.y;});

  var arrow1Path1 = [{"x": width * 0.37, "y": height * 0.58},
                     {"x": width * 0.37, "y": height * 0.62},
                     {"x": width * 0.52, "y": height * 0.62},
                     {"x": width * 0.52, "y": height * 0.59}];

  var arrow1_1 = svg.append("path")
    .attr("d", pathFunc(arrow1Path1))
    .style("stroke", "white")
    .style("stroke-width", 2)
    .style("fill", "none");

  var arrow1Path2 = [{"x": width * 0.515, "y": height * 0.605},
                     {"x": width * 0.52, "y": height * 0.59},
                     {"x": width * 0.525, "y": height * 0.605}];

  var arrow1_2 = svg.append("path")
    .attr("d", pathFunc(arrow1Path2))
    .style("stroke", "white")
    .style("stroke-width", 2)
    .style("fill", "none");

  /********************/
  var arrow2Path1 = [{"x": width * 0.31, "y": height * 0.51},
                     {"x": width * 0.31, "y": height * 0.48},
                     {"x": width * 0.53, "y": height * 0.48},
                     {"x": width * 0.53, "y": height * 0.51}];

  var arrow2_1 = svg.append("path")
    .attr("d", pathFunc(arrow2Path1))
    .style("stroke", "white")
    .style("stroke-width", 2)
    .style("fill", "none");

  var arrow2Path2 = [{"x": width * 0.525, "y": height * 0.495},
                     {"x": width * 0.53, "y": height * 0.51},
                     {"x": width * 0.535, "y": height * 0.495}];

  var arrow2_2 = svg.append("path")
    .attr("d", pathFunc(arrow2Path2))
    .style("stroke", "white")
    .style("stroke-width", 2)
    .style("fill", "none");
}


/*************** Arrows & texts in Mosaic ***************/
function drawArrowMosaic(id) {
  d3.select(id).selectAll("*").remove();

  var  width = window.innerWidth,
       height = window.innerHeight;

  var svg = d3.select(id).append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("background-color", "none");

  /******************** text ********************/
  var size = d3.min([width, height])/50;

  var textX = width * 0.7;
  var textY = height * 0.46;

  var arrowTextL1 = svg.append("text")
    .attr("x", textX)
    .attr("y", textY)
    .attr("fill", "white")
    .style("font-size", ""+size)
    .text("Mosaic plot showing the relative patient distributions");

  var arrowTextL2 = svg.append("text")
    .attr("x", textX)
    .attr("y", textY + size)
    .attr("fill", "white")
    .style("font-size", ""+size)
    .text("across patient groups. Blue shows the groups whose");

  var arrowTextL3 = svg.append("text")
    .attr("x", textX)
    .attr("y", textY + size * 2)
    .attr("fill", "white")
    .style("font-size", ""+size)
    .text("probability of survial is bigger than the selected threshold.");

  /********************/
  var textX = width * 0.59;
  var textY = height * 0.67;

  var arrowTextL1 = svg.append("text")
    .attr("x", textX)
    .attr("y", textY)
    .attr("fill", "white")
    .style("font-size", ""+size)
    .text("Use the menu and filter bar to");

  var arrowTextL2 = svg.append("text")
    .attr("x", textX)
    .attr("y", textY + size)
    .attr("fill", "white")
    .style("font-size", ""+size)
    .text("drill down a particular subgroup.");

  /********************/
  var textX = width * 0.59;
  var textY = height * 0.82;

  var arrowTextL1 = svg.append("text")
    .attr("x", textX)
    .attr("y", textY)
    .attr("fill", "white")
    .style("font-size", ""+size)
    .text("Mouse over to see # of patients");

  var arrowTextL2 = svg.append("text")
    .attr("x", textX)
    .attr("y", textY + size)
    .attr("fill", "white")
    .style("font-size", ""+size)
    .text("in that group, survival probability,");

  var arrowTextL3 = svg.append("text")
    .attr("x", textX)
    .attr("y", textY + size * 2)
    .attr("fill", "white")
    .style("font-size", ""+size)
    .text("and standard deviation.");

  /******************** Arrows ********************/
  var pathFunc = d3.line()
    .x(function(d) {return d.x;})
    .y(function(d) {return d.y;});

  var arrow1Path1 = [{"x": width * 0.955, "y": height * 0.495},
                     {"x": width * 0.98, "y": height * 0.495},
                     {"x": width * 0.98, "y": height * 0.90},
                     {"x": width * 0.955, "y": height * 0.90}];

  var arrow1_1 = svg.append("path")
    .attr("d", pathFunc(arrow1Path1))
    .style("stroke", "white")
    .style("stroke-width", 2)
    .style("fill", "none");

  var arrow1Path2 = [{"x": width * 0.965, "y": height * 0.89},
                     {"x": width * 0.955, "y": height * 0.90},
                     {"x": width * 0.965, "y": height * 0.91}];

  var arrow1_2 = svg.append("path")
    .attr("d", pathFunc(arrow1Path2))
    .style("stroke", "white")
    .style("stroke-width", 2)
    .style("fill", "none");

  /********************/
  var arrow2Path1 = [{"x": width * 0.65, "y": height * 0.65},
                     {"x": width * 0.65, "y": height * 0.62},
                     {"x": width * 0.735, "y": height * 0.62}];

  var arrow2_1 = svg.append("path")
    .attr("d", pathFunc(arrow2Path1))
    .style("stroke", "white")
    .style("stroke-width", 2)
    .style("fill", "none");

  var arrow2Path2 = [{"x": width * 0.725, "y": height * 0.61},
                     {"x": width * 0.735, "y": height * 0.62},
                     {"x": width * 0.725, "y": height * 0.63}];

  var arrow2_2 = svg.append("path")
    .attr("d", pathFunc(arrow2Path2))
    .style("stroke", "white")
    .style("stroke-width", 2)
    .style("fill", "none");

  /********************/
  var arrow3Path1 = [{"x": width * 0.7, "y": height * 0.8},
                     {"x": width * 0.7, "y": height * 0.77},
                     {"x": width * 0.84, "y": height * 0.77}];

  var arrow3_1 = svg.append("path")
    .attr("d", pathFunc(arrow3Path1))
    .style("stroke", "white")
    .style("stroke-width", 2)
    .style("fill", "none");

  var arrow3Path2 = [{"x": width * 0.83, "y": height * 0.76},
                     {"x": width * 0.84, "y": height * 0.77},
                     {"x": width * 0.83, "y": height * 0.78}];

  var arrow3_2 = svg.append("path")
    .attr("d", pathFunc(arrow3Path2))
    .style("stroke", "white")
    .style("stroke-width", 2)
    .style("fill", "none");
}


/*************** Arrows & texts in Help ***************/
function drawArrowHelp(id) {
  d3.select(id).selectAll("*").remove();

  var  width = window.innerWidth,
       height = window.innerHeight;

  var svg = d3.select(id).append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("background-color", "none");

  /******************** text ********************/
  var size = d3.min([width, height])/45;

  var textX = width * 0.005;
  var textY = height * 0.025;

  var arrowTextL1 = svg.append("text")
    .attr("x", textX)
    .attr("y", textY)
    .attr("fill", "white")
    .style("font-size", ""+size)
    .text("Current Patient and Most Similar Patients");

  /********************/
  var textX = width * 0.2;
  var textY = height * 0.06;

  var arrowTextL1 = svg.append("text")
    .attr("x", textX)
    .attr("y", textY)
    .attr("fill", "white")
    .style("font-size", ""+size)
    .text("Help for this Panel");

  /********************/
  var textX = width * 0.4;
  var textY = height * 0.025;

  var arrowTextL1 = svg.append("text")
    .attr("x", textX)
    .attr("y", textY)
    .attr("fill", "white")
    .style("font-size", ""+size)
    .text("Graphical Calculating Device for Probability of Survival");

  /********************/
  var textX = width * 0.78;
  var textY = height * 0.03;

  var arrowTextL1 = svg.append("text")
    .attr("x", textX)
    .attr("y", textY)
    .attr("fill", "white")
    .style("font-size", ""+size)
    .text("About the Project");

  /********************/
  var textX = width * 0.78;
  var textY = height * 0.06;

  var arrowTextL1 = svg.append("text")
    .attr("x", textX)
    .attr("y", textY)
    .attr("fill", "white")
    .style("font-size", ""+size)
    .text("Home page");

  /********************/
  var textX = width * 0.385;
  var textY = height * 0.485;

  var arrowTextL1 = svg.append("text")
    .attr("x", textX)
    .attr("y", textY)
    .attr("fill", "white")
    .style("font-size", ""+size)
    .text("Probability of Survival over Time");

  /********************/
  var textX = width * 0.72;
  var textY = height * 0.485;

  var arrowTextL1 = svg.append("text")
    .attr("x", textX)
    .attr("y", textY)
    .attr("fill", "white")
    .style("font-size", ""+size)
    .text("Subgroup Analysis");

  /******************** Arrows ********************/
  var pathFunc = d3.line()
    .x(function(d) {return d.x;})
    .y(function(d) {return d.y;});

  var arrow1Path1 = [{"x": width * 0.06, "y": height * 0.03},
                     {"x": width * 0.06, "y": height * 0.15}];

  var arrow1_1 = svg.append("path")
    .attr("d", pathFunc(arrow1Path1))
    .style("stroke", "white")
    .style("stroke-width", 2)
    .style("fill", "none");

  var arrow1Path2 = [{"x": width * 0.055, "y": height * 0.135},
                     {"x": width * 0.06, "y": height * 0.15},
                     {"x": width * 0.065, "y": height * 0.135}];

  var arrow1_2 = svg.append("path")
    .attr("d", pathFunc(arrow1Path2))
    .style("stroke", "white")
    .style("stroke-width", 2)
    .style("fill", "none");

  /********************/
  var arrow2Path1 = [{"x": width * 0.235, "y": height * 0.07},
                     {"x": width * 0.235, "y": height * 0.095},
                     {"x": width * 0.195, "y": height * 0.095}];

  var arrow2_1 = svg.append("path")
    .attr("d", pathFunc(arrow2Path1))
    .style("stroke", "white")
    .style("stroke-width", 2)
    .style("fill", "none");

  var arrow2Path2 = [{"x": width * 0.202, "y": height * 0.087},
                     {"x": width * 0.195, "y": height * 0.095},
                     {"x": width * 0.202, "y": height * 0.103}];

  var arrow2_2 = svg.append("path")
    .attr("d", pathFunc(arrow2Path2))
    .style("stroke", "white")
    .style("stroke-width", 2)
    .style("fill", "none");

  /********************/
  var arrow3Path1 = [{"x": width * 0.46, "y": height * 0.03},
                     {"x": width * 0.46, "y": height * 0.15}];

  var arrow3_1 = svg.append("path")
    .attr("d", pathFunc(arrow3Path1))
    .style("stroke", "white")
    .style("stroke-width", 2)
    .style("fill", "none");

  var arrow3Path2 = [{"x": width * 0.455, "y": height * 0.135},
                     {"x": width * 0.46, "y": height * 0.15},
                     {"x": width * 0.465, "y": height * 0.135}];

  var arrow3_2 = svg.append("path")
    .attr("d", pathFunc(arrow3Path2))
    .style("stroke", "white")
    .style("stroke-width", 2)
    .style("fill", "none");

  /********************/
  // var arrow4Path1 = [{"x": width * 0.87, "y": height * 0.018},
  //                    {"x": width * 0.93, "y": height * 0.018}];
  var arrow4Path1 = [{"x": width * 0.855, "y": height * 0.04},
                     {"x": width * 0.855, "y": height * 0.105},
                     {"x": width * 0.94, "y": height * 0.105},
                     {"x": width * 0.94, "y": height * 0.08}];

  var arrow4_1 = svg.append("path")
    .attr("d", pathFunc(arrow4Path1))
    .style("stroke", "white")
    .style("stroke-width", 2)
    .style("fill", "none");

  var arrow4Path2 = [{"x": width * 0.935, "y": height * 0.095},
                     {"x": width * 0.94, "y": height * 0.08},
                     {"x": width * 0.945, "y": height * 0.095}];

  var arrow4_2 = svg.append("path")
    .attr("d", pathFunc(arrow4Path2))
    .style("stroke", "white")
    .style("stroke-width", 2)
    .style("fill", "none");

  //
  var arrow4Path1 = [{"x": width * 0.81, "y": height * 0.07},
                     {"x": width * 0.81, "y": height * 0.12},
                     {"x": width * 0.967, "y": height * 0.12},
                     {"x": width * 0.967, "y": height * 0.08}];

  var arrow4_1 = svg.append("path")
    .attr("d", pathFunc(arrow4Path1))
    .style("stroke", "white")
    .style("stroke-width", 2)
    .style("fill", "none");

  var arrow4Path2 = [{"x": width * 0.962, "y": height * 0.095},
                     {"x": width * 0.967, "y": height * 0.08},
                     {"x": width * 0.972, "y": height * 0.095}];

  var arrow4_2 = svg.append("path")
    .attr("d", pathFunc(arrow4Path2))
    .style("stroke", "white")
    .style("stroke-width", 2)
    .style("fill", "none");

  /********************/
  var arrow5Path1 = [{"x": width * 0.45, "y": height * 0.49},
                     {"x": width * 0.45, "y": height * 0.58}];

  var arrow5_1 = svg.append("path")
    .attr("d", pathFunc(arrow5Path1))
    .style("stroke", "white")
    .style("stroke-width", 2)
    .style("fill", "none");

  var arrow5Path2 = [{"x": width * 0.445, "y": height * 0.565},
                     {"x": width * 0.45, "y": height * 0.58},
                     {"x": width * 0.455, "y": height * 0.565}];

  var arrow5_2 = svg.append("path")
    .attr("d", pathFunc(arrow5Path2))
    .style("stroke", "white")
    .style("stroke-width", 2)
    .style("fill", "none");

  /********************/
  var arrow6Path1 = [{"x": width * 0.77, "y": height * 0.49},
                     {"x": width * 0.77, "y": height * 0.57}];

  var arrow6_1 = svg.append("path")
    .attr("d", pathFunc(arrow6Path1))
    .style("stroke", "white")
    .style("stroke-width", 2)
    .style("fill", "none");

  var arrow6Path2 = [{"x": width * 0.765, "y": height * 0.555},
                     {"x": width * 0.77, "y": height * 0.57},
                     {"x": width * 0.775, "y": height * 0.555}];

  var arrow6_2 = svg.append("path")
    .attr("d", pathFunc(arrow6Path2))
    .style("stroke", "white")
    .style("stroke-width", 2)
    .style("fill", "none");

}
