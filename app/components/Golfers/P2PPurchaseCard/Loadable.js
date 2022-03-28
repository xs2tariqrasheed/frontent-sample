/**
 * Asynchronously loads the component for P2PPurchaseCard cards
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
