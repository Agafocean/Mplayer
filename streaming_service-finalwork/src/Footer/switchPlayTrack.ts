// switch to another track to play
// playlist codes: "-2" - Songs,
// "0" - Favourite songs, from "1" to "8" - user's playlist codes 

import { ControlsPlaying } from "./ControlsPlaying";
import { FavouriteTracksData } from "../GetData/ajustFavouriteTracks";
import { getPlayTrack } from "../GetData/getPlayTrack";
import { Playlists } from "../GetData/ajustPlaylists";
import { Track, TracksData } from "../GetData/ajustTracks";

export function switchPlayTrack(track: Track, playlistId: string) {
    let ind: number = 0;
    switch (playlistId) {
        case "-2":
            ind = TracksData.findIndex(e => e.id === track.id)
            break;
        case "0":
            ind = FavouriteTracksData.findIndex(e => e.id === track.id)
            break;
        default:
            ind = Playlists[Number(playlistId) - 1].tracks.findIndex(e => e.id === track.id)
    };
    getPlayTrack().playTrackEl.remove();
    getPlayTrack().playPlaylist = playlistId;
    getPlayTrack().playTrackId = track.id;
    getPlayTrack().playTrackIndInPlaylist = ind;
    getPlayTrack().playTrackEl = new ControlsPlaying(track.path, getPlayTrack().muted).getElement();
    if (!getPlayTrack().isPlaylist) {
        getPlayTrack().repeat = false;
     //   getPlayTrack().random = false;
    }
}