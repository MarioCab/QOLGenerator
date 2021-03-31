var schoolData = $("#schoolData");
var crimeData = $("crimeData");
var entertainmentData = $("#entertainmentData");
// Populates states dropdown
statesDropdown();
function statesDropdown() {
    var states = ['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming']
    debugger;
    for (i=0; i<states.length;i++){
        $("#states").append(`<option value="` + states[i] + `" id="` + states[i] + `">` + states[i] + `</option>`)
    }
}