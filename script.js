

      // Function to save data to Local Storage
function saveDataToLocalStorage(data) {
    let storedData = JSON.parse(localStorage.getItem('user_data')) || [];
    storedData.push(data);
    localStorage.setItem('user_data', JSON.stringify(storedData));
    displayUserData(); // Call the display function after saving data
}

// Function to display user data in the div
function displayUserData() {
    const userData = JSON.parse(localStorage.getItem('user_data')) || [];

    const userDataDiv = document.getElementById('user-data');
    userDataDiv.innerHTML = '';


    if (userData.length === 0) {
        userDataDiv.innerHTML = '<p>No user data available.</p>';
    } else {
        const table = document.createElement('table');
        table.innerHTML = `
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
            ${userData.map((user, index) => `
                <tr>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>${user.password}</td>
                    <td><button onclick="removeUser(${index})">Remove</button></td>
                </tr>
            `).join('')}
            </tbody>
        `;
        userDataDiv.appendChild(table);
    }
}

// Function to remove a user from the data
function removeUser(index) {
    const userData = JSON.parse(localStorage.getItem('user_data')) || [];
    userData.splice(index, 1);
    localStorage.setItem('user_data', JSON.stringify(userData));
    displayUserData();
}

// Display any existing user data on page load
displayUserData();

// Function to validate a password
function validatePassword(password) {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}
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

// Event listener for form submission

document.getElementById('user-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const passwordError = document.getElementById('password-error');
    const regStatus = document.getElementById('reg-status');
    const name = nameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;

    // Check if any of the input fields are empty
    if (name.trim() === '' || email.trim() === '' || password.trim() === '') {
        alert('Please fill in all fields.');
        return;
    }

    // Check if the email is already taken
    const userData = JSON.parse(localStorage.getItem('user_data')) || [];
    if (userData.some(user => user.email === email)) {
        alert('Email is already taken. Please use a different email.');
        return;
    }

    // Check if the password is valid
    if (!validatePassword(password)) {
        passwordError.innerHTML = 'Password must meet the following criteria:<br>' +
            '- At least 8 characters<br>' +
            '- At least 1 uppercase letter<br>' +
            '- At least 1 number<br>' +
            '- At least 1 special character';
        return;
    } else {
        passwordError.textContent = ''; // Clear the error message if the password is valid
    }
  

    // If all checks pass, save the data to Local Storage
    saveDataToLocalStorage({ name, email, password });
    displayUserData();
    

    regStatus.textContent = 'Registration successful!';
    // Clear input fields after successful submission
    nameInput.value = '';
    emailInput.value = '';
    passwordInput.value = '';
});

