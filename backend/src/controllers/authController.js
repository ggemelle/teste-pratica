//Credenciais do administrador
const login = (req, res) => {
  try {

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email e senha são obrigatórios',
      });
    }

    if (
      email    === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      return res.status(200).json({
        success: true,
        message: 'Login realizado com sucesso',
      });
    }

    return res.status(401).json({
      success: false,
      message: 'Credenciais inválidas',
    });

  } catch (error) {
    console.error('Erro ao realizar login:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Erro interno do servidor',
    });
  }
};

module.exports = { login };