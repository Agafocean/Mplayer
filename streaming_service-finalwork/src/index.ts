import './css/style.css';
import { Header } from './Header/Header';
import { OverWrapper } from './OverWrapper/OverWrapper';
import { ContentWrap } from './ContentWrap/ContentWrap';
import { Footer } from './Footer/Footer';
import { Main } from './Main/Main';
import { SectionTracks } from './SectionTracks/SectionTracks';
import { SectionPlaylists } from './SectionPlaylists/SectionPlaylists';
import { Modal } from './Modal/Modal';
import { handleSectionPlaylists } from './SectionPlaylists/handleSectionPlaylists';
import { handleModal } from './Modal/handleModal';
import { handleAside } from './Aside/handleAside';
import { handleSectionTracks } from './SectionTracks/handleSectionTracks';
import { TracksTitle } from './SectionTracks/TracksTitle';
import { handleHeader } from './Header/handleHeader';
import { handleAPI } from './API/handleAPI';
import { TracksData } from './GetData/ajustTracks';
import { getPlayTrack } from './GetData/getPlayTrack';
import { ControlsPlaying } from './Footer/ControlsPlaying';

export function putInDOM(container: Element, place: InsertPosition, element: Element): Element {
  const newContainer = container.insertAdjacentElement(place, element)
  return newContainer ? newContainer : container
}

async function main() {
  await handleAPI();

  const body = document.body;
  const OverWrapperEl = putInDOM(body, 'beforeend', new OverWrapper().getElement());

  const HeaderEl = putInDOM(OverWrapperEl, 'beforeend', new Header().getElement());
  handleHeader(HeaderEl);

  const ContentWrapEl = putInDOM(OverWrapperEl, 'beforeend', new ContentWrap().getElement());
  const FooterEl = putInDOM(OverWrapperEl, 'beforeend', new Footer().getElement());

  // getPlayTrack - current playtrack info, initially first track info
  getPlayTrack().playTrackId = TracksData[0].id;
  getPlayTrack().playTrackEl = new ControlsPlaying(TracksData[0].path, false).getElement();

  const ModalEl = putInDOM(body, 'beforeend', new Modal().getElement());
  handleModal(ModalEl);

  const MainEl = putInDOM(ContentWrapEl, 'beforeend', new Main().getElement());

  const SectionTracksEl = putInDOM(MainEl, 'beforeend', new SectionTracks().getElement());
  const TracksTitleEl = putInDOM(SectionTracksEl, 'beforeend', new TracksTitle('Songs').getElement());
  const TracksUlEl = handleSectionTracks(ModalEl, SectionTracksEl, FooterEl);

  const SectionPlaylistsEl = putInDOM(MainEl, 'beforeend', new SectionPlaylists().getElement());
  handleSectionPlaylists(SectionPlaylistsEl, ModalEl, ContentWrapEl, SectionTracksEl, TracksTitleEl, TracksUlEl, FooterEl);

  const SectionPlaylistTracksEl = putInDOM(MainEl, 'beforeend', new SectionTracks().getElement());

  handleAside(ContentWrapEl, ModalEl, SectionPlaylistsEl, SectionTracksEl, TracksTitleEl, TracksUlEl, FooterEl);

  body.click();
};

main();