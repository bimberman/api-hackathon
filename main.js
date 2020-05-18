var bannerElement = document.getElementById("banner");
var destinationFormElement = document.getElementById("destination-form");
var destinationGalleryElement = document.getElementById("destination-gallery");
var galleryTitleElement = document.getElementById("gallery-title");

var config = new Config();
var destinationForm = new DestinationForm(destinationFormElement);
var destinationGallery = new DestinationGallery(destinationGalleryElement, galleryTitleElement);
var skyscanner = new SkyscannerAPI(config.apikey_Skyscanner);
var tripAdvisor = new TripAdvisorAPI(config.apikey_TripAdvisor_fake_fake);
var app = new App(skyscanner, tripAdvisor, destinationForm, destinationGallery);
app.start();
