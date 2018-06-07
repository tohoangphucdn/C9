"use strict";
(function() {
    
    let run = null;
    
    window.onload = function() {
        let cookie = document.getElementById("cookie-header");
        cookie.style.color = "#f7f16d";
        let run = setInterval(removing,30000);
    }
    
    function removing() {
        let cookiecount = document.querySelectorAll(".cookie");
        let number = cookiecount.length;
        let count = document.getElementById("cookie-count");
        if (count == null)         {
            clearInterval(run);
        } else {
            cookiecount[0].parentNode.removeChild(cookiecount[number - 1]);
            count.innerHTML= number + "! There are " + number + " cookie(s) in the cookie jar!";
        }
    }
})();