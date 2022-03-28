/**
 * Asynchronously loads the component for Season Two Welcome
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
