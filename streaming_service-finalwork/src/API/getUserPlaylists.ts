import { Playlist, Playlists, PlaylistsTracks } from "../GetData/ajustPlaylists";
import { Track } from "../GetData/ajustTracks";
import { USER_TOKEN } from "./handleAPI";

export async function getUserPlaylists(user: string) {
    const response = await fetch(`http://localhost:3000/api/users/${user}/playlists`,
        {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${USER_TOKEN}`
            },
        }
    );
    const userPlaylists = await response.json();

    const playlistsData = userPlaylists.map((playlist: any, index: number) => (
        {
            id: playlist.id, number: index + 1, name: playlist.name.slice(1),
            indOfPicture: playlist.name.charAt(0), tracks: playlist.songs.map((song: any) => ({
                id: song.id, img: song.image, name: song.name, author: song.artist.name,
                album: song.album.name, data: song.createdAt,
                like: song.likes.find((like: any) => like.username === user),
                time: song.duration, edit: false, path: song.path
            }))
        }
    ));
// playlists info
    playlistsData.map((playlist: Playlist) => {
        Playlists.push(playlist);
    });
// playlist tracks info, search filtering doesn't change it
    PlaylistsTracks.push(...playlistsData.map((playlist: Playlist) =>
        playlist.tracks.map((song: Track) => song)));
}