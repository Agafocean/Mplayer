import { Track } from "../GetData/ajustTracks";
import { HandleElement } from "../HandleElement/HandleElement";

export class PlayerSongAuthor extends HandleElement {
  constructor(
    private track: Track
  ) {
    super()
  }
  getTemplate() {
    return `     
          <p class="player__track__author">${this.track.author}</p>       
     `
  }
}
