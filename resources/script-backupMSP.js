var schoolData = $("#schoolData");
var crimeData = $("#crimeData");
var entertainmentData = $("#entertainmentData");
$("#map").empty();

let map;

var cityLat; 
var cityLng;
const histBtnGrp = document.getElementById("history-button-group");
const histDrpGrp = document.getElementById("history-dropdown");
const searchBtn = $("#searchBtn")
const storedHist = localStorage.getItem("storedHistStr"); //string of all stored score data

let userCity;
let userState;
var searchTxt;
var formInput = document.querySelector("#city-form");

var userCityInput = document.querySelector("#cityInput");

var stateInput = document.querySelector("#states");




// Populates states dropdown
statesDropdown();
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
// function getCity(business, cityLat, cityLng, radius) {
//   var apiUrl =
//     `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=` +
//     business +
//     `&types=establishment&location=` +
//     cityLat +
//     `,` +
//     cityLng +
//     `&radius=` +
//     radius +
//     `&key=AIzaSyDcCM2rS8Baz7ZgnPKotI3POIqGsaZ4fDw`;
//   fetch(apiUrl)
//     .then(function (response) {
//       if (response.ok) {
//         response.json().then(function (data) {
//           waho(data);
//         });
//       } else {
//         alert("Error: " + response.statusText);
//       }
//     })
//     .catch(function (error) {
//       alert("Unable to connect to Google");
//     });
// }
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

var formSubmitHandler = function (event) {
  event.preventDefault();
  

   userCity = userCityInput.value.trim();
   userState = stateInput.value.trim();

   searchTxt = `${userCity}, ${userState}`;

  

  console.log(userState);

  var coorApiUrl =
    "https://api.opencagedata.com/geocode/v1/json?q=" +searchTxt+
    // userCity +
    // ", " +
    // userState +
    "&key=267102cdda164e13b2260039c93d4966&language=en&pretty=1";

  fetch(coorApiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Anything involving using Lat or Long need to be in this (.then) function

      cityLat = data.results[0].geometry.lat;
      cityLng = data.results[0].geometry.lng;

      // localStorage.clear();



    //   function initMap() {
    //     $("#map").addClass("col-6 container-fluid");
    //     let map;
    //     map = new google.maps.Map(document.getElementById("map"), {
    //       center: { lat: 33.776115270594, lng: -84.39885020256 },
    //       zoom: 10,
    //     });
    //   }

    getMap ();
    // getCity();
  
    saveInput();

    

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

//STORE SEARCH TEXT IN LOCAL STORAGE ---------------------------
if (storedHist == null) {
  histArr = [];
} else {
  histArr = JSON.parse(storedHist);
}

function saveInput() {
  const searchCap = searchTxt.charAt(0).toUpperCase() + searchTxt.slice(1)

  console.log("submit button clicked");
  
  console.log(searchTxt);
  console.log(searchCap);
  histArr.unshift(searchCap);
  if (histArr.length > 10) {
    histArr.pop();
  }

  localStorage.setItem("storedHistStr", JSON.stringify(histArr));
  histBtnGrp.innerHTML = "";
  histDrpGrp.innerHTML = "";
  histArr.forEach(makeHistoryBtn);
};
//CREATE HISTORY BUTTONS AND DROPDOWN BUTTONS ON MOBILE SCREENS--------------------------------------------------
histArr.forEach(makeHistoryBtn);
function makeHistoryBtn(item, index) {
  console.log("makeHistoryBtn fired")
  const historyBtn = document.createElement("button");
  historyBtn.setAttribute("id", `button-${index}`);
  historyBtn.setAttribute("type", "button");
  historyBtn.setAttribute("class", "btn btn-light border histBtn");
  historyBtn.innerHTML = `${item}`;
  histBtnGrp.appendChild(historyBtn);
  const histDrp = document.createElement("button");
  histDrp.setAttribute("id", `button-${index}`);
  histDrp.setAttribute("type", "button");
  histDrp.setAttribute("class", "btn btn-light histBtn");
  histDrp.innerHTML = `${item}`;
  histDrpGrp.appendChild(histDrp);
  //MAKE BUTTONS AND DROPDOWNS FUNCTION---------------------------------------------------
  $(historyBtn).on("click", function fillField() {
    console.log("button pressed" + this.innerText);
    searchTxt=this.innerText;
    // searchInput.value = this.innerText;
    // searchBtn.click();
    var coorApiUrl =
    "https://api.opencagedata.com/geocode/v1/json?q=" +searchTxt+
    // userCity +
    // ", " +
    // userState +
    "&key=267102cdda164e13b2260039c93d4966&language=en&pretty=1";

  fetch(coorApiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Anything involving using Lat or Long need to be in this (.then) function

      cityLat = data.results[0].geometry.lat;
      cityLng = data.results[0].geometry.lng;

      // localStorage.clear();



    //   function initMap() {
    //     $("#map").addClass("col-6 container-fluid");
    //     let map;
    //     map = new google.maps.Map(document.getElementById("map"), {
    //       center: { lat: 33.776115270594, lng: -84.39885020256 },
    //       zoom: 10,
    //     });
    //   }

    getMap ();
    // getCity();
  
saveInput();

    

      console.log(cityLat, cityLng);
    });

  });

  $(histDrp).on("click", function fillField() {
    console.log("button pressed" + this.innerText);
    searchInput.value = this.innerText;
    searchBtn.click();
  });
}
