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
        const baseUrl = window.location.origin
        const response = await fetch('${apiBaseUrl}/admin-login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }), // Send data as JSON
        });

        // Handle the server response
        if (response.ok) {
            const data = await response.json();
            showAlert('Login successful!', 'success', () => {
                // Redirect after showing the success alert
                window.location.href = '/dashboard';
            });
        } else {
            const error = await response.json();
        }
    } catch (err) {
        console.error('Error during login:', err);
        showAlert('Invalid username or password.', 'error');
    }
});

document.getElementById('togglePassword').addEventListener('click', function () {
    const passwordField = document.getElementById('password');
    const isPasswordHidden = passwordField.getAttribute('type') === 'password';

    // Toggle the password field type
    passwordField.setAttribute('type', isPasswordHidden ? 'text' : 'password');

    // Update the button text
    this.textContent = isPasswordHidden ? 'Hide' : 'Show';
});


function showAlert(message, type = 'success', callback = null) {
    const alertContainer = document.getElementById('alert-container');
    
    // Create a new alert
    const alert = document.createElement('div');
    alert.className = `alert ${type}`;
    alert.textContent = message;

    // Add the alert to the container
    alertContainer.appendChild(alert);

    // Automatically remove the alert after 3.5 seconds
    setTimeout(() => {
        alert.remove();

        // Trigger the callback (e.g., redirect) if provided
        if (callback) callback();
    }, 1500);
}