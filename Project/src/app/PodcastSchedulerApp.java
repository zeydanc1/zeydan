package app;
// Defines the package name for this application

import javafx.application.Application;
import javafx.geometry.Insets;
import javafx.scene.Scene;
import javafx.scene.control.*;
import javafx.scene.layout.*;
import javafx.stage.Stage;
import model.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

public class PodcastSchedulerApp extends Application {
    // Main JavaFX application class for the Podcast Scheduler

    private EpisodeRepository repository = new EpisodeRepository();
    // Repository responsible for managing episodes and persistence

    private ListView<Episode> episodeListView = new ListView<>();
    // ListView to display all created and scheduled episodes

    @Override
    public void start(Stage primaryStage) {
        // This method is automatically called when the JavaFX application starts

        // --- UI Controls ---

        TextField titleField = new TextField();
        // Input field for the episode title
        titleField.setPromptText("Episode Title");

        TextField durationField = new TextField();
        // Input field for episode duration in minutes
        durationField.setPromptText("Duration (minutes)");

        ComboBox<String> typeBox = new ComboBox<>();
        // Dropdown to select the episode type
        typeBox.getItems().addAll("Regular", "Bonus");
        typeBox.setPromptText("Episode Type");

        DatePicker datePicker = new DatePicker();
        // Allows the user to pick a scheduling date

        TextField timeField = new TextField();
        // Input field for scheduling time
        timeField.setPromptText("HH:MM");

        Button createBtn = new Button("Create & Schedule");
        // Button to create and schedule a new episode

        Button publishBtn = new Button("Publish Selected");
        // Button to publish the selected episode

        Button saveBtn = new Button("Save");
        // Button to save episodes to file

        Button loadBtn = new Button("Load");
        // Button to load episodes from file

        Label messageLabel = new Label();
        // Label to display success or error messages to the user

        // --- Layout ---

        VBox fields = new VBox(10,
                titleField, durationField, typeBox,
                datePicker, timeField, createBtn,
                publishBtn, saveBtn, loadBtn, messageLabel
        );
        // Vertical layout for input fields and buttons
        fields.setPadding(new Insets(15));

        HBox root = new HBox(10, fields, episodeListView);
        // Horizontal layout combining form controls and episode list
        root.setPadding(new Insets(10));

        // --- Events ---

        createBtn.setOnAction(e -> {
            // Triggered when the "Create & Schedule" button is clicked
            try {
                String title = titleField.getText();
                // Read episode title

                int duration = Integer.parseInt(durationField.getText());
                // Convert duration from String to integer

                String type = typeBox.getValue();
                // Get selected episode type

                LocalDate date = datePicker.getValue();
                // Get selected date

                LocalTime time = LocalTime.parse(timeField.getText());
                // Parse time from text input

                LocalDateTime scheduleTime = LocalDateTime.of(date, time);
                // Combine date and time into a single DateTime object

                Episode ep = repository.createEpisode(type, title, duration);
                // Create a new episode using the repository

                repository.scheduleEpisode(ep, scheduleTime);
                // Schedule the episode at the selected date and time

                episodeListView.getItems().setAll(repository.getEpisodes());
                // Refresh the ListView with updated episode data

                messageLabel.setText("Episode scheduled successfully!");
                // Show success message

            } catch (ScheduleConflictException ex) {
                // Handles conflicts when two episodes overlap
                messageLabel.setText("Schedule conflict: " + ex.getMessage());

            } catch (Exception ex) {
                // Handles any other unexpected errors
                messageLabel.setText("Error: " + ex.getMessage());
            }
        });

        publishBtn.setOnAction(e -> {
            // Triggered when the "Publish Selected" button is clicked

            Episode selected = episodeListView.getSelectionModel().getSelectedItem();
            // Get the currently selected episode

            if (selected == null) {
                // If no episode is selected, show warning message
                messageLabel.setText("No episode selected.");
                return;
            }

            selected.publish(LocalDateTime.now());
            // Attempt to publish the episode using the current time

            episodeListView.refresh();
            // Refresh the ListView to reflect changes

            messageLabel.setText("Publish attempt complete.");
        });

        saveBtn.setOnAction(e -> {
            // Triggered when the "Save" button is clicked
            try {
                repository.saveToFile();
                // Save all episodes to a file
                messageLabel.setText("Saved to file.");
            } catch (EpisodePersistenceException ex) {
                // Handles file save errors
                messageLabel.setText("Save error: " + ex.getMessage());
            }
        });

        loadBtn.setOnAction(e -> {
            // Triggered when the "Load" button is clicked
            try {
                repository.loadFromFile();
                // Load episodes from a file

                episodeListView.getItems().setAll(repository.getEpisodes());
                // Update ListView with loaded data

                messageLabel.setText("Loaded from file.");
            } catch (EpisodePersistenceException ex) {
                // Handles file load errors
                messageLabel.setText("Load error: " + ex.getMessage());
            }
        });

        Scene scene = new Scene(root, 900, 500);
        // Create the main scene with specified width and height

        primaryStage.setTitle("Podcast Scheduler");
        // Set the application window title

        primaryStage.setScene(scene);
        primaryStage.show();
        // Display the JavaFX application window
    }
}
