class App{
  constructor(tripAdvisorAPI, skyscannerAPI, destinationForm, destinationGallery, flightModalForm, flightModalPriceList){
    this.tripAdvisorAPI = tripAdvisorAPI;
    this.skyscannerAPI = skyscannerAPI;
    this.destinationForm = destinationForm;
    this.destinationGallery = destinationGallery;
    this.flightModalForm = flightModalForm;
    this.flightModalPriceList = flightModalPriceList;

    this.setDestinationId = this.setDestinationId.bind(this);
    this.setUserDestination = this.setUserDestination.bind(this);
    this.setAirports = this.setAirports.bind(this);
    this.getPrices = this.getPrices.bind(this);
    this.setPrices = this.setPrices.bind(this);
    this.getMinPrice = this.getMinPrice.bind(this);
  }

  start() {
    this.skyscannerAPI.sendPrices(this.setPrices)
    this.skyscannerAPI.sendAirports(this.setAirports)

    this.destinationForm.onSubmit(this.tripAdvisorAPI.getTripAdvisorDestination);
    this.destinationForm.setAppUserDestination(this.setUserDestination);

    this.tripAdvisorAPI.sendDestinationId(this.setDestinationId);
    this.tripAdvisorAPI.updateGallery(this.destinationGallery.updateGallery);

    this.flightModalForm.getSkyscannerAirportCodes(this.skyscannerAPI.getSkyscannerAirports)
    this.flightModalForm.getAppPrice(this.getPrices)
  }

  setUserDestination(destination){
    this.destinationGallery.updateCity(destination);
    this.flightModalForm.setDestination(destination);
    this.skyscannerAPI.getSkyscannerAirports(destination);
  }

  setDestinationId(destinationId){
    this.destinationId = destinationId;
  }

  setAirports(airports){
    this.flightModalForm.setAirports(airports)
  }

  getPrices(oAirport, dAirport, dDate, rDate){
    this.skyscannerAPI.getPrices(oAirport, dAirport)
    this.flightModalPriceList.setDates(dDate, rDate)
  }

  setPrices(data){
    this.flightModalPriceList.updatePriceList(data)
  }

  getMinPrice(){
    let minPrice = 0;
    if(this.prices && this.prices.length){
      for(var priceIndex=0; priceIndex<this.prices.length; priceIndex++){
        if (!minPrice || minPrice > this.prices[priceIndex]){
          minPrice = this.prices[priceIndex];
        }
      }
    }
    return minPrice;
  }
}
