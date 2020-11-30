class SkyscannerAPI {
  constructor(apikey){
    this.currentDate = (new Date()).toISOString().split('T')[0];
    this.futureDate = ""
    this.locationURL = "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/US/USD/en-US/";
    this.priceURLBase = "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/LAXA-sky/"
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

  sendPrices(appSetPrices){
    this.setAppPrices = appSetPrices;
  }

  sendAirports(appAirports){
    this.appAirports = appAirports;
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
      success: this.handleSkyscannerDestinationSuccess,
      error: this.handleSkyscannerDestinationError
    });
  }

  handleSkyscannerAirportsSuccess(success) {
    this.sendAirports(success.Places);
  }

  handleSkyscannerAirportsError(err) {
    console.log(err);
  }

  getPrices(origin, destination, departureDate, returnDate) {
    $.ajax({
      "async": true,
      "crossDomain": true,
      "url": `/${departureDate}?inboundpartialdate=${returnDate}` + destination + this.priceURLDates,
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
    this.setAppPrices(success);
  }

  handleGetPricesError(err) {
    console.log(err);
  }
}
