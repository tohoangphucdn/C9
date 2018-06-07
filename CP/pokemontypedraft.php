<?php
    header("Content-Type: application/json");
    
    $allType = ["normal", "fire", "water", "electric", "grass", "ice", "fighting",
               "poison", "ground", "flying", "psychic", "bug", "rock", "ghost",
               "dragon", "dark", "steel", "fairy"];
    $effectiveness = array();
    $effectiveness[0] = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0.5, 0, 1, 1, 0.5, 1];
    $effectiveness[1] = [1, 0.5, 0.5, 1, 2, 2, 1, 1, 1, 1, 1, 2, 0.5, 1, 0.5, 1, 2, 1];
    function pokeType(/*$type, $defweak, $defstrong, $defimmune, $attweak, $attstrong, $attimmune*/) {
        for ($i = 0; $i < 2; $i++) {
            for ($j = 0; $j < 18; $j++) {
                $output = array();
                $attweak = array();
                $attstrong = array();
                $attimmune = array();
                if ($effectiveness[$i][$j] === 0) {
                    array_push($output[$allType[$i]]["attimmune"], $allType[$j]);
                    array_push($output[$allType[$j]]["defimmune"], $allType[$i]);
                } else if ($effectiveness[$i][$j] === 2) {
                    array_push($output[$allType[$i]]["attstrong"], $allType[$j]);
                    array_push($output[$allType[$j]]["defweak"], $allType[$i]);
                } else if ($effectiveness[$i][$j] === 0.5) {
                    array_push($output[$allType[$i]]["attweak"], $allType[$j]);
                    array_push($output[$allType[$j]]["defstrong"], $allType[$i]);
                }
            }
        }
        /*        $attack["attweak"] = $attweak;
                $attack["attstrong"] = $attstrong;
                $attack["attimmune"] = $attimmune;
                $defend["defweak"] = $defweak;
                $defend["defstrong"] = $defstrong;
                $defend["defimmune"] = $defimmune;
                $output["normal"]["attack"] = $attack;
                $output["normal"]["defend"] = $defend;
                
            }
        }*/
        
    }    
    
   /* pokeType("normal", ["fighting"], [], ["ghost"], ["rock", "steel"], [], ["ghost"]);
    pokeType("fire",["water", "ground", "rock"], ["fire", "grass", "ice", "bug", "steel", "fairy"],
            [], ["fire", "water", "rock", "dragon"], ["grass", "ice", "bug", "steel"],[]);
    pokeType("water", ["electric", "grass"], ["fire", "water", "ice", "steel"], [], 
            ["water", "grass", "dragon"], ["fire", "ground", "rock"], []);
    pokeType("electric", ["ground"], ["electric", "flying", "steel"], [], ["electric"])*/
    pokeType();
?>