import { HandleElement } from "../HandleElement/HandleElement";

export class OverWrapper extends HandleElement {
    getTemplate() {
        return ` <div class="over-wrapper" style="position: relative; overflow: hidden; "> </div>`
    };
}