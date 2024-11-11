import { HandleElement } from "../HandleElement/HandleElement";

export class ControlsPlaying extends HandleElement {
    constructor(
        private path: string,
        private muted: boolean
    ) {
        super()
    }

    getTemplate() {
        return `               
            <audio id="myPlayer" src="http://localhost:3000${this.path}" controls="controls" ${this.muted ? 'muted' : ''}></audio>       
        `
    }
}
