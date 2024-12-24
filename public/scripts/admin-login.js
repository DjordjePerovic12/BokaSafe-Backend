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
        const baseUrl = window.location.origin
        const response = await fetch(`${baseUrl}/admin-login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });
    
        if (response.ok) {
            // Parse JSON only if the response is valid
            const data = await response.json();
            showAlert('Login successful!', 'success', () => {
                window.location.href = '/dashboard';
                localStorage.setItem("accessToken", data.accessToken)
            });
        } else {
            // Handle non-2xx responses
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                const error = await response.json();
                console.error('Error from server:', error);
                showAlert(error.message || 'Invalid username or password.', 'error');
            } else {
                console.error('Unexpected response type:', await response.text());
                showAlert('Unexpected error. Please try again later.', 'error');
            }
        }
    } catch (err) {
        console.error('Network or parsing error:', err);
        showAlert('Network error. Please check your connection.', 'error');
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