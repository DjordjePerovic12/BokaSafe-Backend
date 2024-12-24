document.addEventListener('DOMContentLoaded', () => {
    fetchLighthouses();

    // Handle form submission
    document.getElementById('editForm').addEventListener('submit', async (event) => {
        event.preventDefault();

        const id = document.getElementById('lighthouseId').value;
        const status = document.getElementById('status').value;

        try {
            await updateLighthouseStatus(id, status);
            closeForm();
            fetchLighthouses(); // Refresh the table after update
        } catch (error) {
            alert('Failed to update status');
        }
    });
});

// Fetch lighthouses from the backend and display them in the table
async function fetchLighthouses() {
    const response = await fetch('/api/lighthouses');
    const data = await response.json();

    const tableBody = document.querySelector('#lighthouseTable tbody');
    tableBody.innerHTML = ''; // Clear existing rows

    data.forEach(lighthouse => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${lighthouse.name}</td>
            <td>${lighthouse.location}</td>
            <td>${lighthouse.status}</td>
            <td><button onclick="openForm(${lighthouse._id})">Edit</button></td>
        `;
        tableBody.appendChild(row);
    });
}

// Open the edit form and populate it with lighthouse data
function openForm(lighthouseId) {
    const row = document.querySelector(`#lighthouseTable tr[data-id="${lighthouseId}"]`);
    const lighthouse = JSON.parse(row.dataset.lighthouse);

    document.getElementById('lighthouseId').value = lighthouse._id;
    document.getElementById('name').value = lighthouse.name;
    document.getElementById('location').value = lighthouse.location;
    document.getElementById('status').value = lighthouse.status;

    document.getElementById('editFormPopup').style.display = 'flex';
}

// Close the edit form
function closeForm() {
    document.getElementById('editFormPopup').style.display = 'none';
}

// Handle cancel button click
function cancelEdit() {
    closeForm();
}

// Update the status of a lighthouse
async function updateLighthouseStatus(id, status) {
    const response = await fetch(`/api/lighthouses/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status })
    });

    if (!response.ok) {
        throw new Error('Failed to update lighthouse');
    }
}
