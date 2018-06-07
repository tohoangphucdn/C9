<!DOCTYPE html>
<html>
    <head>
        <title>Creative Project</title>
    </head>
    <body>
        <?php
            function learntoCount($number) {
                $return = "";
                for ($i = 0; $i <= $number; $i++) {
                    $return .= $i." ";
                }
                return $return;
            }
            
            print learntoCount(20);
        ?>
    </body>
</html>