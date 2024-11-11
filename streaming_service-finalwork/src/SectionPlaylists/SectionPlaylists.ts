import { HandleElement } from "../HandleElement/HandleElement";

export class SectionPlaylists extends HandleElement{  
    getTemplate() {   
      return `<section class="playlist section tabs-content" data-target="playlists"> </section>`
    }  
  }