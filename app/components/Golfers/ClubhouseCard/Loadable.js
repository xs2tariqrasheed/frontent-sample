/**
 * Asynchronously loads the component for Purchase cards
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
