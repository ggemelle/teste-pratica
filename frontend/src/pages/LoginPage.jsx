import { useState } from 'react';
import styles from './LoginPage.module.css';
import logoMPS from '../assets/MPS.png';
import { loginAdmin } from '../services/api';
import { FiEye, FiEyeOff } from 'react-icons/fi';

function LoginPage({ onLoginSuccess }) {

  const [email, setEmail]             = useState('');
  const [password, setPassword]       = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError]             = useState('');
  const [loading, setLoading]         = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Preencha todos os campos');
      return;
    }

    setLoading(true);

    try {
      const response = await loginAdmin(email, password);
      if (response.success) {
        localStorage.setItem('auth', 'true');
        onLoginSuccess();
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError('Credenciais inválidas');
      } else {
        setError('Erro ao conectar com o servidor. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>

      <div className={styles.leftPanel}>
        <div className={styles.formWrapper}>

          <img
            src={logoMPS}
            alt="Logo MPS"
            className={styles.logo}
          />

          {error && (
            <div className={styles.errorBox}>
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            style={{ width: '100%' }}
          >

            <div className={styles.field}>
              <label className={styles.label}>Login</label>
              <input
                className={styles.input}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Informe seu e-mail"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Senha</label>
              <div className={styles.passwordWrapper}>
                <input
                  className={styles.passwordInput}
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Informe sua senha"
                />
                <span
  className={styles.eyeIcon}
  onClick={toggleShowPassword}
>
  {showPassword ? <FiEyeOff size={20} color="#C9C9C9" /> : <FiEye size={20} color="#C9C9C9" />}
</span>
              </div>
            </div>

            <div className={styles.buttonWrapper}>
              <button
                type="submit"
                className={loading ? styles.buttonLoading : styles.button}
                disabled={loading}
              >
                Entrar
              </button>
            </div>

          </form>
        </div>
      </div>

      <div className={styles.rightPanel} />

    </div>
  );
}

export default LoginPage;