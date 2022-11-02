-- Instructs what values to populate the tables with given the provided category keys
DELETE FROM departments;
INSERT INTO departments (d_id, d_name)
VALUES
    ( 001, "Debuggers"),
    ( 002, "Support"),
    ( 003, "Testers"),
    ( 004, "Complicated");

DELETE FROM roles;
INSERT INTO roles (r_id, title, salary, department_id)
VALUES
    ( 001, "Peace Keeper", 1, 001),
    ( 002, "Moral Compass", 50000, 001),
    ( 003, "Ideas Guy", 40000, 001),
    ( 004, "Tough Guy", 100000, 001),
    ( 005, "Sidekick", 25000, 001),
    ( 006, "Fighter", 15000, 002),
    ( 007, "Guider", 10000, 002),
    ( 008, "Lead Obstacle", 200000, 003),
    ( 009, "Obstacle Supporter", 5000, 003),
    ( 0010, "Emotional Mess", 472, 004),
    ( 0011, "Human Xanax", 0, 004);

DELETE FROM employees;
INSERT INTO employees (e_id, first_name, last_name, role_id, manager_id)
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
    ( 0018, "Admiral", "Zhao", 009, 0013),
    ( 0019, "Prince", "Zuko", 0010, null),
    ( 0020, "Uncle", "Iroh", 0011, 0019);
