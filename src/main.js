// main.js
import LoginController from './controllers/LoginController';

const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const Email = event.target.email.value;
  const Password = event.target.password.value;
  await LoginController.handleLogin(Email, Password);
});
