document.addEventListener('DOMContentLoaded', () => {
    const userEmailDisplay = document.getElementById('userEmailDisplay');
    const currentExpense = document.getElementById('currentExpense');
    const expenseForm = document.getElementById('expenseForm');
    const expenseNameInput = document.getElementById('expenseName');
    const expenseAmountInput = document.getElementById('expenseAmount');
    const goToPaymentsButton = document.getElementById('goToPayments');
    const goToShareButton = document.getElementById('goToShare');
    const goToVisualizationButton = document.getElementById('goToVisualization');
    const goToChatbotButton = document.getElementById('goToChatbot');

    // Retrieve the user's email from localStorage or set a default
    const userEmail = localStorage.getItem('userEmail') || "user@example.com";
    userEmailDisplay.textContent = userEmail;

    // Retrieve stored expenses or initialize an empty array
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    // Function to display only the most recently added expense
    function displayCurrentExpense() {
        currentExpense.innerHTML = ''; // Clear the current display

        if (expenses.length > 0) {
            const latestExpense = expenses[expenses.length - 1];
            const expenseItem = document.createElement('div');
            expenseItem.textContent = `${latestExpense.name}: $${latestExpense.amount.toFixed(2)}`;
            currentExpense.appendChild(expenseItem);
        } else {
            currentExpense.textContent = "No expenses to show.";
        }
    }

    // Function to add an expense
    expenseForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const expenseName = expenseNameInput.value.trim();
        const expenseAmount = parseFloat(expenseAmountInput.value.trim());
        
        // Input validation
        if (!expenseName || isNaN(expenseAmount) || expenseAmount <= 0) {
            alert("Please enter a valid expense name and amount greater than zero.");
            return;
        }

        const newExpense = { name: expenseName, amount: expenseAmount };
        expenses.push(newExpense);
        localStorage.setItem('expenses', JSON.stringify(expenses));
        
        // Clear the form inputs
        expenseNameInput.value = '';
        expenseAmountInput.value = '';
        
        // Display only the most recent expense
        displayCurrentExpense();
    });

    // Initial display of the current expense
    displayCurrentExpense();

    // Navigation to other pages
    goToPaymentsButton.addEventListener('click', () => {
        window.location.href = 'payments.html';
    });

    goToShareButton.addEventListener('click', () => {
        window.location.href = 'share.html';
    });

    goToVisualizationButton.addEventListener('click', () => {
        window.location.href = 'expense_visualization.html'; // Ensure visualization.html exists
    });

    goToChatbotButton.addEventListener('click', () => {
        window.location.href = 'chatbot.html'; // Ensure chatbot.html exists
    });
});
