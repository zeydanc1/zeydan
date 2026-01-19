package model;
// Specifies that this class belongs to the "model" package

public class BonusEpisode extends Episode {
    // Represents a special type of Episode: a Bonus Episode
    // This class inherits all common episode behavior from the Episode class

    public BonusEpisode(String title, int durationMinutes) {
        // Constructor for creating a BonusEpisode object
        // title -> the title of the episode
        // durationMinutes -> length of the episode in minutes

        super(title, durationMinutes);
        // Calls the constructor of the parent Episode class
    }

    @Override
    public String getTypeLabel() {
        // Overrides the parent method to return the episode type
        return "Bonus";
    }
}
