// handle player of current playing track

import { getPlayTrack } from "../GetData/getPlayTrack";
import { TracksData } from "../GetData/ajustTracks";
import { putInDOM } from "../index";
import { ControlsPlay } from "./ControlsPlay";
import { ControlsRandom } from "./ControlsRandom";
import { ControlsRepeat } from "./ControlsRepeat";
import { ControlsPlayedTime } from "./ControlsPlayedTime";
import { Player } from "./Player";
import { PlayerControls } from "./PlayerControls";
import { PlayerControlsFooter } from "./PlayerControlsFooter";
import { PlayerControlsHeader } from "./PlayerControlsHeader";
import { PlayerTrackName } from "./PlayerTrackName";
import { ControlsProgressBar } from "./ControlsProgressBar";
import { ControlsDuration } from "./ControlsDuration";
import { PlayerVolume } from "./PlayerVolume";
import { PlayerVolumeSign } from "./PlayerVolumeSign";
import { PlayerVolumeBar } from "./PlayerVolumeBar";
import { PlayerTrackImg } from "./PlayerTrackImg";
import { PlayerNameContent } from "./PlayerNameContent";
import { PlayerNameHeader } from "./PlayerNameHeader";
import { PlayerSongName } from "./PlayerSongName";
import { PlayerSongLike } from "./PlayerSongLike";
import { PlayerSongAuthor } from "./PlayerSongAuthor";
import { currentPlaylist } from "../Aside/handleAside";
import { switchPlayTrack } from "./switchPlayTrack";
import { getPlaylistSongs } from "../GetData/getPlaylistSongs";
import { ControlsGoBackward } from "./ControlesGoBackward";
import { ControlsGoForward } from "./ControlsGoForward";
import { ajustPlayTrack } from "./ajustPlayTrack";
import { shuffle } from "../GetData/shuffle";
import { CloseFooter } from "./CloseFooter";
import { ajustLikes } from "../GetData/ajustLikes";

