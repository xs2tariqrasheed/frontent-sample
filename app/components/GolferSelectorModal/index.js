import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import PurchaseCard from 'components/Golfers/PurchaseCard';
import { Modal, CloseLink } from './styled';

/*eslint-disable*/
const GolferSelectorModal = props => {

  const renderCard = golfer => {
    if (!props.privateComp) {
      return (
        <article key={golfer.tokenid} style={{
          filter: !golfer.selectable && 'grayscale(100%)',
        }}>
          {golfer.selectable ? (
            <Link
              to={`/play/challenge/${golfer.tokenid}/${props.courseId}`}
              className="rounded overflow-hidden h-full"
              onClick={() => {
                window.dataLayer.push({
                  event: 'pick blocklete',
                  category: 'challenge',
                  action: 'pick blocklete',
                  label: golfer.tokenid,
                });
              }}
            >
              <PurchaseCard
                playerGolfer
                selectable={golfer.selectable}
                key={golfer.tokenId}
                golfer={golfer}
                userid={props.user.uuid}
                userWallet={props.user.ethaddress}
                clubhouseGolfer
                myWatchGolfer={false}
                contestGolfer
              />
            </Link>
          ) : (
            <PurchaseCard
              selectable={false}
              playerGolfer
              key={golfer.tokenId}
              golfer={golfer}
              userid={props.user.uuid}
              userWallet={props.user.ethaddress}
              clubhouseGolfer
              myWatchGolfer={false}
              contestGolfer
            />
          )}
        </article>
      );
    }

    return (
      <article key={golfer.tokenid}>
        <PurchaseCard
          playerGolfer
          key={golfer.tokenId}
          golfer={golfer}
          userid={props.user.uuid}
          userWallet={props.user.ethaddress}
          clubhouseGolfer
          myWatchGolfer={false}
          contestGolfer
          onClick={() => {
            window.dataLayer.push({
              event: 'pick blocklete',
              category: 'private competition',
              action: 'pick blocklete',
              label: golfer.tokenid,
            });
            props.golferJoined(golfer.tokenid);
            props.callbackClose();
          }}
        />
      </article>
    );
  };

  return (
    <Modal
      open={props.onOpen}
      className="fixed inset-0 w-full h-screen flex items-center justify-center bg-semi-75 bg-blueberry"
    >
      <div className="w-full max-w-4xl mx-3 sm:mx-8">
        <header className="py-8 relative bg-white flex items-center justify-center">
          <h1 className="text-xl w-1/2 text-center uppercase text-blueberry tracking-wide">
            {props.privateComp ? ('Select one Blocklete Golfer to Compete') : ('Select Your Golfer')}
          </h1>
          <CloseLink
            className="absolute right-0 mr-3 sm:mr-8"
            onClick={() => {
              props.callbackClose();
            }}
          />
        </header>

        <div
          className="md:grid grid-cols-3 gap-6 p-3 md:p-10"
          style={{ maxHeight: 'calc(100vh - 210px)', overflowY: 'auto' }}
        >
          {props.myTokens && props.myTokens.sort((a, b) => {
            return a.selectable - b.selectable;
          }).map(golfer => renderCard(golfer))}
          {props.myTokens.length <= 0 && (
            <div className="col-span-3 w-1/2 mx-auto">
              <p className="mb-8">Looks like you don't have any eligible blockletes for this contest. Head to the
                marketplace to see
                eligible blockletes for sale.</p>
              <div className="flex justify-between items-center">
                <Link to="/playtoearn" className="mr-5 text-center btn w-1/2">Shop for Blockletes</Link>
                <button type="button" className="text-center btn btn-outline w-1/2"
                        onClick={props.callbackClose}>Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

GolferSelectorModal.propTypes = {
  callbackClose: PropTypes.func,
  onOpen: PropTypes.bool,
  myTokens: PropTypes.array,
  courseId: PropTypes.number,
  user: PropTypes.object,
  privateComp: PropTypes.object,
  golferJoined: PropTypes.func,
};

export default GolferSelectorModal;
/* eslint-enable */
