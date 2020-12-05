class FlightModalPriceList {
  constructor(flightModalPriceList) {
    this.flightModalPriceList = flightModalPriceList;

  }

  updatePriceList(prices){
    this.priceList = prices;
    this.validateQuotes(this.priceList.Quotes);
  }

  validateQuotes(quotes){
    const validQuotes = quotes.filter(quote=>{
      if (new Date(quote.OutboundLeg.DepartureDate) > new Date(this.dDate)){
        return quote
      }
    })
    console.log(validQuotes)
  }

  setDates(dDate, rDate){
    this.dDate = dDate;
    this.rDate = rDate;
  }

  createPriceDiv(oAirport, dAirport){

  }
}
