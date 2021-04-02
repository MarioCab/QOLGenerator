var lat = 33.952602;
var lng = -84.549934;
var allMaps = `ed6a12bea346f8b0`;
var storeMap = `f405f4ac9fa44d8f`;
var parksMap = `84fb282f7a18eb54`;
var medicalMap = `c45b75f0bf14b409`;
var foodMap = `bdd06fabc2883316`;
var attractionsMap = `a2cdf53ce4646f08`;

function initAllMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: lat, lng: lng },
    zoom: 15,
    mapId: allMaps,
  });
}

function insertScript() {
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBAXFUJe8DV3hitr0g0IIU07bDHi5215qY&map_ids=${allMaps}&callback=initAllMap`;
  script.async = true;
  script.dataset.cfasync = false;
  document.body.appendChild(script);
  script.addEventListener("load", () => {
    console.log("yeahhhh");
    resolve();
  });
}
insertScript();
