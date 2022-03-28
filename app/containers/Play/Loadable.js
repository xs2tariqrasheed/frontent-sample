/**
 * Asynchronously loads the component for Play
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
