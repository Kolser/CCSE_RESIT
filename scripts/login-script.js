document.addEventListener("DOMContentLoaded", function () {
    // Redirect to account creation page
    const createAccountLink = document.querySelector(".login-section a");
    createAccountLink.addEventListener("click", function (event) {
        event.preventDefault();
        window.location.href = "account-creation.html";
    });

    // Handle login form submission
    const loginForm = document.getElementById("login-form");
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const storedUser = JSON.parse(localStorage.getItem("user"));

        if (storedUser && email === storedUser.email && password === storedUser.password) {
            localStorage.setItem("loggedInUserName", storedUser.name);
            window.location.href = "index.html";
        } else {
            alert("Invalid credentials. Please try again.");
        }
    });
});
