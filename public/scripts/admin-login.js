// Add event listener to the form for submission
document.getElementById("loginForm").addEventListener("submit", async function (event) {
    console.log('Petaar    Gajevic');
    event.preventDefault(); // Prevent default form submission behavior

    // Get username and password from the form inputs
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    console.log(username, password);

    // Validate the form inputs
    if (!username || !password) {
        alert("Please fill in all fields.");
        return;
    }

    try {
        // Send the login data to the server
        const response = await fetch('/admin-login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }), // Send data as JSON
        });

        // Handle the server response
        if (response.ok) {
            const data = await response.json();
            alert(data.message); // Show success message
            // Redirect to another page (e.g., dashboard)
            window.location.href = '/dashboard';
        } else {
            const error = await response.json();
            alert(`Login failed: ${error.message}`); // Show error message
        }
    } catch (err) {
        console.error('Error during login:', err);
        alert('An error occurred. Please try again later.');
    }
});
