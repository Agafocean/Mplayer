import { HandleElement } from "../HandleElement/HandleElement";
import { Track } from "../GetData/ajustTracks";

export class TrackAlbum extends HandleElement {
    constructor(
        private track: Track
    ) {
        super()
    }

    getTemplate() {
        return `         
         <div class="tracks__item__albom">${this.track.album}</div>           
  `
    }
}
