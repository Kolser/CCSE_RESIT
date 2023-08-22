document.addEventListener("DOMContentLoaded", function () {
    const accountForm = document.getElementById("account-form");

    accountForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const user = {
            name: name,
            email: email,
            password: password
        };

        // Save user data to localStorage (should not be done for a real website)
        localStorage.setItem("user", JSON.stringify(user));
        window.location.href = "login.html";
    });
});
