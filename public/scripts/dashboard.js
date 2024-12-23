document.addEventListener("DOMContentLoaded", () => {
    fetchLighthouses();

    // Attach event listener to the table for delegation
    const table = document.getElementById("lighthouse-list");
    table.addEventListener("click", (event) => {
        if (event.target.classList.contains("edit-button")) {
            const lighthouseId = event.target.dataset.id;
            editLighthouse(lighthouseId);
        }
    });
});

async function fetchLighthouses() {
    const tableBody = document.getElementById("lighthouse-list");
    const baseUrl = 'https://bokadev.me'

    try {
        tableBody.innerHTML = "<tr><td colspan='4'>Loading...</td></tr>";

        const response = await fetch(`${baseUrl}/api/lighthouses`);
        const data = await response.json();

        tableBody.innerHTML = ""; // Clear table

        data.sort((a, b) => a.id - b.id).forEach((lighthouse) => {
            const row = `
            <tr>
                <td>${lighthouse.id}</td>
                <td>${lighthouse.name}</td>
                <td><button class="edit-button" data-id="${lighthouse.id}">
            <span class="material-icons">edit</span> Edit
        </button>
                </td>
            </tr>
            `;
            tableBody.innerHTML += row;
        });
    } catch (error) {
        console.error("Error fetching lighthouses:", error);
        tableBody.innerHTML = "<tr><td colspan='4'>Error loading data.</td></tr>";
    }
}

function editLighthouse(id) {
    alert(`Editing lighthouse with ID: ${id}`);
    // Implement edit logic here (e.g., open a modal or redirect to edit page)
}
