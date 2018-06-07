"use strict";

(function() {
    
    window.onload = function() {
        let tiles = qr(".box");
        for (let i = 0; i < tiles.length; i++) {
            tiles[i].onclick = function() {
                if (tiles[i].classList.contains("filled")) {
                    tiles[i].classList.remove("filled");
                }
                else {
                    tiles[i].classList.add("filled");
                }
            }  
            let boo = false;
            let check = false;
            tiles[i].onmousedown = function() {
                boo = true;
                check = tiles[i].classList.contains("filled");
            }
            tiles[i].onmouseup = function() {
                boo = false;
            }
            if (boo) {
                for (let j = 0; j <tiles.length; j++) {
                    tiles[j].onmouseover = function() {
                        if (check) {
                            if (!tiles[j].classList.contains("filled")) {
                                tiles[j].classList.add("filled");
                            }
                        }
                        else {
                            if (tiles[j].classList.contains("filled")) {
                                tiles[j].classList.remove("filled");
                            }
                        }
                    }
                }
            }
            
        }
        let clear = $("clear");
        clear.onclick = function() {
            let check = confirm("Are you sure you want to clear everything?");
            if (check) {
                let filled = qr(".filled");
                for (let i = 0; i < filled.length; i++) {
                    filled[i].classList.remove("filled");
                }
            }
        }
        
        
    }
    
    function $(id) {
        return document.getElementById(id);
    }
    
    function qr(id) {
        return document.querySelectorAll(id);
    }
    
})();