<?php
    header("Content-Type: application/json");
    
    function pokeType($defWeak, $defStrong, $defImmune, $attWeak, $attStrong, $attImmune) {
        
        $attack["attWeak"] = $attWeak;
        $attack["attStrong"] = $attStrong;
        $attack["attImmune"] = $attImmune;
        $defend["defWeak"] = $defWeak;
        $defend["defStrong"] = $defStrong;
        $defend["defImmune"] = $defImmune;
        $type["attack"] = $attack;
        $type["defend"] = $defend;
        return $type;
    }    
    
    function write() {
        $output = array();
        $output["normal"] = pokeType(["fighting"], [], ["ghost"], ["rock", "steel"], [], ["ghost"]);
        $output["fire"] = pokeType(["water", "ground", "rock"], ["fire", "grass", "ice", "bug", "steel", "fairy"],
                [], ["fire", "water", "rock", "dragon"], ["grass", "ice", "bug", "steel"],[]);
        $output["water"] = pokeType(["electric", "grass"], ["fire", "water", "ice", "steel"], [], 
                ["water", "grass", "dragon"], ["fire", "ground", "rock"], []);
        $output["electric"] = pokeType(["ground"], ["electric", "flying", "steel"], [],
                ["electric", "grass", "dragon"], ["water", "flying"], []);
        $output["grass"] = pokeType(["fire", "ice", "poison", "flying", "bug"], 
                ["water", "electric", "grass", "ground"], [],
                ["fire", "grass", "poison", "flying", "bug", "dragon"], ["water", "ground", "rock"], []);
        print(json_encode($output));
    }
        
    write();
    
?>