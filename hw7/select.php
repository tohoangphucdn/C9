<?php
/**
 *  Name: Phuc H To
 *  Date: 12/03/2017
 *  Section: CSE 154 AD
 *  Assignment: Homework #7: Pokedex 2
 *  
 *  This is the select.php file for Homework #7: Pokedex 2. It will return all the
 *  Pokemon that are in the Pokedex table at the moment.
 */  
    include ("common.php");
    
    $pokes = $db->query("SELECT * FROM Pokedex;");
    $output = array();
    $pokelist = array();
    foreach ($pokes as $poke) {
        $pokemon = array();
        $pokemon["name"] = $poke["name"];
        $pokemon["nickname"] = $poke["nickname"];
        $pokemon["datefound"] = $poke["datefound"];
        $pokelist [] = $pokemon;
    }
    $output["pokemon"] = $pokelist;
    print(json_encode($output));
?>