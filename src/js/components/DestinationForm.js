class DestinationForm{
  constructor(destinationForm){
    this.destinationForm = destinationForm;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.destinationForm.addEventListener("submit", this.handleSubmit);
  }

  onSubmit(getTripAdvisorDestination) {
    this.getTripAdvisorDestination = getTripAdvisorDestination;
  }

  handleSubmit(event) {
    event.preventDefault();
    let formData = new FormData(event.target);
    let userDestination = formData.get("destination") ||
                          this.destinationForm.querySelector("input[name='destination']").placeholder;
    let ajaxDestination = this.getTripAdvisorDestination(userDestination);
    event.target.reset();
  }
}
