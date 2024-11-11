import { Track } from "../GetData/ajustTracks";
import { HandleElement } from "../HandleElement/HandleElement";

export class TracksLi extends HandleElement {
  constructor(
    private track: Track
  ) {
    super()
  }
  getTemplate() {
    return `<li class="tracks__item flex"> 
               <div class="tracks__item__number"> ${this.track.id} </div>        
            </li>`
  }
}

