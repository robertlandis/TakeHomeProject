/**
 * jQuery and underscore are already included for you if you want to use them for the project.
 *
 * Also included are three JSON files that define three constants: routes, stops, and routeStops.
 * Those consts have all the data you'll need for this project. You can find the source files in the data directory.
 */

$(function () {
	displayRouteDropdown();
});

//This is a helper function we're giving you to insert any HTML you want inside an element with the specified id
function InsertText(Id, Text) {
	const Element = document.getElementById(Id);
	Element.innerHTML = Text;
}

function displayRouteDropdown() {
	const dropdownOptions = Object.keys(routes).map((routeId) => {
		const route = routes[routeId];
		return `<option value='${route.routeId}'>${route.shortName} - ${route.longName}</option>`;
	});
	InsertText(
		"mainContent",
		`
		<div>
			<p>
				Pick a route:
				<select id='routeSelect' onChange='displayStopsForRoute(this)'>
					<option value=''></option>
					${dropdownOptions.join("")}
				</select>
			</p>
			<div id='stopList'></div>
		</div>
	`
	);
}

function displayStopsForRoute(routeSelect) {
	const routeId = routeSelect.options[routeSelect.selectedIndex].value;
	const stopsOnRoute = getStopsForRoute(routeId);
	const stopList = stopsOnRoute.map((stopId, index) => {
		const stop = stops[stopId];
		return `<div>Stop ${index + 1}: ${stop.name}</div>`;
	});
	InsertText("stopList", stopList.join(""));
}

function getStopsForRoute(routeId) {
	const stopIds = [];
	Object.keys(routeStops).forEach((routeStopId) => {
		const routeStop = routeStops[routeStopId];
		if (routeStop.routeId == routeId) {
			stopIds.push(routeStop.stopId);
		}
	});
	return stopIds;
}
