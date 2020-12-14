const destinationFormElement = document.getElementById("destination-form");
const originFormElement = document.getElementById("origin-form");
const destinationGalleryElement = document.getElementById("destination-gallery");
const galleryTitleElement = document.getElementById("gallery-title");
const flightModalFormElement = document.getElementById("flight-modal");
const flightModalPriceListElement = document.getElementById("flight-gallery");

const config = new Config();
const flightModalPriceList = new FlightModalPriceList(flightModalPriceListElement)
const flightModalForm = new FlightModalForm(flightModalFormElement);
const skyscanner = new SkyscannerAPI(config.apikey_Skyscanner)
const flightForm = new FlightForm(destinationFormElement, originFormElement);
const destinationGallery = new DestinationGallery(destinationGalleryElement, galleryTitleElement);
const tripAdvisor = new TripAdvisorAPI(config.apikey_TripAdvisor_fake_fake);
const app = new App(tripAdvisor, skyscanner, flightForm, destinationGallery, flightModalForm, flightModalPriceList);
app.start();
