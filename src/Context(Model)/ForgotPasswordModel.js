// PasswordResetModel.js
class ForgotPasswordModel {
    constructor() {
        this.email = '';
        this.contact = '';
    }

    setEmail(email) {
        this.email = email;
    }

    setContact(contact) {
        this.contact = contact;
    }

    getEmail() {
        return this.email;
    }

    getContact() {
        return this.contact;
    }
}

export default ForgotPasswordModel;
