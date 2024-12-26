document.addEventListener("DOMContentLoaded", () => {
    const formPopup = document.getElementById("editFormPopup");
    const token = localStorage.getItem('accessToken');

    if (!token || isTokenExpired(token)) {
        window.location.href = '/admin-login';
        localStorage.clear();
    }

    // Fetch and initialize Lighthouses
    fetchLighthouses();

    const table = document.getElementById("lighthouse-list");
    table.addEventListener("click", (event) => {
        const button = event.target.closest(".edit-button");
        if (button) {
            const lighthouseId = button.dataset.id;
            editLighthouse(lighthouseId);
        }
    });

    // Fetch and initialize Documents
    fetchDocuments();

    const documentsTable = document.getElementById("documents-list");
    documentsTable.addEventListener("click", (event) => {
        const button = event.target.closest(".delete-button");
        if (button) {
            const documentId = button.dataset.id;
            deleteDocument(documentId);
        }
    });

    document.getElementById("uploadBtn").addEventListener("click", toggleUploadForm);
    document.getElementById("documentUploadForm").addEventListener("submit", uploadDocument);

    // Toggle between Lighthouses and Documents views
    document.getElementById("lighthousesMenu").addEventListener("click", () => showSection('lighthouses'));
    document.getElementById("documentsMenu").addEventListener("click", () => showSection('documents'));
});

// **Lighthouse-related logic (Preserved as is)**

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

// **Document-related logic (Added)**

async function fetchDocuments() {
    const tableBody = document.getElementById("documents-list");
    const baseUrl = window.location.origin;

    try {
        tableBody.innerHTML = "<tr><td colspan='3'>Loading...</td></tr>";

        const response = await fetch(`${baseUrl}/api/documents`);
        if (!response.ok) throw new Error("Failed to fetch documents");

        const data = await response.json();
        tableBody.innerHTML = "";

        data.forEach(document => {
            tableBody.innerHTML += `
                <tr>
                    <td>${document.id}</td>
                    <td>${document.name}</td>
                    <td><button class="delete-button" data-id="${document.id}">
                        <span class="material-icons">delete</span> Delete
                    </button></td>
                </tr>
            `;
        });
    } catch (error) {
        console.error("Error fetching documents:", error);
        tableBody.innerHTML = "<tr><td colspan='3'>Error loading data.</td></tr>";
    }
}

async function deleteDocument(documentId) {
    const baseUrl = window.location.origin;
    console.log(documentId);

    try {
        // Send the request with the documentId in the body
        const response = await fetch(`${baseUrl}/api/documents`, {
            method: 'DELETE', // DELETE method to match the server controller
            headers: {
                'Content-Type': 'application/json', // Ensure correct content type
            },
            body: JSON.stringify({ id: documentId }), // Send the ID in the request body
        });

        // Check if the response is OK (status code 200-299)
        if (!response.ok) throw new Error("Failed to delete document");

        // Handle success
        showNotification("Document deleted successfully.", "success");
        fetchDocuments();  // Re-fetch the documents list

    } catch (error) {
        console.error("Error deleting document:", error);
        showNotification("Error deleting document.", "error");
    }
}


function toggleUploadForm() {
    document.getElementById("uploadForm").classList.toggle("hidden");
}

async function uploadDocument(event) {
    event.preventDefault();  // Prevent default form submission

    // Get the form element and FormData from it
    const form = document.getElementById("documentUploadForm");
    const formData = new FormData(form);

    // Get the file from the FormData object (this assumes your input name is 'file')
    const file = formData.get('file');  
    if (!file) {
        showNotification("Please select a file to upload.", "error");
        return;  // Exit if no file is selected
    }

    console.log("Selected file:", file);  // Log the file (remove this in production)
    
    // Log the entire FormData (Note: This is not the best way to log FormData, but it works for small cases)
    for (let pair of formData.entries()) {
        console.log(pair[0]+ ': ' + pair[1]);
    }

    const baseUrl = window.location.origin;

    // Optionally disable the upload button during the upload process to prevent double submission
    const uploadButton = document.getElementById("uploadButton");
    if (uploadButton) {
        uploadButton.disabled = true;
    }

    try {
        const response = await fetch(`${baseUrl}/api/documents`, {
            method: 'POST',
            body: formData,  // Send the form data (which includes the file)
        });

        if (!response.ok) throw new Error("Failed to upload document");

        // Show success message
        showNotification("Document uploaded successfully.", "success");

        // Hide the upload form and reset it
        document.getElementById("uploadForm").classList.add("hidden");
        form.reset();  // Clear the form

        // Re-fetch the documents list after upload
        fetchDocuments();
    } catch (error) {
        console.error("Error uploading document:", error);
        showNotification("Error uploading document.", "error");
    } finally {
        // Re-enable the upload button
        if (uploadButton) {
            uploadButton.disabled = false;
        }
    }
}



function showSection(section) {
    const lighthousesView = document.getElementById("lighthousesView");
    const documentsView = document.getElementById("documentsView");
    const lighthousesMenu = document.getElementById("lighthousesMenu");
    const documentsMenu = document.getElementById("documentsMenu");

    if (section === 'lighthouses') {
        lighthousesView.classList.remove("hidden");
        documentsView.classList.add("hidden");
        lighthousesMenu.classList.add("active");
        documentsMenu.classList.remove("active");
    } else {
        lighthousesView.classList.add("hidden");
        documentsView.classList.remove("hidden");
        lighthousesMenu.classList.remove("active");
        documentsMenu.classList.add("active");
    }
}

function showNotification(message, type) {
    const notification = document.getElementById("notification");
    notification.textContent = message;
    notification.className = `notification show ${type}`;

    setTimeout(() => {
        notification.className = "notification";
    }, 3000);
}
