-- instructs what values to populate the biographies table with in the id and name columns
INSERT INTO biographies (id, name)
VALUES
    ( 001, "Diary of Anne Frank"),
    ( 002, "Frida: A Biography of Frida Kahlo"),
    ( 003, "Long Walk to Freedom");

-- instructs to select all columns of data from the table
SELECT * FROM biographies;