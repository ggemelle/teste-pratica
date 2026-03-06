import { useState, useEffect } from 'react';
import styles from './Technicians.module.css';
import { FiSearch, FiPower } from 'react-icons/fi';
import logoMPS from '../assets/MPS.png';
import IconEditar from '../assets/Editar.svg';
import IconExcluir from '../assets/Excluir.svg';
import IconTecnicos from '../assets/Icon_feather-users.svg';
import { getTechnicians, createTechnician, updateTechnician, deleteTechnician } from '../services/api';
import TechnicianFormModal from '../components/TechnicianFormModal';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import Toast from '../components/Toast';

function Technicians({ onLogout }) {

  const [technicians, setTechnicians]               = useState([]);
  const [filtered, setFiltered]                     = useState([]);
  const [search, setSearch]                         = useState('');
  const [loading, setLoading]                       = useState(true);
  const [error, setError]                           = useState('');
  const [toast, setToast]                           = useState({ visible: false, message: '' });
  const [selectedTechnician, setSelectedTechnician] = useState(null);
  const [showFormModal, setShowFormModal]           = useState(false);
  const [showDeleteModal, setShowDeleteModal]       = useState(false);

  useEffect(() => {
    fetchTechnicians();
  }, []);

  useEffect(() => {
    if (!search.trim()) {
      setFiltered(technicians);
      return;
    }
    const term = search.toLowerCase();
    setFiltered(technicians.filter((t) =>
      t.full_name.toLowerCase().includes(term) ||
      t.email.toLowerCase().includes(term) ||
      t.city.toLowerCase().includes(term)
    ));
  }, [search, technicians]);

  const fetchTechnicians = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getTechnicians();
      setTechnicians(data);
      setFiltered(data);
    } catch (err) {
      setError('Erro ao carregar técnicos. Verifique se o backend está rodando.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddClick = () => {
    setSelectedTechnician(null);
    setShowFormModal(true);
  };

  const handleEditClick = (technician) => {
    setSelectedTechnician(technician);
    setShowFormModal(true);
  };

  const handleDeleteClick = (technician) => {
    setSelectedTechnician(technician);
    setShowDeleteModal(true);
  };

  const handleFormCancel = () => {
    setShowFormModal(false);
    setSelectedTechnician(null);
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setSelectedTechnician(null);
  };

  const handleSave = async (formData) => {
    if (selectedTechnician) {
      await updateTechnician(selectedTechnician.id, formData);
      showSuccess('Alterações salvas com sucesso!');
    } else {
      await createTechnician(formData);
      showSuccess('Técnico adicionado com sucesso!');
    }
    fetchTechnicians();
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteTechnician(selectedTechnician.id);
      setShowDeleteModal(false);
      setSelectedTechnician(null);
      showSuccess('Técnico excluído com sucesso!');
      fetchTechnicians();
    } catch (err) {
      setError('Erro ao excluir técnico. Tente novamente.');
      setShowDeleteModal(false);
    }
  };

  const showSuccess = (message) => {
    setToast({ visible: true, message });
  };

  const hideToast = () => {
    setToast({ visible: false, message: '' });
  };

  return (
    <div className={styles.container}>

      <aside className={styles.sidebar}>
        <img src={logoMPS} alt="Logo MPS" className={styles.sidebarLogo} />
        <nav className={styles.nav}>
          <div className={styles.navItemActive}>
            <img src={IconTecnicos} alt="Técnicos" style={{ width: 30, height: 30 }} />
            Técnicos
          </div>
        </nav>
      </aside>

      <main className={styles.main}>

        <div className={styles.topbar}>
          <button className={styles.logoutButton} onClick={onLogout}>
            <FiPower size={14} />
            Sair
          </button>
        </div>

        <div className={styles.content}>

          {error && (
            <div className={styles.errorBox}> {error}</div>
          )}

          <div className={styles.actionsBar}>
            <div className={styles.searchWrapper}>
              <FiSearch className={styles.searchIcon} />
              <input
                className={styles.searchInput}
                type="text"
                placeholder="Procurar técnico"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button className={styles.addButton} onClick={handleAddClick}>
              Adicionar Técnico
            </button>
          </div>

          {loading ? (
            <div className={styles.loadingBox}>
              Carregando técnicos...
            </div>

          ) : filtered.length === 0 ? (
            <div className={styles.emptyBox}>
              {search
                ? 'Nenhum técnico encontrado para sua busca.'
                : 'Nenhum técnico cadastrado ainda.'
              }
            </div>

          ) : (
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>E-mail</th>
                    <th>Telefone</th>
                    <th>Cidade</th>
                    <th>UF</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((technician) => (
                    <tr key={technician.id}>
                      <td>{technician.full_name}</td>
                      <td>{technician.email}</td>
                      <td>{technician.phone}</td>
                      <td>{technician.city}</td>
                      <td>{technician.uf}</td>
                      <td>
                        <div className={styles.actionButtons}>
                          <button
                            className={styles.iconButton}
                            onClick={() => handleEditClick(technician)}
                            title="Editar"
                          >
                            <img src={IconEditar} alt="Editar" style={{ width: 32, height: 32 }} />
                          </button>
                          <button
                            className={styles.iconButton}
                            onClick={() => handleDeleteClick(technician)}
                            title="Excluir"
                          >
                            <img src={IconExcluir} alt="Excluir" style={{ width: 32, height: 32 }} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>
      </main>

      {showFormModal && (
        <TechnicianFormModal
          technician={selectedTechnician}
          onSave={handleSave}
          onCancel={handleFormCancel}
        />
      )}

      {showDeleteModal && (
        <DeleteConfirmModal
          technician={selectedTechnician}
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
      )}

      <Toast
        message={toast.message}
        isVisible={toast.visible}
        onHide={hideToast}
      />

    </div>
  );
}

export default Technicians;