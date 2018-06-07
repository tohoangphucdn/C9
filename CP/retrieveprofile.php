<?PHP
    $profiles = new PDO("mysql:dbname=profiles;host=localhost;charset=utf8", "root", "");
    $profiles->setAttribute(PDO:: ATTR_ERRMODE, PDO:: ERRMODE_EXCEPTION);
    $profile = $profiles->query("SELECT ID, Name FROM profiles ORDER BY ID;");
    
    header ("Content-Type: application/json");
    $output = array();
    foreach ($profile as $person) {
        $id = $person["ID"];
        $output[$id] = $person["Name"];
        
    }
    
    print(json_encode($output));
?>