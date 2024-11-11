import { HandleElement } from "../HandleElement/HandleElement";

export class TracksTitle extends HandleElement {
  constructor(
    private title: string
  ) {
    super()
  }
  getTemplate() {
    return `<h2 class="tracks__h2 title__h2">${this.title}</h2>`
  }
}