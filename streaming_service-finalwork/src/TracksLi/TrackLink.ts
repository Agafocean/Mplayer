import { HandleElement } from "../HandleElement/HandleElement";
import { Track } from "../GetData/ajustTracks";

export class TrackLink extends HandleElement {
    constructor(
        private track: Track
    ) {
        super()
    }

    getTemplate() {
        return ` 
         <div class="tracks__item__name">
          <img class="track__img" src="${this.track.img}" alt="In Bloom">
          <div class="track__content">
           <h3 class="track__name"><a class="track__name__link" href="#a">${this.track.name}</a></h3><span class="track__author">${this.track.author}</span>
          </div>
         </div>
         <div class="tracks__item__albom">${this.track.album}</div>           
  `
    }
}
