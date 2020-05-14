class DestinationForm{
  constructor(destinationForm){
    this.destinationForm = destinationForm;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.destinationForm.addEventListener("submit", this.handleSubmit);
    this.inputDestinationElement = this.destinationForm.querySelector("input[name='destination']");

    this.labelDestinationElement = this.destinationForm.querySelector("label[for='destination']");
  }

  onSubmit(getTripAdvisorDestination, getSkyscannerDestination) {
    this.getTripAdvisorDestination = getTripAdvisorDestination;
    this.getSkyscannerDestination = getSkyscannerDestination;
  }

  setAppUserDestination(setUserDestination){
    this.setUserDestination = setUserDestination;
  }

  handleSubmit(event) {
    event.preventDefault();
    let formData = new FormData(event.target);
    let userDestination = formData.get("destination") ||
                          this.inputDestinationElement.placeholder;
    if(userDestination){
      this.labelDestinationElement.textContent = "Please enter a ";
      let italic = document.createElement("i");
      italic.textContent = "city";
      this.labelDestinationElement.appendChild(italic);
      this.setUserDestination(userDestination);
      // this.getTripAdvisorDestination(userDestination);
      this.getSkyscannerDestination(userDestination);
    } else {
      this.inputDestinationElement.placeholder = "New York";
      this.labelDestinationElement.textContent = "Please enter a valid city. Example: New York.";
    }
    event.target.reset();
  }
}
