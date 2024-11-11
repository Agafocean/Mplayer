import { currentPlaylist } from "../Aside/handleAside";
import { ajustPlayTrack } from "../Footer/ajustPlayTrack";
import { ajustFavouriteTracks } from "../GetData/ajustFavouriteTracks";
import { ajustPlaylists } from "../GetData/ajustPlaylists";
import { ajustTracks } from "../GetData/ajustTracks";
import { putInDOM } from "../index";
import { HeaderLogo } from "./HeaderLogo";
import { HeaderSearch } from "./HeaderSearch";
import { HeaderUser } from "./HeaderUser";

export let searchValue = '';

export function handleHeader(HeaderEl: Element) {
    const HeaderLogoEl = putInDOM(HeaderEl, 'beforeend', new HeaderLogo().getElement());
    const HeaderSearchEl = putInDOM(HeaderEl, 'beforeend', new HeaderSearch().getElement());
    const HeaderUserEl = putInDOM(HeaderEl, 'beforeend', new HeaderUser().getElement());

    HeaderSearchEl.addEventListener('keyup', clickOnInput);

    function clickOnInput(el: Event) {
        if ((el as KeyboardEvent).code === 'Enter') {
            searchValue = (HeaderSearchEl.firstElementChild as HTMLInputElement).value;
            ajustTracks();
            ajustFavouriteTracks();
            ajustPlaylists();
            ajustPlayTrack();            
            currentPlaylist.click();
        }
    }
}

