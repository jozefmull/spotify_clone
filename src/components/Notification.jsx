import React, {useEffect} from 'react'
import {NotificationContainer, NotificationManager} from 'react-notifications';

import 'react-notifications/lib/notifications.css';

const Notification = ({type, message, title, closeAfter}) => {

  const createNotification = (type) => {
    switch (type) {
      case 'info':
        NotificationManager.info(message, title, closeAfter);
        break;
      case 'success':
        NotificationManager.success(message, title);
        break;
      case 'warning':
        NotificationManager.warning(message, title, 20000);
        break;
      case 'error':
        NotificationManager.error(message, title, 20000);
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    createNotification(type)
    // eslint-disable-next-line
  }, [type])

  return (
    <NotificationContainer/>
  )
}

export default Notification