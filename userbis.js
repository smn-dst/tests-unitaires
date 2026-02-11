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

        return this.externalAPI.isValid(this.email)
            && this.firstName && this.firstName.trim() !== ""
            && this.lastName && this.lastName.trim() !== ""
            && birthDate <= thirteenYearsAgo;
    }
}

module.exports = UserBis;