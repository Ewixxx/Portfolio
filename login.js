// Function to validate a password
function validatePassword(password) {
    // Your password validation regex here (same as in the registration page)
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}


// Event listener for "Show Password" button
document.getElementById('show-password').addEventListener('click', function () {
    const passwordInput = document.getElementById('password');
    const showPasswordButton = document.getElementById('show-password');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        showPasswordButton.innerHTML = '<i class="fa-regular fa-eye"></i>';
    } else {
        passwordInput.type = 'password';
        showPasswordButton.innerHTML = '<i class="fa-regular fa-eye-slash"></i>';
    }
});



/// Event listener for form submission
document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const loginStatus = document.getElementById('login-status');
    
    const email = emailInput.value;
    const password = passwordInput.value;

    // Check if the input fields are empty
    if (email.trim() === '' || password.trim() === '') {
        loginStatus.textContent = 'Please fill in both email and password fields.';
        loginStatus.style.color = 'red'; // Change the text color to red
        return;
    }

    // Check if the provided email and password match any stored user data
    const userData = JSON.parse(localStorage.getItem('user_data')) || [];
    const user = userData.find(user => user.email === email && user.password === password);
    if (user) {
        loginStatus.textContent = 'Login successful!';
        loginStatus.style.color = 'green'; // Change the text color to green
        window.location.href = 'Home/homepage.html';
    } else {
        loginStatus.textContent = 'Invalid email or password. Please try again.';
        loginStatus.style.color = 'red'; // Change the text color to red
    }
    
    // Clear input fields after submission
    emailInput.value = '';
    passwordInput.value = '';
});
