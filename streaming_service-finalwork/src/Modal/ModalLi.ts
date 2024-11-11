import { Playlist } from "../GetData/ajustPlaylists";
import { HandleElement } from "../HandleElement/HandleElement";
import playlistsJpg1 from "../img/playlists (1).jpg";
import playlistsJpg2 from "../img/playlists (2).jpg";
import playlistsJpg3 from "../img/playlists (3).jpg";
import playlistsJpg4 from "../img/playlists (4).jpg";
import playlistsJpg5 from "../img/playlists (5).jpg";
import playlistsJpg6 from "../img/playlists (6).jpg";
import playlistsJpg7 from "../img/playlists (7).jpg";
import playlistsJpg8 from "../img/playlists (8).jpg";

export class ModalLi extends HandleElement {
    private modalJpg = [playlistsJpg1, playlistsJpg2, playlistsJpg3, playlistsJpg4,
        playlistsJpg5, playlistsJpg6, playlistsJpg7, playlistsJpg8];

    constructor(
        private modal: Playlist
    ) {
        super()
    }

    getTemplate() {
        return ` <div class="playlists-modal__playlist" id=${this.modal.number}>
                  <img src="${this.modalJpg[Number(this.modal.indOfPicture) - 1]}" alt="${this.modal.name}" class="playlists-modal__playlist__image"/>
                  <div class="playlists-modal__playlist__title">${this.modal.name}</div>
                  <div class="playlists-modal__playlist__info">${this.modal.tracks.length} songs</div>    
                 </div>`
    }
}

