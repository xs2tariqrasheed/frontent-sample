/*
 * LearnMore
 *
 * This is the LearnMore block on the front page.
 *
 */
import React from 'react';
const golfBallOne = 'https://www.blockletegames.com/images/golf-ball-1.png';
const golfBallTwo = 'https://www.blockletegames.com/images/golf-ball-2.png';
const golfBallThree = 'https://www.blockletegames.com/images/golf-ball-3.png';
const golfBallFour = 'https://www.blockletegames.com/images/golf-ball-4.png';
import { Link } from 'react-router-dom';
import { Container, GolfBallSection } from './styled';

export default function LearnMore() {
  return (
    <Container className="bg-green-400 text-white">
      <article className="container mx-auto px-4 py-20">
        <div className="sm:grid grid-rows-2 grid-flow-col gap-4">
          <section className="row-span-2 md:row-span-2">
            <h1 className="callout-underline text-4xl font-extrabold uppercase">
              How To Play and Earn Cash
            </h1>
            <p className="w-3/5 mt-5">
              Play golf while you earn! See why people across the globe are
              testing their digital golf skills for a chance at cash.
              <br />
              <Link
                className="triangle-link inline-block mt-6 self-end text-white font-extrabold no-underline uppercase text-sm"
                to="/faq"
              >
                How To Play Blocklete™ Golf
              </Link>
            </p>
          </section>

          <GolfBallSection
            className="mt-5 mb-10 md:mt-0 md:row-span-1"
            bg={golfBallOne}
          >
            <h2>Pick Your Golfer!</h2>
            <p>
              Pick the golfer that best suits your game play style. Lesser
              skilled golfers can grind their way up, while higher skilled
              golfers are competition ready!
            </p>
          </GolfBallSection>

          <GolfBallSection className="md:row-span-1 mb-10" bg={golfBallTwo}>
            <h2>Earn from Training!</h2>
            <p>
              List your golfer as a trainer so you can earn cash. Buy a trainer
              to level up your golfer’s skills to win in competitions.
            </p>
          </GolfBallSection>

          <GolfBallSection className="md:row-span-1" bg={golfBallThree}>
            <h2>Compete for Medals and Cash!</h2>
            <p>
              Winning against your competitor’s will earn you medals that level
              up your golfer or earn you cash prizes. Over $20K in cash prizes
              were won last season!
            </p>
          </GolfBallSection>

          <GolfBallSection className="md:row-span-1" bg={golfBallFour}>
            <h2>Sell Leveled Up Golfers!</h2>
            <p>
              Once you have leveled your golfer up, list it on the marketplace
              and earn cash back! Rinse, Repeat, Earn!
            </p>
          </GolfBallSection>
        </div>
      </article>
    </Container>
  );
}
