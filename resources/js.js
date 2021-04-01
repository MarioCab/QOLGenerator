var schoolData = $("#schoolData");
var crimeData = $("#crimeData");
var entertainmentData = $("#entertainmentData");
$("#map").empty();
// Populates states dropdown
statesDropdown();
// state drop down JS
function statesDropdown() {
    var states = ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming']
    for (i=0; i<states.length;i++){
        $("#states").append(`<option value="` + states[i] + `" id="` + states[i] + `">` + states[i] + `</option>`)
    }
}
function getCity() {
    var apiUrl = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?input=Waffle House&types=establishment&location=33.753746, -84.386330&radius=10000&key=AIzaSyDcCM2rS8Baz7ZgnPKotI3POIqGsaZ4fDw'
    fetch(apiUrl)
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                    waho(data);
                
        });
        } else {
            alert('Error: ' + response.statusText);
        }
    })
    .catch(function (error) {
        alert('Unable to connect to Google');
    });
};
// takes data from getCity() and does some work with it
function waho(data){
    debugger;
    var count = data.predictions.length;
    $("#entertainmentData").empty();
    $("#entertainmentData").append(`<p>There are ` + count + ` Waffle Houses in this city.`)
}
// provides initial map, source code from https://developers.google.com/maps/documentation/javascript/maptypes
function initMap() {
    $("#map").addClass("col-6 container-fluid");
    let map;
    map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 33.776115270594, lng: -84.39885020256 },
    zoom: 10,
    });
}
// swaps the map to given lat and longitude, code from https://developers.google.com/maps/documentation/javascript/maptypes
function swapMap(latitude, longitude) {
    var myLatlng = new google.maps.LatLng(latitude, longitude);
    var mapOptions = {
    zoom: 10,
    center: myLatlng,
};
let map;
map = new google.maps.Map(document.getElementById("map"),
    mapOptions);
}