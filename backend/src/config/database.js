const dotenv = require('dotenv');
const sql = require('mssql');

dotenv.config();

//Configuração da conexão com o SQL Server
const dbConfig = {
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  port: parseInt(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  options: {
    instanceName: 'SQLEXPRESS',
    trustServerCertificate: true,
    enableArithAbort: true,
  },
};

//Conectando ao banco de dados
const connectDB = async () => {
  try {
    await sql.connect(dbConfig);
    console.log('Conectado ao SQL Server com sucesso!');
  } catch (error) {
    console.error('Erro ao conectar ao SQL Server:', error.message);
    process.exit(1);
  }
};

module.exports = { connectDB, sql };