import { HandleElement } from "../HandleElement/HandleElement";

export class ControlsProgressBar extends HandleElement {

  getTemplate() {
    return `
         <div class="player__range-play" id="range-play">
           <div class="player__range-play-progress" id="range-play"> </div>
         </div>
        `
  }
}
