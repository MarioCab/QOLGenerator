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
let searchInnerTxt;
var formInput = document.querySelector("#city-form");

var userCityInput = document.querySelector("#cityInput");

var stateInput = document.querySelector("#states");




// Populates states dropdown
statesDropdown();
// restaurantDropdown();
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
// function restaurantDropdown () {
//   var restaurants = [
//     "restaurants",
//     "entertainment",
//     "Vermont"
//   ]
//   for (i=0; i<restaurants.length; i++) {
//     $("#restaurants").append(
//       `<option value="` + restaurants[i] + `" id="` + restaurants[i] +`"> ` + restaurants[i] + `</option>` 
//     )
     
//   }
// }
function mapDropdown () {
  var mapTypes = [
    "All",
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
  console.log('get city fired')
  var apiUrl =
    `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=` +
    business +
    `&types=establishment&location=` +
    cityLat +
    `,` +
    cityLng +
    `&radius=` +
    radius +
    `&key=AIzaSyBAXFUJe8DV3hitr0g0IIU07bDHi5215qY&map_ids=ed6a12bea346f8b0`;
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
// function swapMap(latitude, longitude) {
//   console.log('swapmap fired')
//   var myLatlng = new google.maps.LatLng(latitude, longitude);
//   var mapOptions = {
//     zoom: 10,
//     center: myLatlng,
//   };
//   let map;
//   map = new google.maps.Map(document.getElementById("map"), mapOptions);
// }

// Tom's Code

var formInput = document.querySelector("#city-form");

var userCityInput = document.querySelector("#cityInput");

var stateInput = document.querySelector("#states");

var userTypeInput = document.querySelector("#maptypes");

var formSubmitHandler = function (event) {
  event.preventDefault();
  

   userCity = userCityInput.value.trim();
   userState = stateInput.value.trim();
   mapTypes = userTypeInput.value;

   searchInnerTxt= `${userCity}, ${userState}, ${maptypes}`


   searchTxt = {
     cityState:`${userCity}, ${userState}`,
     map:mapTypes
   }
   
  //  `${userCity}, ${userState}, ${mapTypes}`;

  
  console.log(userState);

  var coorApiUrl =
    "https://api.opencagedata.com/geocode/v1/json?q=" +searchTxt.cityState+
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

    // getMap ();
    // getCity();
  
    // saveInput();
    // // getMap ();
    // getCity();
    

    

    //   console.log(cityLat, cityLng);

    //   switch (mapTypes) {
    //     case 'All': //day === 'monday'
    //         mapID = `ed6a12bea346f8b0`;
    //         break;
      
    //     case 'Stores':
    //         mapID = storeMap;
    //         break;
      
    //     case 'Parks':
    //         mapID = `84fb282f7a18eb54`;
    //         break;
      
    //     case 'Medical':
    //         mapID = `c45b75f0bf14b409`;
    //         break;
    //     case 'Food':
    //         mapID = `bdd06fabc2883316`;
    //         break;
      
    //     case 'Attractions':
    //         mapID = `a2cdf53ce4646f08`;
    //         break;
        
    //     default:
    //       mapID = `ed6a12bea346f8b0`;
    //   }
    //   console.log(mapID);
    //   insertScript();
      saveInput();
      switchFunction();
    });
};

function switchFunction (){
  // saveInput();
  getCity();
  console.log(cityLat, cityLng);

  switch (mapTypes) {
    case 'All': //day === 'monday'
        mapID = `ed6a12bea346f8b0`;
        break;
  
    case 'Stores':
        mapID = storeMap;
        break;
  
    case 'Parks':
        mapID = `84fb282f7a18eb54`;
        break;
  
    case 'Medical':
        mapID = `c45b75f0bf14b409`;
        break;
    case 'Food':
        mapID = `bdd06fabc2883316`;
        break;
  
    case 'Attractions':
        mapID = `a2cdf53ce4646f08`;
        break;
    
    default:
      mapID = `ed6a12bea346f8b0`;
  }
  console.log(mapID);
  insertScript();


}
// var getMap = function initMap() {

