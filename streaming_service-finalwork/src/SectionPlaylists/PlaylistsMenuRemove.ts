import { HandleElement } from "../HandleElement/HandleElement";

export class PlaylistsMenuRemove extends HandleElement{  
    getTemplate() {   
      return `<button class="track__delete-btn">Remove playlist</button>`
    }  
  }