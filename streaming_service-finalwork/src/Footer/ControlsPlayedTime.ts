import { HandleElement } from "../HandleElement/HandleElement";

export class ControlsPlayedTime extends HandleElement {
    getTemplate() {
        return `
         <span class="player__time-start">0:00</span>
        `
    }
}      
