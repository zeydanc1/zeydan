package model;
// Defines that this class belongs to the "model" package

public class EpisodePersistenceException extends Exception {
    // Custom checked exception for persistence-related errors

    public EpisodePersistenceException(String message) {
        super(message);
    }
}
