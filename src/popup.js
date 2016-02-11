var defaultOptions;

document.addEventListener("DOMContentLoaded", function() {

	chrome.runtime.getBackgroundPage(function(eventPage){

		//initialize the browser action page
		initializeForm();

		//hook up the search button
	    document.getElementById("buttonSearch").addEventListener("click", onSearch);
	});
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
	// TODO: Add travel website search
	alert(location);
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
