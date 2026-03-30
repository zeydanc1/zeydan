package model;
// Defines that this class belongs to the "model" package

import java.io.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class EpisodeRepository {

    private List<Episode> episodes = new ArrayList<>();
    private final String FILE_NAME = "episodes.txt";

    public List<Episode> getEpisodes() {
        return episodes;
    }

    public Episode createEpisode(String type, String title, int durationMinutes) {
        Episode ep;

        if (type.equalsIgnoreCase("Regular")) {
            ep = new RegularEpisode(title, durationMinutes);
        } else {
            ep = new BonusEpisode(title, durationMinutes);
        }

        episodes.add(ep);
        return ep;
    }

    public void scheduleEpisode(Episode episode, LocalDateTime dateTime)
            throws ScheduleConflictException {

        for (Episode ep : episodes) {
            if (ep.getScheduledDateTime() != null &&
                ep.getScheduledDateTime().equals(dateTime)) {

                throw new ScheduleConflictException(
                        "Another episode is scheduled at that time."
                );
            }
        }

        episode.schedule(dateTime);
    }

    public void saveToFile() throws EpisodePersistenceException {
        try (PrintWriter pw = new PrintWriter(new FileWriter(FILE_NAME))) {
            for (Episode ep : episodes) {
                pw.println(serialize(ep));
            }
        } catch (Exception e) {
            throw new EpisodePersistenceException("Cannot save: " + e.getMessage());
        }
    }

    public void loadFromFile() throws EpisodePersistenceException {
        episodes.clear();

        try (BufferedReader br = new BufferedReader(new FileReader(FILE_NAME))) {
            String line;

            while ((line = br.readLine()) != null) {
                episodes.add(deserialize(line));
            }
        } catch (Exception e) {
            throw new EpisodePersistenceException("Cannot load: " + e.getMessage());
        }
    }

    private String serialize(Episode ep) {
        return String.join("|",
                ep.getId(),
                ep.getTypeLabel(),
                ep.getTitle(),
                String.valueOf(ep.getDurationMinutes()),
                ep.getStatus().toString(),
                ep.getScheduledDateTime() == null
                        ? "null"
                        : ep.getScheduledDateTime().toString()
        );
    }

    private Episode deserialize(String line) {
        String[] p = line.split("\\|");

        Episode ep = p[1].equals("Regular")
                ? new RegularEpisode(p[2], Integer.parseInt(p[3]))
                : new BonusEpisode(p[2], Integer.parseInt(p[3]));

        ep.id = p[0];
        ep.status = EpisodeStatus.valueOf(p[4]);
        ep.scheduledDateTime =
                p[5].equals("null") ? null : LocalDateTime.parse(p[5]);

        return ep;
    }
}
