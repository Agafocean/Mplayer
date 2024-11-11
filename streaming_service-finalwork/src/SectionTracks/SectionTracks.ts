import { HandleElement } from "../HandleElement/HandleElement";

export class SectionTracks extends HandleElement{    
    getTemplate() {   
      return `<section class="tracks section tabs-content section--active" data-target="tracks"> </section>`
    }      
  }