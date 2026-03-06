import styles from './CancelConfirmModal.module.css';

function CancelConfirmModal({ onConfirm, onCancel }) {

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>

        <div className={styles.header}>
          <h2 className={styles.headerTitle}>
            Cancelar
          </h2>
        </div>

        <div className={styles.body}>
          <p className={styles.message}>
            Deseja cancelar a edição dos dados do técnico?
          </p>
          <p className={styles.message}>
            As alterações serão perdidas.
          </p>
        </div>

        <div className={styles.footer}>
          <button
            className={styles.confirmButton}
            onClick={onConfirm}
          >
            Sim
          </button>
          <button
            className={styles.cancelButton}
            onClick={onCancel}
          >
            Não
          </button>
        </div>

      </div>
    </div>
  );
}

export default CancelConfirmModal;