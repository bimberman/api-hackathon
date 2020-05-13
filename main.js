var bannerElement = document.getElementById("banner");
var destinationFormElement = document.getElementById("destination-form");
var destinationTableElement = document.getElementById("destination-table");

var config = new Config();
var destinationForm = new DestinationForm(destinationFormElement);
var destinationTable = new DestinationTable(destinationTableElement);
var skyscanner = new SkyscannerAPI(config.apikey_Skyscanner);
var tripAdvisor = new TripAdvisorAPI(config.apikey_TripAdvisor);
var app = new App(skyscanner, tripAdvisor, destinationForm, destinationTable);
app.start();
