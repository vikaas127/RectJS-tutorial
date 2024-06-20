// views/UserExist.js
class UserExist {
    static showSuccessMessage() {
      console.log('Login successful!');
    }
  
    static showFailureMessage() {
      console.error('Login failed');
    }
  
    static showErrorMessage(error) {
      console.error('Error:', error);
      alert("User doesn't exist, go to SignUp to create an account");
    }
  }
  
  export default UserExist;
  