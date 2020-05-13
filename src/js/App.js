class App{
  constructor(skyscannerAPI, tripAdvisorAPI, destinationForm, destinationTable){
    this.skyscannerAPI = skyscannerAPI;
    this.tripAdvisorAPI = tripAdvisorAPI;
    this.destinationForm = destinationForm;
    this.destinationTable = destinationTable;

    this.setDestinationId = this.setDestinationId.bind(this);
  }

  start() {
    this.destinationForm.onSubmit(this.tripAdvisorAPI.getTripAdvisorDestination);
    this.updateTable = this.destinationTable.updateTable;
    this.tripAdvisorAPI.sendDestinationId(this.setDestinationId);
    this.tripAdvisorAPI.updateTable(this.updateTable);
  }

  setDestinationId(destinationId){
    this.destinationId = destinationId;
  }
}
