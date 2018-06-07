<?php
  // PHP web service starter code for Regex Hybrids
  $type = $_GET["animal"];
  $folder = "images";

  // recall that glob returns an array of all files matching the given
  // "glob" pattern. In this case, this is all .jpg files in the 
  // images/ directory.
  $images = glob("{$folder}/*.jpg");  
  header("Content-type: text/plain");

  // Write your solution here:
  if ($type === "all") {
    echo $images;
  } else {
    $image = glob("{$folder}/*($type)*.jpg");
    foreach 
    echo $image;
  }
?>
