class App{
  constructor(skyscannerAPI, tripAdvisorAPI, destinationForm, destinationTable){
    this.skyscannerAPI = skyscannerAPI;
    this.tripAdvisorAPI = tripAdvisorAPI;
    this.destinationForm = destinationForm;
    this.destinationTable = destinationTable;

    this.getTripAdvisorDestination = this.tripAdvisorAPI.getTripAdvisorDestination;
    this.getAttractions = this.tripAdvisorAPI.getAttractions;
  }

  start() {
    this.destinationForm.onSubmit(this.getTripAdvisorDestination)
  }
}
