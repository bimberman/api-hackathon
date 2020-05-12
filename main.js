var bannerElement = document.getElementById("banner");
var destinationFormElement = document.getElementById("destinationForm");
var destinationInformationElement = document.getElementById("destinationInformation");

var skyscanner = new SkyscannerAPI();
var tripAdvisor = new TripAdvisorAPI();
var app = new App(skyscanner, tripAdvisor, destinationFormElement, destinationInformationElement);
