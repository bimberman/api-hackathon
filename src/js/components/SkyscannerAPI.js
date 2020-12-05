class SkyscannerAPI {
  constructor(apikey){
    this.locationURL = "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/US/USD/en-US/";
    this.priceURLBase = "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US"
    this.host = "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com";
    this.apikey = apikey;
    this.location_id;

    this.getSkyscannerAirports = this.getSkyscannerAirports.bind(this);
    this.handleSkyscannerAirportsSuccess = this.handleSkyscannerAirportsSuccess.bind(this);
    this.handleSkyscannerAirportsError = this.handleSkyscannerAirportsError.bind(this);

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

  getSkyscannerAirports(city) {
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
      success: this.handleSkyscannerAirportsSuccess,
      error: this.handleSkyscannerAirportsError
    });
  }

  handleSkyscannerAirportsSuccess(success) {
    this.sendAirports(success.Places);
  }

  handleSkyscannerAirportsError(err) {
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
