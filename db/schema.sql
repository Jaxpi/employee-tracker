-- Drops the sample_db if it exists currently --
DROP DATABASE IF EXISTS employee_db;
-- Creates the sample_db database --
CREATE DATABASE employee_db;

-- This tells mysql to use this db
USE employee_db;

-- These are where the tables are created and the category keys with their data type information, foreign key/reference/on delete instructs that the newly created key is equal to the referenced key in the other table
CREATE TABLE departments (
  d_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
  r_id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT,
  FOREIGN KEY (department_id)
  REFERENCES departments(d_id)
  ON DELETE SET NULL
);

CREATE TABLE employees (
  e_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manager_id INT,
  FOREIGN KEY (role_id)
  REFERENCES roles(r_id)
  ON DELETE SET NULL
);

-- See database in use --
SELECT DATABASE();

-- right click on folder and open integrated terminal
-- type mysql -u root -p (enter)
-- enter password (enter)
-- type source schema.sql (enter) this runs the .sql file and does what its code tells it to do
-- type SHOW DATABASES; (enter) you should see employee_db in the list