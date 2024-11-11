export function offPlayTrack() {
    const ControlsGoBackwardEl = document.getElementById("goBackward");
    const ControlsGoForwardEl = document.getElementById("goForward");

    (ControlsGoBackwardEl as HTMLElement).setAttribute('disabled', '');
    (ControlsGoBackwardEl as HTMLElement).style.opacity = "0.5";
    (ControlsGoForwardEl as HTMLElement).setAttribute('disabled', '');
    (ControlsGoForwardEl as HTMLElement).style.opacity = "0.5";
}