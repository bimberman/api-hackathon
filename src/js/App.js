class App{
  constructor(skyscannerAPI, tripAdvisorAPI, destinationForm, destinationGallery){
    this.skyscannerAPI = skyscannerAPI;
    this.tripAdvisorAPI = tripAdvisorAPI;
    this.destinationForm = destinationForm;
    this.destinationGallery = destinationGallery;

    this.setDestinationId = this.setDestinationId.bind(this);
    this.setUserDestination = this.setUserDestination.bind(this);
    this.setPrices = this.setPrices.bind(this);
    this.getMinPrice = this.getMinPrice.bind(this);
  }

  start() {
    this.destinationForm.onSubmit(this.tripAdvisorAPI.getTripAdvisorDestination,
                                  this.skyscannerAPI.getSkyscannerDestination);
    this.destinationForm.setAppUserDestination(this.setUserDestination);

    this.tripAdvisorAPI.sendDestinationId(this.setDestinationId);
    this.tripAdvisorAPI.updateGallery(this.destinationGallery.updateGallery);

    this.skyscannerAPI.sendPrices(this.setPrices);
  }

  setUserDestination(destination){
    destinationGallery.updateCity(destination);
  }
  setDestinationId(destinationId){
    this.destinationId = destinationId;
  }

  setPrices(data){
    this.prices = [];
    if(data && data.Quotes && data.Quotes.length){
      for(var quoteIndex=0; quoteIndex<data.Quotes.length; quoteIndex++){
        this.prices.push(data.Quotes[quoteIndex].MinPrice);
      }
    }
    destinationGallery.updateFlightPrice(this.getMinPrice());
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
