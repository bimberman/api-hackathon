class FlightModal {
  constructor(flightModal) {
    this.findFlightButton = document.getElementById("find-flight");
    this.xCloseFlightModal = document.getElementById("x-close-flight-modal");
    this.flightModal = flightModal;
    this.destination = ""

    this.destinationSelect = document.getElementById("flight-modal-destination")

    this.onFindFlightClick = this.onFindFlightClick.bind(this);
    this.onCloseFlightClick = this.onCloseFlightClick.bind(this);
    this.onClickOutsideModal = this.onClickOutsideModal.bind(this);

    this.findFlightButton.addEventListener("click", this.onFindFlightClick);
    this.xCloseFlightModal.addEventListener("click", this.onCloseFlightClick);
    this.flightModal.addEventListener("click", this.onClickOutsideModal);
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
  }

  setAirport(airport) {
    const option = document.createElement("option");
    option.text = airport;
    this.destinationSelect.add(option)
  }

  setAirports(airports){
    airports.forEach(airport=>{
      const option = document.createElement("option");
      option.text = airport;
      this.destinationSelect.add(option)
    })
  }

  onFindFlightClick() {
    this.flightModal.classList.remove("d-none");
    this.flightModal.classList.add("d-block");
  }

  onCloseFlightClick() {
    this.flightModal.classList.add("d-none");
    this.flightModal.classList.remove("d-block");
  }

  onClickOutsideModal(event) {
    if (event.target === this.flightModal) {
      this.onCloseFlightClick();
    }
  }
}
