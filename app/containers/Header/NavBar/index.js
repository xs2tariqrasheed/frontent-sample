/*
 * NavBar
 *
 * Site navigation bar
 *
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  GenericLink,
  HelpDropdownContent,
  HelpDropdown,
  HelpLink,
} from './styled';
import HamburgerGolf from '../../../components/HamburgerGolf/index';
import UserLink from './UserLink';
import MobileMenu from './MobileMenu';
import AppleAppStore from '../../../images/apple-app-store-icon.svg';
import GoogleAppStore from '../../../images/google-app-store-icon.svg';

const NavBar = props => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      role="navigation"
      className="lg:w-full flex justify-between items-center xs:ml-auto"
    >
      <div className="hidden sm:block">
        <GenericLink to="/playtoearn">Marketplace</GenericLink>
        {props.username === '' ? (
          <GenericLink to="/signin">Clubhouse</GenericLink>
        ) : (
          <GenericLink to="/clubhouse">Clubhouse</GenericLink>
        )}
        <HelpDropdown>
          <GenericLink to="#">FAQ</GenericLink>
          <HelpDropdownContent>
            <div>
              <div className="inline-block align-top w-3/5 mb-4">
                <p>About</p>
                <HelpLink
                  to={{ pathname: 'https://discord.gg/XP6t68NerX' }}
                  target="_blank"
                >
                  Flow FAQ
                </HelpLink>
                <HelpLink
                  to={{ pathname: 'https://discord.gg/czQWAduGaJ' }}
                  target="_blank"
                >
                  Buying & Selling
                </HelpLink>
              </div>
              <div className="inline-block align-top w-2/5">
                <p>Community</p>
                <HelpLink
                  to={{ pathname: 'https://discord.gg/XDJAJdr' }}
                  target="_blank"
                >
                  Discord
                </HelpLink>
                <HelpLink
                  to={{ pathname: 'https://twitter.com/BlockleteGames' }}
                  target="_blank"
                >
                  Twitter
                </HelpLink>
                <HelpLink
                  to={{
                    pathname: 'mailto:support@blockletegames.com',
                  }}
                  target="_blank"
                >
                  Contact Support
                </HelpLink>
              </div>
              <div>
                <p>App Coming Soon</p>
                {/* <Link
                  to={{ pathname: 'https://www.apple.com/app-store/' }}
                  target="_blank"
                > */}
                <img src={AppleAppStore} alt="Apple App Store" />
                {/* </Link> */}
                {/* <Link
                  to={{ pathname: 'https://play.google.com/store/apps' }}
                  target="_blank"
                > */}
                <img src={GoogleAppStore} alt="Google App Store" />
                {/* </Link> */}
              </div>
            </div>
          </HelpDropdownContent>
        </HelpDropdown>
      </div>
      <UserLink />
      <HamburgerGolf
        className="block sm:hidden cursor-pointer"
        onClick={() => setMenuOpen(!isMenuOpen)}
      />
      <MobileMenu isOpen={isMenuOpen} onClose={() => setMenuOpen(false)} />
    </nav>
  );
};

export default NavBar;
