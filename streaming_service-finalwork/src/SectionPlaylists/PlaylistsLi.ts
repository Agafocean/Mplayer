import { HandleElement } from "../HandleElement/HandleElement";
import playlistJpg1 from "../img/playlists (1).jpg";
import playlistJpg2 from "../img/playlists (2).jpg";
import playlistJpg3 from "../img/playlists (3).jpg";
import playlistJpg4 from "../img/playlists (4).jpg";
import playlistJpg5 from "../img/playlists (5).jpg";
import playlistJpg6 from "../img/playlists (6).jpg";
import playlistJpg7 from "../img/playlists (7).jpg";
import playlistJpg8 from "../img/playlists (8).jpg";
import playlistJpg1_360 from "../img/playlists__360 (1).jpg";
import playlistJpg2_360 from "../img/playlists__360 (2).jpg";
import playlistJpg3_360 from "../img/playlists__360 (3).jpg";
import playlistJpg4_360 from "../img/playlists__360 (4).jpg";
import playlistJpg5_360 from "../img/playlists__360 (5).jpg";
import playlistJpg6_360 from "../img/playlists__360 (6).jpg";
import playlistJpg7_360 from "../img/playlists__360 (7).jpg";
import playlistJpg8_360 from "../img/playlists__360 (8).jpg";
import playlistJpg1_1440 from "../img/playlists__1440 (1).jpg";
import playlistJpg2_1440 from "../img/playlists__1440 (2).jpg";
import playlistJpg3_1440 from "../img/playlists__1440 (3).jpg";
import playlistJpg4_1440 from "../img/playlists__1440 (4).jpg";
import playlistJpg5_1440 from "../img/playlists__1440 (5).jpg";
import playlistJpg6_1440 from "../img/playlists__1440 (6).jpg";
import playlistJpg7_1440 from "../img/playlists__1440 (7).jpg";
import playlistJpg8_1440 from "../img/playlists__1440 (8).jpg";
import { Playlist } from "../GetData/ajustPlaylists";

export class PlaylistsLi extends HandleElement {
  private jpg = [playlistJpg1, playlistJpg2, playlistJpg3, playlistJpg4,
    playlistJpg5, playlistJpg6, playlistJpg7, playlistJpg8];
  private jpg_360 = [playlistJpg1_360, playlistJpg2_360, playlistJpg3_360, playlistJpg4_360,
    playlistJpg5_360, playlistJpg6_360, playlistJpg7_360, playlistJpg8_360];
  private jpg_1440 = [playlistJpg1_1440, playlistJpg2_1440, playlistJpg3_1440, playlistJpg4_1440,
    playlistJpg5_1440, playlistJpg6_1440, playlistJpg7_1440, playlistJpg8_1440];

  constructor(
    private playlist: Playlist
  ) {
    super()
  }

  getTemplate() {
    const indOfPicture = this.playlist.indOfPicture - 1;    
    return ` <li class="playlist__item">
    <picture>
      <source srcset="${this.jpg_360[indOfPicture]}" media="(max-width: 576px)">
      <source srcset="${this.jpg_1440[indOfPicture]}" media="(max-width: 1440px)">
      <img class="playlist__img" src="${this.jpg[indOfPicture]}" alt="Playlist ${this.playlist.name}">
    </picture>
    <div class="playlist__content">
      <h3 class="playlist__h3"><a class="playlist__h3__link" id="${this.playlist.number}">${this.playlist.name}</a></h3>
      <span class="playlist__count">${this.playlist.tracks.length} songs</span>
    </div>
  </li>`
  }
}

