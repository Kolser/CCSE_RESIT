document.addEventListener("DOMContentLoaded", function () {
    const userGreeting = document.getElementById("user-greeting");
    const logoutButton = document.getElementById("logout-button");
    const loginButton = document.querySelector(".login-button");
    const furnitureItems = document.querySelectorAll(".furniture-item");
    const navLinks = document.querySelectorAll("nav a");
    const buyButtons = document.querySelectorAll(".buy-button");

    // Check if the user's name is stored
    const loggedInUserName = localStorage.getItem("loggedInUserName");

    if (loggedInUserName) {
        userGreeting.textContent = `Welcome, ${loggedInUserName}!`;

        // Display and add logout functionality to the button
        logoutButton.style.display = "inline-block";
        logoutButton.addEventListener("click", function () {
            localStorage.removeItem("loggedInUserName");
            
            // Update the UI if user logs out
            userGreeting.textContent = "";
            logoutButton.style.display = "none";
            loginButton.style.display = "inline-block";

            window.location.reload();
        });
        
        loginButton.style.display = "none";
    } else {
        logoutButton.style.display = "none";
        loginButton.style.display = "inline-block";
    }

    loginButton.addEventListener("click", function () {
        window.location.href = "login.html";
    });

    buyButtons.forEach(button => {
        button.addEventListener("click", function () {
            // User must be logged in to click the button
            if (loggedInUserName) {
                const itemName = this.getAttribute("data-item");
                const itemPriceElement = this.parentNode.querySelector(".price");
                const itemPrice = itemPriceElement.textContent;

                window.location.href = `finance.html?item=${encodeURIComponent(itemName)}&price=${encodeURIComponent(itemPrice)}`;
            } else {
                window.location.href = "login.html";
            }
        });
    });

    navLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const selectedCategory = this.getAttribute("data-category");

            // Highlight clicked filters
            navLinks.forEach(navLink => {
                navLink.classList.remove("active");
            });
            this.classList.add("active");

            // Show/hide furniture items based on selected category
            furnitureItems.forEach(item => {
                if (selectedCategory === "all" || item.getAttribute("data-category") === selectedCategory) {
                    item.style.display = "block";
                } else {
                    item.style.display = "none";
                }
            });
        });
    });

    // Show all furniture items by default
    furnitureItems.forEach(item => {
        item.style.display = "block";
    });
    
});
