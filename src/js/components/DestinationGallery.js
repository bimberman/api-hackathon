class DestinationGallery {
  constructor(destinationGallery, galleryTitle) {
    this.destinationGallery = destinationGallery;
    this.updateGallery = this.updateGallery.bind(this);
    this.galleryTitle = galleryTitle;
  }

  updateGallery(data, destination){
    let attractionImg = document.createElement("IMG");
    while (this.destinationGallery.firstChild) {
      this.destinationGallery.removeChild(this.destinationGallery.lastChild);
    }

    if (data && data.length) {
      for (let dataIndex = 0; dataIndex < data.length; dataIndex++) {
        attractionImg = document.createElement("IMG");
        if (data[dataIndex].photo && data[dataIndex].photo.images && data[dataIndex].photo.images.small){
          attractionImg.setAttribute("src", data[dataIndex].photo.images.small.url);
        }

        this.destinationGallery.appendChild(attractionImg);
      }
    }
  }

  updateTitle(destination){
    if(destination){
      this.galleryTitle.classList.remove("d-none")
      let spanElement = this.galleryTitle.querySelector("span");
      spanElement.textContent = destination;
    } else {
      this.galleryTitle.classList.add("d-none");
    }
  }
}
