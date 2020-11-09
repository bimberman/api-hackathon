class SkyscannerAPI {
  constructor(apikey){
    this.locationURL = "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/US/USD/en-US/";
    this.priceURLBase = "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/LAXA-sky/"
    this.priceURLDates = "/2020-08-01?inboundpartialdate=2020-08-02";
    this.host = "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com";
    this.apikey = apikey;
    this.location_id;

    this.getSkyscannerDestination = this.getSkyscannerDestination.bind(this);
    this.handleSkyscannerDestinationSuccess = this.handleSkyscannerDestinationSuccess.bind(this);
    this.handleSkyscannerDestinationError = this.handleSkyscannerDestinationError.bind(this);

    this.getPrices = this.getPrices.bind(this);
    this.handleGetPricesSuccess = this.handleGetPricesSuccess.bind(this);
    this.handleGetPricesError = this.handleGetPricesError.bind(this);
  }

  sendPrices(appSetPrices){
    this.setAppPrices = appSetPrices;
  }
  updatePrice(destinationGalleryUpdatePrice){
    this.destinationGalleryUpdatePrice = destinationGalleryUpdatePrice;
  }

  getSkyscannerDestination(destination) {
    $.ajax({
      "async": true,
      "crossDomain": true,
      "url": this.locationURL,
      "method": "GET",
      "headers": {
        "x-rapidapi-host": this.host,
        "x-rapidapi-key": this.apikey
      },
      data: {
        query: destination
      },
      success: this.handleSkyscannerDestinationSuccess,
      error: this.handleSkyscannerDestinationError
    });
  }

  handleSkyscannerDestinationSuccess(success) {
    console.log(success);
    this.destination = success.Places[0].PlaceId;
    this.getPrices(this.destination);
  }

  handleSkyscannerDestinationError(err) {
    console.log(err);
  }

  getPrices(destination) {
    $.ajax({
      "async": true,
      "crossDomain": true,
      "url": this.priceURLBase + destination + this.priceURLDates,
      "method": "GET",
      "headers": {
        "x-rapidapi-host": this.host,
        "x-rapidapi-key": this.apikey
      },
      success: this.handleGetPricesSuccess,
      error: this.handleGetPricesError
    });
  }

  handleGetPricesSuccess(success) {
    console.log(success);
    this.setAppPrices(success);
  }

  handleGetPricesError(err) {
    console.log(err);
  }
}
