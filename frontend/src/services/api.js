import axios from 'axios';

//Instância do Axios com a URL base do backend
const api = axios.create({
  baseURL: 'http://localhost:3001/api',
});

//Envia email e senha para o backend validar
export const loginAdmin = async (email, password) => {
  const response = await api.post('/login', { email, password });
  return response.data;
};

//Busca todos os técnicos ativos
export const getTechnicians = async () => {
  const response = await api.get('/technicians');
  return response.data;
};

//Cadastra um novo técnico
export const createTechnician = async (data) => {
  const response = await api.post('/technicians', data);
  return response.data;
};

//Atualiza um técnico existente pelo id
export const updateTechnician = async (id, data) => {
  const response = await api.put(`/technicians/${id}`, data);
  return response.data;
};

//Realiza exclusão de um técnico pelo id
export const deleteTechnician = async (id) => {
  const response = await api.delete(`/technicians/${id}`);
  return response.data;
};