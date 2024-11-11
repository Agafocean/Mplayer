import { Track } from "../GetData/ajustTracks";
import { HandleElement } from "../HandleElement/HandleElement";

export class ControlsDuration extends HandleElement {
    constructor(
        private track: Track
    ) {
        super()
    }
    getTemplate() {
        const s = Number(this.track.time) / 1000;
        const minutes = Math.trunc(s / 60);
        let seconds = String(Math.trunc(s % 60));
        if (Number(seconds) < 10) {
            seconds = '0' + seconds;
        }
        return `
          <span class="player__time-end">${minutes + ':' + seconds}</span>
        `
    }
}
