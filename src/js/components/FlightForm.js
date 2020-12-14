class FlightForm{

  constructor(destinationFormEle, originFormEle){
    this.destinationFormEle = destinationFormEle;
    this.originFormEle = originFormEle;

    this.handleSubmitDestination = this.handleSubmitDestination.bind(this);
    this.handleSubmitOrigin = this.handleSubmitOrigin.bind(this);
    this.displayElement = this.displayElement.bind(this);
    this.hideElement = this.hideElement.bind(this);
    this.isHidden = this.isHidden.bind(this);

    this.destinationButtonElement = document.getElementById("submit-destination");
    this.destinationInputElement = this.destinationFormEle.querySelector("input[name='destination']");

    this.originButtonElement = document.getElementById("submit-origin");
    this.originInputElement = this.originFormEle.querySelector("input[name='origin']");

    this.destinationFormEle.addEventListener("submit", this.handleSubmitDestination);
    this.originFormEle.addEventListener("submit", this.handleSubmitOrigin);
  }

  onSubmit(getTripAdvisorDestination, getTripAdvisorOrigin) {
    this.getTripAdvisorDestination = getTripAdvisorDestination;
    this.getTripAdvisorOrigin = getTripAdvisorOrigin;
  }

  setAppUserDestination(setAppsUserDestination){
    this.setAppsUserDestination = setAppsUserDestination;
  }

  openModal(openModal){
    this.openModal = openModal;
  }

  setAppUserOrigin(setAppsUserOrigin) {
    this.setAppsUserOrigin = setAppsUserOrigin;
  }

  handleSubmitDestination(event) {
    event.preventDefault();

    let formData = new FormData(event.target);
    const userDestination = formData.get("destination") ||
                          this.destinationInputElement.placeholder;
    if (userDestination){
        this.userInputDestination = this.toTitleCase(userDestination);
        this.setAppsUserDestination(this.userInputDestination);
        this.getTripAdvisorDestination(this.userInputDestination);
      }
  }

  handleSubmitOrigin(event) {
    event.preventDefault();
    console.log("firing now from FlightModal")
    let formData = new FormData(event.target);
    const userOrigin = formData.get("origin") ||
      this.originInputElement.placeholder;
    if (userOrigin) {
      this.userInputOrigin = this.toTitleCase(userOrigin);
      this.setAppsUserOrigin(this.userInputOrigin);
      this.displaySelectOptionLoading(document.getElementById("flight-modal-origin"));
      this.openModal();
    }
  }

  displaySelectOptionLoading(element){
    const option = document.createElement("option");
    option.text = "Finding Airport Codes";
    element.add(option)
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
