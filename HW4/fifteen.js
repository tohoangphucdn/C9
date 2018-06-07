/*  Name: Phuc H To
    Date: 10/26/2017
    Section: CSE 154 AD
    Assignment: Homework #4: Fifteen Puzzle
    
    This is the fifteen.js file for Homework #4: Fifteen Puzzle. It is already linked by
    the provided file fifteen.html.
*/

"use strict";
(function() {
    
    let blankX = 4;
    let blankY = 4;
    let SIZE = 4;
    let BOXSIZE = 100;
    
    window.onload = function() {
        createPuzzle();
        $("shufflebutton").onclick = function() {
            shuffle();
        };
        let tiles = qra(".squares");
        for (let i = 0; i <15; i++) {
            tiles[i].onmouseover = function() {
                hoverin(this);
            };
            tiles[i].onmouseout = function() {
                hoverout(this);
            };
            tiles[i].onclick = function() {
                move(this);
            };
        }
        
    };
    
    /*  Takes in one string as the id of the element
        Return the element whose that id
    */
    function $(id) {
        return document.getElementById(id);
    }
    
    /*  Takes in one string as the class of the elements
        Return the array containing all elements that belong to the class in the html file.
    */
    function qra(id) {
        return document.querySelectorAll(id);
    }
    
    /*  Take in two integers representing the SIZE of the puzzle and SIZE of each piece,
        and an array representing the coordinate of the blank piece
        Creates the puzzle with the desired dimensions.
    */
    function createPuzzle() {
        for (let rows = 1; rows <= SIZE; rows++) {
            for (let cols = 1; cols <= SIZE; cols++) {
                if (rows != blankX || cols != blankY) {
                    createDiv(rows, cols);    
                }
            }
        }
    }
    
    /*  Takes in 4 integers representing the coordinate of the current piece, the SIZE
        of the piece and the puzzle.
        Creates the piece of puzzle at the indicated coordinate.
    */
    function createDiv(rows, cols) {
        let div = document.createElement("div");
        div.className = "squares";
        div.id = "pos" + (rows) + (cols);
        div.style.left = BOXSIZE * (cols - 1) + "px";
        div.style.top = BOXSIZE * (rows - 1) + "px";
        div.style.backgroundPosition = (-BOXSIZE * (cols - 1)) + "px " + (-BOXSIZE * (rows - 1)) + "px";
        let p = document.createElement("p");
        p.innerHTML = SIZE * (rows - 1) + cols;
        div.appendChild(p);
        $("puzzlearea").appendChild(div);
    }
    
    /*  Takes in one element representing the current piece that the mouse is hovering on,
        and an array representing the coordinate of the blank piece
        Changes the properties of the piece when the mouse hover on it.
    */
    function hoverin(tile) {
        if (moveable(tile)) {
            tile.classList.add("moveable");
        }
    }
    
    /*  Takes in one element representing the current piece that the mouse is hovering on,
        and an array whose length is 2 representing the coordinate of the blank piece
        Changes the properties of the piece back to normal when the mouse hover out of it.
    */
    function hoverout(tile) {
        tile.classList.remove("moveable");
    }
    
    /*  Takes in an array of the classes of all the fifteen puzzle pieces and an array 
        whose length is 2 representing the coordinate of the blank piece.
        Shuffles the original arrangement into a messy order so that the game can be played.
    */
    function shuffle() {
        for (let i = 0; i < 1000; i++) {
            let neighbor = [];
            let rows = blankX;
            let cols = blankY;
            if (rows + 1 < 5) {
                neighbor.push($("pos" + (rows + 1) + (cols)));
            }
            if (rows - 1 > 0) {
                neighbor.push($("pos" + (rows - 1) + (cols)));
            }
            if (cols + 1 < 5) {
                neighbor.push($("pos" + (rows) + (cols + 1)));
            }
            if (cols - 1 > 0) {
                neighbor.push($("pos" + (rows) + (cols - 1)));
            }
            let rand = Math.floor (Math.random() * neighbor.length);
            move(neighbor[rand]);
        }
    }
   
    /*  Takes in an element representing a puzzle piece, and an array whose 
        length is 2 representing the coordinate of the blank piece.
        Moves the piece into the blank spot if it can be moved.
    */
    function move(tile) {
        if (moveable(tile)) {
            let rows = parseInt(tile.id.charAt(3),10);
            let cols = parseInt(tile.id.charAt(4),10);
            if (rows == blankX) {
                tile.id = "pos" + blankX + blankY;
                let temp = blankY;
                blankY = cols;
                tile.style.left = (temp - 1) * BOXSIZE + "px";
            }else {
                tile.id = "pos" + blankX + blankY;
                let temp = blankX;
                blankX = rows;
                tile.style.top = (temp - 1) * BOXSIZE + "px";
            }
        }
    }
    
    /*  Takes in an element representing a puzzle piece, and an array whose 
        length is 2 representing the coordinate of the blank piece.
        Return true if the piece can be moved into the blank spot
        Return false if the tile cannot be moved.
    */
    function moveable(tile) {
        let rows = parseInt(tile.id.charAt(3),10);
        let cols = parseInt(tile.id.charAt(4),10);
        if (rows == blankX) {
            if (cols + 1 == blankY || cols - 1 == blankY) {
                return true;
            }
        } else if (cols == blankY) {
            if (rows + 1 == blankX || rows - 1 == blankX) {
                return true;
            }
        }
        return false;
    }
})();