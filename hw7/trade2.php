<?PHP
    include("common.php");
    if (!isset($_POST["mypokemon"]) && (!isset($_POST["theirpokemon"]))) {
        missing_more("mypokemon", "theirpokemon", "and");
    } else if (!isset($_POST["mypokemon"])) {
        missing_one("mypokemon");
    } else if (!isset($_POST["theirpokemon"])) {
        missing_one("theirpokemon");
    } else {
        trade();
    }
    
    function trade() {
        $mine = $_POST["mypokemon"];
        $theirs = $_POST["theirpokemon"];
        $checkmine = contains($mine);
        $checktheirs = contains($theirs);
        if ($checkmine === "") {
            error_single($mine);
        } else if (!$checktheirs === "") {
            error_theirs($theirs);
        } else {
            insert_poke($theirpokemon);
            remove_single($mypokemon);
            $output = array();
            $output["success"] = "Success! You have traded your ".$mine." for ".$theirs."!";
            print(json_encode($output));
        }
    }
    
    function error_theirs($name) {
        header("HTTP/1.1 400 Invalid Request");
        $output = array();
        $output["error"] = "Error: You have already found ".$name.".";
        print(json_encode($output));
    }
?>