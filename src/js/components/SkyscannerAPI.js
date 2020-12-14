class SkyscannerAPI {
  constructor(apikey){
    this.locationURL = "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/US/USD/en-US/";
    this.priceURLBase = "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US"
    this.host = "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com";
    this.apikey = apikey;
    this.location_id;

    this.getSkyscannerDestinationAirports = this.getSkyscannerDestinationAirports.bind(this);
    this.handleSkyscannerDestinationAirportsSuccess = this.handleSkyscannerDestinationAirportsSuccess.bind(this);
    this.handleSkyscannerDestinationAirportsError = this.handleSkyscannerDestinationAirportsError.bind(this);

    this.getSkyscannerOriginAirports = this.getSkyscannerOriginAirports.bind(this);
    this.handleSkyscannerOriginAirportsSuccess = this.handleSkyscannerOriginAirportsSuccess.bind(this);
    this.handleSkyscannerOriginAirportsError = this.handleSkyscannerOriginAirportsError.bind(this);

    this.getPrices = this.getPrices.bind(this);
    this.handleGetPricesSuccess = this.handleGetPricesSuccess.bind(this);
    this.handleGetPricesError = this.handleGetPricesError.bind(this);
  }

  sendPrices(setAppPrices){
    this.sendAppPrices = setAppPrices;
  }

  sendAirports(sendAppAirports){
    this.sendAirports = sendAppAirports;
  }

  getSkyscannerDestinationAirports(city) {
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
        query: city
      },
      success: this.handleSkyscannerDestinationAirportsSuccess,
      error: this.handleSkyscannerDestinationAirportsError
    });
  }

  handleSkyscannerDestinationAirportsSuccess(success) {
    this.sendAirports(success.Places, false);
  }

  handleSkyscannerDestinationAirportsError(err) {
    console.log(err);
  }

  getSkyscannerOriginAirports(city) {
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
        query: city
      },
      success: this.handleSkyscannerOriginAirportsSuccess,
      error: this.handleSkyscannerOriginAirportsError
    });
  }

  handleSkyscannerOriginAirportsSuccess(success) {
    this.sendAirports(success.Places, true);
  }

  handleSkyscannerOriginAirportsError(err) {
    console.log(err);
  }

  getPrices(oAirport, dAirport) {
    console.log(`${this.priceURLBase}/${oAirport}-sky/${dAirport}-sky/anytime`)
    $.ajax({
      "async": true,
      "crossDomain": true,
      "url": `${this.priceURLBase}/${oAirport}-sky/${dAirport}-sky/anytime`,
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
    this.sendAppPrices(success);
  }

  handleGetPricesError(err) {
    console.log(err);
  }
}
