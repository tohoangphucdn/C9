"use strict";
(function() {
   
    let i = 0;
    let str = null;
    let run = null;
    let punct = false;
    
    window.onload = function() {
        
        $("med").onclick = function() {
            $("med").checked=true;
            $("big").checked=false;
            $("bigger").checked=false;
        };
        $("big").onclick = function() {
            $("big").checked=true;
            $("med").checked=false;
            $("bigger").checked=false;
        };
        $("bigger").onclick = function() {
            $("bigger").checked = true;
            $("med").checked=false;
            $("big").checked=false;
        };
        $("stop").disabled = true; 
        
        $("start").onclick = function() {
            $("stop").className = "";
            $("start").className = "graybutton";
            $("start").disabled = true; 
            $("stop").disabled = false; 
            i = 0;
            str = $("input").value.split(" ");
            run = setInterval(runtime, speedChange());
            $("speed").onchange = function() {
                clearInterval(run);
                run = setInterval(runtime, speedChange());
            };
        };
    };
    
    /*  Do the operation with frame index i, and point to the next frame
    */
    function runtime() {
        if (i > 0 || (i = 0 && punct)) {
            remove();
        }
        while (str[i] == "") {
            i++;
        }
        if (i < str.length) {
            print(str,i);
            if (!punct) {
                i++;
            }
        }
        if (i == (str.length)) {
            setTimeout(remove,speedChange());
            clearInterval(run);
            buttons();
        }
        $("stop").onclick = function() {
            remove();
            clearInterval(run);
            buttons();
        };
    }
    
    /*  Takes in one string as the id of the element
        Return the element whose that id
    */
    function $(id) {
        return document.getElementById(id);
    }
    
    /* Return the current speed of the frames
    */
    function speedChange() {
        return parseInt($("speed").value,10);
    }
    
    /*  Activate stop button and deactivate the start button
    */
    function buttons() {
        $("start").className = "";
        $("stop").className = "graybutton";
        $("stop").disabled = true; 
        $("start").disabled = false;
    }
    
    /*  Takes in a list of strings representing the frames to print out and an
        integer representing the index of the current frame
        Determine if the frame ends with punctuations and also print it out
    */
    function print(str, i) {
        let p = document.createElement("p");
        let tempStr = str[i];
        let lastChar = tempStr.charAt(tempStr.length - 1);
        if (lastChar == ',' || lastChar == '.' || lastChar == '!' ||
            lastChar == '?' || lastChar == ';' || lastChar == ':') {
            tempStr = tempStr.substring(0,tempStr.length - 1);
            punct = !punct;
        }
        p.innerHTML += tempStr;
        p.className = "word";
        if ($("med").checked) {
            p.classList.add("medium");
        }
        if ($("big").checked) {
            p.classList.add("bigfont");
        }
        if ($("bigger").checked) {
            p.classList.add("biggerfont");
        }
        $("bodydiv").appendChild(p);
    }
    
    /*  Remove the frame from the page
    */
    function remove() {
        let p = document.querySelector(".word");
        if (p !== null) {
            p.parentNode.removeChild(p);
        }
    }
})();