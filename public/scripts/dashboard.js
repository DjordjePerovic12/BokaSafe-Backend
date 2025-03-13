document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem('accessToken');

    if (!token || isTokenExpired(token)) {
        window.location.href = '/admin-login';
        localStorage.clear();
    }

    // Fetch and initialize all entities
    fetchLighthouses();
    fetchDocuments();
    fetchFishFarms();
    fetchMarineProtectedAreas();
    fetchMarinas();

    // Lighthouse Events
    const lighthouseTable = document.getElementById("lighthouse-list");
    lighthouseTable.addEventListener("click", (event) => {
        const button = event.target.closest(".edit-button");
        if (button) editLighthouse(button.dataset.id);
    });

    // Document Events
    const documentsTable = document.getElementById("documents-list");
    documentsTable.addEventListener("click", (event) => {
        const button = event.target.closest(".delete-button");
        if (button) deleteDocument(button.dataset.id);
    });

    document.getElementById("uploadBtn").addEventListener("click", toggleUploadForm);
    document.getElementById("documentUploadForm").addEventListener("submit", uploadDocument);

    // Navigation
    const menus = ['lighthouses', 'documents', 'fishFarms', 'marineProtectedAreas', 'marinas'];
    menus.forEach(menu => {
        document.getElementById(menu + "Menu").addEventListener("click", () => showSection(menu));
    });
});

// ----------------- Utility Functions -----------------

function isTokenExpired(token) {
    try {
        const { exp } = JSON.parse(atob(token.split('.')[1]));
        return Date.now() > exp * 1000;
    } catch { return true; }
}

function showSection(section) {
    ['lighthouses', 'documents', 'fishFarms', 'marineProtectedAreas', 'marinas'].forEach(s => {
        document.getElementById(s + "View").classList.add("hidden");
        document.getElementById(s + "Menu").classList.remove("active");
    });
    document.getElementById(section + "View").classList.remove("hidden");
    document.getElementById(section + "Menu").classList.add("active");
}

function showNotification(message, type) {
    const notification = document.getElementById("notification");
    notification.textContent = message;
    notification.className = `notification show ${type}`;
    setTimeout(() => { notification.className = "notification"; }, 3000);
}

// ----------------- Fetch & Render Entities -----------------

async function fetchEntities(url, listId, processRow) {
    const tableBody = document.getElementById(listId);
    tableBody.innerHTML = "<tr><td>Loading...</td></tr>";
    try {
        const response = await fetch(url);
        let data = await response.json();
        data.sort((a, b) => a.id - b.id); // Sort by ID ascending
        tableBody.innerHTML = "";
        data.forEach(item => tableBody.innerHTML += processRow(item));
    } catch (err) {
        console.error(err);
        tableBody.innerHTML = "<tr><td>Error loading data.</td></tr>";
    }
}

// ----------------- Fetching and Rendering Specific Entities -----------------

function fetchLighthouses() {
    fetchEntities('/api/lighthouses', 'lighthouse-list', (item) => `
        <tr>
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td><button class="edit-button" data-id="${item.id}"><span class="material-icons">edit</span></button></td>
        </tr>
    `);
}

function fetchDocuments() {
    fetchEntities('/api/documents', 'documents-list', (item) => `
        <tr>
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td><button class="delete-button" data-id="${item.id}"><span class="material-icons">delete</span></button></td>
        </tr>
    `);
}

function fetchFishFarms() {
    fetchEntities('/api/fishfarms', 'fish-farms-list', (item) => {
        const { lat, lng } = item.centralCoordinate;
        return `
            <tr>
                <td>${item.id}</td>
                <td>
                    ${lat.toFixed(6)}, ${lng.toFixed(6)}<br>
                    ${decimalToDMS(lat)}, ${decimalToDMS(lng)}
                </td>
            </tr>
        `;
    });
}

function fetchMarineProtectedAreas() {
    fetchEntities('/api/marineProtectedAreas', 'marine-protected-areas-list', (item) => {
        const { lat, lng } = item.mpaSymbolCoordinate;
        return `
            <tr>
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>
                    ${lat.toFixed(6)}, ${lng.toFixed(6)}<br>
                    ${decimalToDMS(lat)}, ${decimalToDMS(lng)}
                </td>
            </tr>
        `;
    });
}

function fetchMarinas() {
    fetchEntities('/api/marinas', 'marinas-list', (item) => {
        const { lat, lng } = item.coordinates;
        return `
            <tr>
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>
                    ${lat.toFixed(6)}, ${lng.toFixed(6)}<br>
                    ${decimalToDMS(lat)}, ${decimalToDMS(lng)}
                </td>
            </tr>
        `;
    });
}

// ----------------- Document Upload & Delete -----------------

function toggleUploadForm() {
    document.getElementById("uploadForm").classList.toggle("hidden");
}

async function uploadDocument(event) {
    event.preventDefault();

    const form = document.getElementById("documentUploadForm");
    const formData = new FormData(form);

    const response = await fetch('/api/documents', {
        method: 'POST',
        body: formData,
    });

    if (response.ok) {
        showNotification("Document uploaded successfully.", "success");
        document.getElementById("uploadForm").classList.add("hidden");
        form.reset();
        fetchDocuments();
    } else {
        const errMsg = await response.text();
        console.error(errMsg);
        showNotification("Error uploading document.", "error");
    }
}


async function deleteDocument(id) {
    const response = await fetch('/api/documents', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    if (response.ok) {
        showNotification("Document deleted successfully.", "success");
        fetchDocuments();
    } else {
        showNotification("Error deleting document.", "error");
    }
}

// ----------------- Degree Converter -----------------

function decimalToDMS(decimal) {
    const degrees = Math.floor(decimal);
    const minutesFloat = Math.abs((decimal - degrees) * 60);
    const minutes = Math.floor(minutesFloat);
    const seconds = ((minutesFloat - minutes) * 60).toFixed(2);
    return `${degrees}° ${minutes}' ${seconds}"`;
}

// ----------------- Placeholder Edit Lighthouse -----------------
function editLighthouse(id) { console.log('Edit Lighthouse:', id); }


// ----------------- Lighthouse Edit Form & Fetch -----------------

function editLighthouse(id) {
    const formPopup = document.getElementById("editFormPopup");
    formPopup.classList.add("show"); // Show the popup
    fetchLighthouseDetails(id); // Fetch data and populate
}

async function fetchLighthouseDetails(id) {
    const baseUrl = window.location.origin;
    // Fields to populate
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

// ----------------- Lighthouse Form Close / Cancel -----------------

function closeForm() {
    document.getElementById("editFormPopup").classList.remove("show");
}

function cancelEdit() {
    closeForm();
}

// ----------------- Save Lighthouse Status -----------------

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
        fetchLighthouses(); // Refresh list
    } catch (error) {
        console.error("Error updating status:", error);
        showNotification("Error updating status.", "error");
    }
}
