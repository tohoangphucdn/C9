<?php
/**
 *  Name: Phuc H To
 *  Date: 12/03/2017
 *  Section: CSE 154 AD
 *  Assignment: Homework #7: Pokedex 2
 *  
 *  This is the insert.php file for Homework #7: Pokedex 2. It will add a Pokemon
 *  to my Pokedex table with all-lowercase name.
 */  
    include ("common.php");
    
    /**
     * @paramter: a string name (method: POST) representing the name of the Pokemon
     * to be added into the Pokedex table.
     * Adds the Pokemon with the given name in all-lowercase to the Pokedex table
     * and reports the success.
     * Reports a 400 error if the parameter is missing or the Pokemon is already in
     * the table.
     */ 
    
    if (!isset($_POST["name"])) {
        missing("name") ;
    } else {
        $name = $_POST["name"]; 
        $check = contains($name, $db);
        $output = array();
        if ($check) {
            header("HTTP/1.1 400 Invalid Request");
            $output["error"] = "Error: Pokemon ".$name." already found.";
        } else {
            insert_poke(strtolower($name), $db);
            $output["success"] = "Success! ".$name." added to your Pokedex!";
        }
        print(json_encode($output));
    }
?>