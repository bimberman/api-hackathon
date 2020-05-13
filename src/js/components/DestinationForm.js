class DestinationForm{
  constructor(destinationForm){
    this.destinationForm = destinationForm;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.destinationForm.addEventListener("submit", this.handleSubmit);
    this.inputDestinationElement = this.destinationForm.querySelector("input[name='destination']");

    this.labelDestinationElement = this.destinationForm.querySelector("label[for='destination']");
  }

  onSubmit(getTripAdvisorDestination) {
    this.getTripAdvisorDestination = getTripAdvisorDestination;
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
      this.labelDestinationElement.textContent = "Please enter a destination";
      this.inputDestinationElement.placeholder = "";
      this.setUserDestination(userDestination);
      this.getTripAdvisorDestination(userDestination);
    } else {
      this.inputDestinationElement.placeholder = "Los Angeles";
      this.labelDestinationElement.textContent = "Please enter a valid destination. Example: Los Angeles.";
    }
    event.target.reset();
  }
}
