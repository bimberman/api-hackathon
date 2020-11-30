class App{
  constructor(tripAdvisorAPI, skyscannerAPI, destinationForm, destinationGallery, flightModal){
    this.tripAdvisorAPI = tripAdvisorAPI;
    this.skyscannerAPI = skyscannerAPI;
    this.destinationForm = destinationForm;
    this.destinationGallery = destinationGallery;
    this.flightModal = flightModal;

    this.setDestinationId = this.setDestinationId.bind(this);
    this.setUserDestination = this.setUserDestination.bind(this);
    this.setAirports = this.setAirports.bind(this);
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
  }

  setUserDestination(destination){
    this.destinationGallery.updateCity(destination);
    this.flightModal.setDestination("something")
  }

  setDestinationId(destinationId){
    this.destinationId = destinationId;
  }

  setAirports(airports){
    console.log(airports)
  }

  setPrices(data){
    this.prices = [];
    if(data && data.Quotes && data.Quotes.length){
      for(var quoteIndex=0; quoteIndex<data.Quotes.length; quoteIndex++){
        this.prices.push(data.Quotes[quoteIndex].MinPrice);
      }
    }
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
