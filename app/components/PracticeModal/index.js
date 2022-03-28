import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Modal, CloseLink } from './styled';

const PracticeModal = props => {
  let beginnerLink = `/play/practice/${props.tokenId}/1`;
  let amateurLink = `/play/practice/${props.tokenId}/2`;
  let proLink = `/play/practice/${props.tokenId}/3`;

  if (props.demo) {
    beginnerLink = `/trialgolfer/${props.tokenId}/1`;
    amateurLink = `/trialgolfer/${props.tokenId}/2`;
    proLink = `/trialgolfer/${props.tokenId}/3`;
  }

  return (
    <Modal
      open={props.onOpen}
      className="fixed inset-0 w-full h-screen flex items-center justify-center bg-semi-75 bg-blueberry"
    >
      <div className="w-full max-w-4xl mx-3 sm:mx-8">
        <header className="py-8 relative bg-white flex items-center justify-center">
          <h1 className="text-xl w-1/2 text-center uppercase text-blueberry tracking-wide">
            Practice Range Difficulty
          </h1>
          <CloseLink
            className="absolute right-0 mr-3 sm:mr-8"
            onClick={() => {
              props.callbackClose();
            }}
          />
        </header>

        <div className="md:grid grid-cols-3 gap-6 p-3 md:p-10">
          <article className="card mb-5 md:mb-0">
            <Link
              to={beginnerLink}
              className="rounded overflow-hidden flex flex-row sm:flex-col h-full"
              onClick={() => {
                if (props.demo) {
                  window.dataLayer.push({
                    practiceLevel: 'beginner',
                    golferId: props.tokenId,
                    event: 'try golfer',
                  });
                } else {
                  window.dataLayer.push({
                    practiceLevel: 'beginner',
                    event: 'select level',
                  });
                }
              }}
            >
              <div className="card-header text-6xl px-5 py-8 text-center bg-yellow-itas-cream-yellow">
                <span
                  className="emoji"
                  role="img"
                  aria-label="smiling face emoji border-4 border-yellow"
                >
                  😊
                </span>
              </div>
              <section className="section-description px-6 py-4 bg-white w-full">
                <h1 className="uppercase tracking-wide font-bold text-sm mb-2">
                  Beginner
                </h1>
                <ul className="indent list-disc text-sm">
                  <li>2 large targets</li>
                  <li>No wind</li>
                  <li>Slow meters</li>
                </ul>
              </section>
            </Link>
          </article>
          <article className="card amateur mb-5 md:mb-0">
            <Link
              to={amateurLink}
              className="rounded overflow-hidden shadow-lg flex flex-row sm:flex-col h-full"
              onClick={() => {
                if (props.demo) {
                  window.dataLayer.push({
                    practiceLevel: 'amateur',
                    golferId: props.tokenId,
                    event: 'try golfer',
                  });
                } else {
                  window.dataLayer.push({
                    practiceLevel: 'amateur',
                    event: 'select level',
                  });
                }
              }}
            >
              <div className="card-header text-6xl px-5 py-8 text-center bg-itas-lavender">
                <span
                  className="emoji"
                  role="img"
                  aria-label="smiling face emoji border-4 border-yellow"
                >
                  😎
                </span>
              </div>
              <section className="section-description px-6 py-4 bg-white w-full">
                <h1 className="uppercase tracking-wide font-bold text-sm mb-2">
                  Amateur
                </h1>
                <ul className="indent list-disc text-sm">
                  <li>4 standard targets</li>
                  <li>0—4 mph winds</li>
                  <li>Standard meters</li>
                </ul>
              </section>
            </Link>
          </article>
          <article className="card pro mb-5 md:mb-0">
            <Link
              to={proLink}
              className="rounded overflow-hidden shadow-lg flex flex-row sm:flex-col h-full"
              onClick={() => {
                if (props.demo) {
                  window.dataLayer.push({
                    practiceLevel: 'pro',
                    golferId: props.tokenId,
                    event: 'try golfer',
                  });
                } else {
                  window.dataLayer.push({
                    practiceLevel: 'pro',
                    event: 'select level',
                  });
                }
              }}
            >
              <div className="card-header text-6xl px-5 py-8 text-center bg-green-golf-green hover:bg-red">
                <span
                  className="emoji"
                  role="img"
                  aria-label="smiling face emoji border-4 border-yellow"
                >
                  🤩
                </span>
              </div>
              <section className="section-description px-6 py-4 bg-white w-full">
                <h1 className="uppercase tracking-wide font-bold text-sm mb-2">
                  Pro
                </h1>
                <ul className="indent list-disc text-sm">
                  <li>5 small targets</li>
                  <li>0—8 mph winds</li>
                  <li>Faster meters</li>
                </ul>
              </section>
            </Link>
          </article>
        </div>
      </div>
    </Modal>
  );
};

PracticeModal.propTypes = {
  callbackClose: PropTypes.func,
  onOpen: PropTypes.bool,
  tokenId: PropTypes.number,
  demo: PropTypes.bool,
};

export default PracticeModal;
