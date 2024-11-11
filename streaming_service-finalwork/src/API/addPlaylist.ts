import { USER_TOKEN } from "./handleAPI";

export async function addPlaylist(playlistName: string) {
    const response = await fetch("http://localhost:3000/api/playlists",
        {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${USER_TOKEN}`
            },
            body: JSON.stringify({
                name: playlistName
            })
        }
    );
    const playlistData = await response.json();    
    return playlistData.id
}
