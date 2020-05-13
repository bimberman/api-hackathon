
class TripAdvisorAPI {
  constructor(apikey) {
    this.locationSearchURL = "https://tripadvisor1.p.rapidapi.com/locations/search";
    this.attractionsURL = "https://tripadvisor1.p.rapidapi.com/attractions/list";
    this.host = "tripadvisor1.p.rapidapi.com";
    this.apikey = apikey;
    this.self = this;

    this.getTripAdvisorDestination = this.getTripAdvisorDestination.bind(this);
    this.handlegetTripAdvisorDestinationSuccess = this.handlegetTripAdvisorDestinationSuccess.bind(this);
    this.handlegetTripAdvisorDestinationError = this.handlegetTripAdvisorDestinationError.bind(this);

    this.getAttractions = this.getAttractions.bind(this);
    this.handleGetAttractionsSuccess = this.handleGetAttractionsSuccess.bind(this);
    this.handleGetAttractionsError = this.handleGetAttractionsError.bind(this);
  }

  updateTable(tableUpdateFunction){
    this.tableUpdateFunction = tableUpdateFunction;
  }

  sendDestinationId(setDestinationId){
    this.setDestinationId = setDestinationId;
  }

  getTripAdvisorDestination(destination) {
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
        query: destination
      },
      success: this.handlegetTripAdvisorDestinationSuccess,
      error: this.handlegetTripAdvisorDestinationError
    });
  }

  handlegetTripAdvisorDestinationSuccess(success) {
    console.log(success);
    this.destinationId = success.data[0].result_object.location_id;
    this.getAttractions(this.destinationId);
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
        limit: 11,
        lang: "en_US",
        currency: "USD",
        sort: "recommended",
        lunits: "km",
        min_rating: 4,
        category: "attractions",
        subcatagory: "museums",
        location_id: parseInt(this.destinationId)
      },
      success: this.handleGetAttractionsSuccess,
      error: this.handleGetAttractionsError
    });
  }

  handleGetAttractionsSuccess(success) {
    console.log(success);
    this.tableUpdateFunction(success.data);
  }

  handleGetAttractionsError(err) {
    console.log(err);
  }
}
