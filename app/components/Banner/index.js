/**
 *
 * Banner
 *
 */

import React, { memo, useEffect, useState } from 'react';
import { BannerContainer } from './styled';
import Notifications from '../../api/Notifications';

function Banner() {
  // const [notification, setNotification] =
  // const [setFetching] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    Notifications.single(1).then(data => {
      if (data && data.notification) {
        setNotification(data.notification);
      }
    });
  }, []);

  return notification && notification.isVisible ? (
    <BannerContainer>
      <p className="py-2 px-5 text-itas-dark-purple">
        {notification.text}&nbsp;
        {notification.link !== '' && (
          <a href={notification.link}>{notification.linkText}</a>
        )}
      </p>
    </BannerContainer>
  ) : (
    <></>
  );
}

export default memo(Banner);
