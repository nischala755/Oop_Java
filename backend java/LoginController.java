package application;

import javafx.fxml.FXML;
import javafx.scene.control.Alert;
import javafx.scene.control.Alert.AlertType;
import javafx.scene.control.PasswordField;
import javafx.scene.control.TextField;

public class LoginController {

    @FXML
    private TextField usernameField;
    @FXML
    private PasswordField passwordField;

    // Handle login
    public void handleLogin() {
        String username = usernameField.getText();
        String password = passwordField.getText();

        // Call a method to validate the user (e.g., check the database)
        boolean isValidUser = User.validateUser(username, password);

        if (isValidUser) {
            // Redirect to Dashboard
            SceneManager.loadScene("Dashboard.fxml");
        } else {
            // Show an error message
            showAlert("Invalid username or password.");
        }
    }

    private void showAlert(String message) {
        Alert alert = new Alert(AlertType.ERROR);
        alert.setTitle("Login Error");
        alert.setHeaderText(null);
        alert.setContentText(message);
        alert.showAndWait();
    }

    // Go to Registration Screen
    public void goToRegister() {
        // Change scene to Register screen
        SceneManager.loadScene("Register.fxml");
    }
}
