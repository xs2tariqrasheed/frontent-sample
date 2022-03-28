import React, { useState } from 'react';
import Modal from 'react-modal';
import { VideoContainer } from './styled';
import GolfVideo from '../News/Arena_Golf_Final.mp4';
const VideoPoster = 'https://www.blockletegames.com/images/AboutPoster.png';

function VideoPopup() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  return (
    <>
      <button
        type="submit"
        className="btn md:w-40 w-full inline-block"
        onClick={() => setModalIsOpen(true)}
      >
        Watch Trailer
      </button>
      <Modal
        className="dne z-50"
        style={{
          overlay: {
            backgroundColor: 'rgba(38,34,93, 0.90)',
            zIndex: 50,
          },
        }}
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
      >
        <VideoContainer controls poster={VideoPoster} style={{}}>
          <source src={GolfVideo} type="video/mp4" />
        </VideoContainer>
      </Modal>
    </>
  );
}

export default VideoPopup;
