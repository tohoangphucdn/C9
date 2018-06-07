/**
 *  Name: Phuc H To
 *  Date: 12/03/2017
 *  Section: CSE 154 AD
 *  Assignment: Homework #7: Pokedex 2
 *  
 *  This is the setup.sql file for Homework #7: Pokedex 2. It will create the
 *  database with Pokedex table to store data for the games.
 */  

-- Create the database.
CREATE DATABASE IF NOT EXISTS hw7;
USE hw7;

-- Remove old version of the Pokedex table if exists.
DROP TABLE IF EXISTS Pokedex;

-- Create Pokedex table.
CREATE TABLE Pokedex(
    name VARCHAR(50),
    nickname VARCHAR(50),
    datefound DATETIME,
    PRIMARY KEY(name)
);