package app; 
// Specifies that this class belongs to the "app" package

public class Main {
    // Main class of the application
    // This is the entry point where the program starts

    public static void main(String[] args) {
        // The main method is the first method executed by the JVM
        // "args" can receive command-line arguments if needed

        PodcastSchedulerApp.launch(PodcastSchedulerApp.class, args);
        // Launches the JavaFX application
        // PodcastSchedulerApp.class -> the main JavaFX application class
        // args -> passes command-line arguments to the application
    }
}
