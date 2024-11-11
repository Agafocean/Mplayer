import { Track } from "../GetData/ajustTracks";
import { HandleElement } from "../HandleElement/HandleElement";

export class PlayerTrackImg extends HandleElement {
    constructor(
        private track: Track
    ) {
        super()
    }
    getTemplate() {
        return `      
       <img class="player__track__img" src="${this.track.img}" alt=${this.track.name}>       
     `
    }
}
