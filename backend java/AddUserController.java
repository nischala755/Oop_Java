package controllers;

import javafx.fxml.FXML;
import javafx.scene.control.Alert;
import javafx.scene.control.PasswordField;
import javafx.scene.control.TextField;
import application.Database;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class AddUserController {

    @FXML private TextField usernameField;
    @FXML private PasswordField passwordField;
    @FXML private TextField emailField;
    @FXML private TextField fullNameField;

    // Handles registration logic
    @FXML
    public void handleRegister() {
        String username = usernameField.getText();
        String password = passwordField.getText();
        String email = emailField.getText();
        String fullName = fullNameField.getText();

        try (Connection conn = Database.getConnection()) {
            String sql = "INSERT INTO Users (username, password, email, fullName) VALUES (?, ?, ?, ?)";
            try (PreparedStatement stmt = conn.prepareStatement(sql)) {
                stmt.setString(1, username);
                stmt.setString(2, password);
                stmt.setString(3, email);
                stmt.setString(4, fullName);
                int rowsAffected = stmt.executeUpdate();
                if (rowsAffected > 0) {
                    // Registration successful
                    Alert alert = new Alert(Alert.AlertType.INFORMATION);
                    alert.setTitle("Registration Successful");
                    alert.setHeaderText("Account created!");
                    alert.show();
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
