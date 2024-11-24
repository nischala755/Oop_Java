package application;

import javafx.fxml.FXML;
import javafx.scene.control.Alert;
import javafx.scene.control.Alert.AlertType;
import javafx.scene.control.TextField;

public class AddExpenseController {

    @FXML
    private TextField descriptionField;
    @FXML
    private TextField amountField;

    // Handle saving the expense
    public void saveExpense() {
        String description = descriptionField.getText();
        String amountStr = amountField.getText();

        if (description.isEmpty() || amountStr.isEmpty()) {
            showAlert("Please fill in all fields.");
            return;
        }

        double amount = Double.parseDouble(amountStr);
        int userId = 1;  // Assuming the user is logged in and has ID 1 (you will handle this properly with session management)
        int groupId = 1; // You can assign this to a specific group if needed

        boolean isSaved = Expense.addExpense(amount, description, userId, groupId);

        if (isSaved) {
            // Redirect to dashboard or show success
            showAlert("Expense saved successfully!");
        } else {
            showAlert("Error saving expense.");
        }
    }

    private void showAlert(String message) {
        Alert alert = new Alert(AlertType.ERROR);
        alert.setTitle("Expense Error");
        alert.setHeaderText(null);
        alert.setContentText(message);
        alert.showAndWait();
    }
}
