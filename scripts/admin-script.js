function createElement(tagName, attributes) {
    const element = document.createElement(tagName);

    if (attributes) {
        for (const key in attributes) {
            if (Object.hasOwnProperty.call(attributes, key)) {
                element.setAttribute(key, attributes[key]);
            }
        }
    }

    return element;
}

document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("main > section");
    const sectionLinks = document.querySelectorAll("nav a[data-section]");
    const inventoryList = document.getElementById("inventory-list");

    // Add click event listener to each section link
    sectionLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            sections.forEach(section => section.classList.remove("active-section"));


            const sectionId = event.target.getAttribute("data-section");
            const sectionToShow = document.getElementById(sectionId);
            sectionToShow.classList.add("active-section");

            sectionLinks.forEach(navLink => navLink.classList.remove("active-link"));
            link.classList.add("active-link");

        });
    });

    // Load furniture stock from the .JSON
    fetch("furniture-stock.json")
    .then(response => response.json())
    .then(stockData => {
        stockData.forEach(item => {
            const listItem = createElement("li");
            listItem.innerHTML = `Item: ${item.name}, Price: £${item.price}, Stock: ${item.stock}`;
            inventoryList.appendChild(listItem);
        });
    });

    const paymentReceipts = JSON.parse(localStorage.getItem("paymentReceipts")) || [];
    const salesList = document.getElementById("sales-list");

    // Show purchase history
    paymentReceipts.forEach(item => {
        const listItem = document.createElement("li");
        listItem.textContent = `Item: ${item.itemName}, Price: £${item.itemPrice}, User: ${item.userName}`;
        salesList.appendChild(listItem);
    });

    // Display customer documents in the finance section
    const financeList = document.getElementById("finance-list");
    const financeApplications = JSON.parse(localStorage.getItem("financeApplications")) || [];

    financeApplications.forEach(application => {
        const listItem = createElement("li");

        const infoParagraph = createElement("p");
        infoParagraph.textContent = `Customer: ${application.customerName}, Date: ${application.currentDate}`;
        listItem.appendChild(infoParagraph);

        const documentList = createElement("ul");
        application.documentDetails.forEach(document => {
            const documentItem = createElement("li");
            const documentLink = createElement("a", {
                href: localStorage.getItem(document.link),
                download: document.name
            });
            documentLink.textContent = document.name;
            documentItem.appendChild(documentLink);
            documentList.appendChild(documentItem);
        });
        listItem.appendChild(documentList);

        financeList.appendChild(listItem);
    });
});
