//Expressões regulares (regex) para validar os campos

//Telefone deve estar no formato: (11) 9 1234-5678
const PHONE_REGEX = /^\(\d{2}\) \d \d{4}-\d{4}$/;

//CEP deve estar no formato: 12345-678
const CEP_REGEX = /^\d{5}-\d{3}$/;

//UF deve estar no formato: SP, MG, ...
const UF_REGEX = /^[A-Z]{2}$/;

const validateTechnician = (data) => {

  const errors = [];

  if (!data.full_name || data.full_name.trim() === '') {
    errors.push('Nome é obrigatório');

  } else if (data.full_name.trim().length < 3) {
    errors.push('Nome deve ter no mínimo 3 caracteres');
  }

  if (!data.phone || data.phone.trim() === '') {
    errors.push('Telefone é obrigatório');

  } else if (!PHONE_REGEX.test(data.phone.trim())) {
    errors.push('Telefone inválido. Use o formato: (11) 9 1234-5678');
  }

  if (!data.email || data.email.trim() === '') {
    errors.push('Email é obrigatório');

  } else if (!data.email.includes('@')) {
    errors.push('Email inválido. Deve conter @');
  }

  if (!data.cep || data.cep.trim() === '') {
    errors.push('CEP é obrigatório');

  } else if (!CEP_REGEX.test(data.cep.trim())) {
    errors.push('CEP inválido. Use o formato: 12345-678');
  }

  if (!data.uf || data.uf.trim() === '') {
    errors.push('UF é obrigatória');

  } else if (!UF_REGEX.test(data.uf.trim())) {
    errors.push('UF inválida. Use 2 letras maiúsculas. Ex: SP');
  }

  if (!data.city || data.city.trim() === '') {
    errors.push('Cidade é obrigatória');
  }

  return errors;
};

module.exports = { validateTechnician };