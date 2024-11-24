package application;

import javafx.fxml.FXML;

public class DashboardController {

    // Handle Logout
    public void logOut() {
        // Clear session (maybe clear the user data) and go to login screen
        SceneManager.loadScene("Login.fxml");
    }

    // Navigate to AddExpense screen
    public void goToAddExpense() {
        SceneManager.loadScene("AddExpense.fxml");
    }

    // View Expenses (can show a list of expenses)
    public void viewExpenses() {
        // Load a new scene that displays all expenses
        System.out.println("Displaying all expenses...");
    }
}
