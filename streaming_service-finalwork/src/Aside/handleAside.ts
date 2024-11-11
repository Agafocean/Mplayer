// handle left side of page, including list of playlists
// currenPlaylist - element link on playlist tracks list

import { AsideLi } from "./AsideLi";
import { putInDOM } from "../index";
import { AsideTracks } from "./AsideTracks";
import { AsidePlaylists } from "./AsidePlaylists";
import { AsideNav } from "./AsideNav";
import { AsideUl } from "./AsideUl";
import { TracksData } from "../GetData/ajustTracks";
import { handleTrack } from "../TracksLi/handleTrack";
import { AsideFavourites } from "./AsideFavourites";
import { FavouriteTracksData } from "../GetData/ajustFavouriteTracks";
import { Playlist, Playlists } from "../GetData/ajustPlaylists";
import { Aside } from "./Aside";
import { getPlayTrack } from "../GetData/getPlayTrack";
import { offPlaylists } from "../SectionPlaylists/offPlaylists";

export let currentPlaylist: HTMLElement = document.createElement('div');

export function handleAside(ContentWrapEl: Element, ModalEl: Element, SectionPlaylistsEl: Element,
    SectionTracksEl: Element, TracksTitleEl: Element, TracksUlEl: Element, FooterEl: Element) {
    const AsideEl = putInDOM(ContentWrapEl, 'afterbegin', new Aside().getElement());
    const AsideNavEl = putInDOM(AsideEl, 'beforeend', new AsideNav().getElement());
    const AsideUlEl = putInDOM(AsideNavEl, 'beforeend', new AsideUl().getElement());

    const AsideTracksEl = putInDOM(AsideUlEl, 'beforeend', new AsideTracks().getElement());
    currentPlaylist = AsideTracksEl.firstElementChild as HTMLElement;

    const AsidePlaylistsEl = putInDOM(AsideUlEl, 'beforeend', new AsidePlaylists().getElement());
    const AsideFavouritesEl = putInDOM(AsideUlEl, 'beforeend', new AsideFavourites().getElement());

    AsideTracksEl.addEventListener('click', clickOnTracks);
    AsidePlaylistsEl.addEventListener('click', clickOnPlaylists);
    AsideFavouritesEl.addEventListener('click', clickOnFavourites);

    const AsideLiEl = Playlists.map((aside: Playlist) => putInDOM(AsideUlEl, 'beforeend', new AsideLi(aside).getElement()));
    AsideLiEl.map((el: Element) => el.addEventListener('click', clickOnPlaylist));
    AsideUlEl.insertAdjacentHTML('beforeend', `<div style="height: 50px"></div>`)

    function makeAllInactive() { // remove highlighting of all playlists
        (AsideTracksEl.firstElementChild as Element).classList.remove("aside__btn-active");
        (AsidePlaylistsEl.firstElementChild as Element).classList.remove("aside__btn-active");
        (AsideFavouritesEl.firstElementChild as Element).classList.remove("aside__btn-active");
        AsideLiEl.map((el: Element) => (el.firstElementChild as Element).classList.remove("aside__btn-active"));
    }

    function clickOnTracks() { 
        currentPlaylist = AsideTracksEl.firstElementChild as HTMLElement;
        TracksTitleEl.textContent = 'Songs';
        TracksUlEl.innerHTML = '';
        TracksData.map((track) => handleTrack(TracksUlEl, ModalEl, FooterEl, track, 1));
        makeAllInactive();
        if (!SectionTracksEl.classList.contains("section--active")) {
            SectionTracksEl.classList.add("section--active")
        };
        SectionPlaylistsEl.classList.remove("section--active");

        if (!(AsideTracksEl.firstElementChild as Element).classList.contains("aside__btn-active")) {
            (AsideTracksEl.firstElementChild as Element).classList.add("aside__btn-active");
        }
    };

    function clickOnPlaylists() {
        if (!getPlayTrack().isPlaylist) offPlaylists();
        currentPlaylist = AsidePlaylistsEl.firstElementChild as HTMLElement;

        makeAllInactive();
        if (!SectionPlaylistsEl.classList.contains("section--active")) {
            SectionPlaylistsEl.classList.add("section--active")
        };
        SectionTracksEl.classList.remove("section--active");

        if (!(AsidePlaylistsEl.firstElementChild as Element).classList.contains("aside__btn-active")) {
            (AsidePlaylistsEl.firstElementChild as Element).classList.add("aside__btn-active");
        }
    };

    function clickOnFavourites() {
        currentPlaylist = AsideFavouritesEl.firstElementChild as HTMLElement;
        TracksTitleEl.textContent = 'Favourite songs';
        TracksUlEl.innerHTML = '';
        FavouriteTracksData.map((track) => handleTrack(TracksUlEl, ModalEl, FooterEl, track, 0));
        makeAllInactive();
        if (!SectionTracksEl.classList.contains("section--active")) {
            SectionTracksEl.classList.add("section--active")
        };
        SectionPlaylistsEl.classList.remove("section--active");

        if (!(AsideFavouritesEl.firstElementChild as Element).classList.contains("aside__btn-active")) {
            (AsideFavouritesEl.firstElementChild as Element).classList.add("aside__btn-active");
        }
    };

    function clickOnPlaylist(el: Event) {
        currentPlaylist = el.target as HTMLElement;
        const playlistN = Playlists.findIndex(playlist => Number(currentPlaylist.id) === playlist.number);
        TracksTitleEl.textContent = `${Playlists[playlistN].name}`;
        TracksUlEl.innerHTML = '';
        Playlists[playlistN].tracks.
            map((track) => handleTrack(TracksUlEl, ModalEl, FooterEl, track, 2));
        makeAllInactive();
        if (!SectionTracksEl.classList.contains("section--active")) {
            SectionTracksEl.classList.add("section--active")
        };
        SectionPlaylistsEl.classList.remove("section--active");

        if (!(el.target as Element).classList.contains("aside__btn-active")) {
            (el.target as Element).classList.add("aside__btn-active");
        }
    }
}
