var defaultOptions;

var travelSites = {
	"wikipedia": "http://wikipedia.org/wiki/{%location}",
	"gmaps": "http://maps.google.com/?q={%location}"
};

const tokenLocation = "{%location}";

document.addEventListener("DOMContentLoaded", function() {

	//initialize the browser action page
	initializeForm();

	//hook up the search button
    document.getElementById("buttonSearch").addEventListener("click", onSearch);
});

// Ensure that the browser action page is loaded with the last saved values (or defaults)
function initializeForm(){

}

// Search all through a list of websites with the user submitted location
// Open them in new tabs
function onSearch() {
	
	var location = document.getElementById("textboxLocation").value;

	// If the parameters are all valid, proceed with the search
	if (validateLocation(location)) {
		searchTravelSites(location);
	}
}

// Search the travel sites used by this extension
// and open a tab for each
function searchTravelSites(location) {

	var weblinks = [];
	
	for (var key in travelSites) {

		var preparedWL;

		if (key == "wikipedia") {
			preparedWL = parseWikipediaLink(travelSites[key],location);
		} else if (key == "gmaps") {
			preparedWL = parseGoogleMapsLink(travelSites[key],location);
		}

		weblinks.push(preparedWL);
	}

	// TODO: organize the below website opening code
	// TODO: make the below website opening code work with the 'new window' check box
	var windowCreateProperties = {
		url: weblinks
	};

	chrome.windows.create(windowCreateProperties);

	// var createProperties = {
	// 	url: 'http://www.ddg.gg',
	// 	// active: false, //default is true
	// };

	// chrome.tabs.create(createProperties, function(tab) {
		
	// });
}



	// // Iterate travel sites from array
	// var ctr;
	// for (ctr = 0; ctr < travelSites.length; ++ctr) {
 //    	openTravelSiteWithLocation(travelSites[ctr],location);
	// }


function parseWikipediaLink(site,location) {
	var parsedLink = site.replace(tokenLocation,location);
	return parsedLink;
}

function parseGoogleMapsLink(site,location) {
	var parsedLink = site.replace(tokenLocation,location);
	return parsedLink;
}

// Opens the travel site with the location provided. Each site
// has a different query strin defined by the travelSites array
function openTravelSiteWithLocation(travelSite,location) {
	var webLink = travelSite.replace(tokenLocation,location);
	console.log(webLink);

	// TODO: Add travel website search
	
	var windowCreateProperties = {
		url: ['http://www.ddg.gg', 'http://www.google.com']
	};

	chrome.windows.create(windowCreateProperties);

	// var createProperties = {
	// 	url: 'http://www.ddg.gg',
	// 	// active: false, //default is true
	// };

	// chrome.tabs.create(createProperties, function(tab) {
		
	// });
}

function validateLocation(location) {
	
	var status = true;

	// Fail if the location is empty
	if (!location){
		writeStatusMessage("Please enter a location", true);
		status = false;
	} 

	if (status) {
		writeStatusMessage("", true);
	}
	return status;
}

// Writes a status message to the screen. Informational or error, which get styled with CSS file
function writeStatusMessage(message, isError) {
	var status = document.getElementById("status");
	var statusError = document.getElementById("statusError");
	var timeout = 5000;

	if (isError) {
	    status.textContent = "";
	    statusError.textContent = message;
	} else {
	    statusError.textContent = "";
		status.textContent = message;
	}

	// Eventually blank the informational status message
    setTimeout(function() {
      status.textContent = ""; statusError.textContent = "";
    }, timeout);

}