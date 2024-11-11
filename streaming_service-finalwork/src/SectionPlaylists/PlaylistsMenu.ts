import { HandleElement } from "../HandleElement/HandleElement";

export class PlaylistsMenu extends HandleElement {
  getTemplate() {
    return `<div class="tracks__item__drop">
        <button class="track__btn-dropdown"><svg width="23" height="4" viewBox="0 0 23 4" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="2" cy="2" r="2" fill="#C4C4C4"/>
  <circle cx="11.5" cy="2" r="2" fill="#C4C4C4"/>
  <circle cx="21" cy="2" r="2" fill="#C4C4C4"/>
  </svg>
        </button>      
                 </div>`
  }
}