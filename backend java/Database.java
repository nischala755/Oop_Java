package application;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class Database {

    private static final String URL = "jdbc:mysql://localhost:3306/ExpenseTrackerDB";
    private static final String USERNAME = "root";  // Use your MySQL username
    private static final String PASSWORD = "Nischala7*";  // Use your MySQL password

    // Method to establish a connection to the database
    public static Connection getConnection() throws SQLException {
        try {
            // Attempt to establish the connection
            Connection connection = DriverManager.getConnection(URL, USERNAME, PASSWORD);
            System.out.println("Connection established successfully!");
            return connection;
        } catch (SQLException e) {
            // Print an error message and throw the exception if the connection fails
            System.err.println("Error establishing connection: " + e.getMessage());
            throw e;
        }
    }
}
