const repository = require('../repositories/technicianRepository');
const { validateTechnician } = require('../validations/technicianValidation');

//GET ALL — Lista todos os técnicos ativos
const getAll = async (req, res) => {
  try {

    const technicians = await repository.getAll();
    return res.status(200).json(technicians);

  } catch (error) {
    console.error('Erro ao listar técnicos:', error.message);
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

//CREATE
const create = async (req, res) => {
  try {

    const data = req.body;

    const errors = validateTechnician(data);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const duplicate = await repository.checkDuplicates(data.email, data.phone);

    if (duplicate) {
      const errors = [];

      if (duplicate.email === data.email.trim()) {
        errors.push('Já existe um técnico cadastrado com este e-mail');
      }

      if (duplicate.phone === data.phone.trim()) {
        errors.push('Já existe um técnico cadastrado com este telefone');
      }

      return res.status(400).json({ errors });
    }

    const newTechnician = await repository.create(data);
    return res.status(201).json(newTechnician);

  } catch (error) {
    console.error('Erro ao cadastrar técnico:', error.message);
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

//UPDATE
const update = async (req, res) => {
  try {

    const { id } = req.params;
    const data = req.body;

    const existing = await repository.getById(id);
    if (!existing) {
      return res.status(404).json({ message: 'Técnico não encontrado' });
    }

    const errors = validateTechnician(data);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const duplicate = await repository.checkDuplicates(data.email, data.phone, id);

    if (duplicate) {
      const errors = [];

      if (duplicate.email === data.email.trim()) {
        errors.push('Já existe um técnico cadastrado com este e-mail');
      }

      if (duplicate.phone === data.phone.trim()) {
        errors.push('Já existe um técnico cadastrado com este telefone');
      }

      return res.status(400).json({ errors });
    }

    const updatedTechnician = await repository.update(id, data);
    return res.status(200).json(updatedTechnician);

  } catch (error) {
    console.error('Erro ao atualizar técnico:', error.message);
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

//DELETE
const remove = async (req, res) => {
  try {

    const { id } = req.params;

    const existing = await repository.getById(id);
    if (!existing) {
      return res.status(404).json({ message: 'Técnico não encontrado' });
    }

    await repository.remove(id);
    return res.status(200).json({ message: 'Técnico excluído com sucesso' });

  } catch (error) {
    console.error('Erro ao excluir técnico:', error.message);
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

module.exports = { getAll, create, update, remove };