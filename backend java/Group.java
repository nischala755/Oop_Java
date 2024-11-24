package application.models;

import java.util.List;

public class Group {

    private String groupName;
    private List<User> users;
    private List<Expense> expenses;

    // Constructor, getters, and setters
    public Group(String groupName, List<User> users, List<Expense> expenses) {
        this.groupName = groupName;
        this.users = users;
        this.expenses = expenses;
    }

    public String getGroupName() {
        return groupName;
    }

    public void setGroupName(String groupName) {
        this.groupName = groupName;
    }

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }

    public List<Expense> getExpenses() {
        return expenses;
    }

    public void setExpenses(List<Expense> expenses) {
        this.expenses = expenses;
    }
}
