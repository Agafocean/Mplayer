import { HandleElement } from "../HandleElement/HandleElement";

export class PlaylistNameInput extends HandleElement{  
    getTemplate() {   
      return ` <div class="playlist__name">
                 <input class="playlist__name__field" type="search" placeholder="Playlist name">
              </div>`
    }  
  }