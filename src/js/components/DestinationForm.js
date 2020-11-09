class DestinationForm{
  constructor(destinationForm){
    this.destinationForm = destinationForm;

    this.handleSubmitDestination = this.handleSubmitDestination.bind(this);
    this.handleSubmitFlight = this.handleSubmitFlight.bind(this);
    this.handleDestinationFocus = this.handleDestinationFocus.bind(this);
    this.handleDestinationBlur = this.handleDestinationBlur.bind(this);
    this.handleOriginFocus = this.handleOriginFocus.bind(this);
    this.handleOriginBlur = this.handleOriginBlur.bind(this);
    this.displayElement = this.displayElement.bind(this);
    this.hideElement = this.hideElement.bind(this);
    this.updatePrice = this.updatePrice.bind(this);
    this.isHidden = this.isHidden.bind(this);

    // Flight Destination
    this.inputDestinationElement = this.destinationForm.querySelector("input[name='destination']");
    this.inputDestinationElement.addEventListener("focus", this.handleDestinationFocus);
    this.inputDestinationElement.addEventListener("blur", this.handleDestinationBlur);
    this.labelDestinationElement = this.destinationForm.querySelector("label[for='destination']");

    // GO GO GO
    this.buttonLetsGoElement = document.getElementById("submit-location");
    this.labelSubmitLocation = this.destinationForm.querySelector("label[for='submit-location']");

    // Flight origin
    // this.inputOriginElement = this.destinationForm.querySelector("input[name='origin']");
    // this.inputOriginElement.addEventListener("focus", this.handleOriginFocus);
    // this.inputOriginElement.addEventListener("blur", this.handleOriginBlur);
    // this.labelOriginElement = this.destinationForm.querySelector("label[for='origin']");
    // this.helperTextOriginElement = document.getElementById("origin-help");

    // Flight Prices
    this.buttonViewFlightsElement = document.getElementById("submit-price");
    this.buttonViewFlightsElement.addEventListener("click", function () {
      window.open(
        "https://www.skyscanner.com/", "_blank");
      });
    this.labelPriceElement = this.destinationForm.querySelector("label[for='price']");

    this.wasClicked = false;

    this.destinationForm.addEventListener("submit", this.handleSubmitDestination);
  }

  onSubmit(getTripAdvisorDestination, getSkyscannerDestination) {
    this.getTripAdvisorDestination = getTripAdvisorDestination;
    this.getSkyscannerDestination = getSkyscannerDestination;
  }

  setAppUserDestination(setAppsUserDestination){
    this.setAppsUserDestination = setAppsUserDestination;
  }

  handleSubmitDestination(event) {
    event.preventDefault();

    // this.displayElement(this.inputOriginElement);
    // this.displayElement(this.labelOriginElement);
    // this.displayElement(this.helperTextOriginElement);

    let formData = new FormData(event.target);
    const userDestination = formData.get("destination") ||
                          this.inputDestinationElement.placeholder;
    if (userDestination){
      this.hideElement(this.labelDestinationElement);
      if(userDestination !== this.userInputDestination || !this.wasClicked){
        this.userInputDestination = userDestination;
        this.setAppsUserDestination(this.userInputDestination);
        this.getTripAdvisorDestination(this.userInputDestination);
      }
      // this.hideElement(this.labelSubmitLocation);
      this.destinationForm.removeEventListener("submit", this.handleSubmitDestination);
      this.destinationForm.addEventListener("submit", this.handleSubmitFlight);
    } else if (!userDestination){
      this.inputDestinationElement.placeholder = "New York";
      this.labelDestinationElement.textContent = "Please enter a valid city. Example: New York.";
    }

    this.wasClicked = true;
  }

  handleSubmitFlight(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const userDestination = formData.get("destination") ||
      this.inputDestinationElement.placeholder;

    if (userDestination && userDestination !== this.userInputDestination){
      this.userInputDestination = userDestination;
      this.getTripAdvisorDestination(this.userInputDestination);
    }

    if (this.userInputDestination) {
      this.hideElement(this.labelSubmitLocation);
      this.setAppsUserDestination(this.userInputDestination);
      this.getSkyscannerDestination(this.userInputDestination);
      this.getTripAdvisorDestination(this.userInputDestination);
    } else {
      this.inputDestinationElement.placeholder = "New York";
      this.labelDestinationElement.textContent = "Please enter a valid city. Example: New York.";
      // this.inputOriginElement.placeholder = "Los Angeles";
      // this.labelOriginElement.textContent = "Please enter a valid city. Example: Los Angeles.";
    }

    this.labelPriceElement
  }

  handleOriginFocus(event) {
    event.preventDefault();

    this.displayElement(this.labelSubmitLocation);

    const userOrigin = event.target.value || event.target.placeholder;

    if (userOrigin) {
      this.labelSubmitLocation.textContent = `Need to change your city of origin?`
    }

    this.destinationForm.removeEventListener("submit", this.handleSubmitDestination);
    this.destinationForm.removeEventListener("submit", this.handleSubmitFlight);
  }

  handleOriginBlur(event) {
    event.preventDefault();

    this.displayElement(this.labelSubmitLocation)
    const userOrigin = event.target.value || event.target.placeholder;

    this.buttonLetsGoElement.textContent = `Lets Go!`

    this.labelSubmitLocation.textContent = `Lets find some flights from ${userOrigin} to ${this.userInputDestination}`;
    this.destinationForm.addEventListener("submit", this.handleSubmitFlight);
    if (userOrigin !== this.userInputOrigin) {
      this.hideElement(this.buttonViewFlightsElement);
      this.hideElement(this.labelPriceElement);
    }

    this.userInputOrigin = userOrigin;
  }

  handleDestinationFocus(event){
    event.preventDefault();

    this.displayElement(this.labelSubmitLocation);

    if (this.userInputDestination){
      this.labelSubmitLocation.textContent = `Want to find attractions in a new destination?`
    }

    this.destinationForm.removeEventListener("submit", this.handleSubmitDestination);
    this.destinationForm.removeEventListener("submit", this.handleSubmitFlight);
  }

  handleDestinationBlur(event){
    event.preventDefault();

    this.displayElement(this.labelSubmitLocation)
    const userDestination = event.target.value || event.target.placeholder;

    this.buttonLetsGoElement.textContent = `Lets Go!`
    if(userDestination===this.userInputDestination && this.wasClicked){
      // this.userOrigin = this.inputOriginElement.value || this.inputOriginElement.placeholder;
      this.labelSubmitLocation.textContent = `Lets find some flights from ${this.userOrigin} to ${this.userInputDestination}`;
      this.destinationForm.addEventListener("submit", this.handleSubmitFlight);
    } else {
      this.labelSubmitLocation.textContent = `Lets find some attractions in ${userDestination}`;
      this.destinationForm.addEventListener("submit", this.handleSubmitDestination);
      this.hideElement(this.buttonViewFlightsElement);
      this.hideElement(this.labelPriceElement);
    }
  }

  updatePrice(price){
    this.price = price;
    let textNode = document.createTextNode("Flights start from as low as $");
    let bold = document.createElement("b");
    bold.textContent = this.price;
    this.labelPriceElement.textContent = "";
    this.labelPriceElement.append(textNode, bold);
    this.displayElement(this.buttonViewFlightsElement);
    this.displayElement(this.labelPriceElement);
  }

  displayElement(element){
    if(this.isHidden(element)){
      element.classList.remove("d-none");
    }
  }

  hideElement(element){
    if (!this.isHidden(element)) {
      element.classList.add("d-none");
    }
  }

  isHidden(element){
    if(element.classList.contains("d-none")){
      return true;
    }
    return false;
  }
}
