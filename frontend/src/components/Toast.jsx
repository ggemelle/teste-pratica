import { useState, useEffect } from 'react';
import styles from './Toast.module.css';

function Toast({ message, isVisible, onHide }) {

  const [isHiding, setIsHiding] = useState(false);

  useEffect(() => {

    if (!isVisible) return;

    setIsHiding(false);

    const hideTimer = setTimeout(() => {
      setIsHiding(true);
    }, 3000);

    const removeTimer = setTimeout(() => {
      onHide();
    }, 3400);

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(removeTimer);
    };

  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className={isHiding ? styles.toastHiding : styles.toast}>
      <p className={styles.message}>
        {message}
      </p>
    </div>
  );
}

export default Toast;