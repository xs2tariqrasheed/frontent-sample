/**
 * Asynchronously loads the component for Pack Opening
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
