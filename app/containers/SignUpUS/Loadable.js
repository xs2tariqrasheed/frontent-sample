/**
 * Asynchronously loads the component for US sign up
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
