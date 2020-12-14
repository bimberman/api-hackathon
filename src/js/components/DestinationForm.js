class DestinationForm{

  constructor(destinationForm){
    this.destinationForm = destinationForm;

    this.handleSubmitDestination = this.handleSubmitDestination.bind(this);
    this.displayElement = this.displayElement.bind(this);
    this.hideElement = this.hideElement.bind(this);
    this.isHidden = this.isHidden.bind(this);

    this.buttonLetsGoElement = document.getElementById("submit-location");
    this.inputDestinationElement = this.destinationForm.querySelector("input[name='destination']");

    this.wasClicked = false;

    this.destinationForm.addEventListener("submit", this.handleSubmitDestination);
  }

  onSubmit(getTripAdvisorDestination) {
    this.getTripAdvisorDestination = getTripAdvisorDestination;
  }

  setAppUserDestination(setAppsUserDestination){
    this.setAppsUserDestination = setAppsUserDestination;
  }

  handleSubmitDestination(event) {
    event.preventDefault();

    let formData = new FormData(event.target);
    const userDestination = formData.get("destination") ||
                          this.inputDestinationElement.placeholder;
    if (userDestination){
        this.userInputDestination = this.toTitleCase(userDestination);
        this.setAppsUserDestination(this.userInputDestination);
        this.getTripAdvisorDestination(this.userInputDestination);
      }

    this.wasClicked = true;
  }

  toTitleCase(str){
    return str
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
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
