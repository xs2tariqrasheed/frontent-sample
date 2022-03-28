/*
 *
 * Where a golfer plays a trial round
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import GameEndModal from 'components/GameEndModal';
import WarningModal from './WarningModal';
import { Frame } from './styled';

const Demo = props => {
  const [openPlayModal, setOpenPlayModal] = useState(false);
  const [openWarningModal, setOpenWarningModal] = useState(false);

  const [gameScore, setGameScore] = useState(0);
  const [shotCounter, setShotCounter] = useState(1);

  const playGameAgain = () => {
    setTimeout(() => {
      const iframe = document.getElementById('game-frame');
      iframe.contentWindow.postMessage(
        {
          messageType: 'newgame',
          demo: true,
        },
        'https://playcanv.as',
      );
    }, 1500);
  };

  useEffect(() => {
    setTimeout(() => {
      setOpenWarningModal(true);
    }, 3500);

    const eventMethod = window.addEventListener
      ? 'addEventListener'
      : 'attachEvent';
    const eventer = window[eventMethod];
    const messageEvent =
      eventMethod === 'attachEvent' ? 'onmessage' : 'message';

    const messageFunction = event => {
      // console.log('Getting an event at all');
      // console.log(event.data);
      // console.log('End of event ??');

      if (event.origin === 'https://playcanv.as') {
        // console.log('Getting an event from Canvas');
        // console.log(event.data);
        // console.log('End of event from canvas.');

        if (event.data === 'EndGame') {
          setOpenPlayModal(true);
        } else if (event.data === 'CourseNo') {
          const iframe = document.getElementById('game-frame');
          iframe.contentWindow.postMessage(
            {
              messageType: 'courseid',
              courseId: props.match.params.courseId,
            },
            'https://playcanv.as',
          );
        } else if (event.data === 'StartGame') {
          setGameScore(0);

          window.dataLayer.push({
            event: 'game play event',
            category: 'tryout',
            action: 'start round',
            label: props.match.params.id,
          });

          const iframe = document.getElementById('game-frame');
          iframe.contentWindow.postMessage(
            {
              messageType: 'courseinfo',
              tokenId: props.match.params.id,
              courseId: props.match.params.courseId,
              userId: '',
              demo: true,
              authToken: '',
            },
            'https://playcanv.as',
          );
        } else {
          const dataEvent = JSON.parse(event.data);
          if (dataEvent.messageType) {
            if (dataEvent.messageType === 'scoreUpdate') {
              setGameScore(dataEvent.scoreCard);
            } else if (dataEvent.messageType === 'shotUpdate') {
              const newScore = +gameScore + +dataEvent.points;
              setGameScore(newScore);
              setShotCounter(+shotCounter + 1);

              const labelData = `S:${dataEvent.shot}H:${dataEvent.hole}R:${
                dataEvent.ring
              }:${dataEvent.points}`;
              window.dataLayer.push({
                event: 'game play event',
                category: 'tryout',
                action: 'shot attempt',
                label: labelData,
              });

              if (dataEvent.shot >= 10) {
                window.dataLayer.push({
                  event: 'game play event',
                  category: 'tryout',
                  action: 'complete round',
                  label: newScore,
                  dimension3: props.match.params.id,
                });
              }
            }
          }
        }
      }
    };

    // Listen to message from child window
    eventer(messageEvent, messageFunction, false);

    return () => {
      window.removeEventListener(messageEvent, messageFunction);
    };
  }, []);

  return (
    <>
      <WarningModal
        onOpen={openWarningModal}
        callbackClose={() => setOpenWarningModal(false)}
      />
      <GameEndModal
        onOpen={openPlayModal}
        score={gameScore}
        energy={0}
        BackButtonText="Try Another Golfer"
        demo
        callbackBuyThisGolfer={() => {
          window.dataLayer.push({
            event: 'game play event',
            category: 'tryout',
            action: 'purchase from tryout',
            label: props.match.params.id,
          });
          props.history.push(`/golfer-details/0/${props.match.params.id}`);
        }}
        callbackClubhouse={() => {
          window.dataLayer.push({
            event: 'game play event',
            category: 'tryout',
            action: 'return to marketplace',
            label: props.match.params.id,
          });

          props.history.push(`/playtoearn`);
        }}
        callbackPlayAgain={() => {
          window.dataLayer.push({
            event: 'game play event',
            category: 'tryout',
            action: 'play again',
            label: props.match.params.id,
          });

          setOpenPlayModal(false);
          playGameAgain();
        }}
        tokenId={props.match.params.id}
      />
      <Frame id="game-frame" src={process.env.PLAYCANVASLINK} />
    </>
  );
};

Demo.propTypes = {
  match: PropTypes.any,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
};

export default Demo;
