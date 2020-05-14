class DestinationGallery {
  constructor(destinationGallery, galleryTitle, flightInfo) {
    this.destinationGallery = destinationGallery;
    this.updateGallery = this.updateGallery.bind(this);
    this.updateFlightPrice = this.updateFlightPrice.bind(this);
    this.galleryTitle = galleryTitle;
    this.flightInfo = flightInfo;
  }

  updateGallery(data){
    let row = document.createElement("div");
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
        }
      }
    }
  }

  createDestinationDiv(name, imageUrl, tripAdvisorLink, attractionLink){
    let attractionImg = document.createElement("IMG");
    let imgLink = document.createElement("a");
    let tripAdvisorLinkEle = document.createElement("a");
    let attractionLinkEle = document.createElement("a");
    let tripAdvisorSpan = document.createElement("span");
    let seperatorSpan = document.createElement("span");
    let attractionSpan = document.createElement("span");
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

    seperatorSpan.textContent = "|";

    linksDiv.classList.add("d-flex", "justify-content-center", "align-content-center");

    linksDiv.append(attractionLinkEle, seperatorSpan, tripAdvisorLinkEle);
    destinationDiv.append(imgLink, linksDiv);
    destinationDiv.classList.add("m-2");

    return destinationDiv;
  }

  updateCity(destination){
    if(destination){
      this.galleryTitle.classList.remove("d-none");
      this.flightInfo.classList.remove("d-none");
      this.galleryTitle.querySelector("span.city").textContent = destination;
      this.flightInfo.querySelector("span.city").textContent = destination;

      this.updateAttractionTitle("Finding attractions in ");
      this.updateFlightTitle("Finding flight prices from LAX to");
      while (this.destinationGallery.firstChild) {
        this.destinationGallery.removeChild(this.destinationGallery.lastChild);
      }
    } else {
      this.galleryTitle.classList.add("d-none");
      this.flightInfo.classList.add("d-none");
    }
  }

  updateAttractionTitle(title){
    if (title) {
      let citySpanElement = this.galleryTitle.querySelector("span.city");
      let textNode = document.createTextNode(title);

      this.galleryTitle.textContent = "";
      this.galleryTitle.append(textNode, citySpanElement);
    }
  }
  updateFlightTitle(title, hasPrice) {
    let citySpanElement = this.flightInfo.querySelector("span.city");
    let priceSpanElement = this.flightInfo.querySelector("span.price");
    let textNode1 = document.createTextNode("");
    let textNode2 = document.createTextNode("");
    let textNode3 = document.createTextNode("");

    if (title && hasPrice) {
      textNode1.textContent = title;
      textNode2.textContent = " start at ";
      textNode3.textContent = " USD";

      this.flightInfo.textContent = "";
      this.flightInfo.append(textNode1, citySpanElement, textNode2, priceSpanElement, textNode3);
    }
    if (!hasPrice){
      textNode1.textContent = "Finding flight prices from LAX to ";
      textNode2.textContent = " as well";

      priceSpanElement.textContent = "";
      this.flightInfo.textContent = "";
      this.flightInfo.append(textNode1, citySpanElement, priceSpanElement,textNode2);
    }
    if(!title && !hasPrice){
      textNode1.textContent = "No flights available between LAX and ";

      priceSpanElement.textContent = "";
      this.flightInfo.textContent = "";
      this.flightInfo.append(textNode1, citySpanElement, priceSpanElement);
    }
  }
  updateFlightPrice(minPrice) {
    if (minPrice){
      this.flightInfo.querySelector("span.price").textContent = minPrice;
      this.updateFlightTitle("Flights to ", true);
    } else {
      this.updateFlightTitle(0,false);
    }
  }
}
