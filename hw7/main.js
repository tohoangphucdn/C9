! function() {
    "use strict";

    function e() {
        $("title").innerText = "Game Menu", hide([$("game-view"), $("main-menu-btn")]), hide(this), show($("menu-view"));
        for (var e = document.querySelectorAll(".low-health"), n = 0; n < e.length; n++) e[n].classList.remove("low-health");
        for (var t = $$(".buffs"), n = 0; n < t.length; n++) t[n].innerHTML = "";
        $("p1-turn-results").innerHTML = "", $("p2-turn-results").innerHTML = "", hide($("turn-status-p"))
    }

    function n() {
        ! function() {
            for (var e = $$(".opponent-btn"), n = 0; n < e.length; n++) e[n].onclick = function() {
                hide([$$("#new-game-view .part-ii"), $$("#new-game-view .part-iii")]), this.classList.toggle("chosen-btn");
                for (var n = $$("#new-game-view button"), t = 0; t < n.length; t++) n[t] != this && n[t].classList.remove("chosen-btn");
                for (t = 0; t < e.length; t++)
                    if (e[t] != this)
                        if (this.classList.contains("chosen-btn")) e[t].classList.remove("chosen-btn"), "student" != this.id && hide($("choose-student")), show($$("#new-game-view .part-ii"));
                        else {
                            hide([$$("#new-game-view .part-ii")]), hide([$$("#new-game-view .part-iii")]);
                            for (var n = $$("#new-game-view button"), o = 0; o < n.length; o++) n[o].classList.remove("chosen-btn");
                            show(e[t])
                        }
                "student" == this.id ? (toggleDisplay($("choose-student")), $("choose-student").classList.contains("hidden") || (x = "medskm")) : x = this.id
            }
        }(), $("new-game-btn").onclick = function() {
            y(this.id, "new-game-view"), $("new-game-view").classList.contains("hidden") || $$("#new-game-view .part-0").classList.remove("hidden")
        }, $("choose-pokemon-btn").onclick = function() {
            s("pokedex-view", pid), toggleDisplay($$("#new-game-view .part-iii")), this.classList.toggle("chosen-btn")
        }, $("start-game").onclick = function() {
            "" != L && ("" == x && (x = "-bot-"), $("choose-pokemon-title").innerText = "Choose a Pokemon:", show($$("#new-game-view .part-iii hr")), function(e) {
                if ("" == L) alert("Please select a Pokemon to start a game with.");
                else {
                    var n = new FormData;
                    n.append("opponent", e), n.append("mypokemon", L), n.append("pid", pid), n.append("token", token), postRequest(S + "create-game.php", n, function() {
                        "-bot-" == e || "invite-view" == T().id ? f(JSON.parse(this.responseText)) : (alert("Game invite sent successfully!"), o())
                    })
                }
            }(x))
        }
    }

    function t() {
        x && "-bot-" != x && (hide($$("#new-game-view .part-iii hr")), $("choose-pokemon-title").innerText = "Choose a Pokemon to play with " + x + ":", s("pokedex-view", pid), show([$$("#new-game-view"), $$("#new-game-view .part-iii")]), hide($("invite-view")))
    }

    function o() {
        getRequest(S + "list-games.php", creds(), u)
    }

    function s(e, n) {
        var t = n == pid;
        getRequest(S + "users.php", "?mode=pokemon&pid=" + n, function() {
            var n = JSON.parse(this.responseText);
            ! function(e, n) {
                var t = $(e);
                ! function(e) {
                    for (var n = $(e).querySelectorAll(".sprite"), t = 0; t < n.length; t++) n[t].classList.add("unfound"), n[t].onclick = ""
                }(e);
                for (var o = 0; o < n.length; o++) {
                    var s = t.querySelector("img[pokemon='" + escSpChar(n[o]) + "']");
                    s && (s.classList.remove("unfound"), s.onclick = "pokedex-view" == e ? g : c)
                }
            }(e, n), t && fetchMyPokemon()
        })
    }

    function i() {
        var e = S + "list-trades.php";
        getRequest(e, creds(), a)
    }

    function r(e, n) {
        getRequest(S + "trade-info.php", creds() + "&trade_id=" + e, function() {
            ! function(e, n) {
                var t = gen("tr");
                t.id = e.id;
                var o = genText("td", e.offeree),
                    s = gen("td"),
                    i = genText("p", e.requested_pokemon),
                    r = genText("p", e.offered_pokemon),
                    a = $$("#pokedex-view .sprite[pokemon='" + e.requested_pokemon + "']").cloneNode();
                s.appendChild(i), i.appendChild(a);
                var p = gen("td"),
                    l = $$("#pokedex-view .sprite[pokemon='" + e.offered_pokemon + "']").cloneNode();
                l.classList.remove("unfound"), p.appendChild(r), r.appendChild(l);
                var c = genText("td", e.created),
                    u = gen("td");
                if (appendChildren(t, [o, p, s, c]), "to-me" == n) {
                    var h = gen("button", "small-btn");
                    h.innerText = "Accept";
                    var m = gen("button", "small-btn");
                    m.innerText = "Reject", appendChildren(u, [h, m])
                } else {
                    var $ = gen("button", "small-btn");
                    $.innerText = "Cancel Request", u.appendChild($), $.onclick = d
                }
                t.appendChild(u), $$("#" + n + " .results-table tbody").appendChild(t)
            }(JSON.parse(this.responseText), n)
        })
    }

    function a() {
        var e = JSON.parse(this.responseText);
        0 == e.offers_from_me.length ? ($("trade-message").innerHTML = "There are no trades currently offered to you.", show($("trade-message"))) : function(e) {
            var n = "<tr><th>Player</th><th>Offer</th><th>Request</th><th>Date</th></tr>",
                t = e.offers_to_me;
            t.length > 0 ? $$("#to-you .results-table").innerHTML = n : $$("#to-you .results-table").innerHTML = "<p>You do not have any proposals to accept or decline.</p>";
            for (s = 0; s < t.length; s++) {
                r(i = t[s], "to-me")
            }
            var o = e.offers_from_me;
            o.length > 0 ? $$("#by-you .results-table").innerHTML = n : $$("#by-you .results-table").innerHTML = "<p>You do not have any proposals waiting to be accepted or declined by other players.</p>";
            for (var s = 0; s < o.length; s++) {
                var i = o[s];
                r(i, "by-you")
            }
            hide($("trade-message")), show([$("by-you"), $("to-you"), $$("#by-you .results-table"), $$("#to-you .results-table")])
        }(e)
    }

    function p() {
        for (var e = JSON.parse(this.responseText), n = $("users"), t = 0; t < e.length; t++)
            if (e[t] != pid) {
                var o = document.createElement("option");
                o.value = e[t], o.innerText = e[t], n.appendChild(o);
                var s = document.createElement("option");
                s.value = e[t], s.innerText = e[t], $("opps").appendChild(s)
            }
        $("opps").value = "whitab", $("users").value = "whitab", $("opps").onchange = function() {
            x = this.value, show($("choose-pokemon-btn")), show($("start-game"))
        }
    }

    function d() {
        if (confirm("Are you sure you want to cancel this trade?")) {
            var e = this.parentNode.parentNode.id,
                n = new FormData;
            n.append("pid", pid), n.append("token", token), n.append("pokemon", this.parentNode.parentNode.querySelectorAll("td")[2].innerText.trim()), n.append("tradeid", e), postRequest(S + "cancel-trade.php", n, function() {
                alert("Trade successfully canceled"), i()
            })
        }
    }

    function l() {
        var e = $("offer").innerText,
            n = $("request").innerText;
        if ("" != e && "" != n) {
            var t = new FormData;
            t.append("pid", pid), t.append("pid2", $("users").value), t.append("token", token), t.append("pokemon", e), t.append("pokemon2", n), postRequest(S + "offer-trade.php", t, function() {
                alert("Proposal successful!")
            })
        } else alert("Please select a Pokemon to offer and request from the displayed Pokedex views.")
    }

    function c() {
        this.parentNode.parentNode.querySelector("h2 span") ? this.parentNode.parentNode.querySelector("h2 span").innerText = this.getAttribute("pokemon") : (L = this.getAttribute("pokemon"), populateCard("choose-pokemon-card"), show($("start-game")))
    }

    function u() {
        var e = JSON.parse(this.responseText);
        if (e.offered_by_me || e.offered_to_me || e.in_progress) {
            $("games-table").innerHTML = "<tr><th>Other Player</th></tr>", e.offered_by_me && m("Pending", "cancel", e.offered_by_me), e.offered_to_me && m("Pending", "accept", e.offered_to_me), e.in_progress && m("current", "join", e.in_progress)
        } else $$("#invite-results h3").innerHTML = "You currently have no games in progress or pending.";
        y("invite-btn", "invite-view")
    }

    function h() {
        for (var e = this.response.split("\n"), n = 0; n < e.length - 1; n++) {
            var t = e[n].split(":"),
                o = t[0],
                s = t[1],
                i = gen("img", ["sprite", "unfound"]);
            i.src = C + "sprites/" + s, i.setAttribute("pokemon", o), $("my-pokemon").appendChild(i), $("their-pokemon").appendChild(i.cloneNode()), $("pokedex-view").appendChild(i.cloneNode())
        }
    }

    function m(e, n, o) {
        for (var s = 0; s < o.length; s++) {
            var i = o[s][0],
                r = o[s][1];
            r == pid && (r = o[s][2]), r || (r = "(random)");
            var a = genText("td", r),
                p = gen("td"),
                d = gen("button", ["small-btn"]);
            if ("accept" == n) d.innerText = "Accept Invite", d.onclick = function() {
                x = this.parentNode.parentNode.querySelector("td").innerText, hide($("opponent-btns")), t()
            }, p.appendChild(d);
            else if ("join" == n) d.innerText = "Continue Game", p.appendChild(d), d.onclick = function() {
                ! function(e) {
                    q = e, getRequest(S + "game-info.php", creds() + "&guid=" + e, function() {
                        f(JSON.parse(this.responseText))
                    })
                }(this.parentNode.parentNode.id)
            };
            else if ("cancel" == n) {
                var l = genText("span", "Invite Pending");
                p.appendChild(l)
            }
            var c = gen("tr");
            c.id = i, appendChildren(c, [a, p]), $("games-table").appendChild(c)
        }
        show($("games-table"))
    }

    function f(e) {
        var n = e;
        n.warning ? console.log(n.warning) : (! function(e) {
            var n = e.pid1,
                t = e.pid2,
                o = n == pid ? t : n,
                s = e.players[pid],
                i = e.players[o],
                r = e[s],
                a = e[i];
            "-bot-" != o && (s == e.turn ? $("turn-status").innerText = "It's your turn!" : $("turn-status").innerText = "Waiting for " + o + " to make a move...", show($("turn-status-p")));
            v("my-card", r), v("their-card", a), w("my-card", r), w("their-card", a)
        }(n), q = n.guid, $("title").innerText = "Pokemon Battle Mode!", function() {
            for (var e = $$(".opponent-btn"), n = 0; n < e.length; n++) e[n].classList.remove("chosen-btn"), e[n].classList.remove("hidden");
            e = $$(".menu-btn");
            for (n = 0; n < e.length; n++) e[n].classList.remove("chosen-btn")
        }(), b(), hide([$("menu-view"), $("start-game")]), show([$("game-view"), $("main-menu-btn"), $("results-container")]))
    }

    function v(e, n) {
        e = "#" + e, $$(e + " .name").innerHTML = n.name, $$(e + " .pokepic").src = C + n.images.photo, $$(e + " .weakness").src = C + n.images.weaknessIcon, $$(e + " .type").src = C + n.images.typeIcon, $$(e + " .info").innerHTML = n.info.description, $$(e + " .hp").innerHTML = n.hp + "HP";
        for (var t = n.moves, o = $$(e + " .moves button"), s = 0; s < t.length; s++) {
            t[s].name;
            var i = o[s];
            i.classList.contains("hidden") && i.classList.remove("hidden");
            i.children[0].innerText = t[s].name;
            i.children[2].src = C + "icons/" + t[s].type + ".jpg";
            var r = i.children[1];
            if (t[s].dp ? r.innerText = t[s].dp + " DP" : r.innerText = "", "#chosen-card" == e) {
                var a = function(e) {
                    e = e.toLowerCase();
                    for (var n = myPokemon.pokemon, t = 0; t < n.length; t++) {
                        var o = n[t].name.toLowerCase();
                        if (o == e && o.toUpperCase() != n[t].nickname) return n[t].nickname
                    }
                    return null
                }(n.name);
                a && ($$("#chosen-card h2.name").innerText = n.name + " (" + a + ")"), i.disabled = !1, i.onclick = function() {
                    ! function(e) {
                        $("p1-turn-results").innerHTML = "", $("p2-turn-results").innerHTML = "", show($("loading")), e = e.toLowerCase();
                        var n = new FormData;
                        n.append("move", e), n.append("guid", q), n.append("pid", pid), n.append("token", token);
                        var t = new XMLHttpRequest;
                        t.onreadystatechange = function(e) {
                            if (4 === t.readyState)
                                if (200 === t.status) ! function(e) {
                                    var n = e.pid1,
                                        t = e.pid2,
                                        o = n == pid ? t : n,
                                        s = e.players[pid],
                                        i = e.players[o],
                                        r = e[s],
                                        a = e[i];
                                    "-bot-" != o ? (s == e.turn ? $("turn-status").innerText = "It's your turn!" : $("turn-status").innerText = "Waiting for " + o + " to make a move...", show($("turn-status-p"))) : o = a.name;
                                    w("my-card", r), w("their-card", a);
                                    var p = e.results,
                                        d = p["p1-result"],
                                        l = p["p2-result"],
                                        c = "p1" == s;
                                    if ("" != e.turn) {
                                        if (l) {
                                            var u = c ? o : "You";
                                            "p2" == e.turn ? $("p1-turn-results").innerHTML = u + " played " + p["p2-move"] + " and " + l + "!" : $("p2-turn-results").innerHTML = u + " played " + p["p2-move"] + " and " + l + "!"
                                        }
                                        if (d) {
                                            var h = c ? "You" : o;
                                            "p2" == e.turn ? $("p2-turn-results").innerHTML = h + " played " + p["p1-move"] + " and " + d + "!" : $("p1-turn-results").innerHTML = h + " played " + p["p1-move"] + " and " + d + "!"
                                        }
                                    } else {
                                        if (0 == a["current-hp"]) {
                                            var m = c ? p["p1-move"] : p["p2-move"],
                                                f = c ? d : l;
                                            $("p1-turn-results").innerHTML = "You played " + m + " and " + f + "!"
                                        } else {
                                            var v = c ? p["p2-move"] : p["p1-move"],
                                                g = c ? l : d;
                                            $("p1-turn-results").innerHTML = o + " played " + v + " and " + g + "!"
                                        }
                                    }
                                    hide($("loading")), show([$("p1-turn-results"), $("p2-turn-results")])
                                }(JSON.parse(this.responseText));
                                else if (201 === t.status) {
                                var n = JSON.parse(t.statusText).warning;
                                console.log(n), $("turn-status").innerText = "It's not your turn!", show($("turn-status-p")), hide($("loading"))
                            }
                        }, t.open("POST", S + "move.php"), t.send(n)
                    }(this.children[0].innerText)
                }
            }
        }
        for (; s < 4;) o[s].classList.add("hidden"), s++
    }

    function g() {
        $("start-game").classList.contains("hidden") && $("start-game").classList.remove("hidden");
        var e = this.getAttribute("pokemon");
        "" != e && (L = e, getRequest(S + "pokedex.php", "?pokemon=" + e, function() {
            var e = JSON.parse(this.responseText);
            v("chosen-card", e), v("my-card", e)
        }))
    }

    function w(e, n) {
        if (!n.error) {
            var t = $(e);
            t.querySelector(".hp").innerText = n["current-hp"] + "HP", t.querySelector(".buffs").innerHTML = "",
                function(e, n, t) {
                    for (var o = 0; o < n.length + t.length; o++) {
                        var s = o < n.length ? n[o] : t[o],
                            i = document.createElement("div");
                        i.className = o < n.length ? "buff" : "debuff", i.classList.add(s), e.appendChild(i)
                    }
                }($$("#" + e + " .buffs"), n.buffs, n.debuffs);
            var o = 1 * n["current-hp"] / n.hp;
            if (t.querySelector(".health-bar").style.width = 100 * o + "%", "my-card" == e) 0 == o ? k(!1) : o <= .2 && t.querySelector(".health-bar").classList.add("low-health");
            else if ("their-card" == e)
                if (0 == o) {
                    k(!0);
                    n.images.photo;
                    var i = n.name,
                        r = $("my-pokemon").querySelector(".sprite[pokemon=" + escSpChar(i) + "]");
                    r && r.classList.contains("unfound") && function(e) {
                        var n = "";
                        confirm("You've won " + e + "! Give it a nickname?") && (n = prompt("Nickname to give your" + e + ":"));
                        var t = "Calling insert.php with name=" + e,
                            o = new FormData;
                        o.append("name", e), "" != n ? (o.append("nickname", n), t += " and nickname=" + n) : t += " and no nickname";
                        console.log(t), postRequest("insert.php", o, function() {
                            var t = "" != n ? n : e;
                            alert("Success! You have added " + t + " to your Pokedex!"), s("pokedex-view", pid), s("my-pokemon", pid)
                        })
                    }(i)
                } else o <= .2 && t.querySelector(".health-bar").classList.add("low-health")
        }
        hide($("loading"))
    }

    function k(e) {
        var n = $("my-card").querySelectorAll(".moves button");
        hide($("turn-status-p"));
        for (var t = 0; t < n.length; t++) n[t].disabled = !0;
        $("title").innerHTML = "You " + (e ? "won!" : "lost!"), show([$("results-container"), $("endgame")])
    }

    function b() {
        var e = T();
        e && e.classList.remove(".current-view");
        for (var n = document.querySelectorAll(".sub-menu"), t = 0; t < n.length; t++) hide(n[t])
    }

    function y(e, n) {
        if (hide($$("#new-game-view .part-iii")), $(e).classList.contains("chosen-btn")) $(e).classList.remove("chosen-btn"), b();
        else {
            for (var t = document.querySelectorAll(".sub-menu"), o = document.querySelectorAll(".chosen-btn"), s = 0; s < o.length; s++) o[s] != e && o[s].classList.remove("chosen-btn");
            if ($(e).classList.add("chosen-btn"), $(n).classList.contains("hidden"))
                for (s = 0; s < t.length; s++) t[s] != $(n) ? (hide(t[s]), t[s].classList.remove("current-view")) : (show(t[s]), t[s].classList.add("current-view"), "trade-view" === n && (hide($("new-proposal-view")), hide($("current-proposals-view"))))
        }
    }

    function T() {
        return document.querySelector(".current-view")
    }
    var L = "",
        x = "",
        q = "",
        S = "https://webster.cs.washington.edu/pokedex-2/17au/",
        C = "https://webster.cs.washington.edu/pokedex/";
    window.onload = function() {
        fetchPid(), getRequest(S + "pokedex.php", "?pokedex=all", h), getRequest(S + "list-users.php", "", p), n(), $("invite-btn").onclick = function() {
            o()
        }, $("trade-btn").onclick = function() {
            y(this.id, "trade-view"), hide($("current-proposals-view")), hide($("new-proposal-view"))
        }, $("propose").onclick = function() {
            this.classList.toggle("chosen-btn"), this.classList.contains("chosen-btn") && $("view-proposals").classList.remove("chosen-btn"), hide($("current-proposals-view")), toggleDisplay($("new-proposal-view")), $("new-proposal-view").classList.contains("hidden") && (show($("show-p2-dex")), hide($("pokedices")))
        }, $("propose-submit").onclick = l, $("view-proposals").onclick = function() {
            toggleDisplay($("current-proposals-view")), this.classList.toggle("chosen-btn"), hide($("new-proposal-view")), this.classList.contains("chosen-btn") && ($("propose").classList.remove("chosen-btn"), i())
        }, $("show-p2-dex").onclick = function() {
            show([$$("#new-proposal-view .part-iv"), $("pokedices")]), this.classList.add("hidden"), s("my-pokemon", pid), s("their-pokemon", $("users").value)
        }, $("users").onchange = function() {
            s("my-pokemon", pid), s("their-pokemon", $("users").value)
        }, $("main-menu-btn").onclick = e, $("endgame").onclick = e, $("restart-btn").onclick = function() {
            confirm("Are you sure you want to remove all Pokemon from your Pokedex and start with three new random Pokemon?") && getDex(pid, token, !0)
        }
    }
}();