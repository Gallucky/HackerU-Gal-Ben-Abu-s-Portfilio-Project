export const initializeLoginLogic = () => {
    const loginBtn = document.getElementById("login-btn");

    loginBtn.addEventListener("submit", (e) => {
        e.preventDefault();

        const loginEmail = e.target.querySelector("#login-email");
        const loginPassword = e.target.querySelector("#login-password");

        console.log(loginEmail, loginPassword);
    });
};
