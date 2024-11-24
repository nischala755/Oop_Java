package application;

import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.layout.StackPane;
import javafx.stage.Stage;
import javafx.fxml.FXMLLoader;
import java.io.IOException;

public class Main extends Application {

    @Override
    public void start(Stage primaryStage) throws IOException {
        StackPane root = FXMLLoader.load(getClass().getResource("/application/views/Login.fxml"));
        Scene scene = new Scene(root, 300, 200);
        primaryStage.setTitle("Expense Tracker - Login");
        primaryStage.setScene(scene);
        primaryStage.show();
    }

    public static void main(String[] args) {
        launch(args);
    }
}
