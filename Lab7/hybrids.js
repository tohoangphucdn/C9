/**
 * Provided JS code for Regex Hybrids Section 7 exercise.
 * This script populates the hybrids.html page with images containing
 * the word given in the text input box when the "find hybrids" button is clicked,
 * and all images in the images folder when the "show all" button is clicked.
 */
(function() {
  "use strict";

  /**
   * Set up submit buttons to fetch data from regexhydbrids.php when clicked.
   */
  window.onload = function() {
    $("submit-one").onclick = function() {
      makeRequest($("animal").value); 
    };
    $("submit-all").onclick = function() {
      makeRequest("all");
    };
  };
  
  /**
   * Makes a request to regexhybrids.php web service with the given 
   * animal parameter, then populates the results div with result image
   * paths if the request was successful.
   */
  function makeRequest(animal) {
    $("results").innerHTML = "";
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
      var resultsHead = document.createElement("h2");
      resultsHead.innerHTML = "Hybrid results for " + animal + ": ";
      $("results").appendChild(resultsHead);
      populateResults(this.responseText);
    };
    xhr.onerror = function() {
      $("results").innerHTML = "No images found :(";
    };
    xhr.open("GET", "regexhybrids.php?animal=" + animal);
    xhr.send();
  }
  
  /**
   * Populates the results div with the images returned in response.
   */
  function populateResults(response) {
    var images = response.split("\n");
    for (var i = 0; i < images.length; i++) {
      var img = document.createElement("img");
      img.src = images[i];
      $("results").appendChild(img);
    }
  }

  // ------------------------- HELPER FUNCTIONS ------------------------- //    
  /**
   * Returns the DOM element with the given ID.
   */
  function $(id) {
    return document.getElementById(id);
  }
})();
