import { apiLocation } from '../config';

const Notifications = {
  async single(id) {
    try {
      const res = await fetch(`${apiLocation}/public/notifications/${id}`, {
        method: 'GET',
      });
      return await res.json();
    } catch (err) {
      return err;
    }
  },
};

export default Notifications;
