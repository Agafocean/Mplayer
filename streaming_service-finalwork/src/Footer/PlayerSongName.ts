import { Track } from "../GetData/ajustTracks";
import { HandleElement } from "../HandleElement/HandleElement";

export class PlayerSongName extends HandleElement {
  constructor(
    private track: Track
  ) {
    super()
  }
  getTemplate() {
    return `     
            <h3 class="player__track__h3">${this.track.name}</h3>           
     `
  }
}
