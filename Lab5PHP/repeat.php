<!DOCTYPE html>
<html>
    <head>
        <title>Testing PHP</title>
    </head>
    <body>
        <?php
            function repeatEcho($str, $times) {
                $return = "";
                for ($i = 0; $i < $times; $i++) {
                    $return .= $str;
                }
                return $return;
            }
            
            print repeatEcho("echo...", 3);
        ?>
    </body>
</html>