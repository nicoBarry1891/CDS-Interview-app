const bcrypt = require('bcrypt');

class User {

    constructor(id, email, firstName, lastName, password, auth_token) {
        this.id = id,
            this.email = email,
            this.firstName = firstName,
            this.lastName = lastName,
            this.password = password

    }


    encryptPass = async function(password) {
        return await bcrypt.hash(password, 10);
    };



    static validateUserPassword = function(passwordParams, userPassword) {
        return bcrypt.compare(passwordParams, userPassword);
    };
}


module.exports = User;