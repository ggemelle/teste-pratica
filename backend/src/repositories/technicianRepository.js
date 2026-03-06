//Importa o sql do arquivo de configuração do banco
const { sql } = require('../config/database');

//GET ALL — Busca todos os técnicos ativos
const getAll = async () => {
  try {
    const request = new sql.Request();

    const result = await request.query(`
      SELECT
        id,
        full_name,
        phone,
        email,
        cep,
        uf,
        city,
        created_at,
        updated_at
      FROM
        technicians
      WHERE
        deleted = 0
      ORDER BY
        full_name ASC
    `);

    return result.recordset;

  } catch (error) {
    throw new Error('Erro ao buscar técnicos: ' + error.message);
  }
};

//GET BY ID — Busca um técnico pelo ID
const getById = async (id) => {
  try {
    const request = new sql.Request();

    request.input('id', sql.Int, id);

    const result = await request.query(`
      SELECT
        id,
        full_name,
        phone,
        email,
        cep,
        uf,
        city,
        created_at,
        updated_at
      FROM
        technicians
      WHERE
        id = @id
      AND
        deleted = 0
    `);

    return result.recordset[0] || null;

  } catch (error) {
    throw new Error('Erro ao buscar técnico: ' + error.message);
  }
};

//CHECK DUPLICATES — Verifica se já existe técnico com mesmo e-mail ou telefone
const checkDuplicates = async (email, phone, excludeId = null) => {
  try {
    const request = new sql.Request();

    request.input('email', sql.VarChar(255), email.trim());
    request.input('phone', sql.VarChar(20),  phone.trim());

    let query = `
      SELECT id, email, phone FROM technicians
      WHERE (email = @email OR phone = @phone)
      AND deleted = 0
    `;

    if (excludeId) {
      request.input('excludeId', sql.Int, excludeId);
      query += ` AND id != @excludeId`;
    }

    const result = await request.query(query);
    return result.recordset[0] || null;

  } catch (error) {
    throw new Error('Erro ao verificar duplicatas: ' + error.message);
  }
};

//CREATE — Cria um novo técnico no banco
const create = async (data) => {
  try {
    const request = new sql.Request();

    request.input('full_name', sql.VarChar(255), data.full_name.trim());
    request.input('phone',     sql.VarChar(20),  data.phone.trim());
    request.input('email',     sql.VarChar(255), data.email.trim());
    request.input('cep',       sql.VarChar(9),   data.cep.trim());
    request.input('uf',        sql.Char(2),      data.uf.trim());
    request.input('city',      sql.VarChar(255), data.city.trim());

    const result = await request.query(`
      INSERT INTO technicians
        (full_name, phone, email, cep, uf, city)
      OUTPUT
        INSERTED.*
      VALUES
        (@full_name, @phone, @email, @cep, @uf, @city)
    `);

    return result.recordset[0];

  } catch (error) {
    throw new Error('Erro ao cadastrar técnico: ' + error.message);
  }
};

//UPDATE — Atualiza os dados de um técnico existente
const update = async (id, data) => {
  try {
    const request = new sql.Request();

    request.input('id',        sql.Int,          id);
    request.input('full_name', sql.VarChar(255), data.full_name.trim());
    request.input('phone',     sql.VarChar(20),  data.phone.trim());
    request.input('email',     sql.VarChar(255), data.email.trim());
    request.input('cep',       sql.VarChar(9),   data.cep.trim());
    request.input('uf',        sql.Char(2),      data.uf.trim());
    request.input('city',      sql.VarChar(255), data.city.trim());

    const result = await request.query(`
      UPDATE
        technicians
      SET
        full_name  = @full_name,
        phone      = @phone,
        email      = @email,
        cep        = @cep,
        uf         = @uf,
        city       = @city,
        updated_at = GETDATE()
      OUTPUT
        INSERTED.*
      WHERE
        id = @id
      AND
        deleted = 0
    `);

    return result.recordset[0] || null;

  } catch (error) {
    throw new Error('Erro ao atualizar técnico: ' + error.message);
  }
};

//DELETE — Remove um técnico existente
const remove = async (id) => {
  try {
    const request = new sql.Request();

    request.input('id', sql.Int, id);

    await request.query(`
      UPDATE
        technicians
      SET
        deleted    = 1,
        updated_at = GETDATE()
      WHERE
        id = @id
    `);

  } catch (error) {
    throw new Error('Erro ao excluir técnico: ' + error.message);
  }
};

//Exporta todas as funções para serem usadas no controller
module.exports = { getAll, getById, checkDuplicates, create, update, remove };