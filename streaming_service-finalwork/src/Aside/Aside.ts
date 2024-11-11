import { HandleElement } from "../HandleElement/HandleElement";

export class Aside extends HandleElement {
  getTemplate() {
    return `<aside class="aside">
               <h2 class="aside__h2 visually-hidden">Left side navigation</h2>     
              </aside>`
  }
}