export function handleFooter(FooterEl: Element, ControlsPlayingEl: Element) {
    const track = TracksData.find((track) => track.id === getPlayTrack().playTrackId) ?? TracksData[0];

    const PlayerEl = putInDOM(FooterEl, 'beforeend', new Player().getElement());
    const PlayerTrackNameEl = putInDOM(PlayerEl, 'beforeend', new PlayerTrackName().getElement());
    const PlayerTrackImgEl = putInDOM(PlayerTrackNameEl, 'beforeend', new PlayerTrackImg(track).getElement());
    const PlayerNameContentEl = putInDOM(PlayerTrackNameEl, 'beforeend', new PlayerNameContent().getElement());
    const PlayerNameHeaderEl = putInDOM(PlayerNameContentEl, 'beforeend', new PlayerNameHeader().getElement());
    const PlayerSongNameEl = putInDOM(PlayerNameHeaderEl, 'beforeend', new PlayerSongName(track).getElement());

    let PlayerSongLikeEl = putInDOM(PlayerNameHeaderEl, 'beforeend', new PlayerSongLike(track).getElement());
    PlayerSongLikeEl.addEventListener('click', clickOnLike);

    const PlayerSongAuthorEl = putInDOM(PlayerNameContentEl, 'beforeend', new PlayerSongAuthor(track).getElement());
    const PlayerControlsEl = putInDOM(PlayerEl, 'beforeend', new PlayerControls().getElement());
    const PlayerControlsHeaderEl = putInDOM(PlayerControlsEl, 'beforeend', new PlayerControlsHeader().getElement());
    const ControlsRandomEl = putInDOM(PlayerControlsHeaderEl, 'beforeend', new ControlsRandom().getElement());
    ControlsRandomEl.addEventListener('click', goRandom);

    const ControlsGoBackwardEl = putInDOM(PlayerControlsHeaderEl, 'beforeend', new ControlsGoBackward().getElement());
    ControlsGoBackwardEl.addEventListener('click', goBack);
    if (getPlayTrack().playTrackIndInPlaylist === 0) {
        (ControlsGoBackwardEl as HTMLElement).setAttribute('disabled', '');
        (ControlsGoBackwardEl as HTMLElement).style.opacity = "0.5";
    }

    const ControlsPlayEl = putInDOM(PlayerControlsHeaderEl, 'beforeend', new ControlsPlay(true).getElement());
    ControlsPlayEl.addEventListener('click', clickOnPlay);

    const ControlsGoForwardEl = putInDOM(PlayerControlsHeaderEl, 'beforeend', new ControlsGoForward().getElement());
    ControlsGoForwardEl.addEventListener('click', goForward);
    if (getPlayTrack().playTrackIndInPlaylist === (getPlaylistSongs().length - 1)) {
        (ControlsGoForwardEl as HTMLElement).setAttribute('disabled', '');
        (ControlsGoForwardEl as HTMLElement).style.opacity = "0.5";
    }

    const ControlsRepeatEl = putInDOM(PlayerControlsHeaderEl, 'beforeend', new ControlsRepeat().getElement());
    ControlsRepeatEl.addEventListener('click', goRepeat);

    const PlayerControlsFooterEl = putInDOM(PlayerControlsEl, 'beforeend', new PlayerControlsFooter().getElement());
    const ControlsPlayedTimeEl = putInDOM(PlayerControlsFooterEl, 'beforeend', new ControlsPlayedTime().getElement());

    const ControlsProgressBarEl = putInDOM(PlayerControlsFooterEl, 'beforeend', new ControlsProgressBar().getElement());
    ControlsProgressBarEl.addEventListener('click', clickOnProgressBar);

    const ControlsDurationEl = putInDOM(PlayerControlsFooterEl, 'beforeend', new ControlsDuration(track).getElement());
    const PlayerVolumeEl = putInDOM(PlayerEl, 'beforeend', new PlayerVolume().getElement());
    const PlayerVolumeMute = document.getElementById("player__value-mute");

    const PlayerVolumeSignEl = putInDOM(PlayerVolumeEl, 'afterbegin', new PlayerVolumeSign().getElement());
    PlayerVolumeSignEl.addEventListener("click", clickOnVolumeSign);

    const PlayerVolumeBarEl = putInDOM(PlayerVolumeEl, 'beforeend', new PlayerVolumeBar().getElement());
    (ControlsPlayingEl as HTMLMediaElement).volume = getPlayTrack().volume;
    PlayerVolumeBarEl.addEventListener("input", clickOnVolumeBar);

    const CloseFooterEl = putInDOM(PlayerEl, 'beforeend', new CloseFooter().getElement());
    CloseFooterEl.addEventListener("click", clickOnCloseFooter);

    setTimeout(clickOnPlay);

    function clickOnLike() {
        ajustLikes(track); // synchronizing likes in all playlists

        PlayerSongLikeEl.remove();
        PlayerSongLikeEl = putInDOM(PlayerNameHeaderEl, 'beforeend', new PlayerSongLike(track).getElement());
        PlayerSongLikeEl.addEventListener('click', clickOnLike);

        ajustPlayTrack(); // update current playtrack info and player
                          // in accordance with user's actions
        currentPlaylist.click();
    }

    function clickOnPlay() {
        const sound = ControlsPlayingEl as HTMLMediaElement;

        if (sound.paused) {
            sound.play();
            ControlsPlayEl.innerHTML = new ControlsPlay(false).getTemplate()
        }
        else {
            sound.pause();
            ControlsPlayEl.innerHTML = new ControlsPlay(true).getTemplate()
        };

        sound.addEventListener('timeupdate', () => {
            const width = (sound.currentTime / Number(track.time)) * 100000;
            (ControlsProgressBarEl.firstElementChild as HTMLElement).style.width = width + "%";

            const s = sound.currentTime;
            const minutes = Math.trunc(s / 60);
            let seconds = String(Math.trunc(s % 60));
            if (Number(seconds) < 10) {
                seconds = '0' + seconds;
            }
            ControlsPlayedTimeEl.textContent = minutes + ':' + seconds;
        });

        sound.addEventListener('ended', () => {
            const trackInd = getPlayTrack().playTrackIndInPlaylist;
            if (getPlayTrack().isPlaylist) (trackInd + 1 < getPlaylistSongs().length) ? goForward() : goBegin();
            else ControlsPlayEl.innerHTML = new ControlsPlay(true).getTemplate()
        });
    }

    function goBack() {
        switchPlayTrack(getPlaylistSongs()[getPlayTrack().playTrackIndInPlaylist - 1], getPlayTrack().playPlaylist);
        FooterEl.innerHTML = '';
        handleFooter(FooterEl, getPlayTrack().playTrackEl);
    }

    function goForward() {
        switchPlayTrack(getPlaylistSongs()[getPlayTrack().playTrackIndInPlaylist + 1], getPlayTrack().playPlaylist);
        FooterEl.innerHTML = '';
        handleFooter(FooterEl, getPlayTrack().playTrackEl);
    }

    function goBegin() {
        if (getPlayTrack().repeat) {
            switchPlayTrack(getPlaylistSongs()[0], getPlayTrack().playPlaylist);
            FooterEl.innerHTML = '';
            handleFooter(FooterEl, getPlayTrack().playTrackEl);
        }
        else ControlsPlayEl.innerHTML = new ControlsPlay(true).getTemplate()
    }

    function goRepeat() {
        getPlayTrack().repeat = !getPlayTrack().repeat;
        if (!getPlayTrack().isPlaylist) (ControlsPlayingEl as HTMLMediaElement).loop = getPlayTrack().repeat;
        getPlayTrack().repeat ? (!ControlsRepeatEl.classList.contains("player__repeat-btn-on") ?
            ControlsRepeatEl.classList.add("player__repeat-btn-on") : void (0)) :
            ControlsRepeatEl.classList.remove("player__repeat-btn-on");
    }

    function goRandom() {
        shuffle(getPlaylistSongs());
        currentPlaylist.click();
    }

    function clickOnVolumeSign() {
        getPlayTrack().muted = !getPlayTrack().muted;
        (ControlsPlayingEl as HTMLMediaElement).muted = getPlayTrack().muted;

        if (PlayerVolumeMute)
            getPlayTrack().muted ? PlayerVolumeMute.style.visibility = 'visible'
                : PlayerVolumeMute.style.visibility = 'hidden'
    }

    function clickOnVolumeBar() {
        (ControlsPlayingEl as HTMLMediaElement).volume = Number((PlayerVolumeBarEl as HTMLInputElement).value) / 100;
        getPlayTrack().volume = Number((PlayerVolumeBarEl as HTMLInputElement).value) / 100;
    }

    function clickOnProgressBar(e: Event) {
        const progressBar = document.querySelector(".player__range-play");
        const sound = ControlsPlayingEl as HTMLMediaElement;
        if (sound.ended) {
            sound.play();
            ControlsPlayEl.innerHTML = new ControlsPlay(false).getTemplate();
        }
        let posX = (e as MouseEvent).pageX - (e.target as HTMLElement).offsetLeft;
        let progressWidth = (progressBar as HTMLElement).offsetWidth;
        let percentage = (posX / progressWidth) * 100;
        sound.currentTime = percentage / 100 * sound.duration;
    }

    function clickOnCloseFooter() {
        FooterEl.innerHTML = '';
        ControlsPlayingEl.remove();
    }
}    