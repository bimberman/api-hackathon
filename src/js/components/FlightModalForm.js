class FlightModalForm {
  constructor(flightModalForm) {
    this.findFlightButton = document.getElementById("find-flight");
    this.xCloseflightModalForm = document.getElementById("x-close-flight-modal");
    this.flightModalForm = flightModalForm;
    this.destination = ""

    this.onFindFlightClick = this.onFindFlightClick.bind(this);
    this.onCloseFlightClick = this.onCloseFlightClick.bind(this);
    this.onClickOutsideModal = this.onClickOutsideModal.bind(this);

    this.findFlightButton.addEventListener("click", this.onFindFlightClick);
    this.xCloseflightModalForm.addEventListener("click", this.onCloseFlightClick);
    this.flightModalForm.addEventListener("click", this.onClickOutsideModal);

    this.departureInput = document.getElementById("flight-modal-origin")
    this.destinationSelect = document.getElementById("flight-modal-destination")
    this.setAirports = this.setAirports.bind(this);
    this.onChangeAirport = this.onChangeAirport.bind(this);

    this.departureInput.addEventListener("change", this.onChangeAirport)
    this.destinationSelect.addEventListener("change", this.onChangeAirport)

    this.departureDateElement = document.getElementById("departure-date");
    this.returnDateElement = document.getElementById("return-date");

    this.departureDateElement.min = (new Date(Date.now())).toISOString().split('T')[0];
    this.departureDateElement.max = (new Date(Date.now() + 2.365e+10)).toISOString().split('T')[0];
    this.departureDateElement.value = (new Date(Date.now())).toISOString().split('T')[0];
    this.dDate = this.departureDateElement.value

    this.returnDateElement.max = (new Date(Date.now() + 2.365e+10)).toISOString().split('T')[0];
    this.returnDateElement.value = (new Date(Date.now() + 6.048e+8)).toISOString().split('T')[0];
    this.rDate = this.returnDateElement.value

    this.onChangeDate = this.onChangeDate.bind(this);
    this.departureDateElement.addEventListener("change", this.onChangeDate)
    this.returnDateElement.addEventListener("change", this.onChangeDate)

    const option = document.createElement("option");
    option.text = "TLV";
    option.selected = true;
    this.destinationSelect.add(option)
    const option2 = document.createElement("option");
    option2.text = "JFK";
    this.destinationSelect.add(option2)

    this.findFlightButton = document.getElementById("submit-flight");
    this.handleSubmitFindFlight = this.handleSubmitFindFlight.bind(this);

    this.findFlightButton.addEventListener("click", this.handleSubmitFindFlight);
  }

  handleSubmitFindFlight(event){
    event.preventDefault();
    this.getPrice(this.oAirport, this.dAirport, this.dDate, this.rDate);
  }

  getAppPrice(getAppPrice){
    this.getPrice = getAppPrice;
  }

  onChangeAirport(event){
    if (event.currentTarget === this.departureInput){
      this.oAirport = event.currentTarget.value
    }

    if (event.currentTarget === this.destinationSelect) {
      this.dAirport = event.currentTarget.value
    }
  }

  onChangeDate(event){
    if (event.currentTarget === this.departureDateElement){
      this.returnDateElement.min = (event.currentTarget.value);
      if (this.returnDateElement.valueAsNumber < (new Date(this.returnDateElement.min)).getTime()){
        this.returnDateElement.value = event.currentTarget.value;
      }
      this.dDate = event.currentTarget.value;
    }
    if (event.currentTarget === this.returnDateElement) {
      this.rDate = event.currentTarget.value;
    }
  }

  setDestination(destination){
    this.destination = destination;
    const node = document.createTextNode(destination);
    document.getElementById("flight-modal-title").appendChild(node)
    const option = document.createElement("option");
    option.text = destination;
    option.selected = true;
    option.disabled = true;
    option.hidden = true;
    this.destinationSelect.add(option)
    this.getSkyscannerAirportCodes(destination)
  }

  setAirport(airport) {
    const option = document.createElement("option");
    option.text = airport.PlaceId;
    this.destinationSelect.add(option)
  }

  getSkyscannerAirportCodes(getSkyscannerAirportCodes){
    this.getSkyscannerAirportCodes = getSkyscannerAirportCodes;
  }

  setAirports(airports){
    airports.forEach(airport=>{
      const option = document.createElement("option");
      option.text = airport.PlaceId.split("-")[0];
      this.destinationSelect.add(option)
    })
  }

  onFindFlightClick() {
    this.flightModalForm.classList.remove("d-none");
    this.flightModalForm.classList.add("d-block");
    this.departureDateElement.min = (new Date(Date.now())).toISOString().split('T')[0];
    this.returnDateElement.min = (new Date(Date.now())).toISOString().split('T')[0];
    this.departureDateElement.max = (new Date(Date.now() + 2.365e+10)).toISOString().split('T')[0];
  }

  onCloseFlightClick() {
    this.flightModalForm.classList.add("d-none");
    this.flightModalForm.classList.remove("d-block");
  }

  onClickOutsideModal(event) {
    if (event.target === this.flightModalForm) {
      this.onCloseFlightClick();
    }
  }
}
