import { TracksData } from "../GetData/ajustTracks";
import { handleTrack } from "../TracksLi/handleTrack";
import { putInDOM } from "../index";
import { TracksContent } from "./TracksContent";
import { TracksHeader } from "./TracksHeader";
import { TracksUl } from "./TracksUl";

export function handleSectionTracks(ModalEl:Element, SectionTracksEl:Element, FooterEl: Element) {   
    const TracksContentEl = putInDOM(SectionTracksEl, 'beforeend', new TracksContent().getElement());
    const TracksHeaderEl = putInDOM(TracksContentEl, 'beforeend', new TracksHeader().getElement());
    const TracksUlEl = putInDOM(TracksContentEl, 'beforeend', new TracksUl().getElement());
    TracksData.map((track) => handleTrack(TracksUlEl, ModalEl, FooterEl, track, 1));
    return TracksUlEl
}