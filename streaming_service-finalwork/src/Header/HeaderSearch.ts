import { HandleElement } from "../HandleElement/HandleElement";

export class HeaderSearch extends HandleElement {
  getTemplate() {
    return ` <div class="header__search">
                 <input class="header__search__field" type="search" placeholder="SEARCH">
             </div>`
  }
}