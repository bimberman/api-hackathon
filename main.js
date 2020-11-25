var destinationFormElement = document.getElementById("destination-form");
var destinationGalleryElement = document.getElementById("destination-gallery");
var galleryTitleElement = document.getElementById("gallery-title");

var config = new Config();
var destinationForm = new DestinationForm(destinationFormElement);
var destinationGallery = new DestinationGallery(destinationGalleryElement, galleryTitleElement);
var tripAdvisor = new TripAdvisorAPI(config.apikey_TripAdvisor_fake_fake);
var app = new App(tripAdvisor, destinationForm, destinationGallery);
app.start();
