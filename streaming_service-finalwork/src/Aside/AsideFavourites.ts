import { HandleElement } from "../HandleElement/HandleElement";

export class AsideFavourites extends HandleElement {
  getTemplate() {
    return `<li class="aside__item">
             <button class="aside__btn" id="0">Favourite songs</button>
            </li>`
  }
}