var App = App || {};

// first page entry point

function onChangeViz(i) {
	var viz1 = d3.select(".plainListDiv");
	var viz2 = d3.select(".imgDiv")
	if (i == 1) {
		viz1.style("visibility","visible");
		viz2.style("visibility","hidden");
	}else {
		viz2.style("visibility","visible");
		viz1.style("visibility","hidden");
	}
}
function onChangeForm(i) {
	var viz1 = d3.select(".enterForm");
	var viz2 = d3.select(".exploreFormDiv")
	if (i == 1) {
		viz1.style("visibility","visible");
		viz2.style("visibility","hidden");
	}else {
		viz2.style("visibility","visible");
		viz1.style("visibility","hidden");
	}
}

var nodes = [{name: "Preauricular",x: 0.53,y: 0.35,w: 0.035,h: 0.035 },
                     {name: "Posterior Auricular",x: 0.42,y: 0.35,w: 0.06,h: 0.06 },
                     {name: "Occipital",x: 0.35,y: 0.39,w: 0.055,h: 0.055 },
                     {name: "Parotid",x: 0.54,y: 0.40,w: 0.06,h: 0.07 },
                     {name: "Tonsillar",x: 0.52,y: 0.47,w: 0.045,h: 0.045 },
                     {name: "Superficial Cervical",x: 0.43,y: 0.48,w: 0.08,h: 0.073 },
                     {name: "Deep Cervical",x: 0.47,y: 0.56,w: 0.06,h: 0.25 },
                     {name: "Submandibular",x: 0.58,y: 0.56,w: 0.075,h: 0.06 },
                     {name: "Submental",x: 0.68,y: 0.56,w: 0.07,h: 0.05 },
                     {name: "Posterior Cervical",x: 0.38,y: 0.64,w: 0.065,h: 0.11 },
                     {name: "Superclavicular",x: 0.41,y: 0.8,w: 0.06,h: 0.05 }];
//Load data for viewer
var params = [];
params["worldSpace"] = false;

var preamble = "images/dicomEx/CT1.2.840.113619.2.55.1.1762894947.2051.1222170616.";
var firstID = 1;
var lastID = 271;
var delta = 549;

var images = [];
for (var i = firstID;i <= lastID;i++) {
	images.push(preamble + (delta + i) + "." + i + ".dcm");
}
params["images"] = [images];
console.log(images);


function updateSelect() {
	d3.select("#nodeMultipleSelect").selectAll("option")
	.attr("selected", function(d) {
		var t = d3.select(this).text();
		for (var i in nodes) {
			if (nodes[i].name == t) {
				if (nodes[i].active) {
					return "selected";
				}
			}
		}

	});
}

function createNodeDivs() {
	d3.select("#nodesImageDiv").selectAll("div").remove();
	var im = d3.select("#nodesImage");
	var imW = parseFloat(im.style("width"));
	var imH = parseFloat(im.style("height"));
	var dy = parseFloat(d3.select("#nodesImageTitle").style("height"));
	d3.select("#nodesImageDiv").selectAll("div").data(nodes).enter().append("div").style("position","absolute")
								.style("left",function(d) { return (d.x * imW) + "px";})
								.style("top",function(d) { return (d.y * imH + dy) + "px";})
								.style("width",function(d) { return (d.w * imW) + "px";})
								.style("height",function(d) { return (d.h * imH) + "px";})
								.style("background-color",function(d) { return d.active?"red":"transparent";})
								.style("opacity",0.5)
								.style("cursor","pointer")
								.on("click", function(d) { d.active = !d.active;
															updateSelect();
															createNodeDivs();});

}


function init() {
	var butt = new DoubleChoiceButton("#doubleButton","List","Image");
	var butt2 = new DoubleChoiceButton("#enter_explore","Enter","Explore");
	butt.onClick(onChangeViz);
	butt2.onClick(onChangeForm);
	createNodeDivs();

}


