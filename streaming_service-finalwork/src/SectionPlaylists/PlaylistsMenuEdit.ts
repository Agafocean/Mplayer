import { HandleElement } from "../HandleElement/HandleElement";

export class PlaylistsMenuEdit extends HandleElement{  
    constructor(
        private edit: boolean
    ) {
        super()
    }
    getTemplate() {   
      return ` <div class="track__dropdown ${this.edit ? 'dropdown--active' : ''}"> </div>`
    }  
  }