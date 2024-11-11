import { Playlists } from "../GetData/ajustPlaylists";

export function ajustNumberOfTracks(playlistN: number) {
    const playlistCount = document.querySelectorAll(".playlist__count");
    const modalCount = document.querySelectorAll(".playlists-modal__playlist__info");

    if (playlistCount) playlistCount[playlistN].textContent = String(Playlists[playlistN].tracks.length) + " songs";
    if (modalCount) modalCount[playlistN].textContent = String(Playlists[playlistN].tracks.length) + " songs";
}