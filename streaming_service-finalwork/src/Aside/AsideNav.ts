import { HandleElement } from "../HandleElement/HandleElement";

export class AsideNav extends HandleElement {
  getTemplate() {
    return `<nav class="aside__nav">
             <button class="search__btn-open">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M9.5 18C14.1944 18 18 14.1944 18 9.5C18 4.80558 14.1944 1 9.5 1C4.80558 1 1 4.80558 1 9.5C1 14.1944 4.80558 18 9.5 18Z" stroke="#AAAAAA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
               <path d="M18.9999 19L15.5 15.5001" stroke="#AAAAAA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
             </button>  
            </nav>`
  }
}  