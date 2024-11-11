import { getPlayTrack } from "./getPlayTrack";
import { Track } from "./ajustTracks";

export function shuffle(array: Track[]) {
  const startFromInd = getPlayTrack().playTrackIndInPlaylist + 1;

  for (let i = array.length - 1; i > startFromInd; i--) {
    let j = Math.floor(Math.random() * (i - startFromInd + 1) + startFromInd);
    [array[i], array[j]] = [array[j], array[i]];
  };

  return array
}