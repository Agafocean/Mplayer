import { TracksLi } from "./TracksLi";
import { Track, TracksData } from "../GetData/ajustTracks";
import { putInDOM } from "../index";
import { TrackData } from "./TrackData";
import { TrackTime } from "./TrackTime";
import { TrackLike } from "./TrackLike";
import { TrackMenu } from "./TrackMenu";
import { TrackMenuAdd } from "./TrackMenuAdd";
import { TrackMenuRemove } from "./TrackMenuRemove";
import { TrackMenuEdit } from "./TrackMenuEdit";
import { currentPlaylist } from "../Aside/handleAside";
import { Playlists, PlaylistsTracks } from "../GetData/ajustPlaylists";
import { deleteSong } from "../API/deleteSong";
import { getPlayTrack } from "../GetData/getPlayTrack";
import { TrackLink } from "./TrackLink";
import { TrackAlbum } from "./TrackAlbum";
import { handleFooter } from "../Footer/handleFooter";
import { switchPlayTrack } from "../Footer/switchPlayTrack";
import { ajustPlayTrack } from "../Footer/ajustPlayTrack";
import { TrackMenuButton } from "./TrackMenuButton";
import { ajustNumberOfTracks } from "./ajustNumberOfTracks";
import { ajustLikes } from "../GetData/ajustLikes";

export function handleTrack(TracksUlEl: Element, ModalEl: Element, FooterEl: Element,
    track: Track, menuMode: 0 | 1 | 2) {
    const playlistN = Playlists.findIndex(playlist => Number(currentPlaylist.id) === playlist.number);
    const TracksLiEl = putInDOM(TracksUlEl, 'beforeend', new TracksLi(track).getElement());

    const TrackLinkEl = putInDOM(TracksLiEl, 'beforeend', new TrackLink(track).getElement());
    TrackLinkEl.addEventListener('click', clickOnTrack);

    const TrackAlbumEl = putInDOM(TracksLiEl, 'beforeend', new TrackAlbum(track).getElement());
    const TrackDataEl = putInDOM(TracksLiEl, 'beforeend', new TrackData(track.data).getElement());

    const TrackLikeEl = putInDOM(TrackDataEl, 'beforeend', new TrackLike(track.like).getElement());
    TrackLikeEl.addEventListener('click', clickOnLike);

    const TrackTimeEl = putInDOM(TracksLiEl, 'beforeend', new TrackTime(track.time).getElement());

    let TrackMenuEl = putInDOM(TracksLiEl, 'beforeend', new TrackMenu().getElement());

    const TrackMenuButtonEl = putInDOM(TrackMenuEl, 'beforeend', new TrackMenuButton().getElement());
    TrackMenuButtonEl.addEventListener('click', clickOnMenu);

    let TrackMenuEditEl = putInDOM(TrackMenuEl, 'beforeend', new TrackMenuEdit(false).getElement());
    handleMenuEdit();

    function clickOnTrack() {
        getPlayTrack().isPlaylist = false;
        switchPlayTrack(track, currentPlaylist.id);
        FooterEl.innerHTML = '';
        handleFooter(FooterEl, getPlayTrack().playTrackEl);
    };

    function clickOnLike() {
        ajustLikes(track);

        if (track.id === getPlayTrack().playTrackId) {
            const PlayerBtnLike = document.getElementById("player-btn-like");
            track.like ? PlayerBtnLike?.classList.add("like-btn--active") : PlayerBtnLike?.classList.remove("like-btn--active");
        }

        ajustPlayTrack();
        currentPlaylist.click();
    };
    function clickOnMenu() {
        const menuButtons = document.querySelectorAll('.dropdown--active');
        if (menuButtons.length) menuButtons[0].remove();
        TracksData.filter(e => e.id !== track.id).map(e => e.edit = false);

        track.edit = !track.edit;

        if (ModalEl.classList.contains('show')) {
            ModalEl.classList.remove('show')
        }

        TrackMenuEditEl.remove();
        TrackMenuEditEl = putInDOM(TrackMenuEl, 'beforeend', new TrackMenuEdit(track.edit).getElement());
        handleMenuEdit();
    };
    function clickOnMenuAdd() {
        if (!ModalEl.classList.contains('show')) {
            ModalEl.classList.add('show')
        }
        ModalEl.setAttribute('track', `${track.id}`);
        ModalEl.setAttribute('trackname', `${track.name}`);
    }
    function clickOnMenuRemove() {
        if (confirm(`Remove track <<${track.name}>> from playlist <<${Playlists[playlistN].name}>> ?`)) {
            Playlists[playlistN].tracks = Playlists[playlistN].tracks.filter((trackDel) => trackDel.id !== track.id);
            PlaylistsTracks[playlistN] = PlaylistsTracks[playlistN].filter((trackDel) => trackDel.id !== track.id);
            deleteSong(Playlists[playlistN].id, track.id);
            currentPlaylist.click();

            ajustPlayTrack();
            ajustNumberOfTracks(playlistN);
        }
    }
    function handleMenuEdit() {
        if (menuMode === 1) {
            let TrackMenuAddEl = putInDOM(TrackMenuEditEl, 'beforeend', new TrackMenuAdd().getElement());
            TrackMenuAddEl.addEventListener('click', clickOnMenuAdd);
        }

        if (menuMode === 2) {
            let TrackMenuRemoveEl = putInDOM(TrackMenuEditEl, 'beforeend', new TrackMenuRemove().getElement());
            TrackMenuRemoveEl.addEventListener('click', clickOnMenuRemove);
        }
    }
}

