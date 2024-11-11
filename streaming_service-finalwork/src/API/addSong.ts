import { USER_TOKEN } from "./handleAPI";

export async function addSong(playlistId: string, songId: number) {
    const response = await fetch(`http://localhost:3000/api/playlists/${playlistId}/add/${songId}`,
        {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${USER_TOKEN}`
            }
        }
    );
}

