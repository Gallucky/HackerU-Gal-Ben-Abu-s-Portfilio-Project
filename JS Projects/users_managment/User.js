import { addRow, removeRow, updateRow } from "./domService.js";

export class User {
    static users = localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : [];
    static count = 0;

    id;
    firstName;
    lastName;
    email;
    password;
    isLoggedIn;

    constructor(firstName, lastName, email, password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.isLoggedIn = false;
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

    isLoggedIn() {
        return this.isLoggedIn;
    }

    static removeUserById(id) {
        User.users = User.users.filter((user) => user.id !== id);
        console.log("User removed successfully.");
        localStorage.setItem("users", JSON.stringify(User.users));
        removeRow(id);
    }

    static login(id) {
        const user = User.#getUserById(id);
        user.isLoggedIn = true;
        localStorage.setItem("users", JSON.stringify(User.users));
        updateRow(user);
    }

    static logout(id) {
        const user = User.#getUserById(id);
        user.isLoggedIn = false;
        localStorage.setItem("users", JSON.stringify(User.users));
        updateRow(user);
    }

    static #getUserById(id) {
        return User.users.find((user) => user.id === id);
    }
}
