class App{
  constructor(skyscannerAPI, tripAdvisorAPI, destinationForm, destinationGallery){
    this.skyscannerAPI = skyscannerAPI;
    this.tripAdvisorAPI = tripAdvisorAPI;
    this.destinationForm = destinationForm;
    this.destinationGallery = destinationGallery;

    this.setDestinationId = this.setDestinationId.bind(this);
    this.setUserDestination = this.setUserDestination.bind(this);
  }

  start() {
    this.destinationForm.onSubmit(this.tripAdvisorAPI.getTripAdvisorDestination,
                                  this.skyscannerAPI.getSkyscannerDestination);
    this.destinationForm.setAppUserDestination(this.setUserDestination);

    this.tripAdvisorAPI.sendDestinationId(this.setDestinationId);
    this.tripAdvisorAPI.updateGallery(this.destinationGallery.updateGallery);
  }

  setUserDestination(destination){
    destinationGallery.updateCity(destination);
  }
  setDestinationId(destinationId){
    this.destinationId = destinationId;
  }
}
