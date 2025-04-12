document.addEventListener("DOMContentLoaded", function () {
    const groceryList = document.getElementById("grocery-list");
    const addButton = document.getElementById("add-item-btn");
    const addItemForm = document.getElementById("add-item-form");
    const itemNameInput = document.getElementById("item-name");
    const expiryDateInput = document.getElementById("expiry-date");
    const submitButton = document.getElementById("submit-item");
    const cancelButton = document.getElementById("cancel-btn");

    // Show Add Item Form
    addButton.addEventListener("click", function () {
        addItemForm.style.display = 'flex';
    });

    // Hide Add Item Form
    cancelButton.addEventListener("click", function () {
        addItemForm.style.display = 'none';
    });

    // Add Item to the list
    submitButton.addEventListener("click", function () {
        const itemName = itemNameInput.value.trim();
        const expiryDate = expiryDateInput.value;

        if (itemName === "" || expiryDate === "") {
            alert("Please fill in both fields!");
            return;
        }

        const listItem = document.createElement("li");
        const expiryDateObj = new Date(expiryDate);
        const today = new Date();
        const daysLeft = Math.ceil((expiryDateObj - today) / (1000 * 60 * 60 * 24));
        
        // Create image for the item (optional)
        const itemImage = document.createElement("img");
        itemImage.src = `https://via.placeholder.com/50?text=${itemName.charAt(0)}`; // Use the first letter as an image placeholder for now

        listItem.innerHTML = `${itemName} - ${daysLeft} days left`;

        // Add Expiry Status Class
        if (daysLeft <= 0) {
            listItem.classList.add("alert"); // Expired (Red)
            listItem.innerHTML += " - ❌ Expired!";
        } else if (daysLeft <= 3) {
            listItem.classList.add("moderate"); // About to expire (Yellow)
            listItem.innerHTML += ` - ⚠️ ${daysLeft} days left`;
        } else {
            listItem.classList.add("safe"); // Safe (Green)
            listItem.innerHTML += ` - ✅ Safe (${daysLeft} days left)`;
        }

        // Append item image
        listItem.prepend(itemImage);

        // Add to list
        groceryList.appendChild(listItem);

        // Clear form and hide it
        itemNameInput.value = '';
        expiryDateInput.value = '';
        addItemForm.style.display = 'none';
    });
});
