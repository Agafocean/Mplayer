import { FavouriteTracksData } from "../GetData/ajustFavouriteTracks";
import { getPlayTrack } from "../GetData/getPlayTrack";
import { getPlaylistSongs } from "../GetData/getPlaylistSongs";
import { Playlists } from "../GetData/ajustPlaylists";
import { TracksData } from "../GetData/ajustTracks";
import { offPlayTrack } from "./offPlayTrack";

export function ajustPlayTrack() {
    const ControlsGoBackwardEl = document.getElementById("goBackward");
    const ControlsGoForwardEl = document.getElementById("goForward");

    if (ControlsGoBackwardEl) {
        let ind: number = 0;
        switch (getPlayTrack().playPlaylist) {
            case "-2":
                ind = TracksData.findIndex(e => e.id === getPlayTrack().playTrackId)
                break;
            case "0":
                ind = FavouriteTracksData.findIndex(e => e.id === getPlayTrack().playTrackId)
                break;
            default:
                ind = Playlists[Number(getPlayTrack().playPlaylist) - 1].tracks.findIndex(e => e.id === getPlayTrack().playTrackId)
        };

        if (ind === -1) {
            const i = getPlayTrack().playTrackIndInPlaylist;
            if (i !== 0) getPlayTrack().playTrackIndInPlaylist = i - 1;
            offPlayTrack();
        }
        else {
            getPlayTrack().playTrackIndInPlaylist = ind;

            (ControlsGoBackwardEl as HTMLElement).removeAttribute('disabled');
            (ControlsGoBackwardEl as HTMLElement).style.opacity = "1";
            (ControlsGoForwardEl as HTMLElement).removeAttribute('disabled');
            (ControlsGoForwardEl as HTMLElement).style.opacity = "1";

            if (getPlayTrack().playTrackIndInPlaylist === 0) {
                (ControlsGoBackwardEl as HTMLElement).setAttribute('disabled', '');
                (ControlsGoBackwardEl as HTMLElement).style.opacity = "0.5";
            }
            if (getPlayTrack().playTrackIndInPlaylist === (getPlaylistSongs().length - 1)) {
                (ControlsGoForwardEl as HTMLElement).setAttribute('disabled', '');
                (ControlsGoForwardEl as HTMLElement).style.opacity = "0.5";
            }
        }
    }
}