import { USER_TOKEN } from "./handleAPI";

export async function deleteLike(songId: number) {
    const response = await fetch(`http://localhost:3000/api/songs/${songId}/unlike`,
        {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${USER_TOKEN}`
            }
        }
    );
}

