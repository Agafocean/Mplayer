import { getPlayTrack } from "../GetData/getPlayTrack";
import { HandleElement } from "../HandleElement/HandleElement";

export class PlayerVolumeBar extends HandleElement {   
    getTemplate() {
        return `<input type="range" class="player__value-range" id="range-value" value="${getPlayTrack().volume * 100}"> </input>`
    }
}
