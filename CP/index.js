"use strict";
(function() {
    window.onload = function() {
        setInterval(changeColor, 700);
        let check = false;
        $("changeimage").onclick = function() {
            let image = $("image");
            if (!check) {
                image.src = "espeon.gif";
                check = !check;
            }
            else {
                image.src = "penguin.gif";
                check = !check;
            }
        }
        let count = 0;
        $("extra").onclick = function() {
            if (count == 0) {
                let p = document.createElement("p");
                p.innerHTML = "I like videogames - DOTA 2 and Pokemon, sports - Badminton, Swimming, and outdoor activities.";
                $("info").appendChild(p);
                count++;
            }
            else if (count == 1) {
                let p = document.createElement("p");
                p.innerHTML = "I love dogs, and girls of course.";
                $("info").appendChild(p);
                count++;
            }
            else if (count == 2) {
                let p = document.createElement("p");
                p.innerHTML = "That's enough of it. If you want to know more, come talk to me.";
                $("info").appendChild(p);
                let img = document.createElement("img");
                img.src = "enough.jpg";
                img.className = "bonus";
                $("info").appendChild(img);
                count++;
            }
        }
    };
    
    function $(id) {
        return document.getElementById(id);
    }
    
    function qr(id) {
        return document.querySelector(id);
    }
    
    function changeColor() {
        let obj = document.getElementById("portfolio")
        if (obj.className == "aquaText") {
            obj.className = "redText";
        }
        else {
            obj.className = "aquaText";
        }
    }
    
})()