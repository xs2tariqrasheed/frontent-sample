/**
 *
 * NavBackTo
 *
 */

import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function NavBackTo({ target }) {
  return (
    <nav
      role="navigation"
      className="bg-white w-100 p-5 uppercase text-sm font-heavy tracking-wide"
    >
      <div className="container mx-auto">
        {target === 'clubhouse' && (
          <Link to="/clubhouse">Back to Clubhouse</Link>
        )}
        {(target === 'playtoearn' || !target) && (
          <Link to="/playtoearn">Back to Marketplace</Link>
        )}
        {target === 'events' && <Link to="/events">Back to Events</Link>}
      </div>
    </nav>
  );
}

NavBackTo.propTypes = {
  target: PropTypes.string,
};

export default memo(NavBackTo);
