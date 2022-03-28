/*
 * FlowMigration
 *
 * This is the FlowMigration block on the front page.
 *
 */
import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Container } from './styled';
import blockleteLogoWhite from '../../../components/Icons/BlockleteLogoWhite.svg';
const GolferGroup =
  'https://itas-assets-us-east-1.s3.us-east-2.amazonaws.com/images/red-shirt-bucket-hat@2x.png';
const MedalsTickets =
  'https://itas-assets-us-east-1.s3.us-east-2.amazonaws.com/images/medals-tickets.png';
const AppleAppStore =
  'https://itas-assets-us-east-1.s3.us-east-2.amazonaws.com/images/apple-app-store.png';
const GoogleAppStore =
  'https://itas-assets-us-east-1.s3.us-east-2.amazonaws.com/images/google-play-badge.png';
const feature1 =
  'https://itas-assets-us-east-1.s3.us-east-2.amazonaws.com/images/no-card-golfer-legend-copy-3@2x.png';
const feature2 =
  'https://itas-assets-us-east-1.s3.us-east-2.amazonaws.com/images/no-card-golfer-legend@2x.png';
const feature3 =
  'https://itas-assets-us-east-1.s3.us-east-2.amazonaws.com/images/no-card-golfer-legend-copy@2x.png';
const feature4 =
  'https://itas-assets-us-east-1.s3.us-east-2.amazonaws.com/images/no-card-golfer-legend-copy-2@2x.png';
const GolferSquad =
  'https://itas-assets-us-east-1.s3.us-east-2.amazonaws.com/images/golfer-squad.png';

export default function LearnMore() {
  return (
    <Container className="text-white">
      <article className="text-center mx-auto md:pb-8 md:py-20 xs:p-8 xl:p-0">
        <div className="text-left xl:pl-40 xl:w-2/3 xl:pb-60">
          <h1 className="text-6xl md:pt-24 font-black inline-block lg:col-start-1 xl:col-start-1">
            One-of-a-Kind-Golf <br /> Management Game
          </h1>
          <p>
            A sports video gaming experience that empowers fans to collect,
            train, trade and compete with unique digital athletes.
          </p>
          <a className="button practice" href="/signup-us">
            <div className="inner-circle practice" />
            <div className="inner-shadow practice" />
            <p className="button-text uppercase">Get A Free Practice Round</p>
          </a>
        </div>
        <div className="sm:grid grid-rows-2 grid-flow-col gap-4">
          <section className="row-span-2 md:row-span-2" />
        </div>
      </article>
      <div className="game-features desktop">
        <div className="feature">
          <h2 className="uppercase">Collect & Train</h2>
          <p>Blocklete Golfers</p>
          <img src={feature1} alt="golfer" className="" />
        </div>
        <div className="ovals">
          <div className="oval" />
          <div className="oval" />
          <div className="oval" />
          <div className="oval" />
        </div>
        <div className="feature">
          <h2 className="uppercase">Boost Stats</h2>
          <p>with Charged Gear</p>
          <img src={feature2} alt="golf ball" className="" />
        </div>
        <div className="ovals">
          <div className="oval" />
          <div className="oval" />
          <div className="oval" />
          <div className="oval" />
        </div>
        <div className="feature">
          <h2 className="uppercase">Compete For</h2>
          <p>Medals & Cash</p>
          <img src={feature3} alt="medals" className="" />
        </div>
        <div className="ovals">
          <div className="oval" />
          <div className="oval" />
          <div className="oval" />
          <div className="oval" />
        </div>
        <div className="feature">
          <h2 className="uppercase">Sell Golfers</h2>
          <p>on the Marketplace</p>
          <img src={feature4} alt="golfers" className="" />
        </div>
      </div>
      <Carousel className="game-features mobile" variant="dark">
        <Carousel.Item>
          <div className="feature">
            <h2 className="uppercase">Collect & Train</h2>
            <p>Blocklete Golfers</p>
          </div>
          <img
            className="d-block w-50 m-auto"
            src={feature1}
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <div className="feature">
            <h2 className="uppercase">Boost Stats</h2>
            <p>with Charged Gear</p>
          </div>
          <img
            className="d-block w-50 m-auto"
            src={feature2}
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <div className="feature">
            <h2 className="uppercase">Compete For</h2>
            <p>Medals & Cash</p>
          </div>
          <img
            className="d-block w-50 m-auto"
            src={feature3}
            alt="Third slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <div className="feature">
            <h2 className="uppercase">Sell Golfers</h2>
            <p>on the Marketplace</p>
          </div>
          <img
            className="d-block w-50 m-auto"
            src={feature4}
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
      <div className="invest xs:p-8 xl:p-0">
        <div className="invest-text inline-block align-top xl:w-1/2 xl:p-28">
          <h1>Invest in a Team of Virtual Golfers</h1>
          <p>
            Play golf while you earn! See why people across the globe are
            testing their digital golf skills for a chance at cash. Pick the
            golfer that best suits your game play style. Lesser skilled golfers
            can grind their way up, while higher skilled golfers are competition
            ready!
          </p>
          <a className="button" href="/signup-us">
            <div className="inner-circle" />
            <div className="inner-shadow" />
            <div className="button-text uppercase">play now</div>
          </a>
        </div>
        <div className="group inline-block xl:w-1/2 xl:p-20">
          <img src={GolferGroup} alt="Golfer Group" className="" />
        </div>
      </div>
      <div className="video-block">
        <h1>Earn Rewards on Blocklete Games</h1>
        <iframe
          className="m-auto xl:p-10 sm:p-0"
          src="https://www.youtube.com/embed/D_pS6Kfs3hs"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        <div>
          <h2 className="inline-block">Download the App</h2>
          <img
            src={AppleAppStore}
            alt="Apple App Store"
            className="inline-block"
          />
          <img
            src={GoogleAppStore}
            alt="Google App Store"
            className="inline-block"
          />
        </div>
      </div>
      <div className="grind xs:p-8 xl:p-0">
        <div className="inline-block xl:w-1/2 xl:p-20">
          <img src={MedalsTickets} alt="Medals Tickets" className="" />
        </div>
        <div className="inline-block align-top xl:w-1/2 xl:p-20">
          <h1>Complete challenges and earn cash!</h1>
          <p>
            Having 15 minutes of fun on the golf course has never been so
            rewarding! Cash reward features coming soon.
          </p>
          <a className="button" href="/signup-us">
            <div className="inner-circle" />
            <div className="inner-shadow" />
            <div className="button-text uppercase">play now</div>
          </a>
        </div>
      </div>
      <div className="practice-round">
        <img src={blockleteLogoWhite} alt="Blocklete logo" className="logo" />
        <h1>Get a Free Practice Round</h1>
        <a className="button" href="/signup-us">
          <div className="inner-circle" />
          <div className="inner-shadow" />
          <div className="button-text uppercase">get started</div>
        </a>
        <img src={GolferSquad} alt="Golfer Squad" className="" />
      </div>
    </Container>
  );
}
