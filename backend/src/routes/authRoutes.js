//Criação das rotas de admin
const { Router } = require('express');
const { login } = require('../controllers/authController');
const router = Router();
router.post('/', login);
module.exports = router;