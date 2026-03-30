package model;
// Defines that this class belongs to the "model" package

public class RegularEpisode extends Episode {

    public RegularEpisode(String title, int durationMinutes) {
        super(title, durationMinutes);
    }

    @Override
    public String getTypeLabel() {
        return "Regular";
    }
}
