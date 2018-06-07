<?PHP  
/**
 *  Name: Phuc H To
 *  Date: 12/03/2017
 *  Section: CSE 154 AD
 *  Assignment: Homework #7: Pokedex 2
 *  
 *  This is the bestreads.php file for Homework #6: Bestreads. It will prepare the data
 *  to return to js file depends on the mode and the title of the books given.
 */  
    $mode = $_GET["mode"];
    $book = $_GET["title"];
    
    /**
     * Handles the different requests depends on the mode passed in
     */
    if ($mode === 'description') {
        header ("Content-Type: text/plain");
        print(file_get_contents("books/$book/description.txt", FILE_IGNORE_NEW_LINES));
    } else {
        header ("Content-Type: application/json");
        $output = array();
        if ($mode == 'info') {
            $output = info($book);
        } else if ($mode == 'reviews') {
            $output = reviews($book);
        } else if ($mode == 'books') {
            $output = books();
        }
        print(json_encode($output));
    }
    
    /**
     * @parameter: a string - title of the book request
     * Outputs an array of 3 elements: title, author, stars of the book in as an
     * json object (info mode)
     */
    function info($book) {
        $output = array();
        $info = file("books/$book/info.txt", FILE_IGNORE_NEW_LINES);
        $output["title"] = $info[0];
        $output["author"] = $info[1];
        $output["stars"] = $info[2];
        return $output;
    }
    
    /**
     * @parameter: a string - title of the book request
     * Outputs an array as an JSON object representing the reviews, each review
     * has name, score, text (reviews mode)
     */
    function reviews($book) {
        $output = array();
        $reviews = glob("books/$book/review*.txt");
        foreach ($reviews as $review) {
            $info = file("$review", FILE_IGNORE_NEW_LINES);
            $current_review = array();
            $current_review["name"] = $info[0];
            $current_review["score"] = $info[1];
            $current_review["text"] = $info[2];
            array_push($output, $current_review);
        }
        return $output;
    }
    
    /**
     * Outputs an array as a JSON objectrepresenting the available books in the folder, each
     * book has title and folder (books mode)
     */
    function books() {
        $output = array();
        $dirs = glob("books/*", GLOB_ONLYDIR);
        $booklist = array();
        foreach($dirs as $dir) {
            $bookinfo = array();
            $bookinfo["title"] = file("$dir/info.txt", FILE_IGNORE_NEW_LINES)[0];
            $bookinfo["folder"] = basename(dirname("$dir/info.txt"));
            array_push($booklist, $bookinfo);
        }
        $output["books"] = $booklist;
        return $output;
    }
?>