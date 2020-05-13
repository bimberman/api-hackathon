
class TripAdvisorAPI {
  constructor(apikey) {
    this.locationSearchURL = "https://tripadvisor1.p.rapidapi.com/locations/search";
    this.attractionsURL = "https://tripadvisor1.p.rapidapi.com/attractions/list";
    this.host = "tripadvisor1.p.rapidapi.com";
    this.apikey = apikey;

    this.getTripAdvisorDestination = this.getTripAdvisorDestination.bind(this);
    this.handlegetTripAdvisorDestinationSuccess = this.handlegetTripAdvisorDestinationSuccess.bind(this);
    this.handlegetTripAdvisorDestinationError = this.handlegetTripAdvisorDestinationError.bind(this);
  }

  getTripAdvisorDestination() {
    $.ajax({
      "async": true,
      "crossDomain": true,
      "url": this.locationSearchURL,
      "method": "GET",
      "headers": {
        "x-rapidapi-host": this.host,
        "x-rapidapi-key": this.apikey
      },
      data:{
        limit: 1,
        query: "Los Angeles"
      },
      success: this.handlegetTripAdvisorDestinationSuccess,
      error: this.handlegetTripAdvisorDestinationError
    });
  }

  handlegetTripAdvisorDestinationSuccess(success) {
    console.log(success);
  }

  handlegetTripAdvisorDestinationError(err) {
    console.log(err);
  }

  getAttractions(destinationId) {
    $.ajax({
      "async": true,
      "crossDomain": true,
      "url": this.attractionsURL,
      "method": "GET",
      "headers": {
        "x-rapidapi-host": this.host,
        "x-rapidapi-key": this.apikey
      },
      data: {
        limit: 10,
        lang: "en_US",
        currency: "USD",
        sort: "recommended",
        lunits: "km",
        min_rating: 4,
        subcategory: "admission tickets",
        location_id: destinationId
      },
      success: this.handlegetAttractionsSuccess,
      error: this.handlegetAttractionsError
    });
  }

  handlegetAttractionsSuccess(success) {
    console.log(success);
  }

  handlegetAttractionsError(err) {
    console.log(err);
  }
}
