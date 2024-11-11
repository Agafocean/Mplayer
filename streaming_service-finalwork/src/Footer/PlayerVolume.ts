import { getPlayTrack } from "../GetData/getPlayTrack";
import { HandleElement } from "../HandleElement/HandleElement";

export class PlayerVolume extends HandleElement {
    getTemplate() {
        return `<div class="player__value">
                 <span class="player__value-mute ${getPlayTrack().muted ? 'player__value-mute-on' : ''}" id="player__value-mute">x</span>
                </div>`
    }
}
