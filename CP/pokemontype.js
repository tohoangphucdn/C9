"use strict";
/* global fetch */ 
(function() {
    window.onload = function() {
        $("pick").onclick = retrieveData;
    };
    
    /*  Takes in one string as the id of the element
        Return the element whose that id
    */
    function $(id) {
        return document.getElementById(id);
    }
    
    function checkStatus(response) {  
        if (response.status >= 200 && response.status < 300) {  
            return response.text();
        } else {  
            return Promise.reject(new Error(response.status+": "+response.statusText)); 
        } 
    }
    
    /*  Fetches the data from the php file created and parse the response to work on.
        Alerts the error if something happens instead of normal fetching
    */
    function retrieveData() {
        let url = "pokemontype.php";
        fetch(url, {credentials: "include"}) // include credentials for cloud9
           .then(checkStatus)
           .then(JSON.parse)
           .then(printOut)
           .catch(function(error) {
               alert(error);
           });
    }
    
    /*  Takes in an object containing the data retrieved from the php file
        Prints out the information collected: The chosen type is good or bad in 
        attacking/defending against specific types
    */
    function printOut(response) {
        let type = $("type").value.toLowerCase();
        $("output").innerHTML = "";
        goodOrBad(type, response[type].attack["attStrong"], 
            response[type].defend["defStrong"].concat(response[type].defend["defImmune"]), 0);
        goodOrBad(type, response[type].attack["attWeak"].concat(response[type].attack["attImmune"]), 
            response[type].defend["defWeak"], 1);
    }
    
    /*  Takes in a string as the pokemon type that the user wants, two arrays representing the type
        when attacking or defending, and an interger representing the status: 0 to be good and 1 to
        be bad
        Prints out the types of pokemon that the chosen type will be good or bad in attacking or 
        defending against
    */
    function goodOrBad(type, att, def, side) {
        let text = $("output");
        if (att.length > 0 || def.length > 0) {
            text.innerHTML += $("type").value;
            if (side == 0) {
                text.innerHTML += " is good in: \n";
            } else {
                text.innerHTML += " is bad in: \n";
            }
            if (att.length > 0) {
                text.innerHTML += "Attacking " + att[0];
                for (let i = 1; i < att.length; i++) {
                    text.innerHTML += ", " + att[i];
                }
                text.innerHTML += "\n";
            }
            if (def.length > 0) {
                 text.innerHTML += "Defending against " + def[0];
                for (let i = 1; i < def.length; i++) {
                    text.innerHTML += ", " + def[i];
                }
                text.innerHTML += "\n";
            }
        }
    }
})();
