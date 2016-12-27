// 0: hidden, 1: help, 2: about
var infoButtons = infoButtons || {};

function setupInfoButtons() {
	infoButtons.mode = 0;

	infoButtons.helpText = d3.select("#helpIconText");
	infoButtons.helpDiv = d3.select('#helpPanel');

	infoButtons.aboutText = d3.select("#aboutIconText");
	infoButtons.aboutDiv = d3.select('#aboutPanel');

	infoButtons.homeText = d3.select("#homeIconText");
	infoButtons.homeDiv = d3.select('#homePanel');

	infoButtons.helpStarText = d3.select("#helpIconText-Star");
	infoButtons.helpStarDiv = d3.select('#helpPanel-Star');

	infoButtons.helpNomogramText = d3.select("#helpIconText-Nomogram");
	infoButtons.helpNomogramDiv = d3.select('#helpPanel-Nomogram');

	infoButtons.helpSurvivalText = d3.select("#helpIconText-Survival");
	infoButtons.helpSurvivalDiv = d3.select('#helpPanel-Survival');

	infoButtons.helpMosaicText = d3.select("#helpIconText-Mosaic");
	infoButtons.helpMosaicDiv = d3.select('#helpPanel-Mosaic');

	infoButtons.overlay = d3.select(".iconOverlay");

	resetInfoButtons();
}


function infoButtonClicked(param) {
	console.log(param.className);

	// reset divs
	resetInfoButtons();

	if (param.className === "helpIcon") {
		if (infoButtons.infoMode !== 1) {
			// open help
			infoButtons.infoMode = 1
			openHelp();
		} else {
			infoButtons.infoMode = 0;
		}
	} else if (param.className === "aboutIcon") {
		if (infoButtons.infoMode !== 2) {
			// open about
			openAbout();
			infoButtons.infoMode = 2;
		} else {
			infoButtons.infoMode = 0;
		}
	} else if (param.className === "helpIconStar") {
		if (infoButtons.infoMode !== 3) {
			// open help for starPlot
			openHelpStar();
			infoButtons.infoMode = 3;
		} else {
			infoButtons.infoMode = 0;
		}
	} else if (param.className === "helpIconNomogram") {
		if (infoButtons.infoMode !== 4) {
			// open help for nomogram
			openHelpNomogram();
			infoButtons.infoMode = 4;
		} else {
			infoButtons.infoMode = 0;
		}
	} else if (param.className === "helpIconSurvival") {
		if (infoButtons.infoMode !== 5) {
			// open help for survvial over time
			openHelpSurvival();
			infoButtons.infoMode = 5;
		} else {
			infoButtons.infoMode = 0;
		}
	} else if (param.className === "helpIconMosaic") {
		if (infoButtons.infoMode !== 6) {
			// open help for mosaic
			openHelpMosaic();
			infoButtons.infoMode = 6;
		} else {
			infoButtons.infoMode = 0;
		}
	} else if (param.className === "homeIcon") {
		if (infoButtons.infoMode !== 7) {
			// open home
			openHome();
			infoButtons.infoMode = 7;
		} else {
			infoButtons.infoMode = 0;
		}
	}
}


function resetInfoButtons() {
	d3.select('#helpPanel').style("display", "none");
	d3.select('#aboutPanel').style("display", "none");
	d3.select('#homePanel').style("display", "none");
	d3.select('#helpPanel-Star').style("display", "none");
	d3.select('#helpPanel-Nomogram').style("display", "none");
	d3.select('#helpPanel-Survival').style("display", "none");
	d3.select('#helpPanel-Mosaic').style("display", "none");

	d3.select("#helpIconText").text("?");
	d3.select("#aboutIconText").text("i");
	d3.select("#homeIconText").text("H");
	d3.select("#helpIconText-Star").text("?");
	d3.select("#helpIconText-Nomogram").text("?");
	d3.select("#helpIconText-Survival").text("?");
	d3.select("#helpIconText-Mosaic").text("?");

	d3.select(".iconOverlay").style("display", "none");
}


function openHelp() {
	d3.select('#helpPanel').style("display", "block");

	d3.select("#helpIconText").text("X");

	d3.select(".iconOverlay").style("display", "block");

	drawArrowHelp("#helpArrow");
}

function openAbout() {
	d3.select('#aboutPanel').style("display", "block");

	d3.select("#aboutIconText").text("X");

	d3.select(".iconOverlay").style("display", "block");
}

function openHome() {
	location.href = "./index.html"; // use for home
}

function openHelpStar() {
	d3.select('#helpPanel-Star').style("display", "block");

	d3.select("#helpIconText-Star").text("X");

	// d3.select(".iconOverlay").style("display", "block");

	drawArrowStar("#helpArrow-Star");
}

function openHelpNomogram() {
	d3.select('#helpPanel-Nomogram').style("display", "block");

	d3.select("#helpIconText-Nomogram").text("X");

	// d3.select(".iconOverlay").style("display", "block");

	drawArrowNomogram("#helpArrow-Nomogram");
}

function openHelpSurvival() {
	d3.select('#helpPanel-Survival').style("display", "block");

	d3.select("#helpIconText-Survival").text("X");

	// d3.select(".iconOverlay").style("display", "block");

	drawArrowSurvival("#helpArrow-Survival");
}

function openHelpMosaic() {
	d3.select('#helpPanel-Mosaic').style("display", "block");

	d3.select("#helpIconText-Mosaic").text("X");

	// d3.select(".iconOverlay").style("display", "block");

	drawArrowMosaic("#helpArrow-Mosaic");
}
