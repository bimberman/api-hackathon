class DestinationGallery {
  constructor(destinationGallery, galleryTitle) {
    this.destinationGallery = destinationGallery;
    this.updateGallery = this.updateGallery.bind(this);
    this.galleryTitle = galleryTitle;
  }

  updateGallery(data){
    let destinationDiv;
    let name;
    let imageUrl;
    let tripAdvisorLink;
    let attractionLink;

    if (data && data.length) {
      for (let dataIndex = 0; dataIndex < data.length; dataIndex++) {
        if (data[dataIndex].name){
          name = data[dataIndex].name;
        }
        if (data[dataIndex].photo && data[dataIndex].photo.images && data[dataIndex].photo.images.large) {
          imageUrl = data[dataIndex].photo.images.large.url;
        }
        if (data[dataIndex].web_url){
          tripAdvisorLink = data[dataIndex].web_url;
        }
        if (data[dataIndex].website){
          attractionLink = data[dataIndex].website;
        }
        if (name && imageUrl && tripAdvisorLink && attractionLink){
          destinationDiv = this.createDestinationDiv(name, imageUrl, tripAdvisorLink, attractionLink);
          this.destinationGallery.appendChild(destinationDiv);
          name = null;
          imageUrl = null;
          tripAdvisorLink = null;
          attractionLink = null;
          this.updateAttractionTitle("Destination: ");
          this.displayElement(document.getElementById("find-flight"))
        }
      }
    } else {
      this.updateAttractionTitle("We couldn't find any attractions in ");
    }
  }

  createDestinationDiv(name, imageUrl, tripAdvisorLink, attractionLink){
    let imgLink = document.createElement("a");
    let tripAdvisorLinkEle = document.createElement("a");
    let attractionLinkEle = document.createElement("a");
    let separatorSpan = document.createElement("span");
    let imgDiv = document.createElement("div");
    let linksDiv = document.createElement("div");
    let destinationDiv = document.createElement("div");

    imgDiv.setAttribute("style", `background-image: url(${imageUrl})`);
    imgDiv.classList.add("img-thumbnail", "border-0", "rounded", "cover");

    imgLink.setAttribute("href", attractionLink);
    imgLink.setAttribute("target", "_blank");
    imgLink.appendChild(imgDiv);

    tripAdvisorLinkEle.setAttribute("href", tripAdvisorLink);
    tripAdvisorLinkEle.setAttribute("target", "_blank");
    tripAdvisorLinkEle.classList.add("attraction-link");
    tripAdvisorLinkEle.textContent = "TripAdvisor.com";

    attractionLinkEle.setAttribute("href", attractionLink);
    attractionLinkEle.setAttribute("target", "_blank");
    attractionLinkEle.classList.add("attraction-link");
    attractionLinkEle.textContent = name;

    separatorSpan.textContent = "|";

    linksDiv.classList.add("d-flex", "justify-content-center", "align-content-center");

    linksDiv.append(attractionLinkEle, separatorSpan, tripAdvisorLinkEle);
    destinationDiv.append(imgLink, linksDiv);
    destinationDiv.classList.add("m-2");

    return destinationDiv;
  }

  updateCity(destination){
    if(destination){
      this.displayElement(this.galleryTitle);
      this.galleryTitle.querySelector("span.city").textContent = destination;
      this.updateAttractionTitle("Finding attractions in ");
      while (this.destinationGallery.firstChild) {
        this.destinationGallery.removeChild(this.destinationGallery.lastChild);
      }
    } else {
      this.hideElement(this.galleryTitle);
    }
  }

  updateAttractionTitle(title){
    let citySpanElement = this.galleryTitle.querySelector("span.city");
    let textNode = document.createTextNode(title);
    this.galleryTitle.textContent = "";
    this.galleryTitle.append(textNode, citySpanElement);
  }

  displayElement(element) {
    element.classList.remove("d-none");
  }

  hideElement(element) {
    element.classList.add("d-none");
  }
}
