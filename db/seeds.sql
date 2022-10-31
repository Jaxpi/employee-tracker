-- Instructs what values to populate the tables with given the provided category keys
INSERT INTO department (id, name)
VALUES
    ( 001, "Debuggers"),
    ( 002, "Support"),
    ( 003, "Testers"),
    ( 004, "Complicated");


INSERT INTO role (id, title, salary, department_id)
VALUES
    ( 001, "Peace Keeper", 1, 001),
    ( 002, "Moral Compass", 50,000, 001),
    ( 003, "Ideas Guy", 40,000, 001);
    ( 004, "Tough Guy", 100,000, 001);
    ( 005, "Sidekick", 25,000, 001);
    ( 006, "Fighter", 15,000, 002);
    ( 007, "Guider", 10,000, 002);
    ( 008, "Lead Obstacle", 200,000, 003);
    ( 009, "Obstacle Supporter", 5,000, 003);
    ( 0010, "Emotional Mess", 472, 004);
    ( 0011, "Human Xanax", 0, 004);


    INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES
    ( 001, "Aang", "Aangerson", 001, null),
    ( 002, "Katara", "Watertribe", 002, 001),
    ( 003, "Sokka", "Watertribe", 003, 001),
    ( 004, "Toph", "Beifong", 004, 001),
    ( 005, "Appa", "McBison", 005, 001),
    ( 006, "Momo", "DiAirtemple", 005, 001),
    ( 007, "Suki", "VonKyoshi", 006, 001),
    ( 008, "King", "Bumi", 006, 001),
    ( 009, "Chief", "Hakoda", 006, 001),
    ( 010, "Monk", "Gyatso", 007, 001),
    ( 0011, "Huu", "Foggyswamp", 007, 001),
    ( 0012, "Master", "Piandao", 007, 001),
    ( 0013, "Firelord", "Ozai", 008, null),
    ( 0014, "Azula", "Oblongata", 008, 0013),
    ( 0015, "Tai", "Lee", 009, 0014),
    ( 0016, "Mai", "Emopants", 009, 0014),
    ( 0017, "Combustion", "Man", 009, 0014),
    ( 0018, "Admiral", "Zhao", 001, 0013),
    ( 0019, "Prince", "Zuko", 0010, null),
    ( 0020, "Uncle", "Iroh", 0011, 0019),
