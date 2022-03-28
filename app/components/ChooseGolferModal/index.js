import React from 'react';
import PropTypes from 'prop-types';
import { Modal, CloseLink } from './styled';
import elite from '../../images/badges/badgeElite.svg';
import legend from '../../images/badges/badgeLegend.svg';
import novice from '../../images/badges/badgeNovice.svg';
import pro from '../../images/badges/badgePro.svg';

const ChoolsGolferModal = props => (
  <Modal
    open={props.onOpen}
    className="fixed inset-0 w-full h-screen flex items-center justify-center bg-semi-75"
  >
    <div className="w-full max-w-lg">
      <header className="p-8 relative">
        <h1 className="text-xl uppercase tracking-wide inline-block">
          Collecting Golfers
        </h1>
        <CloseLink
          onClick={() => {
            props.callbackClose();
          }}
        />
      </header>

      <section className="md:p-8">
        <div>
          <p>
            Selecting the right golfer depends on how you want to play the game.
            You can buy a cheaper golfer, that’s more common and grind your way
            up to the top or you can buy an expensive golfer and be immediately
            competitive in tournaments.
          </p>
          &nbsp;
          <p>There are four types of golfers you can buy:</p>
        </div>

        <div className="md:grid grid-cols-2 gap-2 pr-2 md:py-8">
          <div className="card novice">
            <div className="card-header text-6xl p-4 text-center">
              <img src={novice} alt="novice" />
              <p className="uppercase my-5">super common</p>
            </div>
          </div>
          <div className="card pro">
            <div className="card-header text-6xl p-4 text-center">
              <img src={pro} alt="pro" />
              <p className="uppercase my-4">common</p>
            </div>
          </div>
          <div className="card elite">
            <div className="card-header text-6xl p-4 text-center">
              <img src={elite} alt="elite" />
              <p className="uppercase my-3">rare</p>
            </div>
          </div>
          <div className="card legend">
            <div className="card-header text-6xl p-4 text-center">
              <img src={legend} alt="legend" />
              <p className="uppercase my-3">super rare</p>
            </div>
          </div>
        </div>
        <div>
          <p>
            Novice golfers make up 55% of the golfers released. They will be the
            least expensive golfers. The potential ability points for Novice
            golfers will be no less than 20 and won’t go over 400.
          </p>
          &nbsp;
          <p>
            Pro golfers make up 28% of the golfers released. They will be more
            expensive than the Novice golfers and less expensive than Elite
            golfers. The potential ability points for Pro golfers will be no
            less than 450 and won’t go over 525.
          </p>
          &nbsp;
          <p>
            Elite golfers make up 15% of the golfers released. They will be more
            expensive than the Pro golfers and less expensive than Legends. The
            potential ability points for Elite golfers will be no less than 550
            and won’t go over 750.
          </p>
          &nbsp;
          <p>
            Legend golfers make up 3% of the golfers released. They will be the
            most expensive golfers. The potential ability points for Legend
            golfers will be no less than 850 and won’t go over 1,000.
          </p>
          &nbsp;
          <p>
            The better your golfer is the following benefits you will receive:
          </p>
          <ul>
            <li>Fast track to higher pay out tournaments</li>
            <li>
              More monetization opportunities through training (TBA in Season 2)
            </li>
          </ul>
          &nbsp;
          <p>
            But not to worry! There are benefits for owning lesser skilled
            golfers:
          </p>
          <ol>
            <li>Tournaments based on skill level</li>
            <li>
              The ability to grind your way up to the next level through game
              mechanics (TBA in Season 2)
            </li>
          </ol>
          &nbsp;
          <p>
            Selling your golfer is easy! Once you have played to level up your
            golfer, you could list your golfer for a price higher than you paid
            for it!
          </p>
          &nbsp;
          <p>Here’s How:</p>
          <ol>
            <li>Make sure your wallet is linked</li>
            <li>Click on your golfer card</li>
            <li>Click sell</li>
            <li>List desired price</li>
          </ol>
          &nbsp;
          <p>
            From there, your golfer will automatically show up on the
            marketplace page.
          </p>
        </div>
      </section>
    </div>
  </Modal>
);

ChoolsGolferModal.propTypes = {
  callbackClose: PropTypes.func,
  onOpen: PropTypes.bool,
};

export default ChoolsGolferModal;
