export function offPlaylists() {
    const playlistsEl = document.querySelectorAll(".playlist__h3__link");    
    playlistsEl.forEach(e => (e as HTMLElement).style.color = "#11253D")
}    