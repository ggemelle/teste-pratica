import { useState, useEffect } from 'react';
import styles from './TechnicianFormModal.module.css';
import CancelConfirmModal from './CancelConfirmModal';

function TechnicianFormModal({ technician, onSave, onCancel }) {

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    cep: '',
    city: '',
    uf: '',
  });

  const [errors, setErrors]                       = useState([]);
  const [successMessage, setSuccessMessage]       = useState('');
  const [loading, setLoading]                     = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  useEffect(() => {
    if (technician) {
      setFormData({
        full_name: technician.full_name,
        email:     technician.email,
        phone:     technician.phone,
        cep:       technician.cep,
        city:      technician.city,
        uf:        technician.uf,
      });
    } else {
      setFormData({
        full_name: '',
        email: '',
        phone: '',
        cep: '',
        city: '',
        uf: '',
      });
    }
    setErrors([]);
    setSuccessMessage('');
  }, [technician]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCancelClick = () => {
    setShowCancelConfirm(true);
  };

  const handleCancelConfirm = () => {
    setShowCancelConfirm(false);
    onCancel();
  };

  const handleCancelDeny = () => {
    setShowCancelConfirm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    setSuccessMessage('');
    setLoading(true);

    try {
      await onSave(formData);
      setSuccessMessage(
  technician
    ? 'Alterações salvas com sucesso!'
    : 'Técnico adicionado com sucesso!'
);
      setTimeout(() => onCancel(), 1000);
    } catch (error) {
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors(['Erro ao salvar técnico. Tente novamente.']);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>

        <div className={styles.header}>
          <h2 className={styles.headerTitle}>
            {technician ? 'Editar Técnico' : 'Adicionar Técnico'}
          </h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.body}>

            <div className={styles.field}>
              <label className={styles.label}>Nome completo</label>
              <input
                className={styles.input}
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                placeholder="Informe o nome do técnico"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>E-mail</label>
              <input
                className={styles.input}
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Informe o e-mail do técnico"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Telefone</label>
              <input
                className={styles.input}
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Informe o telefone com DDD do técnico"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>CEP</label>
              <input
                className={styles.input}
                type="text"
                name="cep"
                value={formData.cep}
                onChange={handleChange}
                placeholder="Informe o CEP"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Cidade</label>
              <input
                className={styles.input}
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Informe a cidade"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>UF</label>
              <input
                className={styles.input}
                type="text"
                name="uf"
                value={formData.uf}
                onChange={handleChange}
                placeholder="Informe o Estado"
                maxLength={2}
              />
            </div>

          </div>

          <div className={styles.footer}>
            <button
              type="submit"
              className={styles.saveButton}
              disabled={loading}
            >
             Salvar
            </button>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={handleCancelClick}
            >
              Cancelar
            </button>
          </div>

        </form>

      </div>

      {showCancelConfirm && (
        <CancelConfirmModal
          onConfirm={handleCancelConfirm}
          onCancel={handleCancelDeny}
        />
      )}

    </div>
  );
}

export default TechnicianFormModal;