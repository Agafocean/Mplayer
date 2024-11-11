import { USER_TOKEN } from "./handleAPI";

export async function deletePlaylist(playlistName: string, playlistId: string) {
    const response = await fetch(`http://localhost:3000/api/playlists/${playlistId}`,
        {
            method: 'DELETE',
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
}

