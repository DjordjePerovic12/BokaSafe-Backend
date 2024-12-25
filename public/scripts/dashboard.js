document.addEventListener("DOMContentLoaded", () => {
    const formPopup = document.getElementById("editFormPopup");
    const token = localStorage.getItem('accessToken');

    if (!token || isTokenExpired(token)) {
        window.location.href = '/admin-login';
        localStorage.clear();
    }

    fetchLighthouses();

    const table = document.getElementById("lighthouse-list");
    table.addEventListener("click", (event) => {
        const button = event.target.closest(".edit-button");
        if (button) {
            const lighthouseId = button.dataset.id;
            editLighthouse(lighthouseId);
        }
    });
});

async function fetchLighthouses() {
    const tableBody = document.getElementById("lighthouse-list");

    try {
        tableBody.innerHTML = "<tr><td colspan='3'>Loading...</td></tr>";

        const response = await fetch('https://bokadev.me/api/lighthouses');
        const data = await response.json();

        tableBody.innerHTML = "";

        data.forEach(lighthouse => {
            tableBody.innerHTML += `
                <tr>
                    <td>${lighthouse.id}</td>
                    <td>${lighthouse.name}</td>
                    <td><button class="edit-button" data-id="${lighthouse.id}">
            <span class="material-icons">edit</span> Edit
        </button></td>
                </tr>
            `;
        });
    } catch (error) {
        console.error("Error fetching lighthouses:", error);
        tableBody.innerHTML = "<tr><td colspan='3'>Error loading data.</td></tr>";
    }
}

function editLighthouse(id) {
    const formPopup = document.getElementById("editFormPopup");
    formPopup.classList.add("show");
    fetchLighthouseDetails(id);
}

async function fetchLighthouseDetails(id) {
    const baseUrl = window.location.origin;
    const formPopup = document.getElementById("editFormPopup");
    const nameField = document.getElementById("name");
    const locationField = document.getElementById("location");
    const characteristicsField = document.getElementById("characteristics");
    const statusField = document.getElementById("status");
    const lighthouseIdField = document.getElementById("lighthouseId");

    try {
        nameField.value = "Loading...";
        locationField.value = "Loading...";

        const response = await fetch(`${baseUrl}/api/lighthouses/${id}`);
        const lighthouse = await response.json();

        lighthouseIdField.value = lighthouse.id;
        nameField.value = lighthouse.name;
        locationField.value = `${lighthouse.latitude}, ${lighthouse.longitude}`;
        characteristicsField.value = lighthouse.characteristics;
        statusField.value = lighthouse.status;
    } catch (error) {
        console.error("Error fetching lighthouse details:", error);
        alert("Error fetching lighthouse details.");
    }
}

function closeForm() {
    document.getElementById("editFormPopup").classList.remove("show");
}

function cancelEdit() {
    closeForm();
}

async function saveStatus() {
    const lighthouseId = document.getElementById("lighthouseId").value;
    const status = document.getElementById("status").value;
    const baseUrl = window.location.origin;

    const showNotification = (message, type) => {
        const notification = document.getElementById("notification");
        notification.textContent = message;
        notification.className = `notification show ${type}`;
        setTimeout(() => {
            notification.className = "notification";
        }, 3000);
    };

    try {
        const response = await fetch(`${baseUrl}/api/lighthouses`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: lighthouseId, status: status })
        });

        if (!response.ok) throw new Error("Failed to update status");
        showNotification("Status updated successfully.", "success");
        closeForm();
        fetchLighthouses();
    } catch (error) {
        console.error("Error updating status:", error);
        showNotification("Error updating status.", "error");
    }
}

function isTokenExpired(token) {
    try {
        const { exp } = JSON.parse(atob(token.split('.')[1]));
        return Date.now() > exp * 1000;
    } catch {
        return true;
    }
}
