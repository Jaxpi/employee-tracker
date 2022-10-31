-- Drops the sample_db if it exists currently --
DROP DATABASE IF EXISTS employee_db;
-- Creates the sample_db database --
CREATE DATABASE employee_db;

USE books_db;

-- See database in use --
SELECT DATABASE();

CREATE TABLE employees (
  -- Creates a numeric column called "id" which will automatically increment its default value as we create new rows --
  id INT NOT NULL,
  -- Makes a string column called "name" which cannot contain null --
  name VARCHAR(100) NOT NULL
);

-- right click on folder and open integrated terminal
-- type mysql -u root -p (enter)
-- enter password (enter)
-- type source schema.sql (enter) this runs the .sql file and does what its code tells it to do
-- type SHOW DATABASES; (enter) you should see employee_db in the list