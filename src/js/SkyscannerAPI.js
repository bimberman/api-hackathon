
class SkyscannerAPI {
  constructor(){
    this.URL = "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/UK/GBP/en-GB/?query=Stockholm";
    this.host = "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com";
    this.apiKey = "1ea345b7b4mshdf237355aeaf197p172907jsnb7c5657a3524";
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
        "x-rapidapi-key": this.apiKey
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
