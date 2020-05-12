var bannerElement = document.getElementById("banner");
var destinationFormElement = document.getElementById("destinationForm");
var destinationInformationElement = document.getElementById("destinationInformation");

var config = new Config();
var skyscanner = new SkyscannerAPI(config.apikey_Skyscanner);
var tripAdvisor = new TripAdvisorAPI(config.apikey_TripAdvisor);
var app = new App(skyscanner, tripAdvisor, destinationFormElement, destinationInformationElement);
