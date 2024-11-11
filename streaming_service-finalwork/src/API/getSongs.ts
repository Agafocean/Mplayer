import { FavouriteTracksData, FavouriteTracksDataInit } from "../GetData/ajustFavouriteTracks";
import { Track, TracksData, TracksDataInit } from "../GetData/ajustTracks";
import { USER_TOKEN } from "./handleAPI";

export async function getSongs(username: string) {
    const response = await fetch("http://localhost:3000/api/songs",
        {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${USER_TOKEN}`
            },
        }
    );
    const songs = await response.json();
    const songsData = songs.map((song: any) => (
        {
            id: song.id, img: song.image, name: song.name, author: song.artist.name,
            album: song.album.name, data: song.createdAt,
            like: song.likes.find((like: any) => like.username === username),
            time: song.duration, edit: false, path: song.path
        }
    ));
    songsData.map((song: Track) => {
        TracksDataInit.push(song); // TracksDataInit - array of tracks info without search filtering
        TracksData.push(song); // TracksData - current array of tracks to deal with
        if (song.like) {
            FavouriteTracksDataInit.push(song);
            FavouriteTracksData.push(song);
        }
    });
}