import { HandleElement } from "../HandleElement/HandleElement";

export class ModalCancel extends HandleElement {
    getTemplate() {
        return `
      <div class="playlists-modal__close-btn">
          Close
      </div> `
    }
}