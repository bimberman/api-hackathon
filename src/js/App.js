class App{
  constructor(tripAdvisorAPI, skyscannerAPI, flightForm, destinationGallery, flightModalForm, flightModalPriceList){
    this.tripAdvisorAPI = tripAdvisorAPI;
    this.skyscannerAPI = skyscannerAPI;
    this.flightForm = flightForm;
    this.destinationGallery = destinationGallery;
    this.flightModalForm = flightModalForm;
    this.flightModalPriceList = flightModalPriceList;

    this.setDestinationId = this.setDestinationId.bind(this);
    this.setUserDestination = this.setUserDestination.bind(this);
    this.setUserOrigin = this.setUserOrigin.bind(this);
    this.setAirports = this.setAirports.bind(this);
    this.getPrices = this.getPrices.bind(this);
    this.setPrices = this.setPrices.bind(this);
    this.getMinPrice = this.getMinPrice.bind(this);
  }

  start() {
    this.skyscannerAPI.sendPrices(this.setPrices)
    this.skyscannerAPI.sendAirports(this.setAirports)

    this.flightForm.onSubmit(this.tripAdvisorAPI.getTripAdvisorDestination);
    this.flightForm.setAppUserDestination(this.setUserDestination);
    this.flightForm.setAppUserOrigin(this.setUserOrigin);
    this.flightForm.openModal(this.flightModalForm.openModal);

    this.tripAdvisorAPI.sendDestinationId(this.setDestinationId);
    this.tripAdvisorAPI.updateGallery(this.destinationGallery.updateGallery);

    this.flightModalForm.getSkyscannerDestinationAirportCodes(this.skyscannerAPI.getSkyscannerDestinationAirports)
    this.flightModalForm.getSkyscannerOriginAirportCodes(this.skyscannerAPI.getSkyscannerOriginAirports)
    this.flightModalForm.getAppPrice(this.getPrices)
  }

  setUserDestination(destination){
    this.destinationGallery.updateCity(destination);
    this.flightModalForm.setCity(destination, false);
  }

  setUserOrigin(origin) {
    this.flightModalForm.setCity(origin, true);
  }

  setDestinationId(destinationId){
    this.destinationId = destinationId;
  }

  setAirports(airports, isOrigin){
    this.flightModalForm.setAirports(airports, isOrigin)
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
