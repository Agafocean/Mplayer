import { getSongs } from "./getSongs";
import { getUserPlaylists } from "./getUserPlaylists";
export let USER_TOKEN: string;

export async function handleAPI() {
    const username = "EvgenyAga";
    const password = "pass33";
    async function logUser() {
        const response = await fetch("http://localhost:3000/api/auth/login",
            {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                    // 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InN0cmluZzEiLCJpZCI6MiwiaWF0IjoxNzE3ODMyMzY1LCJleHAiOjE3MTg0MzcxNjV9.iOSUMrspYBGD3LPZ_OximVHzMWSFHLOzohoBid7zDAA'
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                    //  "firstName": "Evgeny",
                    //   "lastName": "Agafonov"
                })
            }
        );
        const userData = await response.json();
        return userData.access_token
    }
    USER_TOKEN = await logUser();
    await getSongs(username);
    await getUserPlaylists(username);
}
