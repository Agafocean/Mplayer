import { addlike } from "../API/addLike";
import { deleteLike } from "../API/deleteLike";
import { FavouriteTracksData, FavouriteTracksDataInit } from "./ajustFavouriteTracks";
import { Playlists } from "./ajustPlaylists";
import { Track, TracksData } from "./ajustTracks";

export function ajustLikes(track: Track) {
    track.like = !track.like;
    track.like ? addlike(track.id) : deleteLike(track.id);
    track.like ? !FavouriteTracksData.find(trackAdd => trackAdd.id === track.id) ? FavouriteTracksData.push(track) : void (0)
        : FavouriteTracksData.splice(FavouriteTracksData.findIndex(trackDel => trackDel.id === track.id), 1);
    track.like ? !FavouriteTracksDataInit.find(trackAdd => trackAdd.id === track.id) ? FavouriteTracksDataInit.push(track) : void (0)
        : FavouriteTracksDataInit.splice(FavouriteTracksDataInit.findIndex(trackDel => trackDel.id === track.id), 1);

    const trk = TracksData.find(trk => trk.id === track.id);
    if (trk) trk.like = track.like;

    Playlists.map(pl => {
        const trk = pl.tracks.find(trk => trk.id === track.id);
        if (trk) trk.like = track.like;
    })
}