var bannerElement = document.getElementById("banner");
var destinationFormElement = document.getElementById("destination-form");
var destinationGalleryElement = document.getElementById("destination-gallery");
var galleryTitleElement = document.getElementById("gallery-title");
var flightInfoElement = document.getElementById("flight-info");

var config = new Config();
var destinationForm = new DestinationForm(destinationFormElement);
var destinationGallery = new DestinationGallery(destinationGalleryElement, galleryTitleElement, flightInfoElement);
var skyscanner = new SkyscannerAPI(config.apikey_Skyscanner);
var tripAdvisor = new TripAdvisorAPI(config.apikey_TripAdvisor_new);
var app = new App(skyscanner, tripAdvisor, destinationForm, destinationGallery);
app.start();
