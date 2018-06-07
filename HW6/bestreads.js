/*  Name: Phuc H To
    Date: 11/22/2017
    Section: CSE 154 AD
    Assignment: Homework #6: Bestreads
    
    This is the bestreads.js file for Homework #6: Bestreads. It will handle events happens
    on the page since it loads and when the users click the books given on the page as well
    as the Home button.
*/

"use strict";
/*global fetch*/
(function() {
    
    /*  When the page loads, display the main pages with all the books, and set event
        handler for the Home button
    */
    window.onload = function() {
        displayPage("books", "");
        $("back").onclick = refreshPage;
        console.log();
    };
    
    /*  @parameter: one string as the id of the element
        Return the element whose that id
    */
    function $(id) {
        return document.getElementById(id);
    }
    
    /*  @parameter: a string: the tag of the element to create
        @parameter: a string: the content (innerHTML) of the element to create
        Returns an element with the tag and content as requested
    */
    function createEle(tag, content) {
        let element = document.createElement(tag);
        element.innerHTML = content;
        return element;
    }
    
     /*  @parameter: a string: the id of the element to clear
        Clears all children of that element
    */
    function clearDiv(id) {
        let element = $(id);
        while (element.hasChildNodes()) {
            element.removeChild(element.childNodes[0]);
        }
    }
    
    /*  @parameter: an object which is the response from the server
        Returns the results if the fetching succeeded, the error otherwise
    */
    function checkStatus(response) {  
        if (response.status >= 200 && response.status < 300) {  
            return response.text();
        } else {  
            return Promise.reject(new Error(response.status+": "+response.statusText)); 
        } 
    }
    
    /*  Clears the current Home Page and replaces it with a refreshed version
    */
    function refreshPage() {
        clearDiv("allbooks");
        clearDiv("reviews");
        $("allbooks").classList.remove("hidden");
        displayPage("books");
    }
    
    /*  @parameter: a string: mode of the request - info, books or reviews
        @parameter: a string: title of the book, "" by default
        Retrieves the information requested from the server
    */
    function displayPage(mode, title) {
        let url = "bestreads.php?mode=" + mode;
        if (! (title === "")) {
            url +="&title=" + title;
        }
        fetch(url, {credentials: 'include'}) 
            .then (checkStatus)
            .then (JSON.parse)
            .then (function(response) {
                if (mode === 'books') {
                    displayBooks(response);
                } else if (mode === "info") {
                    singleBook(response, title);
                } else {
                    appendReviews(response);
                }
            })
            .catch(function(error) {
               alert(error);
            });
    }
    
    /*  @parameter: an object: the object retrieved from the server containing
                    the books and their corresponding information
        Creates the sections of the available books in the Home Page
    */
    function displayBooks(response) {
        let books = response.books;
        books.forEach(function(book) {
            createBook(book.title, book.folder);
        });
    }
    
    /*  @parameter: a string: title of the book
        @parameter: a string: name of the folder containing the book's files
        Creates the section of the book in the Home Page
    */
    function createBook(title, folder) {
        $("singlebook").classList.add("hidden");
        let allBooks = $("allbooks");
        let book = document.createElement("div");
        let cover = document.createElement("img");
        cover.src = "books/" + folder + "/cover.jpg";
        cover.alt = title;
        book.appendChild(cover);
        book.appendChild(createEle("p",title));
        allBooks.appendChild(book);
        book.onclick = function() {
            showBook(folder);
        };
    }
    
    /*  @parameter: a string: title of the book
        Changes the view to the view of one book and displays that book's information
    */
    function showBook(title) {
        clearDiv("allbooks");
        clearDiv("reviews");
        $("allbooks").classList.add("hidden");
        $("singlebook").classList.remove("hidden");
        displayPage("info", title);
        displayPage("reviews", title);
        displayDescription(title);
    }
    
    /*  @parameter: a string: title of the book
        Retrieves and displays the description of the book
    */
    function displayDescription(title) {
        let url = "bestreads.php?mode=description&title=" + title;
        fetch(url, {credentials: 'include'}) 
            .then (checkStatus)
            .then (function(response) {
                $("description").innerHTML = response;
            })
            .catch(function(error) {
               alert(error);
            });
    }
    
    /*  @parameter: an object: the object retrieved from the server containing the
                    information of the required book
        Displays the information of the book to the page
    */
    function singleBook(response, folder) {
        $("cover").src = "books/" + folder + "/cover.jpg";
        $("title").innerHTML = response.title;
        $("author").innerHTML = response.author;
        $("stars").innerHTML = response.stars;
    }
    
    /*  @parameter: an object: the object retrieved from the server containing the
                    reviews of the required book
        Displays the reviews of the book to the page
    */
    function appendReviews(response) {
        response.forEach(function(review) {
            let title = createEle("h3", review.name + " ");
            title.appendChild(createEle("span", review.score));
            $("reviews").appendChild(title);
            $("reviews").appendChild(createEle("p", review.text));
        });
    }
})();