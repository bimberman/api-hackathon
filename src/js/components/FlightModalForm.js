class FlightModalForm {
  constructor(flightModalForm) {
    this.xCloseflightModalForm = document.getElementById("x-close-flight-modal");
    this.flightModalForm = flightModalForm;
    this.destination = ""

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.onClickOutsideModal = this.onClickOutsideModal.bind(this);

    this.xCloseflightModalForm.addEventListener("click", this.closeModal);
    this.flightModalForm.addEventListener("click", this.onClickOutsideModal);

    /* Origin/Destination */
    this.originSelect = document.getElementById("flight-modal-origin")
    this.destinationSelect = document.getElementById("flight-modal-destination")
    this.setAirports = this.setAirports.bind(this);
    this.onChangeAirport = this.onChangeAirport.bind(this);

    this.destinationSelect.addEventListener("change", this.onChangeAirport)
    this.originSelect.addEventListener("change", this.onChangeAirport)

    /* Dates */
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
    if (event.currentTarget === this.originSelect){
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

  setCity(city, isOrigin){
    const option = document.createElement("option");
    option.text = city;
    option.selected = true;
    option.disabled = true;
    option.hidden = true;
    if (isOrigin) {
      while(this.originSelect.firstChild){
        this.originSelect.removeChild(this.originSelect.lastChild)
      }
      this.origin = city;
      this.originSelect.add(option)
      this.getSkyscannerOriginAirportCodes(city)
    } else {
      while (this.destinationSelect.firstChild) {
        this.destinationSelect.removeChild(this.destinationSelect.lastChild)
      }
      this.destination = city;
      this.destinationSelect.add(option)
      this.getSkyscannerDestinationAirportCodes(city)
    }

    const title = document.getElementById("flight-modal-title")
    while (title.firstChild) {
      title.removeChild(title.lastChild)
    }

    const originBoldEle = document.createElement("strong");
    const originNode = document.createTextNode(this.origin);
    originBoldEle.appendChild(originNode);
    const destinationBoldEle = document.createElement("strong");
    const destinationNode = document.createTextNode(this.destination);
    destinationBoldEle.appendChild(destinationNode);

    const originTitleNode = document.createTextNode("Find Flights From: ");
    const destinationTitleNode = document.createTextNode(" To: ");
    title.appendChild(originTitleNode);
    title.appendChild(originBoldEle);
    title.appendChild(destinationTitleNode);
    title.appendChild(destinationBoldEle);
  }

  setAirport(airport, isOrigin) {
    const option = document.createElement("option");
    option.text = airport.PlaceId;
    if(isOrigin){
      this.originSelect.add(option);
      return;
    }
    this.destinationSelect.add(option);
  }

  getSkyscannerDestinationAirportCodes(getSkyscannerDestinationAirportCodes){
    this.getSkyscannerDestinationAirportCodes = getSkyscannerDestinationAirportCodes;
  }

  getSkyscannerOriginAirportCodes(getSkyscannerOriginAirportCodes) {
    this.getSkyscannerOriginAirportCodes = getSkyscannerOriginAirportCodes;
  }

  setAirports(airports, isOrigin){
    if (isOrigin) {
      this.originSelect.removeChild(this.originSelect.lastChild)
      airports.forEach(airport => {
        const option = document.createElement("option");
        option.text = airport.PlaceId.split("-")[0];
        this.originSelect.add(option)
      })
      return;
    }
    airports.forEach(airport=>{
      const option = document.createElement("option");
      option.text = airport.PlaceId.split("-")[0];
      this.destinationSelect.add(option)
    })
  }

  openModal() {
    this.flightModalForm.classList.remove("d-none");
    this.flightModalForm.classList.add("d-block");
    this.departureDateElement.min = (new Date(Date.now())).toISOString().split('T')[0];
    this.returnDateElement.min = (new Date(Date.now())).toISOString().split('T')[0];
    this.departureDateElement.max = (new Date(Date.now() + 2.365e+10)).toISOString().split('T')[0];
  }

  closeModal() {
    this.flightModalForm.classList.add("d-none");
    this.flightModalForm.classList.remove("d-block");
  }

  onClickOutsideModal(event) {
    if (event.target === this.flightModalForm) {
      this.closeModal();
    }
  }
}
