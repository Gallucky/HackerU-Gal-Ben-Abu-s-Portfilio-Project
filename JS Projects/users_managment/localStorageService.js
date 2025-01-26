import { User } from "./User.js";

// Local storage setup.
let users = [];

export const initializeLocalStorage = () => {
    // Checking if already initialized.
    if (localStorage.getItem("users")) {
        // Already initialized - loading data.
        const plainUsers = JSON.parse(localStorage.getItem("users")) || [];
        plainUsers.map((plainUser) => User.fromPlainObject(plainUser));
    } else {
        // Not initialized - initializing.
        localStorage.setItem("users", JSON.stringify(users));
    }
};

export const saveUsersToLocalStorage = () => {
    const plainUsers = users.map((user) => user.toPlainObject());
    localStorage.setItem("users", JSON.stringify(plainUsers));
};

export const addUserToLocalStorage = (user) => {
    if (!userAlreadyExists(user)) {
        users.push(user);

        console.log("User added to users array.\n", user);
        console.log("Users array:\n", users);
        console.log("Stringified users array:\n", JSON.stringify(users));

        saveUsersToLocalStorage();
    }
};

export const removeUserFromLocalStorage = (userID) => {
    users = users.filter((user) => user.userID !== userID);
    saveUsersToLocalStorage();
};

export const updateUserInLocalStorage = (userID, updatedUser) => {
    users.forEach((user) => {
        if (user.userID === userID) {
            user.updateUser(updatedUser);
        }
    });

    saveUsersToLocalStorage();
};

export const emailAlreadyInUse = (email) => {
    users.forEach((user) => {
        if (user.email === email) {
            return true;
        }
    });

    return false;
};

const userAlreadyExists = (user) => {
    users.some((existingUser) => user.email === existingUser.email);
};
