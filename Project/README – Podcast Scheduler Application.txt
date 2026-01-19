1)Project Description
This project is a simple JavaFX-based podcast scheduling application.
It allows users to create podcast episodes, schedule them for a specific date and time, publish them when the scheduled time has passed, and persist data using a text file.

The application demonstrates Object-Oriented Programming (OOP) principles such as inheritance, polymorphism, abstraction, and encapsulation.

2)Limitations
The application uses text file persistence instead of a database.

Only one episode can be scheduled at the same exact date and time.

Time input must be entered manually in HH:MM format (no time picker).

There is no user authentication or multi-user support.

Episodes cannot be edited after creation (only created, scheduled, or published).

File path is fixed (episodes.txt) and not configurable.

3)Extra Features
Custom exception handling (ScheduleConflictException, EpisodePersistenceException)

Episode type system using inheritance (RegularEpisode, BonusEpisode)

Schedule conflict validation before saving

Automatic unique ID generation using UUID

Clear episode status lifecycle using enum (DRAFT, SCHEDULED, PUBLISHED)

Simple serialization and deserialization mechanism for persistence

User-friendly JavaFX interface with status messages

4)Technologies Used
Java

JavaFX

Object-Oriented Programming (OOP)

File I/O

Java Time API (LocalDateTime)