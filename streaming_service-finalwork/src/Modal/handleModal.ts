import { addSong } from "../API/addSong";
import { ajustPlayTrack } from "../Footer/ajustPlayTrack";
import { Playlist, Playlists, PlaylistsTracks } from "../GetData/ajustPlaylists";
import { TracksData } from "../GetData/ajustTracks";
import { ajustNumberOfTracks } from "../TracksLi/ajustNumberOfTracks";
import { putInDOM } from "../index";
import { ModalCancel } from "./ModalCancel";
import { ModalContent } from "./ModalContent";
import { ModalFooter } from "./ModalFooter";
import { ModalLi } from "./ModalLi";
import { ModalTitle } from "./ModalTitle";

export function handleModal(ModalEl: Element) {
    const ModalTitleEl = putInDOM(ModalEl, 'beforeend', new ModalTitle().getElement());
    const ModalContentEl = putInDOM(ModalEl, 'beforeend', new ModalContent().getElement());
    const ModalLiEl = Playlists.map((modal: Playlist) => putInDOM(ModalContentEl, 'beforeend', new ModalLi(modal).getElement()));
    ModalLiEl.map((el: Element) => el.addEventListener('click', clickOnPlaylist));
    const ModalFooterEl = putInDOM(ModalEl, 'beforeend', new ModalFooter().getElement());
    const ModalCancelEl = putInDOM(ModalFooterEl, 'beforeend', new ModalCancel().getElement());
    ModalCancelEl.addEventListener('click', clickOnCancel);

    function clickOnPlaylist(el: Event) {
        const playlistN = Playlists.findIndex(playlist => Number((el.currentTarget as Element).id) === playlist.number);
        const trackId = Number((el.currentTarget as Element).parentElement?.parentElement?.getAttribute("track"));
        const trackname = (el.currentTarget as Element).parentElement?.parentElement?.getAttribute("trackname");
        const track = TracksData.find(track => track.id === trackId);

        if (Playlists[playlistN].tracks.find(track => track.id === trackId)) {
            alert(`Track <<${trackname}>> is already included into playlist <<${Playlists[playlistN].name}>>`)
        }
        else
            if (confirm(`Add track <<${trackname}>> into playlist <<${Playlists[playlistN].name}>> ?`)) {
                if (track) {
                    Playlists[playlistN].tracks.push(track);
                    PlaylistsTracks[playlistN].push(track);
                }
                addSong(Playlists[playlistN].id, trackId);
                ajustPlayTrack();
                ajustNumberOfTracks(playlistN);
            }
    }

    function clickOnCancel() {
        ModalEl.classList.remove('show')
    }
}
