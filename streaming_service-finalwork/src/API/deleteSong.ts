import { USER_TOKEN } from "./handleAPI";

export async function deleteSong(playlistId: string, songId: number) {
    const response = await fetch(`http://localhost:3000/api/playlists/${playlistId}/remove/${songId}`,
        {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${USER_TOKEN}`
            }
        }
    );
}

