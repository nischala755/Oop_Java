document.addEventListener('DOMContentLoaded', () => {
    // Get all required DOM elements
    const addExpenseForm = document.getElementById('addExpenseForm');
    const shareUserForm = document.getElementById('shareUserForm');
    const expenseCategoryInput = document.getElementById('expenseCategory');
    const expenseAmountInput = document.getElementById('expenseAmount');
    const peopleCountInput = document.getElementById('peopleCount');
    const sharedExpensesList = document.getElementById('sharedExpensesList');
    const sharedUsersList = document.getElementById('sharedUsersList');

    // Get stored data from localStorage
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    let sharedUsers = JSON.parse(localStorage.getItem('sharedUsers')) || [];

    // Display functions
    function displayLatestExpense() {
        sharedExpensesList.innerHTML = '';
        if (expenses.length === 0) {
            sharedExpensesList.textContent = 'No expenses to share.';
            return;
        }

        const latestExpense = expenses[expenses.length - 1];
        const amountPerPerson = (latestExpense.amount / latestExpense.numberOfPeople).toFixed(2);
        const expenseItem = document.createElement('div');
        expenseItem.innerHTML = `
            <p><strong>Category:</strong> ${latestExpense.category}</p>
            <p><strong>Total Amount:</strong> $${latestExpense.amount.toFixed(2)}</p>
            <p><strong>Shared by:</strong> ${latestExpense.numberOfPeople} people</p>
            <p><strong>Amount per person:</strong> $${amountPerPerson}</p>
        `;
        sharedExpensesList.appendChild(expenseItem);
    }

    function displaySharedUsers() {
        sharedUsersList.innerHTML = '';
        if (sharedUsers.length === 0) {
            sharedUsersList.innerHTML = '<p>No users shared with yet.</p>';
            return;
        }

        sharedUsers.forEach((user, index) => {
            const userItem = document.createElement('div');
            userItem.className = 'shared-user-item';
            userItem.innerHTML = `
                <div class="user-details">
                    <p class="mb-1"><strong>Name:</strong> ${user.name}</p>
                    <p class="mb-1"><strong>Phone:</strong> ${user.phone}</p>
                    <p class="mb-1"><strong>UPI ID:</strong> ${user.upiId}</p>
                    <p class="mb-1"><strong>Shared on:</strong> ${user.sharedDate}</p>
                </div>
                <button class="btn btn-danger btn-sm" onclick="removeSharedUser(${index})">Remove</button>
            `;
            sharedUsersList.appendChild(userItem);
        });
    }

    // Initialize displays
    displayLatestExpense();
    displaySharedUsers();

    // Handle expense form submission
    addExpenseForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const category = expenseCategoryInput.value.trim();
        const amount = parseFloat(expenseAmountInput.value);
        const numberOfPeople = parseInt(peopleCountInput.value);

        if (isNaN(amount) || amount <= 0 || isNaN(numberOfPeople) || numberOfPeople <= 0) {
            alert('Please enter valid expense details.');
            return;
        }

        expenses.push({
            category,
            amount,
            numberOfPeople,
            date: new Date().toLocaleDateString()
        });

        localStorage.setItem('expenses', JSON.stringify(expenses));
        
        addExpenseForm.reset();
        displayLatestExpense();
    });

    // Handle share user form submission
    shareUserForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('userName').value.trim();
        const phone = document.getElementById('phoneNumber').value.trim();
        const upiId = document.getElementById('upiId').value.trim();

        // Basic validation
        if (!name || !phone || !upiId) {
            alert('Please fill in all user details.');
            return;
        }

        // Phone number validation (simple 10-digit check)
        if (!/^\d{10}$/.test(phone)) {
            alert('Please enter a valid 10-digit phone number.');
            return;
        }

        const newUser = {
            name,
            phone,
            upiId,
            sharedDate: new Date().toLocaleDateString()
        };

        sharedUsers.push(newUser);
        localStorage.setItem('sharedUsers', JSON.stringify(sharedUsers));

        shareUserForm.reset();
        displaySharedUsers();
        
        alert(`Successfully shared with ${name}!`);
    });

    // Remove shared user function
    window.removeSharedUser = function(index) {
        sharedUsers.splice(index, 1);
        localStorage.setItem('sharedUsers', JSON.stringify(sharedUsers));
        displaySharedUsers();
    };

    // Social sharing buttons
    document.getElementById('shareViaEmail')?.addEventListener('click', () => {
        if (expenses.length === 0) {
            alert('No expenses to share.');
            return;
        }
        const latestExpense = expenses[expenses.length - 1];
        const expenseDetails = `${latestExpense.category}: $${latestExpense.amount.toFixed(2)} (Shared by ${latestExpense.numberOfPeople} people)`;
        window.location.href = `mailto:?subject=Shared Expense&body=${encodeURIComponent(expenseDetails)}`;
    });

    document.getElementById('shareOnTwitter')?.addEventListener('click', () => {
        if (expenses.length === 0) {
            alert('No expenses to share.');
            return;
        }
        const latestExpense = expenses[expenses.length - 1];
        const tweet = `Shared expense: ${latestExpense.category}: $${latestExpense.amount.toFixed(2)} (Split ${latestExpense.numberOfPeople} ways)`;
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(tweet)}`, '_blank');
    });

    document.getElementById('shareOnFacebook')?.addEventListener('click', () => {
        if (expenses.length === 0) {
            alert('No expenses to share.');
            return;
        }
        const latestExpense = expenses[expenses.length - 1];
        const expenseDetails = `${latestExpense.category}: $${latestExpense.amount.toFixed(2)} (Shared by ${latestExpense.numberOfPeople} people)`;
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(expenseDetails)}`, '_blank');
    });

    // Back to dashboard
    document.getElementById('backToDashboard')?.addEventListener('click', () => {
        window.location.href = 'dashboard.html';
    });
});