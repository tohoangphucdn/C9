<?php
/**
 *  Name: Phuc H To
 *  Date: 12/03/2017
 *  Section: CSE 154 AD
 *  Assignment: Homework #7: Pokedex 2
 *  
 *  This is the trade.php file for Homework #7: Pokedex 2. It will replace the
 *  current Pokemon of the user with another traded Pokemon.
 */
 
    include("common.php");
    
    /**
     * @parameter: a string mypokemon (method: POST) representing the name of the user's
     * Pokemon to be traded.
     * @parameter: a string theirpokemon (method: POST) representing the name of the
     * Pokemon received in the trade.
     * Call the functions to execute the trade process.
     * Reports a 400 error if either or both parameters are missing.
     */ 
    
    if (!isset($_POST["mypokemon"]) && (!isset($_POST["theirpokemon"]))) {
        missing("mypokemon and theirpokemon");
    } else if (!isset($_POST["mypokemon"])) {
        missing("mypokemon");
    } else if (!isset($_POST["theirpokemon"])) {
        missing("theirpokemon");
    } else {
        trade($_POST["mypokemon"], $_POST["theirpokemon"], $db);
    }
    
    /**
     * @parameter: a string representing the name of the pokemon to give up in trade
     * @parameter: a string representing the name of the pokemon to receive in trade
     * @parameter: the database used to manage the data.
     * Removes the Pokemon to give up in trade from Pokedex table and adds the
     * received on into the Pokedex.
     * Reports a 400 error if the Pokemon to give up doesn't exist in the Pokedex
     * table, or if the user already possesses the received Pokemon.
     */ 
    function trade($mine, $theirs, $db) {
        $checkmine = contains($mine, $db);
        $checktheirs = contains($theirs, $db);
        if (!$checkmine) {
            error_single($mine);
        } else if ($checktheirs) {
            error_theirs($theirs);
        } else {
            insert_poke($theirs, $db);
            remove_single($mine, $db);
            $output = array();
            $output["success"] = "Success! You have traded your ".$mine." for ".$theirs."!";
            print(json_encode($output));
        }
    }
    
    /**
     * @parameter: a string representing the name of the Pokemon to report.
     * Reports a 400 error saying that the user already owns the Pokemon.
     */
    function error_theirs($name) {
        header("HTTP/1.1 400 Invalid Request");
        $output = array();
        $output["error"] = "Error: You have already found ".$name.".";
        print(json_encode($output));
    }
?>