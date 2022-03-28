/*
 * Footer
 *
 * Footer for the user's account.
 *
 */

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import SocialMedia from './SocialMedia';
import { Version, FooterStyles, FooterWrapper } from './styled';
const ArenaGolfLogo =
  'https://www.blockletegames.com/images/Blocklete-B-Logo.png';

/*eslint-disable */
const Footer = () =>  {

  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split('/');

  return (
    <FooterStyles>
      <div className={splitLocation[1] === '' ? 'home' : 'not-home'}>
        <FooterWrapper className="container mx-auto px-2 text-white pt-12 xs:pb-12 md:pb-20">
          <div className="text-center">
            <div className="inline-block align-middle">
              <Link to="/">
                <img
                  src={ArenaGolfLogo} alt='Blocklete Games Logo' />
              </Link>
            </div>
            <nav role="navigation" className="inline-block mx-12">
              <ul className="leading-10 inline">
                <li className="xs:mb-1 md:mb-5 md:col-span-2 inline-block mx-6 font-display"><Link
                  className="hover:underline text-white no-underline text-base font-heavy uppercase tracking-wide"
                  to="/">Home</Link></li>
                <li className="xs:mb-1 md:mb-5 md:col-span-2 inline-block mx-6 font-display"><Link
                  className="hover:underline text-white no-underline text-base font-heavy uppercase tracking-wide"
                  to={{ pathname: 'https://wbgamessupport.wbgames.com/hc/en-us' }} target="_blank">How to Play</Link></li>
                <li className="xs:mb-1 md:mb-5 md:col-span-2 inline-block mx-6 font-display"><Link
                  className="hover:underline text-white no-underline text-base font-heavy uppercase tracking-wide"
                  to="/terms-of-service">Terms of Service</Link></li>
                <li className="xs:mb-1 md:mb-5 md:col-span-2 inline-block mx-6 font-display"><Link
                  className="hover:underline text-white no-underline text-base font-heavy uppercase tracking-wide"
                  to="/playtoearn">Marketplace</Link></li>
                <li className="xs:mb-1 md:mb-5 md:col-span-2 inline-block mx-6 font-display"><Link
                  className="hover:underline text-white no-underline text-base font-heavy uppercase tracking-wide"
                  to="/privacy">Privacy Policy</Link></li>
              </ul>
            </nav>
            <SocialMedia />
          </div>
          <div className="text-center">
            <p className="text-sm font-display text-white tracking-wide mt-4">© 2021 Blocklete Games™. All rights reserved.</p>
          </div>
        </FooterWrapper>
      </div>
    </FooterStyles>
  );
};

export default Footer;
/* eslint-enable */
