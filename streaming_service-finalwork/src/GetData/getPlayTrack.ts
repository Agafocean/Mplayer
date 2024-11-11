// current playtrack info
// playPlaylist - playlist code (-2, 0, 1 to 8), playTrackIndInPlaylist - track index in playlist,
// random - is not used, repeat - repeat (on, off), 
// playTrackEl - current playtrack element, isPlaylist - if true then playlist (all songs from playlist) is playing

import { ControlsPlaying } from "../Footer/ControlsPlaying";

export interface PlayTrack {
    playPlaylist: string, playTrackId: number, playTrackIndInPlaylist: number,
    random: boolean, repeat: boolean, volume: number, muted: boolean,
    playTrackEl: Element, isPlaylist: boolean
};

const PlayTrack: PlayTrack = {
    playPlaylist: "-2", playTrackId: 0, playTrackIndInPlaylist: 0,
    random: false, repeat: false, volume: 0.5, muted: false,
    playTrackEl: new ControlsPlaying('', false).getElement(),
    isPlaylist: false
};

export function getPlayTrack() {
    return PlayTrack
} 