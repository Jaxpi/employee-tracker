-- Drops the sample_db if it exists currently --
DROP DATABASE IF EXISTS employee_db;
-- Creates the sample_db database --
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT NOT NULL
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT
);

-- See database in use --
SELECT DATABASE();

-- right click on folder and open integrated terminal
-- type mysql -u root -p (enter)
-- enter password (enter)
-- type source schema.sql (enter) this runs the .sql file and does what its code tells it to do
-- type SHOW DATABASES; (enter) you should see employee_db in the list