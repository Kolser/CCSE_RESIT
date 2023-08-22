document.addEventListener("DOMContentLoaded", function () {
    const itemNameSpan = document.getElementById("item-name");
    const itemPriceSpan = document.getElementById("item-price");
    const paymentOptions = document.getElementsByName("payment-option");
    const financeForm = document.getElementById("finance-form");
    const paymentForm = document.getElementById("full-payment");
    const documentUpload = document.getElementById("document-upload");
    const submitFinanceButton = document.getElementById("submit-finance");
    const loggedInUserName = localStorage.getItem("loggedInUserName");

    const urlParams = new URLSearchParams(window.location.search);
    const itemName = urlParams.get("item");
    const itemPrice = urlParams.get("price");
    itemNameSpan.textContent = itemName;
    itemPriceSpan.textContent = itemPrice;

    financeForm.style.display = "none";
    paymentOptions.forEach(option => {
        option.addEventListener("change", function () {
            if (this.value === "full-payment") {
                financeForm.style.display = "none";
                paymentForm.style.display = "block"
            } else {
                financeForm.style.display = "block";
                paymentForm.style.display = "none"
            }
        });
    });

    paymentForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const cardNumber = document.getElementById("card-number").value;
        const cardExpiry = document.getElementById("card-expiry").value;
        const cardCVC = document.getElementById("card-cvc").value;
        

        const paymentData = {
            cardNumber,
            cardExpiry,
            cardCVC,
            itemName,
            itemPrice,
            userName: loggedInUserName,
        };

        // Store the payment receipt in an array
        const paymentReceipts = JSON.parse(localStorage.getItem("paymentReceipts")) || [];
        paymentReceipts.push(paymentData);
        localStorage.setItem("paymentReceipts", JSON.stringify(paymentReceipts));

        const receiptMessage = `Thank you for your purchase!\nItem: ${itemName}\nPrice: £${itemPrice}\nUser: ${loggedInUserName}`;
        alert(receiptMessage);
        window.location.href = "index.html";
    });

    submitFinanceButton.addEventListener("click", function () {
        const files = documentUpload.files;
        const currentDate = new Date().toLocaleDateString();
        const customerName = localStorage.getItem("loggedInUserName") || "Test Customer";
    
        const documentDetails = [];
    
        // Convert each uploaded file to base64 and save in localStorage
        for (let i = 0; i < files.length; i++) {
            const reader = new FileReader();
            reader.onload = function (event) {
                const fileData = event.target.result;
                const documentKey = `document_${Date.now()}_${i}`;
                localStorage.setItem(documentKey, fileData);
    
                const documentName = files[i].name;
                documentDetails.push({ name: documentName, link: documentKey });
    
                if (documentDetails.length === files.length) {
                    const applicationData = {
                        customerName,
                        currentDate,
                        documentDetails
                    };
    
                    // Retrieve existing applications or initialize an empty array
                    const existingApplications = JSON.parse(localStorage.getItem("financeApplications")) || [];
                    existingApplications.push(applicationData);
    
                    // Save the updated applications array
                    localStorage.setItem("financeApplications", JSON.stringify(existingApplications));
    
                    const documentNames = documentDetails.map(doc => doc.name).join(', ');
    
                    alert(`Documents (${documentNames}) have been uploaded and your request is under review by our customer support.`);
    
                    window.location.href = "index.html";
                }
            };
            reader.readAsDataURL(files[i]);
        }
    });
});
