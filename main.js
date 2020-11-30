const destinationFormElement = document.getElementById("destination-form");
const destinationGalleryElement = document.getElementById("destination-gallery");
const galleryTitleElement = document.getElementById("gallery-title");
const flightModalElement = document.getElementById("flight-modal");

const config = new Config();
const flightModal = new FlightModal(flightModalElement);
const skyscanner = new SkyscannerAPI(config.apikey_Skyscanner)
const destinationForm = new DestinationForm(destinationFormElement);
const destinationGallery = new DestinationGallery(destinationGalleryElement, galleryTitleElement);
const tripAdvisor = new TripAdvisorAPI(config.apikey_TripAdvisor_fake_fake);
const app = new App(tripAdvisor, skyscanner, destinationForm, destinationGallery, flightModal);
app.start();
