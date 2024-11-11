import { Track } from "./ajustTracks"
import { searchValue } from "../Header/handleHeader";

export const FavouriteTracksDataInit: Track[] = [];
export const FavouriteTracksData: Track[] = [];

export function ajustFavouriteTracks() {
    FavouriteTracksData.splice(0);
    FavouriteTracksData.push(...FavouriteTracksDataInit.filter((track) => track.name.includes(searchValue) ||
        track.author.includes(searchValue) || track.album.includes(searchValue)))
    return FavouriteTracksData
}