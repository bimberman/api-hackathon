
class SkyscannerAPI {
  constructor(host, apikey){
    this.URL = "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/UK/GBP/en-GB/?query=Stockholm";
    this.host = host;
    this.apikey = apikey;
    this.location_id;
    // create
    this.getSkyscanner = this.getSkyscanner.bind(this);
    this.handlegetSkyscannerSuccess = this.handlegetSkyscannerSuccess.bind(this);
    this.handlegetSkyscannerError = this.handlegetSkyscannerError.bind(this);
  }

  getSkyscanner() {
    $.ajax({
      "async": true,
      "crossDomain": true,
      "url": this.URL,
      "method": "GET",
      "headers": {
        "x-rapidapi-host": this.host,
        "x-rapidapi-key": this.apikey
      },
      success: this.handlegetSkyscannerSuccess,
      error: this.handlegetSkyscannerError
    });
  }

  handlegetSkyscannerSuccess(success) {
    console.log(success);
  }

  handlegetSkyscannerError(err) {
    console.log(err);
  }
}
