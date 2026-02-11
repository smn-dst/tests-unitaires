class User {
    constructor(firstName, lastName, dateOfBirth, email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.dateOfBirth = dateOfBirth;
        this.email = email;
    }

    isValid() {
        if (!this.firstName) return false;
        if (!this.lastName) return false;
        if (!this.email) return false;
        if (!this.dateOfBirth) return false;
    
        if (!this.email.includes("@")) return false;
    
        // Calculer l'âge seulement avec les années
        const birthYear = new Date(this.dateOfBirth).getFullYear();
        const currentYear = new Date().getFullYear();
        const age = currentYear - birthYear;
    
        if (isNaN(age)) return false;
        if (age < 13) return false;
    
        return true;
    }
}

module.exports = User;

// Implementer une classe User et sa classe de test : un user possède un email, prénom, nom, date de naissance. Un user est valide si son email est renseigné, et a le bon format, ses noms et prénom sont renseignés et si il a 13 ans ou plus : opération : isValid dans la classe User