document.addEventListener('DOMContentLoaded', () => {
    const loginPage = document.getElementById('login');
    const registerPage = document.getElementById('register');
    const dashboardPage = document.getElementById('dashboard');
    const userEmailDisplay = document.getElementById('userEmailDisplay');

    const goToRegister = document.getElementById('goToRegister');
    const goToLogin = document.getElementById('goToLogin');

    // Show/Hide pages
    goToRegister.addEventListener('click', () => {
        loginPage.classList.add('hidden');
        registerPage.classList.remove('hidden');
    });

    goToLogin.addEventListener('click', () => {
        registerPage.classList.add('hidden');
        loginPage.classList.remove('hidden');
    });

    // Login functionality
    document.getElementById('loginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value.trim();

        const users = JSON.parse(localStorage.getItem('users')) || {};

        // Check if user exists in localStorage and validate password
        if (users[email] && users[email].password === password) {
            alert('Login successful');
            // Store the user email in localStorage (to simulate session)
            localStorage.setItem('currentUser', email);

            // Redirect to the dashboard page after successful login
            window.location.href = 'dashboard.html';  // This should redirect to the next page
        } else {
            alert('Invalid email or password');
        }
    });

    // Register functionality
    document.getElementById('registerForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('registerEmail').value.trim();
        const password = document.getElementById('registerPassword').value.trim();
        const confirmPassword = document.getElementById('confirmPassword').value.trim();

        if (!email || !password || !confirmPassword) {
            alert('Please fill out all fields');
            return;
        }

        // Password match validation
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        // Email validation (simple format check)
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailPattern.test(email)) {
            alert('Please enter a valid email');
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || {};
        if (users[email]) {
            alert('User already exists');
        } else {
            users[email] = { password };
            localStorage.setItem('users', JSON.stringify(users));
            alert('Registration successful');
            registerPage.classList.add('hidden');
            loginPage.classList.remove('hidden');
        }
    });

    // Dashboard functionality (show user email if logged in)
    if (dashboardPage) {
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
            userEmailDisplay.textContent = `Logged in as: ${currentUser}`;
        } else {
            window.location.href = 'index.html'; // Redirect to login page if no user is logged in
        }
    }
});
