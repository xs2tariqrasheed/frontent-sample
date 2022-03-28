/**
 *
 * ProShopForm
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';

import { Link, withRouter } from 'react-router-dom';
import appboy from 'appboy-web-sdk';
import md5 from 'md5';
import messages from './messages';
import { Wrapper } from './styled';
import { options } from '../../countries';
import Button from '../../components/Button';
import Layout from '../Layout';

class ProShopForm extends React.Component {
  constructor(props) {
    super(props);
    this.container = React.createRef();
    // eslint-disable-next-line no-undef
    this.state = {
      email: '',
      durables: false,
      consumables: false,
      clothes: false,
      auction: false,
      legal: false,
      age: false,
      country: 'US',
      isLoading: false,
      isSubmitted: false,
      isSubscribed: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  scrollToSelf() {
    if (window.location.hash === '#newsletter') {
      setTimeout(() => {
        this.container.current.scrollIntoView({ behavior: 'smooth' });
      }, 1000);
    }
  }

  componentDidMount() {
    this.scrollToSelf();
  }

  componentDidUpdate() {
    this.scrollToSelf();
  }

  mailIsValid() {
    // eslint-disable-next-line no-useless-escape
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(this.state.email).toLowerCase());
  }

  handleSubmit(e) {
    e.preventDefault();
    const { durables, consumables, clothes, auction, legal, age } = this.state;
    this.setState({ isSubmitted: true });
    if (!legal || !age || !this.mailIsValid()) {
      return false;
    }

    this.setState({ isLoading: true });
    const user = appboy.getUser();
    appboy.changeUser(md5(this.state.email));
    user.setEmail(this.state.email);
    user.setCountry(this.state.country);
    user.setEmailNotificationSubscriptionType(
      appboy.ab.User.NotificationSubscriptionTypes.OPTED_IN,
    );
    user.setCustomUserAttribute('Waiting List', new Date());
    user.setCustomUserAttribute('signup_source', 'SITE');
    user.setCustomUserAttribute('signup_page', 'ProShop');
    user.setCustomUserAttribute('Buying Durables Check Box', durables);
    user.setCustomUserAttribute('Buying Consumables Check Box', consumables);
    user.setCustomUserAttribute('Buying Custom Clothes Check Box', clothes);
    user.setCustomUserAttribute('Pro Shop Auction Check Box', auction);
    user.addAlias(getUserId(), 'AuthId');
    return this.setState({
      isLoading: false,
      isSubmitted: false,
      isSubscribed: true,
    });
  }

  render() {
    return (
      <Layout>
        <Wrapper
          id="training"
          ref={this.container}
          className="mx-auto pt-10 md:pt-40 md:pb-32"
        >
          <article className="container mx-auto sm:px-4 pt-12 pb-24">
            <div className="sm:grid grid-cols-12 gap-10 grid-flow-col">
              <section className="col-span-6 mb-10">
                <FormattedMessage {...messages.header}>
                  {txt => (
                    <h1 className="text-white mb-12 text-4xl tracking-wide font-heavy uppercase">
                      {txt}
                    </h1>
                  )}
                </FormattedMessage>
                <p className="text-white">
                  Pro shops will offer gear to level up your game or your look.
                  Here’s what you can to expect to buy:
                </p>
                <ul className="text-white">
                  <li className="text-white" style={{ listStyle: 'circle' }}>
                    Durables ($50-$500) - Gear that you can use at any time to
                    level up your game.
                  </li>
                  <li className="text-white" style={{ listStyle: 'circle' }}>
                    Consumables ($5-$35) - Goods that you can use for limited
                    amount of times to level up your game.
                  </li>
                  <li className="text-white" style={{ listStyle: 'circle' }}>
                    Custom Clothing ($5-?) - Cool custom clothes to make winning
                    or so sweeter!
                  </li>
                </ul>
                <p className="text-white">
                  Pro Shops will also be available to purchase so you can earn
                  from each sale made in your store. Pro Shops will start at
                  $500 and go into auction.
                </p>
              </section>
              <section className="col-span-6 w-full">
                <div
                  className={`${!this.state.isSubscribed &&
                    'hidden'} bg-white max-w-xl rounded px-12 py-12 mb-4`}
                >
                  <h1 className="text-3xl text-blueberry uppercase">
                    Thanks for subscribing!
                  </h1>
                  {/* <p className="text-base"> */}
                  {/*  Be sure to add no-reply@mail.blockletegames.com to */}
                  {/*  your&nbsp; */}
                  {/*  /!* eslint-disable-next-line react/no-unescaped-entities *!/ */}
                  {/*  approved senders list so you don't miss any updates. */}
                  {/* </p> */}
                </div>
                <form
                  className={`${this.state.isSubscribed &&
                    'hidden'} bg-white max-w-xl rounded px-8 pt-6 pb-8 mb-4`}
                  onSubmit={this.handleSubmit}
                >
                  <div className="flex flex-wrap">
                    <label
                      className="block text-blueberry uppercase text-gray-700 text-sm font-bold mb-2"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      className={`${this.state.isSubmitted &&
                        !this.mailIsValid() &&
                        'invalid-input'} appearance-none bg-gray-200 w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:-outline`}
                      id="email"
                      name="email"
                      type="email"
                      onChange={e => this.setState({ email: e.target.value })}
                    />
                  </div>
                  <div className="flex flex-wrap mt-5">
                    <div className="w-full">
                      <label
                        className="block text-blueberry uppercase text-gray-700 text-sm font-bold mb-2"
                        htmlFor="country"
                      >
                        Country
                      </label>
                      <div className="inline-block relative w-full">
                        <select
                          className="block appearance-none w-full bg-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-gray-300"
                          onChange={e =>
                            this.setState({ country: e.target.value })
                          }
                          id="country"
                        >
                          {options.map(option => (
                            <option key={option.code}>{option.name}</option>
                          ))}
                        </select>

                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                          <svg
                            className="fill-current h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap">
                    <div className="w-full">
                      <span className="block text-blueberry text-gray-700 font-bold mt-10">
                        Sign up to be the first alerted when we pre-launch any
                        of the following:
                      </span>
                      <label
                        htmlFor="durables"
                        className={`${this.state.isSubmitted &&
                          !this.state.durables &&
                          'invalid-text'}  mt-3 inline-block flex items-center`}
                      >
                        <input
                          id="durables"
                          className="mr-2 leading-tight"
                          name="durables"
                          type="checkbox"
                          onChange={e =>
                            this.setState({ durables: e.target.checked })
                          }
                        />
                        <span className="block text-blueberry text-gray-700 text-sm">
                          Buying Durables
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className="flex flex-wrap">
                    <div className="w-full">
                      <label
                        htmlFor="consumables"
                        className={`${this.state.isSubmitted &&
                          !this.state.consumables &&
                          'invalid-text'} mt-3 inline-block flex items-center`}
                      >
                        <input
                          id="consumables"
                          className="mr-2 leading-tight"
                          name="consumables"
                          type="checkbox"
                          onChange={e =>
                            this.setState({ consumables: e.target.checked })
                          }
                        />
                        <span className="block text-blueberry text-gray-700 text-sm">
                          Buying Consumables
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className="flex flex-wrap">
                    <div className="w-full">
                      <label
                        htmlFor="clothes"
                        className={`${this.state.isSubmitted &&
                          !this.state.clothes &&
                          'invalid-text'} mt-3 inline-block flex items-center`}
                      >
                        <input
                          id="clothes"
                          className="mr-2 leading-tight"
                          name="clothes"
                          type="checkbox"
                          onChange={e =>
                            this.setState({ clothes: e.target.checked })
                          }
                        />
                        <span className="block text-blueberry text-gray-700 text-sm">
                          Buying Custom Clothes
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className="flex flex-wrap">
                    <div className="w-full">
                      <label
                        htmlFor="auction"
                        className={`${this.state.isSubmitted &&
                          !this.state.auction &&
                          'invalid-text'} mt-3 inline-block flex items-center`}
                      >
                        <input
                          id="auction"
                          className="mr-2 leading-tight"
                          name="auction"
                          type="checkbox"
                          onChange={e =>
                            this.setState({ auction: e.target.checked })
                          }
                        />
                        <span className="block text-blueberry text-gray-700 text-sm">
                          Pro Shop Auction
                        </span>
                      </label>
                    </div>
                  </div>

                  <label
                    htmlFor="legal"
                    className={`${this.state.isSubmitted &&
                      !this.state.legal &&
                      'invalid-text'} mt-8 inline-block flex items-center`}
                  >
                    <input
                      id="legal"
                      className="mr-2 leading-tight"
                      type="checkbox"
                      onChange={e => this.setState({ legal: e.target.checked })}
                    />
                    <span style={{ fontSize: '13px' }}>
                      By checking this box, I agree to the{' '}
                      <Link
                        className="text-cornflower"
                        target="_blank"
                        to="privacy"
                      >
                        Privacy Policy
                      </Link>{' '}
                      and{' '}
                      <Link
                        className="text-cornflower"
                        target="_blank"
                        to="terms-of-service"
                      >
                        Terms of Service.
                      </Link>
                    </span>
                  </label>

                  <label
                    htmlFor="age"
                    className={`${this.state.isSubmitted &&
                      !this.state.age &&
                      'invalid-text'}  mt-1 inline-block flex items-center`}
                  >
                    <input
                      id="age"
                      className="mr-2 leading-tight"
                      name="age"
                      type="checkbox"
                      onChange={e => this.setState({ age: e.target.checked })}
                    />
                    <span style={{ fontSize: '13px' }}>
                      I am over 18 years old.
                    </span>
                  </label>

                  <Button
                    type="submit"
                    isLoading={this.state.isLoading}
                    buttonLabel="Sign Up"
                    className="mt-10 btn inline-block no-underline text-center w-full sm:w-40 mr-5 inline-block"
                  />
                </form>
              </section>
            </div>
          </article>
        </Wrapper>
      </Layout>
    );
  }
}

function getUserId() {
  const userString = JSON.parse(
    JSON.parse(localStorage.getItem('persist:root')).user,
  ).uuid;
  if (
    typeof userString !== 'undefined' &&
    userString !== '' &&
    userString !== null
  ) {
    return userString;
  }
  return '';
}

ProShopForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  withRouter,
  withConnect,
)(ProShopForm);
