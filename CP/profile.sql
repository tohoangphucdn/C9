CREATE DATABASE profiles;
USE profiles;
DROP TABLE IF EXISTS profiles;

CREATE TABLE profiles(
    ID INT,
    Name VARCHAR(255),
    Year_of_Birth INT,
    Country_of_birth INT,
    PRIMARY KEY (ID)
);

INSERT INTO profiles(ID, Name, Year_of_Birth, Country_of_birth)
    VALUES (1, 'Phuc To', 1997, 'Vietnam');
INSERT INTO profiles(ID, Name, Year_of_Birth, Country_of_birth)
    VALUES (2, 'Lieu Duong', 1971, 'Vietnam');
INSERT INTO profiles(ID, Name, Year_of_Birth, Country_of_birth)
    VALUES (3, 'Phi To', 1971, 'Vietnam');