/*  Name: Phuc H To
    Date: 11/09/2017
    Section: CSE 154 AD
    Assignment: Homework #5: Pokedex
    
    This is the pokedex.js file for Homework #5: Pokedex. It will handle the pokedex
    view of the pokedex page, and the functions when the User wants to play pokemon
    fights with the computer.
*/

"use strict";
/* global fetch*/
(function() {
    let found = ["Bulbasaur", "Charmander", "Squirtle"];
    let opponent;
    
    /*  When the windows load, show the pokedex view. All other actions needs to wait
        after the pokedex finished loading
    */
    window.onload = function() {
        getView();
    };

/*  -----------------------------------------------------------------------------------*/

    /*  @parameter: one string as the id of the element
        Return the element whose that id
    */
    function $(id) {
        return document.getElementById(id);
    }
    
    /*  @parameter: one string as the class of the elements
        Return the first element found in the page that belongs to the class
    */
    function qs(id) {
        return document.querySelector(id);
    }
    
    /*  @parameter: one string as the class of the elements
        Return the array containing all elements that belong to the class in the html file.
    */
    function qsa(id) {
        return document.querySelectorAll(id);
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
    
/*  -----------------------------------------------------------------------------------*/

    /*  Populates the pokedex with only available pokemon's pictures, the rest are sprites
    */
    function getView(){
        let url = "https://webster.cs.washington.edu/pokedex/pokedex.php?pokedex=all";
        fetch(url)
            .then(checkStatus)
            .then(processPokedex)
            .catch(function(error) {
                alert(error);
             });
    }
    
    /*  @parameter: an object containing the name and file names of the picture of the
        corresponding pokemon
        Processes and add pictures (sprites) of pokemon into the pokedex, also enables
        the starter pokemon given
    */
    function processPokedex(responseText) {
        let pokemons = responseText.split("\n");
        let container = $("pokedex-view");
        for (let i = 0; i < pokemons.length; i++) {
            let poke = pokemons[i].split(":");
            let newPoke = document.createElement("img");
            newPoke.src = "sprites/" + poke[1];
            newPoke.className = "sprite unfound";
            newPoke.id = poke[0];
            container.appendChild(newPoke);
        }
        for (let i = 0; i < found.length; i++) {
            let foundPoke = $(found[i]);
            foundPoke.classList.remove("unfound");
            foundPoke.onclick = function() {
                    pickMyPoke(foundPoke.id);
                };
        }
    }
    
/*-------------------------------------------------------------------------------------*/
    
    /*  @parameter: a string representing the name of the chosen pokemon
        Retrieves the information of the chosen pokemon into the user's card
    */
    function pickMyPoke(poke) {
        let url = "https://webster.cs.washington.edu/pokedex/pokedex.php?pokemon=";
        poke = poke.toLowerCase();
        fetch(url + poke)
            .then(checkStatus)
            .then(JSON.parse)
            .then(function(response) {
                addPokeCard(response,0);
            })
            .catch(function(error) {
                alert(error);
             });
        $("start-btn").classList.remove("hidden");
        $("start-btn").onclick = startGame;
    }
    
    /*  @parameter: an object containing the information of the chose pokemon, an
        integer representing the side of that pokemon - 0 to be the user, 1 is the opponent
        Adds the information to the corresponding card
    */
    function addPokeCard(infor, side) {
        qsa(".name")[side].innerHTML = infor.name;
        qsa(".pokepic")[side].src = infor.images.photo;
        qsa(".type")[side].src = infor.images.typeIcon;
        qsa(".weakness")[side].src = infor.images.weaknessIcon;
        qsa(".hp")[side].innerHTML = infor.hp + "HP";
        qsa(".info")[side].innerHTML = infor.info.description;
        let moves = infor.moves;
        let myMoves = qsa(".moves")[side];
        for (let i = 0; i < moves.length; i++) {
            let move = myMoves.children[i];
            move.children[0].innerText = moves[i].name;
            let dmg = moves[i].dp;
            if (!(dmg === undefined || dmg === null)) {
                move.children[1].innerText = dmg + " DP";
            } else {
                 move.children[1].innerText = "";
            }
            move.children[2].src = "icons/" + moves[i].type + ".jpg";
            move.classList.remove("hidden");
        }
        for (let i = moves.length; i < myMoves.childElementCount; i++) {
            myMoves.children[i].classList.add("hidden");
        }
    }
    
/*-------------------------------------------------------------------------------------*/

    /* Starts the fight once the user decide to
    */
    function startGame() {
        toggleView();
        $("title").innerHTML = "Pokemon Battle Mode!";
        $("flee-btn").onclick = function() {
            if ($("endgame").classList.contains("hidden")) {
                makeMove("flee");
            }
        };
        let buff = qsa(".buffs");
        for (let i = 0; i < buff.length; i++) {
            buff[i].classList.remove("hidden");
        }
        pickTheirs(qs(".name").innerHTML);
    }
    
    /*  @parameter: a string containing the name of the user's opponent's pokemon
        Retrives the user's opponent's pokemon information
    */
    function pickTheirs(poke) {
        let url = "https://webster.cs.washington.edu/pokedex/game.php";
        let data = new FormData();
        data.append("startgame",true);
        data.append("mypokemon",poke.toLowerCase());
        fetch(url, {method: "POST", body: data})
            .then(checkStatus)
            .then(JSON.parse)
            .then(function(response) {
                opponent = response;
                addPokeCard(opponent.p2,1);
                playGame();
            })
            .catch(function(error) {
                alert(error);
             });
    }
    
    /*  Lets the game start after the cards are updated
    */
    function playGame() {
        let myMoves = qs(".moves");
        for (let i = 0; i < myMoves.childElementCount; i++) {
            let move = myMoves.children[i];
            move.onclick = function() {
                if ($("pokedex-view").classList.contains("hidden") 
                    && $("endgame").classList.contains("hidden")) {
                    makeMove(move.children[0].innerHTML);
                }
            };
        }
    }
    
    /*  @parameter: a string representing the move that the user make
        Updates what happened when the user's pokemon use the move
    */
    function makeMove(moveName) {
        let url = "https://webster.cs.washington.edu/pokedex/game.php";
        $("loading").classList.remove("hidden");
        let str = moveName.split(" ");
        moveName = "";
        for (let i = 0; i < str.length; i++) {
            moveName += str[i].toLowerCase();
        }
        let data = new FormData();
        data.append("movename",moveName);
        data.append("guid",opponent.guid);
        data.append("pid",opponent.pid);
        fetch(url, {method: "POST", body: data})
            .then(checkStatus)
            .then(JSON.parse)
            .then(result)
            .catch(function(error) {
                alert(error);
             });
    }
    
    /*  @parameter: an object containing the current information of the battle
        Reports the current situation of the battle after the most recent moves
    */
    function result(infor) {
        $("loading").classList.add("hidden");
        updateCard(infor, 0);
        updateCard(infor, 1);
        if (infor.p1["current-hp"] == 0) {
            $("title").innerHTML = "You lost!";
            endGame(infor.p2.name, 0);
        } else if (infor.p2["current-hp"] == 0) {
            $("title").innerHTML = "You won!";
            endGame(infor.p2.name, 1);
        }
    }
    
    /*  @parameter: an object containing the information of the battle, an integer
        representing the side - 0 to be the user and 1 is the user's opponent
        Updates the current state of the pokemons on the corresponding cards
    */
    function updateCard(infor,side) {
        let person = "p" + (side + 1);
        if (!(infor.results[person + "-move"] === "")) {
            $(person + "-turn-results").innerHTML = "Player " + (side + 1) + " played "
                                                    + infor.results[person + "-move"] + " and "
                                                    + infor.results[person + "-result"] + "!";
        } else {
            $(person + "-turn-results").innerHTML = "";
            let parent = $("p2-turn-results").parentNode;
            let breakLine = document.createElement("br");
            parent.insertBefore(breakLine, parent.children[2]);
        }
        let percent = infor[person]["current-hp"]*100.0/infor[person]["hp"];
        qsa(".health-bar")[side].style.width = percent + "%";
        if (percent < 20) {
            qsa(".health-bar")[side].classList.add("low-health");
        }
        qsa(".hp")[side].innerHTML = infor[person]["current-hp"] + "HP";
        resetBuff(side);
        addBuff("buff", infor["p"+ (side + 1)].buffs, side);
        addBuff("debuff", infor["p"+ (side + 1)].debuffs, side);
    }
    
    /*  @parameter: a string representing the status to be added (buff or debuffs), an
        array representing the current buffs/debuffs being applied to the pokemon, an integer
        representing the side - 0 to be the user and 1 is the user's opponent
        Presents the current buff/debuff status of the pokemon
    */
    function addBuff(buff, buffs, side)  {
        for (let i = 0; i < buffs.length; i++) {
            let newBuff = document.createElement("div");
            newBuff.className = buff + " " + buffs[i];
            qsa(".buffs")[side].appendChild(newBuff);
        }
    }
    
    /*  @parameter: an integer representing the side - 0 to be the user and 1 is
        the user's opponent
        Resets the buff status of the pokemon
    */
    function resetBuff(side) {
        let buffDiv = qsa(".buffs")[side];
        while (buffDiv.hasChildNodes()) {
            buffDiv.removeChild(buffDiv.lastChild);
        }
    }
    
    /*  @parameter: a string representing the name of the pokemon the user just
        fought, an integer representing the result - 0 to be a loss and 1 to be
        a victory
        Updates the new pokemon if the user won, and does the post-fight operation
        with the page
    */
    function endGame(newPoke, result) {
        newPoke = $(newPoke);
        if (result == 1 && (newPoke.classList.contains("unfound"))) {
            newPoke.classList.remove("unfound");
            found.push(newPoke.id);
            newPoke.onclick = function() {
                    pickMyPoke(newPoke.id);
                };
        }
        $("endgame").classList.remove("hidden");
        $("endgame").onclick = reset;
    }
    
    /*  Resets everything on the fighting display back to the pokedex display
    */
    function reset() {
        toggleView();
        $("p1-turn-results").innerHTML = "";
        $("p2-turn-results").innerHTML = "";
        let emptyLine = $("p2-turn-results").parentNode.children[2];
        if (emptyLine.tagName === "BR") {
            emptyLine.parentNode.removeChild(emptyLine);
        }
        let health = qsa(".health-bar");
        for (let i = 0; i < health.length; i++) {
            resetBuff(i);
            health[i].classList.remove("low-health");
            health[i].style.width = "100%";
        }
        qsa(".hp")[0].innerHTML = opponent.p1.hp + "HP";
        $("endgame").classList.toggle("hidden"); 
        $("title").innerHTML = "Your Pokedex";
    }
    
    /*  Changes the view between pokedex view and battle mode
    */
    function toggleView() {
        let toggleGroup = [$("pokedex-view"), $("their-card"), qs(".hp-info"),
                           $("results-container"), $("start-btn"), $("flee-btn"),
                           $("p1-turn-results"), $("p2-turn-results")];
        toggleGroup.forEach(function(element) {
            element.classList.toggle("hidden");
        });
    }
})();