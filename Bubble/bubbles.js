"use strict";
(function() {
    window.onload = function() {
        let bubbles = document.querySelectorAll(".bubble");
        let parent = document.getElementById("bubble-container");
        
        
        
        for (let i = 0; i < bubbles.length; i++) {
            bubbles[i].onclick = function() {
                bubbles[i].style.display = "none";
                
            }
        }
    };
})(); 