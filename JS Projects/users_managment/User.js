export class User {
    static #id = 0;

    #firstName;
    #lastName;
    #email;
    #password;
    #isLoggedIn;
    #userID;

    constructor(firstName, lastName, email, password) {
        this.#firstName = firstName;
        this.#lastName = lastName;
        this.#email = email;
        this.#password = password;
        this.#isLoggedIn = false;

        User.#id++;
        this.#userID = User.#id;
    }

    get firstName() {
        return this.#firstName;
    }

    get lastName() {
        return this.#lastName;
    }

    get email() {
        return this.#email;
    }

    setNewName(firstName, lastName) {
        this.#firstName = firstName;
        this.#lastName = lastName;
    }

    changePassword(email, currentPassword, newPassword) {
        if (email === this.#email && currentPassword === this.#password) {
            this.#password = newPassword;
            console.log("Password changed successfully.");
        } else {
            console.log("Failed to change password.");
        }
    }

    isLoggedIn() {
        return this.#isLoggedIn;
    }

    login(email, password) {
        if (this.#email === email && this.#password === password) {
            this.#isLoggedIn = true;
            console.log("Logged in successfully.");
            return true;
        }

        console.log("Failed to log in.");
        return false;
    }

    updateUser(updatedUser) {
        this.#firstName = updatedUser.firstName;
        this.#lastName = updatedUser.lastName;
        this.#email = updatedUser.email;
        this.#password = updatedUser.password;
        this.#isLoggedIn = updatedUser.isLoggedIn;
    }

    // Serialization: Convert to plain object
    toPlainObject() {
        return {
            firstName: this.#firstName,
            lastName: this.#lastName,
            email: this.#email,
            isLoggedIn: this.#isLoggedIn,
            userID: this.#userID,
        };
    }

    // Static method: Create a User instance from a plain object
    static fromPlainObject(obj) {
        const user = new User(obj.firstName, obj.lastName, obj.email, "");
        user.#isLoggedIn = obj.isLoggedIn;
        user.#userID = obj.userID;

        // Ensure the static ID is up-to-date
        if (obj.userID >= User.#id) {
            User.#id = obj.userID + 1;
        }

        return user;
    }
}
