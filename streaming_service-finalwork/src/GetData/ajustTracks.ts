// search filtering of tracks
// edit - means that at the moment we deal with the track (add or remove)

import { searchValue } from "../Header/handleHeader";

export interface Track {
    id: number, img: string, name: string, author: string, album: string,
    data: string, like: boolean, time: string, edit: boolean, path: string
};

export const TracksDataInit: Track[] = [];
export const TracksData: Track[] = [];

export function ajustTracks() {
    TracksData.splice(0);
    TracksData.push(...TracksDataInit.filter((track) => track.name.includes(searchValue) ||
        track.author.includes(searchValue) || track.album.includes(searchValue)));        
    return TracksData
} 