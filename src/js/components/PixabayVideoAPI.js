
class PixabayVideoAPI {
  constructor() {
    this.URL = "https://pixabay.com/api/videos/";
    this.apiKey = "16504637-73c1b64f71e99d3d563718659";
    // specific vid for testing. Later will implement a different vid for each time the user lands on the page
    this.vidId = "10816";

    this.getPixabay = this.getPixabay.bind(this);
    this.handlegetPixabaySuccess = this.handlegetPixabaySuccess.bind(this);
    this.handlegetPixabayError = this.handlegetPixabayError.bind(this);
  }

  getPixabay() {
    $.ajax({
      "url": this.URL,
      data:{
        key: this.apiKey,
        id: this.vidId
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
