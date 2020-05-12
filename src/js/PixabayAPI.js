
class PixabayAPI {
  constructor() {
    this.URL = "https://pixabay.com/api/";
    this.apiKey = "16504637-73c1b64f71e99d3d563718659";
    this.getPixabay = this.getPixabay.bind(this);
    this.handlegetPixabaySuccess = this.handlegetPixabaySuccess.bind(this);
    this.handlegetPixabayError = this.handlegetPixabayError.bind(this);
  }

  getPixabay() {
    $.ajax({
      "async": true,
      "crossDomain": true,
      "url": this.URL,
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
        "x-rapidapi-key": "ba03d858e9msh7cd30b1bdd85e35p12b5d7jsnd62708662927"
      },
      success: this.handlegetPixabaySuccess,
      error: this.handlegetPixabayError
    });
  }

  handlegetPixabaySuccess(success) {
    console.log(success);
  }

  handlegetPixabayError(err) {
    console.log(err);
  }
}
