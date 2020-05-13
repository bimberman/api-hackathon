
class SkyscannerAPI {
  constructor(apikey){
    this.URL = "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/US/USD/en-US/?query=Hawaii";
    this.host = "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com";
    this.apikey = apikey;
    this.location_id;
    // create
    this.testSkyscanner = this.testSkyscanner.bind(this);
    this.handletestSkyscannerSuccess = this.handletestSkyscannerSuccess.bind(this);
    this.handletestSkyscannerError = this.handletestSkyscannerError.bind(this);
  }

  testSkyscanner() {
    $.ajax({
      "async": true,
      "crossDomain": true,
      "url": this.URL,
      "method": "test",
      "headers": {
        "x-rapidapi-host": this.host,
        "x-rapidapi-key": this.apikey
      },
      success: this.handletestSkyscannerSuccess,
      error: this.handletestSkyscannerError
    });
  }

  handletestSkyscannerSuccess(success) {
    console.log(success);
  }

  handletestSkyscannerError(err) {
    console.log(err);
  }
}
