/*
 *
 * Where a golfer plays a round
 *
 */

import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useInjectSaga } from 'utils/injectSaga';
import PropTypes from 'prop-types';
import GameEndModal from 'components/GameEndModal';
import { Frame } from './styled';
import saga from './saga';
import { getGameToken } from './actions';
import { fetchEventsAction } from '../Events/actions';

const Play = props => {
  useInjectSaga({ key: 'gameplaysaga', saga });

  const [openPlayModal, setOpenPlayModal] = useState(false);
  const [gameScore, setGameScore] = useState(0);
  const [shotCounter, setShotCounter] = useState(1);

  const playGameAgain = () => {
    props.dispatch(
      getGameToken({ tokenId: props.match.params.id, uuid: props.userId }),
    );

    setTimeout(() => {
      const iframe = document.getElementById('game-frame');
      iframe.contentWindow.postMessage(
        {
          messageType: 'newgame',
          authToken: localStorage.getItem('ItasArenaGolfGameToken'),
        },
        'https://playcanv.as',
      );
    }, 1500);
  };

  const analyticsMode =
    props.match.params.mode === 'privatecontest'
      ? 'private competition'
      : props.match.params.mode;

  useEffect(() => {
    props.dispatch(
      getGameToken({ tokenId: props.match.params.id, uuid: props.userId }),
    );
    props.dispatch(fetchEventsAction());
  }, []);

  useEffect(() => {
    if (props.userId && props.userId !== '') {
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

            const iframe = document.getElementById('game-frame');
            iframe.contentWindow.postMessage(
              {
                messageType: 'courseinfo',
                tokenId: props.match.params.id,
                courseId: props.match.params.courseId,
                userId: props.userId,
                demo: false,
                authToken: localStorage.getItem('ItasArenaGolfGameToken'),
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
                let { ring } = dataEvent;
                if (+dataEvent.points === 0) {
                  ring = 0;
                }

                const labelData = `S:${dataEvent.shot}H:${
                  dataEvent.hole
                }R:${ring}:${dataEvent.points}`;
                window.dataLayer.push({
                  event: 'game play event',
                  category: analyticsMode,
                  action: 'shot attempt',
                  label: labelData,
                });

                if (dataEvent.shot >= 10) {
                  window.dataLayer.push({
                    event: 'game play event',
                    category: analyticsMode,
                    action: 'complete round',
                    label: newScore,
                    dimension3: props.match.params.id,
                  });
                }

                setShotCounter(+shotCounter + 1);
              } else if (dataEvent.messageType === 'SetScoreCard') {
                window.dataLayer.push({
                  event: 'game play event',
                  category: analyticsMode,
                  action: 'start round',
                  label: props.match.params.id,
                });
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
    }

    return null;
  }, [props.userId]);

  return (
    <>
      <GameEndModal
        onOpen={openPlayModal}
        score={gameScore}
        demo={false}
        energy={props.energyRequired}
        BackButtonText="BACK TO CLUBHOUSE"
        callbackClubhouse={() => {
          window.dataLayer.push({
            event: 'game play event',
            category: analyticsMode,
            action: 'return to clubhouse',
            label: props.match.params.id,
          });
          props.history.push(`/clubhouse`);
        }}
        callbackPlayAgain={() => {
          window.dataLayer.push({
            event: 'game play event',
            category: analyticsMode,
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

Play.propTypes = {
  match: PropTypes.any,
  dispatch: PropTypes.any,
  userId: PropTypes.string,
  energyRequired: PropTypes.number,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
};

function mapProps(store, props) {
  let energy = 0;

  if (store.events.events && props.match) {
    if (props.match.params.mode === 'challenge') {
      let event = store.events.events.filter(
        el => el.courseid === +props.match.params.courseId,
      );

      if (event.length === 0) {
        event = store.events.tournaments.filter(
          el => el.courseid === +props.match.params.courseId,
        );
      }

      energy = event[0].energycost;
    }
  }

  if (!energy) {
    energy = 0;
  }

  return {
    userId: store.user.uuid,
    energyRequired: energy,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(
  mapProps,
  mapDispatchToProps,
)(Play);
