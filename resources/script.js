var schoolData = $("#schoolData");
var crimeData = $("#crimeData");
var entertainmentData = $("#entertainmentData");
$("#map").empty();

let map;

var cityLat; 
var cityLng;


// Populates states dropdown
statesDropdown();
restaurantDropdown();
mapDropdown();
// state drop down JS
function statesDropdown() {
  var states = [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "District of Columbia",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
  ];
  for (i = 0; i < states.length; i++) {
    $("#states").append(
      `<option value="` +
        states[i] +
        `" id="` +
        states[i] +
        `">` +
        states[i] +
        `</option>`
    );
  }
}
function restaurantDropdown () {
  var restaurants = [
    "restaurants",
    "entertainment",
    "Vermont"
  ]
  for (i=0; i<restaurants.length; i++) {
    $("#restaurants").append(
      `<option value="` + restaurants[i] + `" id="` + restaurants[i] +`"> ` + restaurants[i] + `</option>` 
    )
     
  }
}
function mapDropdown () {
  var mapTypes = [
    "Stores",
    "Parks",
    "Food",
    "Medical",
    "Attractions",
  ]
  for (i=0; i<mapTypes.length; i++) {
    $("#maptypes").append(
      `<option value="` + mapTypes[i] + `" id="` + mapTypes[i] +`"> ` + mapTypes[i] + `</option>`
    )
  }
}
function getCity(business, lat, long, radius) {
  var apiUrl =
    `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=` +
    business +
    `&types=establishment&location=` +
    cityLat +
    `,` +
    cityLng +
    `&radius=` +
    radius +
    `&key=AIzaSyDcCM2rS8Baz7ZgnPKotI3POIqGsaZ4fDw`;
  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          waho(data);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function (error) {
      alert("Unable to connect to Google");
    });
}
// takes data from getCity() and does some work with it
function waho(data) {}
// provides initial map, source code from https://developers.google.com/maps/documentation/javascript/maptypes
// function initMap() {

//   $("#map").addClass("col-6 container-fluid");
//   map = new google.maps.Map(document.getElementById("map"), {
//     center: { lat: cityLat, lng: cityLng },
//     zoom: 10,
//   });
// }
// swaps the map to given lat and longitude, code from https://developers.google.com/maps/documentation/javascript/maptypes
function swapMap(latitude, longitude) {
  var myLatlng = new google.maps.LatLng(latitude, longitude);
  var mapOptions = {
    zoom: 10,
    center: myLatlng,
  };
  let map;
  map = new google.maps.Map(document.getElementById("map"), mapOptions);
}

// Tom's Code

var formInput = document.querySelector("#city-form");

var userCityInput = document.querySelector("#cityInput");

var stateInput = document.querySelector("#states");

var formSubmitHandler = function (event) {
  event.preventDefault();
  

  var userCity = userCityInput.value.trim();
  var userState = stateInput.value.trim();

  console.log(userState);

  var coorApiUrl =
    "https://api.opencagedata.com/geocode/v1/json?q=" +
    userCity +
    ", " +
    userState +
    "&key=267102cdda164e13b2260039c93d4966&language=en&pretty=1";

  fetch(coorApiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Anything involving using Lat or Long need to be in this (.then) function

      cityLat = data.results[0].geometry.lat;
      cityLng = data.results[0].geometry.lng;

      localStorage.clear();



    //   function initMap() {
    //     $("#map").addClass("col-6 container-fluid");
    //     let map;
    //     map = new google.maps.Map(document.getElementById("map"), {
    //       center: { lat: 33.776115270594, lng: -84.39885020256 },
    //       zoom: 10,
    //     });
    //   }

    getMap ();
    getCity();

    

      console.log(cityLat, cityLng);
    });
};

// function initMap() {

//   $("#map").addClass("col-6 container-fluid");
//   map = new google.maps.Map(document.getElementById("map"), {
//     center: {lat: cityLat, lng: cityLng},
//     zoom: 10,
//   });
// }

var getMap = function initMap() {

  $("#map").addClass("col-6 container-fluid");
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: cityLat, lng: cityLng },
    zoom: 10,
  });
}


formInput.addEventListener("submit", formSubmitHandler);
