<?PHP
/*  Name: Phuc H To
    Date: 11/22/2017
    Section: CSE 154 AD
    Assignment: Homework #6: Bestreads
    
    This is the bestreads.php file for Homework #6: Bestreads. It will prepare the data
    to return to js file depends on the modes and the title of the books given.
*/
/*  @parameter: mode: a string representing the mode of the program - description, info,
                reviews or books
    @parameter: title: a string representing the title of the book required, required in
                description, info and reviews mode
    Outputs a plain text representing the content of the required book when mode is 'description'
    Outputs a json object in other modes
        Outputs an array of 3 elements: title, author, stars of the book when the mode is 'info'
        Outputs an array representing the reviews, each review has name, score, text when the
        mode is 'reviews'
        Outputs an array representing the available books in the folder, each book has title
        and folder if the mode is 'books'
*/
    $mode = $_GET["mode"];
    $book = $_GET["title"];
    $output = array();
    if ($mode === 'description') {
        # Prepares the content of the book as plain text
        header ("Content-Type: text/plain");
        print(file_get_contents("books/$book/description.txt", FILE_IGNORE_NEW_LINES));
    } else {
        # Prepares the data for info, reviews and books mode - Output type is json
        header ("Content-Type: application/json");
        $output = array();
        if ($mode === 'info') {
            $info = file("books/$book/info.txt", FILE_IGNORE_NEW_LINES);
            $output["title"] = $info[0];
            $output["author"] = $info[1];
            $output["stars"] = $info[2];
        } else if ($mode === 'reviews') {
            $reviews = glob("books/$book/review*.txt");
            foreach ($reviews as $review) {
                $info = file("$review", FILE_IGNORE_NEW_LINES);
                $current_review = array();
                $current_review["name"] = $info[0];
                $current_review["score"] = $info[1];
                $current_review["text"] = $info[2];
                array_push($output, $current_review);
            }
        } else if ($mode === 'books') {
            $dirs = glob("books/*", GLOB_ONLYDIR);
            $booklist = array();
            foreach($dirs as $dir) {
                $bookinfo = array();
                $bookinfo["title"] = file("$dir/info.txt", FILE_IGNORE_NEW_LINES)[0];
                $bookinfo["folder"] = basename(dirname("$dir/info.txt"));
                array_push($booklist, $bookinfo);
            }
            $output["books"] = $booklist;
        }
        print(json_encode($output));
    }
?>