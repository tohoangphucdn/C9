<?php
/**
 *  Name: Phuc H To
 *  Date: 12/03/2017
 *  Section: CSE 154 AD
 *  Assignment: Homework #7: Pokedex 2
 *  
 *  This is the common.php file for Homework #7: Pokedex 2. It contains all the
 *  mutual code to be shared by other php file in the assignment (select.php,
 *  insert.php, delete.php, trade.php, update.php).
 */
 
    error_reporting(E_ALL);
    
    /**
     * Sets the output type for the php file and creates the database variable
     * to be used.
     */ 
    header("Content-Type: application/json");
    $db = new PDO("mysql:dbname=hw7;host=localhost;charset=utf8", "root", "");
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    /**
     * @parameter: a string representing the name of the Pokemon to report.
     * Reports a 400 error saying that the provided Pokemon doesn't exist in the
     * Pokedex table.
     */
    function error_single($name) {
        header("HTTP/1.1 400 Invalid Request");
        $output = array();
        $output["error"] = "Error: Pokemon ".$name." not found in your Pokedex.";
        print(json_encode($output));
    }
    
    /**
     * @parameter: a string representing the name of variable to report.
     * Reports a 400 error saying that the required variable was missing.
     */
    function missing($name) {
        header("HTTP/1.1 400 Invalid Request");
        $output = array();
        $output["error"] = "Missing ".$name." parameter";
        print(json_encode($output));
    }
    
    /**
     * @parameter: a string representing the name of the Pokemon to be inserted
     * to the Pokedex table.
     * @parameter: the database (sql) used with the operations.
     * Inserts the given Pokemon to the Pokedex table (the database given).
     */
    function insert_poke($name, $db) {
        if (!isset($_POST["nickname"])) {
            $nickname = strtoupper($name);
        } else {
            $nickname = $_POST["nickname"];
        }
        date_default_timezone_set("America/Los_Angeles");
        $time = date("y-m-d H:i:s");
        $name = strtolower($name);
        $db->exec("INSERT INTO Pokedex (name, nickname, datefound) 
            VALUES('$name','$nickname','$time');");
        
    }
    
    /**
     * @parameter: a string representing the name of the Pokemon as given.
     * @parameter: a string representing the name of the Pokemon in the Pokedex table.
     * @parameter: the database (sql) used with the operations.
     * Deletes the provided Pokemon from the Pokedex table and report the success.
     */
    function remove_single($name, $db) {
        $name = strtolower($name);
        $db->exec("DELETE FROM Pokedex WHERE name = '$name';");
    }
    
    /**
     * @parameter: a string representing the name of the Pokemon as given.
     * @parameter: the database (sql) used with the operations.
     * Check if the provided Pokemon exists in the Pokedex table.
     * Returns true if that Pokemon is in the Pokedex table, false otherwise.
     */
    function contains($name, $db) {
        $name = strtolower($name);
        $rows = $db->query("SELECT * FROM Pokedex WHERE name = '$name';");
        $pokemon = array();
        foreach ($rows as $row) {
            $pokemon [] = $row["name"];
        }
        if (sizeof($pokemon) === 0) {
            return false;
        } else {
            return true;
        }
    }
?>