package application.models;

public class Expense {

    private String description;
    private double amount;
    private String date;
    private User user;

    // Constructor, getters, and setters
    public Expense(String description, double amount, String date, User user) {
        this.description = description;
        this.amount = amount;
        this.date = date;
        this.user = user;
    }

    // Getters and setters
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
