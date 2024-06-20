// controllers/UserExistController.js
import UserModel from '../models/UserModel';
import LoginView from '../views/LoginView';

class UserExistController {
  static async handleLogin(Email, Password) {
    try {
      const result = await UserModel.checkUserExists(Email, Password);

      if (result.success) {
        sessionStorage.setItem('authToken', result.token);
        sessionStorage.setItem('isLogin', 'True');
        LoginView.showSuccessMessage();
      } else {
        sessionStorage.setItem('isLogin', 'False');
        LoginView.showFailureMessage();
      }
    } catch (error) {
      sessionStorage.setItem('isLogin', 'False');
      LoginView.showErrorMessage(error);
    }
  }
}

export default UserExistController;
