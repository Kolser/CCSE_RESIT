document.addEventListener("DOMContentLoaded", function () {
    // Handle login form submission
    const loginForm = document.getElementById("login-form");
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        // Fixed staff credentials that will not be stored here upon a real implementation
        const fixedStaffEmail = "bobvegan@mail.com";
        const fixedStaffPassword = "12345";

        if (email === fixedStaffEmail && password === fixedStaffPassword) {
            window.location.href = "admin.html";
        } else {
            alert("Invalid credentials. Please try again.");
        }
    });
});
