/*  Name: Phuc H To
    Date: 10/26/2017
    Section: CSE 154 AD
    Assignment: Homework #4: Fifteen Puzzle
    
    This is the fifteen.js file for Homework #4: Fifteen Puzzle. It is already linked by
    the provided file fifteen.html.
*/

"use strict";
(function() {
    window.onload = function() {
        let str = ["one","two","three","four","five","six","seven","eight","nine","ten",
                   "eleven","twelve","thirteen","fourteen","fifteen","sixteen"];
        for (let i = 1; i < 16; i++) {
            let div = document.createElement("div");
            div.className = "squares";
            div.id = str[i-1];
            let p = document.createElement("p");
            p.innerHTML = i;
            div.appendChild(p);
            $("puzzlearea").appendChild(div);
        }
        let blank = [300, 300];
        let tiles = qra(".squares");
        $("shufflebutton").onclick = function() {
            shuffle(blank);
        };
        for (let i = 0; i <15; i++) {
            tiles[i].onmouseover = function() {
                hoverin(this,blank);
            };
            tiles[i].onmouseout = function() {
                hoverout(this,blank);
            };
            tiles[i].onclick = function() {
                move(this,blank);
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
    
    /*  Takes in one element representing the current piece that the mouse is hovering on,
        and an array whose length is 2 representing the coordinate of the blank piece
        Changes the properties of the piece when the mouse hover on it.
    */
    function hoverin(tile,blank) {
        if (moveable(tile,blank)) {
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
    function shuffle(blank) {
        let tiles = qra(".squares");
        for (let i = 0; i < 1000; i++) {
            let neighbor = [];
            let coorX = blank[0];
            let coorY = blank[1];
            if (coorX + 100 < 400) {
                push(neighbor, coorX + 100, coorY, tiles);
            }
            if (coorX - 100 >= 0) {
                push(neighbor, coorX - 100, coorY, tiles);
            }
            if (coorY + 100 < 400) {
                push(neighbor, coorX, coorY + 100, tiles);
            }
            if (coorY - 100 >= 0) {
                push(neighbor, coorX, coorY - 100, tiles);
            }
            let rand = Math.floor (Math.random() * neighbor.length);
            move(neighbor[rand], blank);
        }
    }
    
    /*  Takes in an array of the neighbor of the blank piece found, two integer representing
        the coordinate of the newly found neighbor, and an array of the classes of all the
        fifteen puzzle pieces
        Pushes the newly found neighbor in the the found-neighbor array.
    */
    function push(neighbor, coorX, coorY, tiles) {
        for (let i = 0; i < 15; i++) {
            let left = tiles[i].offsetLeft;
            let top = tiles[i].offsetTop;
            if (left == coorX && top == coorY) {
                neighbor.push(tiles[i]);
                break;
            }
        }
    }
    
    /*  Takes in an element representing a puzzle piece, and an array whose 
        length is 2 representing the coordinate of the blank piece.
        Moves the piece into the blank spot if it can be moved.
    */
    function move(tile, blank) {
        if (moveable(tile, blank)) {
            let left = tile.offsetLeft;
            let top = tile.offsetTop;
            if (left == blank[0]) {
                let temp = blank[1];
                blank[1] = top;
                tile.style.top = temp + "px";
            }else {
                let temp = blank[0];
                blank[0] = left;
                tile.style.left = temp + "px";
            }
        }
    }
    
    /*  Takes in an element representing a puzzle piece, and an array whose 
        length is 2 representing the coordinate of the blank piece.
        Return true if the piece can be moved into the blank spot
        Return false if the tile cannot be moved.
    */
    function moveable(tile, blank) {
        let left = tile.offsetLeft;
        let top = tile.offsetTop;
        if (left == blank[0]) {
            if (top + 100 == blank[1] || top - 100 == blank[1]) {
                return true;
            }
        } else if (top == blank[1]) {
            if (left + 100 == blank[0] || left - 100 == blank[0]) {
                return true;
            }
        }
        return false;
    }
})();