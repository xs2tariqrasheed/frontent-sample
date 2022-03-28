/**
 * Asynchronously loads the component for My Golfers
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
