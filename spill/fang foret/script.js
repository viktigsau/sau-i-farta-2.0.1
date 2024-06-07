const game = {
    player: {
        pos: 0,
    },

    food: {
        spawnFood: function(vh, vw) {
            game.ranInterval = Math.floor(Math.random()*(vw*100-vh*10));
            game.food.lastId+=1;
            const id = game.food.lastId;
            game.food.food.push({pos: {x: Math.floor(Math.random()*(vw*100-vh*10)), y: -vh*6}, id: id});
            const food = document.createElement("div");
            food.classList.add("food");
            food.id = id;
            food.style.left = game.food.food[game.food.food.length-1].pos.x + "px";
            document.body.appendChild(food);
        },
        tuchesPlayer: function(vw, vh, id) {
            const playerPos = game.player.pos;
            const foodPosition = game.food.food[id].pos.x - playerPos;
            if (foodPosition < 10*vh && foodPosition > -5*vh) {
                return true;
            };
            return false;
        },
        food: [],
        speed: 1,
        lastId: 0,
    },

    mouse: {
        x: 0,
    },

    onTick: function() {
        game.tick++;
        const vw = window.innerWidth/100;
        const vh = window.innerHeight/100;

        if (game.tick%(game.diff+game.ranInterval) == 0) {
            game.food.spawnFood(vh, vw);
            game.diff -= Math.floor(1000/game.diff)
            if (game.diff < 200) {game.diff == 100;};
        };

        game.player.pos = game.mouse.x-vh*5
        document.getElementById("player").style.left = (game.player.pos) + "px";

        const idsToremove = [];

        for (let i = 0; i < game.food.food.length; i++) {
            if (game.food.food[i].pos.y > vh*100 && !(game.debug && game.debugLevel == 1)) {
                game.gameOver();
            }else if (game.food.food[i].pos.y > vh*100 && game.debug && game.debugLevel == 1) {
                document.getElementById(game.food.food[i].id).remove()
                idsToremove.push(i);
            }else if (game.food.food[i].pos.y > vh*90 && game.food.tuchesPlayer(vw, vh, i)) {
                game.score+=1;
                document.getElementById(game.food.food[i].id).remove()
                idsToremove.push(i);
            }else{
                game.food.food[i].pos.y+=game.food.speed;
                document.getElementById(game.food.food[i].id).style.top = game.food.food[i].pos.y + "px";
            };
        };

        for (let i = 0; i < idsToremove.length; i++) {
            game.food.food.splice(idsToremove[i], 1)
        };

        if (game.debug) {document.getElementById("debug").innerText = "vw: " + vw + ", vh: " + vh + ", tick: " + game.tick + ", foods: " + game.food.food.length + ", score: " + game.score + ", diff: " + game.diff + ", ranInterval: " + game.ranInterval;};
    },

    onLoad: function() {
        const vw = window.innerWidth/100;
        const vh = window.innerHeight/100;
        const varibles = window.location.search.substring(1).split("&");

        document.getElementById("player").style.left = (vw*50-vh*5) + "px";

        if (varibles[0].split("=")[0] == "score") {
            document.getElementById("score").innerText = "din score: " + varibles[0].split("=")[1] + ", high score: " + localStorage.getItem("highScore");
        };

        game.ranInterval = Math.floor(Math.random()*((vw*10+vh*10)/2))

        if (window.location.origin == "https://sauifarta.com") {
            game.debug = false;
            game.debugLevel = 0;
        };

        document.getElementById("startscreen").showModal();
    },

    gameOver: function() {
        clearInterval(game.interval);
        const varibles = window.location.search.substring(1).split("&");
        if (game.score > localStorage.getItem("highScore")) {localStorage.setItem("highScore", game.score);};
        window.location.search = "?score=" + game.score + "&full=" + (window.location.search.substring(1).split("&")[1].split("=")[0] == "full" && varibles[0].split("=")[1] == "true");
    },

    settings: function() {
        document.getElementById("startscreen").close();
        document.getElementById("settings").showModal();
    },

    mainMenu: function() {
        document.getElementById("settings").close();
        document.getElementById("startscreen").showModal();
    },

    start: function() {
        game.diff = document.getElementById("diff").value;
        document.getElementById("startscreen").close();
        game.interval = setInterval(game.onTick, Math.round(1000/game.fps));
    },

    back: function() {
        const varibles = window.location.search.substring(1).split("&");
        value = varibles[1].split("=")[0] == "full" && varibles[1].split("=")[1] == "true";
        if (value) {
            window.location.href = "../../spill.html";
        };
    },

    fps: 1000,
    tick: -1,
    score: 0,
    debug: true,
    debugLevel: 0,
    diff: 500,
    interval: null,
    ranInterval: null,
};

document.addEventListener("DOMContentLoaded", (event) => {game.onLoad();});
document.addEventListener("mousemove", (event) => {game.mouse.x = event.clientX;});
document.addEventListener("touchmove", (event) => {game.mouse.x = event.touches[0].clientX;});