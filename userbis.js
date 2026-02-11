class UserBis {
    constructor(firstName, lastName, dateOfBirth, email, externalAPI) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.dateOfBirth = dateOfBirth;
        this.email = email;
        this.externalAPI = externalAPI;
    }

    isValid() {
        const birthDate = new Date(this.dateOfBirth);
        const today = new Date();
        const thirteenYearsAgo = new Date(
            today.getFullYear() - 13,
            today.getMonth(),
            today.getDate()
        );

        const emailOk = this.externalAPI.isValid(this.email);
        const firstNameOk = !!(this.firstName && this.firstName.trim() !== "");
        const lastNameOk = !!(this.lastName && this.lastName.trim() !== "");
        const ageOk = birthDate <= thirteenYearsAgo;

        return emailOk && firstNameOk && lastNameOk && ageOk;
    }
}

module.exports = UserBis;