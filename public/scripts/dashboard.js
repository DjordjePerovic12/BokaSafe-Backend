// script.js

// API URL (replace with your actual API endpoint)
const apiUrl = 'https://bokadev.me/lighthouses';

// Fetch and display the lighthouse data
async function fetchLighthouses() {
    const tableBody = document.getElementById("lighthouse-list");

    try {
        // Show loading message
        tableBody.innerHTML = "<tr><td colspan='4'>Loading...</td></tr>";

        const response = await fetch(apiUrl);
        const data = await response.json();

        // Clear table and populate with data
        tableBody.innerHTML = "";
        data.forEach((lighthouse) => {
            const row = `
                <tr>
                    <td>${lighthouse.id}</td>
                    <td>${lighthouse.name}</td>
                    <td><button class="photo-button">📷</button></td>
                    <td><button class="edit-button" onclick="editLighthouse(${lighthouse.id})">✏️ Edit</button></td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });
    } catch (error) {
        console.error("Error fetching lighthouses:", error);
        tableBody.innerHTML = "<tr><td colspan='4'>Error loading data.</td></tr>";
    }
};

// Edit lighthouse handler
function editLighthouse(id) {
    alert(`Editing lighthouse with ID: ${id}`);
    // Implement edit logic here (e.g., open a modal or redirect to edit page)
}

// Fetch lighthouses on page load
document.addEventListener("DOMContentLoaded", fetchLighthouses);
