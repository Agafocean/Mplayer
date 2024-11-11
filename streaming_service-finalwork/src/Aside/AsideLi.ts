import { HandleElement } from "../HandleElement/HandleElement";
import { Playlist } from "../GetData/ajustPlaylists";

export class AsideLi extends HandleElement {
  constructor(
    private aside: Playlist
  ) {
    super()
  }
  getTemplate() {
    return `<li class="aside__item">
             <button class="aside__btn" id=${this.aside.number}>${this.aside.name}</button>
            </li>`
  }
}
