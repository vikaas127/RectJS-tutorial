// models/UserModel.js
import axios from 'axios';

class UserModel {
  static async checkUserExists(Email, Password) {
    try {
      const response = await axios.post(
        'http://localhost:3001/api/login',
        { Email, Password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.status === 200 && response.data.token) {
        return { success: true, token: response.data.token };
      } else {
        return { success: false };
      }
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
}

export default UserModel;
