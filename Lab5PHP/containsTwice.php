<!DOCTYPE html>
<html>
    <head>
        <title>Testing PHP</title>
    </head>
    <body>
        <?php
            function containsTwice($str, $chr) {
                $str = strtoupper($str);
                $chr = strtoupper($chr);
                $count = 0;
                for ($i = 0; $i < strlen($str); $i++) {
                    if (strcmp($str[$i],$chr[0])) {
                        $count ++;    
                    }
                    if ($count == 2) 
                        return true;
                }
                return false;
            }
            
            print containsTwice("eceeeeeeeeeeeceeeeeeeeee","e");
        ?>
    </body>
</html>