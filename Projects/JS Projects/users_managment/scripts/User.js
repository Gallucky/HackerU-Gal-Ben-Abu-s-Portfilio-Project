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

    getStatus() {
        return this.status;
    }

    static changeUserPassword(id, email, oldPassword, newPassword) {
        const user = User.#getUserById(id);
        if (user && user.email === email && user.password === oldPassword) {
            user.password = newPassword;
            localStorage.setItem("users", JSON.stringify(User.users));
            updateRow(user);
        }
    }

    static changeUserEmail(id, oldEmail, newEmail, password) {
        const user = User.#getUserById(id);
        if (user && user.email === oldEmail && user.password === password) {
            user.email = newEmail;
            localStorage.setItem("users", JSON.stringify(User.users));
            updateRow(user);
        }
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

    static editUserById(id) {
        const user = User.#getUserById(id);

        if (user) {
            User.#openEditDialog(id);
        }
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

    static #openEditDialog(id) {
        const user = User.#getUserById(id);

        const editDialog = document.getElementById("edit-dialog");
        editDialog.classList.add("shown");

        const userID = document.getElementById("non-editable-user-id");
        const userEmail = document.getElementById("edit-user-email");
        const userPassword = document.getElementById("edit-user-password");

        userID.value = user.id;
        userEmail.value = user.email;
        userPassword.value = user.password;

        const saveButton = document.getElementById("edit-save-btn");
        saveButton.addEventListener("click", (e) => {
            e.preventDefault();
            const email = userEmail.value.trim();
            const password = userPassword.value.trim();

            User.changeUserPassword(user.id, user.email, user.password, password);
            User.changeUserEmail(user.id, user.email, email, password);
            editDialog.classList.remove("shown");
        });

        const cancelButton = document.getElementById("edit-cancel-btn");
        cancelButton.addEventListener("click", (e) => {
            e.preventDefault();
            editDialog.classList.remove("shown");
        });
    }
}
