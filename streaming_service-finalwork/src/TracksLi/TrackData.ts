import { HandleElement } from "../HandleElement/HandleElement";

export class TrackData extends HandleElement {
    constructor(
        private data: string
    ) {
        super()
    }
    getTemplate() {
        return ` <div class="tracks__item__data flex"><span class="data__text">${this.data.substring(0,10)}</span></div>`
    }
}