import React, { useEffect } from 'react';
import { useDAOStore } from '../../../store/useDAOStore';
import { FaCheckCircle, FaExclamationTriangle, FaInfoCircle, FaTimes } from 'react-icons/fa';
import './NotificationSystem.css';

const NotificationItem = ({ notification, onRemove }) => {
  const getIcon = () => {
    switch (notification.type) {
      case 'success':
        return <FaCheckCircle className="notification-icon success" />;
      case 'warning':
        return <FaExclamationTriangle className="notification-icon warning" />;
      case 'error':
        return <FaExclamationTriangle className="notification-icon error" />;
      default:
        return <FaInfoCircle className="notification-icon info" />;
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove(notification.id);
    }, notification.duration || 5000);

    return () => clearTimeout(timer);
  }, [notification.id, notification.duration, onRemove]);

  return (
    <div className={`notification-item ${notification.type}`}>
      <div className="notification-content">
        {getIcon()}
        <div className="notification-text">
          {notification.title && (
            <div className="notification-title">{notification.title}</div>
          )}
          <div className="notification-message">{notification.message}</div>
        </div>
      </div>
      <button
        className="notification-close"
        onClick={() => onRemove(notification.id)}
        aria-label="Close notification"
      >
        <FaTimes />
      </button>
    </div>
  );
};

export const NotificationSystem = () => {
  const { notifications, removeNotification } = useDAOStore();

  if (notifications.length === 0) return null;

  return (
    <div className="notification-system">
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onRemove={removeNotification}
        />
      ))}
    </div>
  );
};