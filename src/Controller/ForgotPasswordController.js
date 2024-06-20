// PasswordResetController.js
class ForgotPasswordController {
    constructor(model) {
        this.model = model;
    }

    setEmail(email) {
        this.model.setEmail(email);
    }

    setContact(contact) {
        this.model.setContact(contact);
    }

    handleSubmit(event) {
        event.preventDefault();
        // Handle submission logic, like API calls
        console.log("Email submitted: ", this.model.getEmail());
    }
}

export default ForgotPasswordController;
