
class TripAdvisorAPI {
  constructor() {
    this.URL = "https://tripadvisor1.p.rapidapi.com/locations/search?limit=30&sort=relevance&offset=0&lang=en_US&currency=USD&units=km&query=pattaya";
    this.host = "tripadvisor1.p.rapidapi.com";
    this.apiKey = "ba03d858e9msh7cd30b1bdd85e35p12b5d7jsnd62708662927";

    this.getTripAdvisor = this.getTripAdvisor.bind(this);
    this.handlegetTripAdvisorSuccess = this.handlegetTripAdvisorSuccess.bind(this);
    this.handlegetTripAdvisorError = this.handlegetTripAdvisorError.bind(this);
  }

  getTripAdvisor() {
    $.ajax({
      "async": true,
      "crossDomain": true,
      "url": this.URL,
      "method": "GET",
      "headers": {
        "x-rapidapi-host": this.host,
        "x-rapidapi-key": this.apiKey
      },
      success: this.handlegetTripAdvisorSuccess,
      error: this.handlegetTripAdvisorError
    });
  }

  handlegetTripAdvisorSuccess(success) {
    console.log(success);
  }

  handlegetTripAdvisorError(err) {
    console.log(err);
  }
}
