/**
 *
 * Asynchronously loads the component for EnergyStat
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
