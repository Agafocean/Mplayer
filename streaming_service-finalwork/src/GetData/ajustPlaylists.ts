// search filtering of playlists info
// id - playlist id in backend, number - playlist number from 1 to 8, indOfPicture - playlist picture index

import { searchValue } from "../Header/handleHeader";
import { Track } from "./ajustTracks"

export interface PlaylistInit {
  id: string, number: number, name: string, indOfPicture: number, tracksInit: Track[]
};

export interface Playlist {
  id: string, number: number, name: string, indOfPicture: number, tracks: Track[]
};

export const Playlists: Playlist[] = [];
export const PlaylistsTracks: Track[][] = [];

export function ajustPlaylists() {

  for (let i = 0; i < Playlists.length; i++) {
    Playlists[i].tracks.splice(0);
    Playlists[i].tracks.push(...PlaylistsTracks[i].filter((track) => track.name.includes(searchValue)
      || track.author.includes(searchValue) || track.album.includes(searchValue)
    ));

  };
  return Playlists
}