// var lat = cityLat;
// var lng = cityLng;
var allMaps = `ed6a12bea346f8b0`;
var storeMap = `f405f4ac9fa44d8f`;
var parksMap = `84fb282f7a18eb54`;
var medicalMap = `c45b75f0bf14b409`;
var foodMap = `bdd06fabc2883316`;
var attractionsMap = `a2cdf53ce4646f08`;

function initAllMap() {
  console.log('initAllMap fired')
  $("#map").addClass("col-6 container-fluid");
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: cityLat, lng: cityLng },
    zoom: 15,
    mapId: mapID,
  });
}

function insertScript() {
  if(document.getElementById("newMap")) {
    document.getElementById("newMap").remove();
  }
  const script = document.createElement("script");
  script.setAttribute('id', 'newMap');
  script.type = "text/javascript";
  script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBAXFUJe8DV3hitr0g0IIU07bDHi5215qY&map_ids=${mapID}&callback=initAllMap`;
  script.async = true;
  script.dataset.cfasync = false;
  document.body.appendChild(script);
  script.addEventListener("load", () => {
    // resolve();
  });
}


// var getMap = function initMap() {

//   
//   map = new google.maps.Map(document.getElementById("map"), {
//     center: { lat: cityLat, lng: cityLng },
//     zoom: 10,
//   });
// }


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
  // console.log(searchCap);
  histArr.unshift(searchTxt);
  if (histArr.length > 10) {
    histArr.pop();
  }

  localStorage.setItem("storedHistStr", JSON.stringify(histArr));
  histBtnGrp.innerHTML = "";
  // histDrpGrp.innerHTML = "";
  histArr.forEach(makeHistoryBtn);
};
//CREATE HISTORY BUTTONS AND DROPDOWN BUTTONS ON MOBILE SCREENS--------------------------------------------------
histArr.forEach(makeHistoryBtn);
function makeHistoryBtn(item, index) {
  const searchCap = item.cityState.charAt(0).toUpperCase() + item.cityState.slice(1)

  console.log("makeHistoryBtn fired")
  const historyBtn = document.createElement("button");
  historyBtn.setAttribute("id", `button-${index}`);
  historyBtn.setAttribute("type", "button");
  historyBtn.setAttribute("class", "btn btn-light border histBtn");
  historyBtn.innerHTML = searchCap + ", " + item.map;
  historyBtn.dataset.cityState = item.cityState;
  historyBtn.dataset.map=item.map;
  histBtnGrp.appendChild(historyBtn);
  const histDrp = document.createElement("button");
  histDrp.setAttribute("id", `button-${index}`);
  histDrp.setAttribute("type", "button");
  histDrp.setAttribute("class", "btn btn-light histBtn");
  histDrp.innerHTML = `${item}`;
  histDrpGrp.appendChild(histDrp);
  //MAKE BUTTONS AND DROPDOWNS FUNCTION---------------------------------------------------
  $(historyBtn).on("click", function fillField() {
    console.log("button pressed" + this.dataset.citySt);
    searchTxt=this.dataset.cityState;
    mapTypes=this.dataset.map;
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

    // getMap ();
    // getCity();
  
    // saveInput();

    

      console.log(cityLat, cityLng);
      switchFunction();
    });

  });

  // $(histDrp).on("click", function fillField() {
  //   console.log("button pressed" + this.innerText);
  //   searchInput.value = this.innerText;
  //   searchBtn.click();
  // });
}
let mapID;
let mapTypes;

// insertScript();

// switch (mapTypes) {
//   case 'All': //day === 'monday'
//       mapID = `ed6a12bea346f8b0`;
//       break;

//   case 'Stores':
//       mapID = storeMap;
//       break;

//   case 'Parks':
//       mapID = `84fb282f7a18eb54`;
//       break;

//   case 'Medical':
//       mapID = `c45b75f0bf14b409`;
//       break;
//   case 'Food':
//       mapID = `bdd06fabc2883316`;
//       break;

//   case 'Attractions':
//       mapID = `a2cdf53ce4646f08`;
//       break;
  
//   default:
//     mapID = `ed6a12bea346f8b0`;
// }


// insertScript();

// function getNearbyPlaces() {
//   var placesURL = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=33.776,-84.398&radius=5000&type=police&key=AIzaSyBAXFUJe8DV3hitr0g0IIU07bDHi5215qY`;
//   fetch(placesURL)
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//     });
// }
// getNearbyPlaces();

