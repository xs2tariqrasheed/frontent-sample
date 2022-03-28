/*
 * Faq
 *
 * Frequently asked questions.
 *
 */

import './style.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Layout from '../Layout';
import { Break } from './styled';
const accuracyMeter = 'https://www.blockletegames.com/images/AccuracyMeter.png';
const distanceMeter = 'https://www.blockletegames.com/images/DistanceMeter.png';
const enteringChallenges = 'https://www.blockletegames.com/images/EnteringChallenges.png';
const golfer = 'https://www.blockletegames.com/images/Golfer.png';
const howTheGameWorks = 'https://www.blockletegames.com/images/HowTheGameWorks.png';
const pickYourClub = 'https://www.blockletegames.com/images/PickYourClub.png';
const selectATarget = 'https://www.blockletegames.com/images/SelectATarget.png';
const skillsChallenge = 'https://www.blockletegames.com/images/SkillsChallenge.png';
const winChallenges = 'https://www.blockletegames.com/images/WinChallenges.png';
import BadgeList from '../../components/BadgeList';

export default class Faq extends React.Component {
  componentDidMount() {
    if (document.location.hash) {
      const id = document.location.hash.replace('#', '');
      const target = document.getElementById(id);
      target.scrollIntoView(true);
    }
  }

  /*eslint-disable*/
  render() {
    return (
      <Layout>
        <Helmet>
          <title>FAQ</title>
          <meta
            name="Blocklete Games™ FAQ"
            content="Frequently asked questions for Blocklete Games™."
          />
        </Helmet>
        <div className="container mx-auto my-10 sm:p-10">
          <section className="mb-5">
            <h1 className="sm:text-5xl text-2xl">What is Blocklete Games™? </h1>
            <p className="mb-5">
              Blocklete Games™ is a first of its kind online golf game!
              Blocklete Games™ is built on blockchain technology. The big
              difference between our blockchain-based game and the games you
              might be used to? You
              <em>own</em> your golfer! Use it to compete in tournaments, trade
              it, give it away, or sell it to another player – the choice is
              yours. Pretty cool!
            </p>
            <p className="mb-5">
              Join us in{' '}
              <a target="_blank" href="https://discord.gg/XDJAJdr">
                Discord
              </a>{' '}
              and&nbsp;
              <a target="_blank" href="https://twitter.com/InTheArena">
                Twitter
              </a>{' '}
              to to stay up to date on all the news! You can also contact us at
              support@blockletegames.com.
            </p>
            <p className="mb-5">
              Click <Link to="/terms-of-service">here</Link> for full Terms of
              Use.
            </p>
            <p className="mb-5">
              Here’s Some Quick Links to How the Game Works:
            </p>
            <ol>
              <li>
                <a href="#game">How the Game Works</a>
              </li>
              <li>
                <a href="#entering">Entering Challenges and Tournaments</a>
              </li>
              <li>
                <a href="#winning">Winning Challenges and Tournaments</a>
              </li>
              <li>
                <a href="#choosing">Choosing the Right Golfer</a>
              </li>
              <li>
                <a href="#selling">Selling Your Golfer</a>
              </li>
              <li>
                <a href="#collect">How To Collect Your Prize Money</a>
              </li>
              <li>
                <a href="#transfer">
                  Transfer Your Blocklete and Prize Money Into A Private Wallet
                </a>
              </li>
            </ol>
          </section>
          <Break/>
          <section id="game">
            <h1 className="sm:text-5xl text-2xl">How the Game Works</h1>
            <img className="Img" src={howTheGameWorks} alt=""/>
            <p className="mb-5">
              At the start of each shot, you will make decisions on how to hit
              your highest score.{' '}
            </p>
            <h3>Step 1: Pick your target</h3>
            <img className="hidden sm:block" src={selectATarget} alt=""/>
            <p className="mb-5">
              Hit the golf ball to start and use the aim marker to select your
              target. Be aware of the strength and direction of the wind. You
              can offset the marker on each shot to account for the direction of
              the wind.
            </p>
            <h3>Step 2: Pick the club that can hit the target.</h3>
            <img className="hidden sm:block" src={pickYourClub} alt=""/>
            <p className="mb-5">
              A golfer’s current power ability points will impact the range of
              your clubs. If you have a lot of power, then your clubs will show
              longer distances. The bigger the difference between the target and
              the club’s range, the slower the accuracy meter will go. This
              gives golfers with higher power an advantage to hit the right spot
              on the accuracy meter.
            </p>
            <h3>Step 3: Hit the Right Spot on the Distance Meter</h3>
            <img className="" src={distanceMeter} alt=""/>
            <p className="mb-5">
              The speed of the distance meter will depend on how many composure
              points your golfer has. More composure points slow the meter.
            </p>
            <p className="mb-5">
              To hit the right distance, you need to stop the distance meter at
              a certain percentage of the club's range relative to how far you
              have to hit the ball. Wind will also factor into how far your ball
              may travel.
            </p>
            <p className="mb-5">
              In this example, you would need to hit at the 100% mark since the
              club can only hit the ball 156 yards, the target is at 151 yards
              AND the wind will slow the ball down because it’s headed towards
              the golfer.
            </p>
            <p className="mb-5">
              The higher you stop the distance meter, the faster the accuracy
              meter will move as a result. Stopping the distance meter above the
              100% mark (the yellow zone) will result in surge power, and will
              make the accuracy meter move very quickly.
            </p>
            <h3>Step 4: Hit the Sweet Spot on the Accuracy Meter</h3>
            <img className="" src={accuracyMeter} alt=""/>
            <p className="mb-5">
              The green part of this meter is the sweet spot. The sweet spot
              gets bigger when your golfer has more accuracy points. This makes
              it easier for you to hit your intended target. The speed of the
              accuracy meter has to do with your distance selections and the
              amount of composure points your golfer has.
            </p>
          </section>
          <Break/>
          <section id="entering" className="mb-5">
            <h1 className="sm:text-5xl text-2xl">
              Entering Challenges and Tournaments
            </h1>
            <img className="" src={enteringChallenges} alt=""/>
            <p className="mb-5">
              There are two ways to view the active events:
            </p>
            <ol>
              <li>Click Events at the top of the page</li>
              <li>
                From your Clubhouse, click “Play” on your golfer to see the live
                challenges and view past results.
              </li>
            </ol>
            <p className="mb-5">
              There are three types of events you will be able to enter:
            </p>
            <ol>
              <li>
                <b>Skill-Based Challenges</b> where you win medals that transfer
                into ability points which level up your golfer’s game play
              </li>
              <li>
                <b>Direct Challenges</b> where you win bragging rights against
                your friends
              </li>
              <li>
                <b>Tournaments</b> where you win cash prizes
              </li>
            </ol>
            <p className="mb-5">
              Every golfer’s energy starts at 100 but each challenge has an
              energy cost. The energy is taken from your golfer when you start
              the round and will impact your golfer the next time you play. So
              now, each shot becomes much more important and the starts and
              restarts become a big disadvantage. If your golfer’s energy bar
              dips below the energy cost for the challenge, you’ll have to wait
              until your golfer’s energy rebuilds.
            </p>
            <p className="mb-5">
              Each challenge and tournament you play in will drain energy from
              your golfer. The more you play, the more tired you get. This
              directly impacts how far you can hit the ball, your accuracy and
              your composure. Energy will rebuild at a rate based on your
              Stamina. The higher your Stamina, the faster your golfer will
              recover.
            </p>
            <div className="floatdiv">
              <div className="floatimage">
                <img src={skillsChallenge} alt="SkillsChallenge"/>
              </div>
              <div className="floattext">
                <p className="mb-5">
                  Every golfer’s energy starts at 100 but each challenge has an
                  energy cost. The energy is taken from your golfer when you
                  start the round and will impact your golfer the next time you
                  play. So now, each shot becomes much more important and the
                  starts and restarts become a big disadvantage. If your
                  golfer’s energy bar dips below the energy cost for the
                  challenge, you’ll have to wait until your golfer’s energy
                  rebuilds.
                </p>
              </div>
            </div>
            <p className="mb-5">
              You can check how much energy you have left, number of medals won
              and ability points received on your golfer card.
            </p>
            <img className="" src={golfer} alt=""/>
          </section>
          <Break/>
          <section id="winning" className="mb-5">
            <h1 className="sm:text-5xl text-2xl">
              Winning Challenges and Tournaments
            </h1>
            <p className="mb-5">
              Each <b>skill-based</b> challenge has a specific type of medal you
              can win! Medals correspond to a golfer ability; Power, Composure,
              Stamina or Accuracy. The type of medal indicates the ability that
              will be upgraded for winning. At the close of the event, you will
              be able to see how many medals you have won.
            </p>
            <p className="mb-5">
              Medals will automatically convert into ability points that level
              up your golfer. As you get closer to reaching a golfer’s peak
              potential for an ability, it becomes more challenging to achieve
              the peak. The medal conversion rate is as follows:
            </p>
            <img src={winChallenges} alt="WinChallenges"/>
            <p className="mb-5">
              <b>Tournament</b> prizes will be awarded in ETH. If you win a
              tournament, you will need to login to claim the winnings. If you
              do not have your own personal wallet, you will need to set one up
              to receive your awards. See the Transferring Your Golfer to a
              Private Wallet section.
            </p>
          </section>
          <Break/>
          <section id="choosing" className="mb-5">
            <h1 className="sm:text-5xl text-2xl">Choosing the Right Golfer</h1>
            <p className="mb-5">
              Selecting the right golfer depends on how you want to play the
              game. You can buy a cheaper golfer, that’s more common and grind
              your way up to the top or you can buy an expensive golfer and be
              immediately competitive in tournaments.
            </p>
            <p className="mb-5">There are four types of golfers you can buy:</p>
            <BadgeList darken/>
            <p className="mb-5">
              Novice golfers make up 55% of the golfers released. They will be
              the least expensive golfers. The potential ability points for
              Novice golfers will be no less than 20 and won’t go over 400.
            </p>
            <p className="mb-5">
              Pro golfers make up 28% of the golfers released. They will be more
              expensive than the Novice golfers and less expensive than Elite
              golfers. The potential ability points for Pro golfers will be no
              less than 450 and won’t go over 525.
            </p>
            <p className="mb-5">
              Elite golfers make up 15% of the golfers released. They will be
              more expensive than the Pro golfers and less expensive than
              Legends. The potential ability points for Elite golfers will be no
              less than 550 and won’t go over 750.
            </p>
            <p className="mb-5">
              Legend golfers make up 3% of the golfers released. They will be
              the most expensive golfers. The potential ability points for
              Legend golfers will be no less than 850 and won’t go over 1,000.
            </p>
            <p className="mb-5">
              The better your golfer is the following benefits you will receive:
            </p>
            <ul>
              <li>Fast track to higher pay out tournaments</li>
              <li>
                More monetization opportunities through training (TBA in Season
                2)
              </li>
            </ul>
            <p className="mb-5">
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
          </section>
          <Break/>
          <section id="selling" className="mb-5">
            <p className="mb-5">
              Selling your golfer is easy! Once you have played to level up your
              golfer, you could list your golfer for a price higher than you
              paid for it!
            </p>
            <p className="mb-5">Here’s How:</p>
            <ol>
              <li>Make sure your wallet is linked</li>
              <li>Click on your golfer card</li>
              <li>Click sell</li>
              <li>List desired price</li>
            </ol>
            <p className="mb-5">
              From there, your golfer will automatically show up on the
              marketplace page.
            </p>
          </section>
          <Break/>
          <section id="collect" className="mb-5">
            <h1 className="sm:text-5xl text-2xl">How To Collect Your Prize Money</h1>
            <p className="mb-5">
              In your <Link to="/clubhouse">“My Clubhouse”</Link> section of the site, you will see a Withdraw button in
              the top right corner of the
              screen. If your balance is greater than 0, it means that you have some tournament prizes to collect.
            </p>

            <p className="mb-5">
              If the button is enabled, meaning you have a balance and that we detected you are using your own private
              metamask wallet, simply click Withdraw to receive your winnings directly to your wallet.
            </p>

            <p className="mb-5">
              If the button is disabled and you see a balance, it likely means you are using a custody wallet. Please
              see the next section for instructions on how to collect your winnings.
            </p>
          </section>
          <Break/>
          <section id="transfer" className="mb-5">
            <h1 className="sm:text-5xl text-2xl">
              Transfer Your Golfer Into A Private Wallet
            </h1>
            <p className="mb-5">
              If you didn’t buy your Blocklete with a Metamask wallet, you will need to set one up in order to sell your
              golfer or to collect any prize money won in tournaments. Follow these instructions so you can collect your
              tournament winnings and sell your golfers.
            </p>

            <h3>
              Step 1: Set up Your Metamask Wallet
            </h3>
            <p className="mb-5">
              Metamask is a digital wallet. This is where you will store the Blockletes you own and store any ethereum
              (in-game money) that you want to use for training or other purchases. It is a 3rd-party extension for the
              Chrome, Firefox, Opera and Brave browsers. Here are some instructions to set your Metamask wallet up. It
              can be downloaded <a target="_blank" href="https://metamask.io/">here</a>.
            </p>

            <h3>
              Step 2: Request to send Your Blocklete and/or Prize Money to Your Metamask Wallet
            </h3>
            <p className="mb-5">
              Send a request to support@blockletegames.com. Ask to send your Blocklete(s) and/or prize money to your
              new&nbsp;
              <a target="_blank" href="https://miro.medium.com/max/1400/1*C9wPonuBU-FaIwAoHRQDag.png">wallet
                address.</a>
            </p>

            <h3>
              Step 3 (optional): Send Ethereum to Your New Wallet
            </h3>
            <p className="mb-5">
              Metamask does not allow you to buy ETH directly. So you will have to open another wallet that allows you
              to buy ETH. We recommend <a target="_blank" href="https://www.coinbase.com/">Coinbase</a>.
            </p>

            <p className="mb-5">
              Once your Coinbase wallet is set up, follow these <a target="_blank"
                                                                   href="https://blog.ujomusic.com/how-to-buy-eth-using-metamask-coinbase-ecffe9ede78e">instructions.</a> You
              will need some ETH in your wallet to
              participate in training and buying/selling Blockletes.
            </p>
          </section>
          <Break/>
        </div>
      </Layout>
    );
  }

  /* eslint-enable */
}
