import { useState } from 'react';
import styles from './DeleteConfirmModal.module.css';

function DeleteConfirmModal({ technician, onConfirm, onCancel }) {

  const [loading, setLoading] = useState(false);

  if (!technician) return null;

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onConfirm();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>

        <div className={styles.header}>
          <h2 className={styles.headerTitle}>
            Excluir Técnico
          </h2>
        </div>

        <div className={styles.body}>
          <p className={styles.message}>
            Deseja excluir o técnico?
          </p>
          <p className={styles.message}>
            Esta ação não poderá ser desfeita.
          </p>
        </div>

        <div className={styles.footer}>
          <button
            className={styles.confirmButton}
            onClick={handleConfirm}
            disabled={loading}
          >
            Sim
          </button>
          <button
            className={styles.cancelButton}
            onClick={onCancel}
            disabled={loading}
          >
            Não
          </button>
        </div>

      </div>
    </div>
  );
}

export default DeleteConfirmModal;