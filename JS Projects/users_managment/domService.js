import { User } from "./User.js";

const tableBody = document.getElementById("users-table");

export const addRow = (user) => {
    const row = document.createElement("tr");
    const id = document.createElement("td");
    const firstName = document.createElement("td");
    const lastName = document.createElement("td");
    const email = document.createElement("td");
    const password = document.createElement("td");
    const isLoggedIn = document.createElement("td");
    const actionButtons = document.createElement("td");
    actionButtons.className = "action-buttons";

    row.id = user.id;
    id.innerText = user.id;
    firstName.innerText = user.firstName;
    lastName.innerText = user.lastName;
    email.innerText = user.email;
    password.innerText = user.password;
    isLoggedIn.innerText = user.isLoggedIn ? "Logged In" : "Logged Out";

    const logoutButton = document.createElement("button");
    logoutButton.innerText = "Logout";
    logoutButton.id = `logout-button-${user.id}`;
    logoutButton.classList.add("shiny-button");
    logoutButton.style.backgroundColor = "lime";
    logoutButton.style.borderColor = "limegreen";
    logoutButton.style.color = "green";
    logoutButton.onclick = (e) => {
        e.preventDefault();
        User.logout(user.id);
    };

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.id = `delete-button-${user.id}`;
    deleteButton.classList.add("shiny-button");
    deleteButton.style.backgroundColor = "red";
    deleteButton.style.borderColor = "#AA0000";
    deleteButton.style.color = "darkred";
    deleteButton.onclick = (e) => {
        e.preventDefault();
        User.removeUserById(user.id);
    };

    const editButton = document.createElement("button");
    editButton.innerText = "Edit";
    editButton.id = `edit-button-${user.id}`;
    editButton.classList.add("shiny-button");
    editButton.style.backgroundColor = "#0099FF";
    editButton.style.borderColor = "#0077FF";
    editButton.style.color = "blue";
    editButton.onclick = (e) => {
        e.preventDefault();
        User.editUserById(user.id);
    };

    actionButtons.appendChild(logoutButton);
    actionButtons.appendChild(deleteButton);
    actionButtons.appendChild(editButton);

    row.appendChild(id);
    row.appendChild(firstName);
    row.appendChild(lastName);
    row.appendChild(email);
    row.appendChild(password);
    row.appendChild(isLoggedIn);
    row.appendChild(actionButtons);

    tableBody.appendChild(row);
};

export const removeRow = (id) => {
    const row = document.getElementById(id);
    row.remove();
    row = null;
};

export const updateRow = (user) => {
    const row = document.getElementById(user.id);
    row.children[1].innerText = user.firstName;
    row.children[2].innerText = user.lastName;
    row.children[3].innerText = user.email;
    row.children[4].innerText = user.password;
    row.children[5].innerText = user.isLoggedIn ? "Logged In" : "Logged Out";
    row.children[6].children[0].innerText = "Logout";

    console.log(row.children[6].children[0].innerText);
    console.log(user.isLoggedIn);
};

export const initializeTable = (users) => {
    users.forEach((user) => {
        addRow(user);
    });
};

export const emailIsTaken = (email) => {
    if (User.users.some((user) => user.email === email)) {
        console.log("Email is taken.");
        return true;
    }
    return false;
};
