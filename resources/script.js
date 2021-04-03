const histBtnGrp = document.getElementById("history-button-group");
const histDrpGrp = document.getElementById("history-dropdown");
const searchBtn = $("#searchBtn");
const storedHist = localStorage.getItem("storedHistStr");

let map;
var cityLat;
var cityLng;
let userCity;
let userState;
var searchTxt;
let searchInnerTxt;
let mapID;
let mapTypes;

var formInput = document.querySelector("#city-form");
var userCityInput = document.querySelector("#cityInput");
var stateInput = document.querySelector("#states");

var allMaps = `ed6a12bea346f8b0`;
var storeMap = `f405f4ac9fa44d8f`;
var parksMap = `84fb282f7a18eb54`;
var medicalMap = `c45b75f0bf14b409`;
var foodMap = `bdd06fabc2883316`;
var attractionsMap = `a2cdf53ce4646f08`;

var formInput = document.querySelector("#city-form");
var userCityInput = document.querySelector("#cityInput");
var stateInput = document.querySelector("#states");
var userTypeInput = document.querySelector("#maptypes");

$("#map").empty(); //EMPTY MAP

// Populates state and maptype dropdowns-------------------
statesDropdown();
mapDropdown();

// state drop down JS-----------------------------
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

// Maptype dropdown function----------------------
function mapDropdown() {
  var mapTypes = ["All", "Stores", "Parks", "Food", "Medical", "Attractions"];
  for (i = 0; i < mapTypes.length; i++) {
    $("#maptypes").append(
      `<option value="` +
        mapTypes[i] +
        `" id="` +
        mapTypes[i] +
        `"> ` +
        mapTypes[i] +
        `</option>`
    );
  }
}

// UNUSED CODE SAVED FOR POSTERITY --------------------------------
// function getCity(business, lat, long, radius) {
//   console.log("get city fired");
//   var apiUrl =
//     `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=` +
//     business +
//     `&types=establishment&location=` +
//     cityLat +
//     `,` +
//     cityLng +
//     `&radius=` +
//     radius +
//     `&key=AIzaSyBAXFUJe8DV3hitr0g0IIU07bDHi5215qY&map_ids=ed6a12bea346f8b0`;
//   fetch(apiUrl)
//     .then(function (response) {
//       if (response.ok) {
//         response.json().then(function (data) {
//           // waho(data);
//         });
//       } else {
//         alert("Error: " + response.statusText);
//       }
//     })
//     .catch(function (error) {
//       alert("Unable to connect to Google");
//     });
// }

// MAKE USER INPUT USABLE BY OTHER FUNCTIONS----------------
var formSubmitHandler = function (event) {
  event.preventDefault();

  userCity = userCityInput.value.trim();
  userState = stateInput.value.trim();
  mapTypes = userTypeInput.value;

  searchInnerTxt = `${userCity}, ${userState}, ${maptypes}`;

  searchTxt = {
    cityState: `${userCity}, ${userState}`,
    map: mapTypes,
  };

  console.log(userState);

  // GET LAT/LONG------------------------
  var coorApiUrl =
    "https://api.opencagedata.com/geocode/v1/json?q=" +
    searchTxt.cityState +
    "&key=267102cdda164e13b2260039c93d4966&language=en&pretty=1";

  fetch(coorApiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Anything involving using Lat or Long need to be in this (.then) function

      cityLat = data.results[0].geometry.lat;
      cityLng = data.results[0].geometry.lng;

      saveInput();
      switchFunction();
    });
};

// maptype switch function-----------------------
function switchFunction() {
  // getCity();
  console.log(cityLat, cityLng);

  switch (mapTypes) {
    case "All": //day === 'monday'
      mapID = `ed6a12bea346f8b0`;
      break;

    case "Stores":
      mapID = storeMap;
      break;

    case "Parks":
      mapID = `84fb282f7a18eb54`;
      break;

    case "Medical":
      mapID = `c45b75f0bf14b409`;
      break;
    case "Food":
      mapID = `bdd06fabc2883316`;
      break;

    case "Attractions":
      mapID = `a2cdf53ce4646f08`;
      break;

    default:
      mapID = `ed6a12bea346f8b0`;
  }
  console.log(mapID);
  insertScript();
}

// initialize map function-----------------------
function initAllMap() {
  console.log("initAllMap fired");
  $("#map").addClass("col-6 container-fluid");
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: cityLat, lng: cityLng },
    zoom: 15,
    mapId: mapID,
  });
}

// insert google script function to refernce specific maptype----------------------
function insertScript() {
  if (document.getElementById("newMap")) {
    document.getElementById("newMap").remove();
  }
  const script = document.createElement("script");
  script.setAttribute("id", "newMap");
  script.type = "text/javascript";
  script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBAXFUJe8DV3hitr0g0IIU07bDHi5215qY&map_ids=${mapID}&callback=initAllMap`;
  script.async = true;
  script.dataset.cfasync = false;
  document.body.appendChild(script);
}

// SUBMIT BUTTON LISTENER---------
formInput.addEventListener("submit", formSubmitHandler);

//STORE SEARCH TEXT IN LOCAL STORAGE ---------------------------
if (storedHist == null) {
  histArr = [];
} else {
  histArr = JSON.parse(storedHist);
}

function saveInput() {
  console.log("submit button clicked");

  console.log(searchTxt);
  histArr.unshift(searchTxt);
  if (histArr.length > 4) {
    //limited to 4 for visual appeal on smaller screens
    histArr.pop();
  }

  localStorage.setItem("storedHistStr", JSON.stringify(histArr));
  histBtnGrp.innerHTML = "";
  histArr.forEach(makeHistoryBtn);
}
//CREATE HISTORY BUTTONS AND INJECT INTO HTML--------------------------------------------------
histArr.forEach(makeHistoryBtn);
function makeHistoryBtn(item, index) {
  const searchCap =
    item.cityState.charAt(0).toUpperCase() + item.cityState.slice(1);

  console.log("makeHistoryBtn fired");
  const historyBtn = document.createElement("button");
  historyBtn.setAttribute("id", `button-${index}`);
  historyBtn.setAttribute("type", "button");
  historyBtn.setAttribute("class", "btn border histBtn");
  historyBtn.innerHTML = searchCap + ", " + item.map;
  historyBtn.dataset.cityState = item.cityState;
  historyBtn.dataset.map = item.map;
  histBtnGrp.appendChild(historyBtn);

  //FUNCTION TO MAKE HISTORY BUTTONS FUNCTION ON CLICK---------------------------------------------------
  $(historyBtn).on("click", function fillField() {
    console.log("button pressed" + this.dataset.citySt);
    searchTxt = this.dataset.cityState;
    mapTypes = this.dataset.map;

    var coorApiUrl =
      "https://api.opencagedata.com/geocode/v1/json?q=" +
      searchTxt +
      "&key=267102cdda164e13b2260039c93d4966&language=en&pretty=1";

    fetch(coorApiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        // Anything involving using Lat or Long need to be in this (.then) function

        cityLat = data.results[0].geometry.lat;
        cityLng = data.results[0].geometry.lng;
        console.log(cityLat, cityLng);
        switchFunction();
      });
  });
}
