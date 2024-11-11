import { PlaylistsTitle } from "./PlaylistsTitle";
import { PlaylistsUl } from "./PlaylistsUl";
import { putInDOM } from "../index";
import { PlaylistsLi } from "./PlaylistsLi";
import { PlaylistsMenu } from "./PlaylistsMenu";
import { PlaylistsHeader } from "./PlaylistsHeader";
import { PlaylistsMenuAdd } from "./PlaylistsMenuAdd";
import { PlaylistsMenuRemove } from "./PlaylistsMenuRemove";
import { PlaylistsMenuEdit } from "./PlaylistsMenuEdit";
import { Playlist, Playlists, PlaylistsTracks } from "../GetData/ajustPlaylists";
import { PlaylistNameInput } from "./PlaylistNameInput";
import { handleModal } from "../Modal/handleModal";
import { handleAside } from "../Aside/handleAside";
import { addPlaylist } from "../API/addPlaylist";
import { deletePlaylist } from "../API/deletePlaylist";
import { switchPlayTrack } from "../Footer/switchPlayTrack";
import { handleFooter } from "../Footer/handleFooter";
import { getPlayTrack } from "../GetData/getPlayTrack";
import { offPlaylists } from "./offPlaylists";
import { offPlayTrack } from "../Footer/offPlayTrack";


export function handleSectionPlaylists(SectionPlaylistsEl: Element, ModalEl: Element, ContentWrapEl: Element,
    SectionTracksEl: Element, TracksTitleEl: Element, TracksUlEl: Element, FooterEl: Element) {
    const playlistNumbers = [1, 2, 3, 4, 5, 6, 7, 8];
    let NameInputValue = '';
    let edit = false;
    const PlaylistsHeaderEl = putInDOM(SectionPlaylistsEl, 'beforeend', new PlaylistsHeader().getElement());
    const PlaylistsTitleEl = putInDOM(PlaylistsHeaderEl, 'beforeend', new PlaylistsTitle().getElement());
    const PlaylistNameInputEl = putInDOM(PlaylistsHeaderEl, 'beforeend', new PlaylistNameInput().getElement());
    const PlaylistsMenuEl = putInDOM(PlaylistsHeaderEl, 'beforeend', new PlaylistsMenu().getElement());
    const PlaylistsUlEl = putInDOM(SectionPlaylistsEl, 'beforeend', new PlaylistsUl().getElement());
    Playlists.map((playlist: Playlist) => {
        const PlaylistEl = putInDOM(PlaylistsUlEl, 'beforeend', new PlaylistsLi(playlist).getElement());
        PlaylistEl.addEventListener('click', clickOnPlaylist);
    });

    PlaylistsMenuEl.addEventListener('click', clickOnMenu);

    let PlaylistsMenuEditEl = putInDOM(PlaylistsMenuEl, 'beforeend', new PlaylistsMenuEdit(edit).getElement());
    handleMenuEdit();

    function clickOnPlaylist(event: Event) {
        const playlistId = (event.target as HTMLElement).id;
        const playlist = Playlists[Number(playlistId) - 1];
        const track = playlist.tracks[0];

        if (playlist.tracks.length) {
            offPlaylists();
            getPlayTrack().isPlaylist = true;
            (event.target as HTMLElement).style.color = '#FC6D3E';

            if (track) {
                switchPlayTrack(track, playlistId);
                getPlayTrack().repeat = false;
                //           getPlayTrack().random = false;
                FooterEl.innerHTML = '';
                handleFooter(FooterEl, getPlayTrack().playTrackEl);
            }
        }
        else alert(`Playlist <<${playlist.name}>> is empty`)
    };
    function clickOnMenu() {
        edit = !edit;
        if (edit && !PlaylistNameInputEl.classList.contains('show')) {
            PlaylistNameInputEl.classList.add('show')
        }
        if (!edit) {
            PlaylistNameInputEl.classList.remove('show')
        }
        PlaylistsMenuEditEl.remove();
        PlaylistsMenuEditEl = putInDOM(PlaylistsMenuEl, 'beforeend', new PlaylistsMenuEdit(edit).getElement());
        handleMenuEdit();
    };
    function setNumberInPlaylist() {
        for (const number of playlistNumbers) {
            if (!Playlists.find(playlist => playlist.indOfPicture == number)) return number
        }
        return Playlists.length
    }
    function renewPlaylists() {
        (PlaylistNameInputEl.firstElementChild as HTMLInputElement).value = '';
        NameInputValue = '';
        PlaylistsUlEl.innerHTML = '';

        Playlists.map((playlist: Playlist, index: number) => {
            playlist.number = index + 1;
            const PlaylistEl = putInDOM(PlaylistsUlEl, 'beforeend', new PlaylistsLi(playlist).getElement())
            PlaylistEl.addEventListener('click', clickOnPlaylist);
        });

        ModalEl.innerHTML = '';
        handleModal(ModalEl);
        if (ContentWrapEl.firstElementChild) ContentWrapEl.firstElementChild.remove();
        handleAside(ContentWrapEl, ModalEl, SectionPlaylistsEl, SectionTracksEl, TracksTitleEl, TracksUlEl, FooterEl);
        clickOnMenu();
    }
    async function clickOnMenuAdd() {
        if (NameInputValue) {
            if (Playlists.find(nm => nm.name === NameInputValue))
                alert(`The name <<${NameInputValue}>> already exists`);
            else
                if (confirm(`Add playlist <<${NameInputValue}>> ?`)) {
                    const id = await addPlaylist(setNumberInPlaylist() + NameInputValue);
                    Playlists.push({ id: id, number: Playlists.length, name: NameInputValue, indOfPicture: setNumberInPlaylist(), tracks: [] });
                    PlaylistsTracks.push([]);
                    renewPlaylists();
                }
        }
        else alert('Enter playlist name')
    }
    function clickOnMenuRemove() {
        if (NameInputValue) {
            const ind = Playlists.findIndex(nm => nm.name === NameInputValue);
            if (ind === -1)
                alert(`The name <<${NameInputValue}>> is missing`);
            else
                if (confirm(`Remove playlist <<${NameInputValue}>> ?`)) {
                    const id = Playlists[ind].id;
                    const name = Playlists[ind].name;
                    const np = Playlists.findIndex((playlist: Playlist) => playlist.name === NameInputValue);
                    Playlists.splice(np, 1);
                    PlaylistsTracks.splice(np, 1);
                    deletePlaylist(name, id);
                    renewPlaylists();

                    if (Number(getPlayTrack().playPlaylist) === ind + 1) {
                        getPlayTrack().isPlaylist = false;
                        offPlayTrack();
                    }
                }
        }
        else alert('Enter playlist name')
    }
    function handleMenuEdit() {
        PlaylistsMenuEditEl.addEventListener('click', clickOnMenu);

        if (Playlists.length < 8) {
            let PlaylistsMenuAddEl = putInDOM(PlaylistsMenuEditEl, 'beforeend', new PlaylistsMenuAdd().getElement());
            PlaylistsMenuAddEl.addEventListener('click', clickOnMenuAdd);
        }

        let PlaylistsMenuRemoveEl = putInDOM(PlaylistsMenuEditEl, 'beforeend', new PlaylistsMenuRemove().getElement());
        PlaylistsMenuRemoveEl.addEventListener('click', clickOnMenuRemove);
    }

    PlaylistNameInputEl.addEventListener('input', clickOnNameInput);

    function clickOnNameInput(el: Event) {
        NameInputValue = (el.target as HTMLInputElement).value;
    }
}

