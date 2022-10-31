-- Drops the sample_db if it exists currently --
DROP DATABASE IF EXISTS sample_db;
-- Creates the sample_db database --
CREATE DATABASE sample_db;

-- right click on folder and open integrated terminal
-- type mysql -u root -p (enter)
-- enter password (enter)
-- type source schema.sql (enter) this runs the .sql file and does what its code tells it to do
-- type SHOW DATABASES; (enter) you should see sample_db in the list