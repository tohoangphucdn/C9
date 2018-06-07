<?php
/**
 *  Name: Phuc H To
 *  Date: 12/03/2017
 *  Section: CSE 154 AD
 *  Assignment: Homework #7: Pokedex 2
 *  
 *  This is the update.php file for Homework #7: Pokedex 2. It will update the
 *  nickname of the given Pokemon in the Pokedex table.
 */  
 
    include("common.php");
    
    /**
     * @parameter: a string name (method: POST) representing the name of the Pokemon
     * to update the nickname
     * @parameter: a string nickname (method: POST) representing the nickname to be
     * updated. If not provided, it would be the uppercase version of the name
     * Calls the functions to update the nickname
     * Reports a 400 error if the name parameter is missing
     */
    
    if (!isset($_POST["name"])) {
        missing("name");
    } else {
        update($_POST["name"], $db);
    }
    
    /**
     * @parameter: a string representing the name of the Pokemon to be updated
     * @parameter: the database (sql) used with the operations
     * Updates the nickname of the Pokemon whose the provided name
     * Reports a 400 error if the Pokemon provided doesn't exist in the Pokedex table
     */ 
    function update($name, $db) {
        $nickname = $_POST["nickname"];
        if (!isset($nickname)) {
            $nickname = strtoupper($name);
        }
        $check = contains($name, $db);
        if (!$check) {
            error_single($name);
        } else {
            $db->exec("UPDATE Pokedex SET nickname = '$nickname' WHERE name = '$pokename';");
            $output = array();
            $output["success"] = "Success! Your ".$name." is now named ".$nickname."!";
            print(json_encode($output));
        }   
    }
?>