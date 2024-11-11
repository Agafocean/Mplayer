import { HandleElement } from "../HandleElement/HandleElement";

export class TrackMenuRemove extends HandleElement{  
    getTemplate() {   
      return `<button class="track__delete-btn">Remove from playlist</button>`
    }  
  }