let allButTherapyAttrSet = {
  "knn-AgeAtTx": true,
  "knn-Gender": true,
  "knn-Ethnicity": true,
  "knn-Tcategory": true,
  "knn-Site": true,
  "knn-Nodal_Disease": true,
  "knn-ecog": true,
  "knn-Chemotherapy": false,
  "knn-Local_Therapy": false
};

function allButTherapy(checked) {
  console.log("allButTherapy", checked);

  if (checked) {
    for (let key of Object.keys(allButTherapyAttrSet)) {
      d3.select("#" + key).property("checked", allButTherapyAttrSet[key]);
    }
  }
  
  updateKnn();
}

function knnAttributeChanged(id, checked) {
  console.log("knnAttributeChanged", id, checked);

  let isTherapySearch = true;

  for (let key of Object.keys(allButTherapyAttrSet)) {
    if (d3.select("#" + key).property("checked") !== allButTherapyAttrSet[key]) {
      isTherapySearch = false;
    }
  }

  d3.select("#allButTherapy").property("checked", isTherapySearch)


  updateKnn();
}

function updateKnn() {
  let knnFilters = [];

  
  for (let id of Object.keys(allButTherapyAttrSet)) {
    if (!d3.select("#" + id).property("checked")) {
      let key = id.substring(4);
      
      knnFilters.push({"cat": key, "val":copyAllData[selectedID][key]});
    }
  }

  updatePCP();
  updateKnnNomogram();
  changeParallelDisplayed(
    d3
      .select("#title4")
      .selectAll("input")
      .property("checked")
  );

  // update star plots
  var star = new knnPlot(".rightDiv", copyAllData ,knnFilters);
}