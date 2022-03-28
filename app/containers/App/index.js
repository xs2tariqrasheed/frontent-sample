/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Marketplace from 'containers/Marketplace/Loadable';
import Faq from 'containers/Faq/Loadable';
import Share from 'containers/Share/Loadable';
import TrainingForm from 'containers/TrainingForm/Loadable';
import ProShopForm from 'containers/ProShopForm/Loadable';
import GolferDetails from 'containers/GolferDetails/Loadable';
import GearDetails from 'containers/GearDetails/Loadable';
import Profile from 'containers/Profile/Loadable';
import MyGolfers from 'containers/MyGolfers/Loadable';
import Privacy from 'containers/Privacy/Loadable';
import Play from 'containers/Play';
import Demo from 'containers/Demo';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import GlobalStyle from '../../global-styles';
import LobbyGolferDetails from '../../components/LobbyGolferDetails/Loadable';
import LobbyGearDetails from '../../components/LobbyGearDetails/Loadable';
import Events from '../Events/Loadable';
import EventDetails from '../EventDetails/Loadable';
import PackDrops from '../PackDrops/Loadable';
import PackOpening from '../PackOpening/Loadable';
import StaticContentPage from '../StaticContentPage';
import SignIn from '../UserSignIn/Loadable';
import SignInMigrate from '../UserSignIn/MigrationSignIn/Loadable';
import MigrateSuccess from '../UserSignIn/MigrationSignIn/MigrationSuccess/Loadable';
import SignUpUS from '../SignUpUS/Loadable';
import SignUpIntl from '../SignUpIntl/Loadable';
import WatchlistMarket from '../WatchlistMarket';
import ProShopMarketplace from '../ProShopMarketplace';
import ShopSearch from '../ShopSearch';

const __htmlTos = require('../../containers/StaticContentPage/itas_tos.html'); // eslint-disable-line
const __htmlRules = require('../../containers/StaticContentPage/itas_rules.html'); // eslint-disable-line
const tosDoc = { __html: __htmlTos }; // eslint-disable-line
const tosRules = { __html: __htmlRules }; // eslint-disable-line

const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY);

export default function App() {
  return (
    <>
      <Helmet
        titleTemplate="%s - Blocklete Games™"
        defaultTitle="Blocklete Games™"
      >
        <meta name="description" content="Blocklete Games™" />
      </Helmet>
      <Elements stripe={stripePromise}>
        <BrowserRouter>
          <Switch>
            <Redirect from="/marketplace" to="/playtoearn" />
            <Redirect from="/purchase" to="/playtoearn" />
            <Route exact path="/" render={HomePage} />
            <Route path="/#newsletter" render={HomePage} />
            <Route exact path="/playtoearn">
              <Marketplace />
            </Route>
            <Route path="/playtoearn/featured-artists">
              <Marketplace viewFeatured />
            </Route>
            <Route path="/faq" component={Faq} />
            <Route path="/privacy" component={Privacy} />
            <Route
              path="/terms-of-service"
              component={() => (
                <StaticContentPage title="Terms of Service" content={tosDoc} />
              )}
            />
            <Route
              path="/tournament-rules"
              component={() => (
                <StaticContentPage
                  title="Tournament Rules"
                  content={tosRules}
                />
              )}
            />
            <Route path="/profile" component={Profile} />
            <Route path="/watchlist" component={WatchlistMarket} />
            <Route path="/proshopmarketplace" component={ProShopMarketplace} />
            <Route path="/findproshop" component={ShopSearch} />
            <Route exact path="/clubhouse" component={MyGolfers} />
            <Route
              exact
              path="/events"
              component={() => <Events isEventsPage />}
            />
            <Route exact path="/events/completed" component={Events} />
            <Route
              exact
              path="/clubhouse/:golferId"
              component={LobbyGolferDetails}
            />
            <Route
              exact
              path="/clubhouse/gear/:golferId"
              component={LobbyGearDetails}
            />
            <Route
              path="/clubhouse/:golferId/events/:eventId"
              component={EventDetails}
            />
            <Route path="/events/:eventId" component={EventDetails} />
            <Route path="/share/:id" component={Share} />
            <Route
              path="/golfer-details/:clubhouse/:id"
              component={GolferDetails}
            />
            <Route
              path="/gear-details/:clubhouse/:id"
              component={GearDetails}
            />
            <Route path="/open-pack/:id" component={PackOpening} />
            <Route path="/playtoearn/training" component={TrainingForm} />
            <Route path="/playtoearn/proshop" component={ProShopForm} />
            <Route path="/signin" component={SignIn} />
            <Route path="/signinmigrate" component={SignInMigrate} />
            <Route path="/migratesuccess" component={MigrateSuccess} />
            <Route path="/signup-us" component={SignUpUS} />
            <Route path="/signup-intl" component={SignUpIntl} />
            <Route path="/play/:mode/:id/:courseId" component={Play} />
            <Route path="/trialgolfer/:id/:courseId" component={Demo} />
            <Route path="/packdrops" component={PackDrops} />
            <Route component={NotFoundPage} />
          </Switch>
        </BrowserRouter>
      </Elements>
      <GlobalStyle />
    </>
  );
}
