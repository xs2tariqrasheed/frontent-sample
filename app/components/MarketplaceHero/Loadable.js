/**
 *
 * Asynchronously loads the component for MarketplaceHero
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
