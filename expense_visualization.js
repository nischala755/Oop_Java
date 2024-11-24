document.addEventListener('DOMContentLoaded', () => {
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    const expenseNames = expenses.map(exp => exp.name);
    const expenseAmounts = expenses.map(exp => exp.amount);

    const ctx = document.getElementById('expenseChart').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: expenseNames,
            datasets: [{
                data: expenseAmounts,
                backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe', '#ffce56'],
            }]
        },
        options: {
            responsive: true,
        }
    });
});
