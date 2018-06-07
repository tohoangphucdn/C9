<?php
/**
 *  Name: Phuc H To
 *  Date: 12/03/2017
 *  Section: CSE 154 AD
 *  Assignment: Homework #7: Pokedex 2
 *  
 *  This is the delete.php file for Homework #7: Pokedex 2. It will delete a Pokemon
 *  in the Pokedex table if the name is given, or delete all Pokemon if required.
 */  
 
    include("common.php");
    
    /**
     * @parameter: name (method: POST) if removes a specific Pokemon.
     * @parameter: mode (method: POST) if removes all Pokemon in the Pokedex.
     * Removes a specific Pokemon if the name is given, removes all Pokemon in the
     * Pokedex table if the mode is removeall and reports success.
     * Reports 400 error if neither parameter is provided, or the mode is not
     * removeall.
     */
    
    $name = "pidgey";
    if (isset($name)) {
        /*$name = $_POST["name"];*/
        $check = contains($name, $db);
        if ($check) {
            remove_single($name, $db);
            $output = array();
            $output["success"] = "Success! ".$name." removed from your Pokedex!";
            print(json_encode($output));
        } else {
            error_single($name);
        }
    } else if (isset($_POST["mode"])){
        $mode = $_POST["mode"];
        if ($mode === "removeall") {
            remove_all($db);
        } else {
            error_mode();
        }
    } else {
        missing("name or mode");
    }
    
    /**
     * @parameter: the database (sql) used with the operations.
     * Removes all Pokemon from the Pokedex table.
     */
    function remove_all($db) {
        $db->exec("DELETE FROM Pokedex;");
        $output = array();
        $output["success"] = "Success! All Pokemon removed from your Pokedex!";
        print(json_encode($output));
    }
    
    /**
     * Reports a 400 error if no Pokemon name is provided and the mode is not
     * removeall.
     */
    function error_mode() {
        header("HTTP/1.1 400 Invalid Request");
        $output = array();
        $output["error"] = "Error: Unknown mode ".$_POST["mode"].".";
        print(json_encode($output));
    }
?>