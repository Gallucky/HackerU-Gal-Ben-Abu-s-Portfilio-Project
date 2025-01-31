import { addRow, removeRow, updateRow } from "./domService.js";

export class User {
    static users = localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : [];
    static count = 0;

    id;
    firstName;
    lastName;
    email;
    password;
    status;

    constructor(firstName, lastName, email, password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.status = false;
        this.id = User.users.length + 1;

        addRow(this);
        User.users.push(this);
        localStorage.setItem("users", JSON.stringify(User.users));
    }

    setNewName(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    changePassword(email, currentPassword, newPassword) {
        if (email === this.email && currentPassword === this.password) {
            this.password = newPassword;
            console.log("Password changed successfully.");
        } else {
            console.log("Failed to change password.");
        }
    }

    getStatus() {
        return this.status;
    }

    static removeUserById(id) {
        User.users = User.users.filter((user) => user.id !== id);
        console.log("User removed successfully.");
        localStorage.setItem("users", JSON.stringify(User.users));
        removeRow(id);
    }

    static login(id) {
        const user = User.#getUserById(id);

        if (user) {
            user.status = true;
            localStorage.setItem("users", JSON.stringify(User.users));
            updateRow(user);
            console.log("The updated users list:\n", localStorage.getItem("users"));
        } else {
            console.error("User is not found.");
        }
    }

    static logout(id) {
        const user = User.#getUserById(id);
        user.status = false;
        localStorage.setItem("users", JSON.stringify(User.users));
        updateRow(user);
    }

    static validateCredentials(email, password) {
        let userID = null;

        User.users.forEach((user) => {
            if (user.email === email && user.password === password) {
                userID = user.id;
            }
        });

        return userID;
    }

    static #getUserById(id) {
        let foundUser = null;
        User.users.forEach((user) => {
            if (user.id === id) {
                foundUser = user;
            }
        });

        return foundUser;
    }
}
