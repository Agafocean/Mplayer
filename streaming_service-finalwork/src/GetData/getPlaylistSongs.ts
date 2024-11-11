// get current playlist songs

import { FavouriteTracksData } from "./ajustFavouriteTracks";
import { getPlayTrack } from "./getPlayTrack";
import { Playlists } from "./ajustPlaylists";
import { TracksData } from "./ajustTracks";

export function getPlaylistSongs() {
    switch (getPlayTrack().playPlaylist) {
        case "-2":
            return TracksData
        case "0":
            return FavouriteTracksData
        default:
            return Playlists[Number(getPlayTrack().playPlaylist) - 1].tracks
    };
}