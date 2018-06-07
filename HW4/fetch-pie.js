"use strict";
(function() {
    window.onload = function() {
        $("moar-pie").onclick = function() {
            callAjax;
        }
    }
    
    function $(id) {
        return document.getElementById(id);
    }
    
    function checkStatus(response) {
        if (response.status >= 200 && response.status < 300 || response.status == 0) {
            return response.text();            
        } else {
            return Promise.reject(new Error(response.status + ": " + response.statusText));
        }
    }
    
    function process(response) {
        
    }
    
    function callAjax() {
        $("moar-pie").disabled = true;
        let url = "https://whitakers.pi.es/getPies.php";
        fetch(url)
            .then(checkStatus)
            .then(process)
            .catch(function(error) {
               $("pie-cupboard").innerHTML = "There was an error!";
               alert(error);
               $("moar-pie").disabled = false;
            });
    }
})();