$(document).ready(function () {
            $(".dropdown-menu li a").click(function (e) {
                var selText = $(this).text();
                $(this).parents('.btn-group').find('.dropdown-toggle').html(selText + '<span class="caret"></span>');

            });

function isIn(el,arr) {
	for (var i in arr) {
		if (el == arr[i]){
			return true;
		}
	}
	return false;
}

$("#nodeMultipleSelect").change(function() {
	var sel =[];
	$('#nodeMultipleSelect :selected').each(function(i, selected){
		sel.push($(selected).text());
	});


	for (var i in nodes) {
		if (isIn(nodes[i].name,sel)) {
			nodes[i].active = true;
		}else {
			nodes[i].active = false;
		}
	}
	createNodeDivs();
});

$("#pform").submit(function(event) {
	event.preventDefault();
	$this = $(this);
	var ethnicity = $("#ethnicitySelect").val();
	var site = $("#siteTumorSelect").val();
	var name = $("#pname").val();
	var pid = $("#pid").val();
	var gender = $('input:radio[name=gender]:checked').val();
	var age = $("#page").val();
	var stage = $('input:radio[name=pstage]:checked').val();

	var valid = true;

	if (pid == "") {
		valid = false;
		$("#idFormGroup").addClass("has-error");
	}else {
		$("#idFormGroup").removeClass("has-error");
	}

	if (name == "") {
		valid = false;
		$("#nameFormGroup").addClass("has-error");
	}else {
		$("#nameFormGroup").removeClass("has-error");
	}

	if (gender == null) {
		valid = false;
		$("#genderFormGroup").addClass("has-error");
	}else {
		$("#genderFormGroup").removeClass("has-error");
	}

	if ((age == 0 || age < 0)) {
		valid = false;
		$("#ageFormGroup").addClass("has-error");
	}else {
		$("#ageFormGroup").removeClass("has-error");
	}

	if (ethnicity == 'Select Ethnicity') {
		valid = false;
		$("#ethnicityFormGroup").addClass("has-error");
	}else {
		$("#ethnicityFormGroup").removeClass("has-error");
	}

	if (site == 'Select Site of Tumor') {
		valid = false;
		$("#siteTumorFormGroup").addClass("has-error");
	}else {
		$("#siteTumorFormGroup").removeClass("has-error");
	}

	if (stage == null) {
		valid = false;
		$("#stageFormGroup").addClass("has-error");
	}else {
		$("#stageFormGroup").removeClass("has-error");
	}


	if (!valid) {
		return false;
	}
	var url = $this.attr('action') + '?' + pid + '&' + gender + '&' + age + '&' + ethnicity + '&' + site + '&' + stage + '&diagnose';
	window.location.href = url;

});

$("#exploreForm").submit(function(event) {
	event.preventDefault();
	$this = $(this);
	var ethnicity = $("#ethnicitySelect2").val();
	var site = $("#siteTumorSelect2").val();


	var valid = true;

	if (ethnicity == 'Select Ethnicity') {
		valid = false;
		$("#ethnicityFormGroup").addClass("has-error");
	}else {
		$("#ethnicityFormGroup").removeClass("has-error");
	}

	if (site == 'Select Site of Tumor') {
		valid = false;
		$("#siteTumorFormGroup").addClass("has-error");
	}else {
		$("#siteTumorFormGroup").removeClass("has-error");
	}

	if (!valid) {
		return false;
	}
	var url = $this.attr('action') + '?' + "-" + '&' + "-" + '&' + "-" + '&' + ethnicity + '&' + site + '&' + "-" + '&explore';
	window.location.href = url;

});

            $("map#imageMap").click(function (event) {
                var target = $(event.target);
                var targetId = target.attr('id');
                var matches = targetId.match(/\d+/)[0];
                if ($("#div" + matches).css('display') != 'none')
                {
                    $("#div" + matches).hide();
                }
                else {
                    $("#div" + matches).show();
                }
            });

            $("#lymphNode div").click(function (event) {
                var clicked = event.target;
                var currentID = clicked.id || "No ID!";
                if (currentID.indexOf("div") != -1)
                    $("#" + currentID).hide();
            });
        })
