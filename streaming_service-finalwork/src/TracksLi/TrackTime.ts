import { HandleElement } from "../HandleElement/HandleElement";

export class TrackTime extends HandleElement {
    constructor(
        private time: string
    ) {
        super()
    }
    getTemplate() {
        const s = Number(this.time) / 1000;
        const minutes = Math.trunc(s / 60);
        let seconds = String(Math.trunc(s % 60));
        if (Number(seconds) < 10) {
            seconds = '0' + seconds;
        }
        return `<time class="tracks__item__time">
        ${minutes + ':' + seconds}
        </time>`
    }
} 