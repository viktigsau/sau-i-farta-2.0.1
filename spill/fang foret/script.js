const miniGame = {
    player: {
        pos: 0,
    },

    food: {
        spawnFood: function(vh, vw) {
            miniGame.ranInterval = Math.floor(Math.random()*(vw*100-vh*10));
            miniGame.food.lastId+=1;
            const id = miniGame.food.lastId;
            miniGame.food.food.push({pos: {x: Math.floor(Math.random()*(vw*100-vh*10)), y: -vh*6}, id: id});
            const food = document.createElement("div");
            food.classList.add("food");
            food.id = id;
            food.style.left = miniGame.food.food[miniGame.food.food.length-1].pos.x + "px";
            document.body.appendChild(food);
        },
        tuchesPlayer: function(vw, vh, id) {
            const playerPos = miniGame.player.pos;
            const foodPosition = miniGame.food.food[id].pos.x - playerPos;
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
        miniGame.tick++;
        const vw = window.innerWidth/100;
        const vh = window.innerHeight/100;

        if (miniGame.tick%(miniGame.diff+miniGame.ranInterval) == 0) {
            miniGame.food.spawnFood(vh, vw);
            miniGame.diff -= Math.floor(1000/miniGame.diff)
            if (miniGame.diff < 200) {miniGame.diff == 100;};
        };

        miniGame.player.pos = miniGame.mouse.x-vh*5
        document.getElementById("player").style.left = (miniGame.player.pos) + "px";

        const idsToremove = [];

        for (let i = 0; i < miniGame.food.food.length; i++) {
            if (miniGame.food.food[i].pos.y > vh*100 && !(miniGame.debug && miniGame.debugLevel == 1)) {
                miniGame.miniGameOver();
            }else if (miniGame.food.food[i].pos.y > vh*100 && miniGame.debug && miniGame.debugLevel == 1) {
                document.getElementById(miniGame.food.food[i].id).remove()
                idsToremove.push(i);
            }else if (miniGame.food.food[i].pos.y > vh*90 && miniGame.food.tuchesPlayer(vw, vh, i)) {
                miniGame.score+=1;
                document.getElementById(miniGame.food.food[i].id).remove()
                idsToremove.push(i);
            }else{
                miniGame.food.food[i].pos.y+=miniGame.food.speed;
                document.getElementById(miniGame.food.food[i].id).style.top = miniGame.food.food[i].pos.y + "px";
            };
        };

        for (let i = 0; i < idsToremove.length; i++) {
            miniGame.food.food.splice(idsToremove[i], 1)
        };

        if (miniGame.debug) {document.getElementById("debug").innerText = "vw: " + vw + ", vh: " + vh + ", tick: " + miniGame.tick + ", foods: " + miniGame.food.food.length + ", score: " + miniGame.score + ", diff: " + miniGame.diff + ", ranInterval: " + miniGame.ranInterval;};
    },

    onLoad: function() {
        const vw = window.innerWidth/100;
        const vh = window.innerHeight/100;
        const varibles = window.location.search.substring(1).split("&");

        document.getElementById("player").style.left = (vw*50-vh*5) + "px";

        if (varibles[0].split("=")[0] == "score") {
            document.getElementById("score").innerText = "din score: " + varibles[0].split("=")[1] + ", high score: " + localStorage.getItem("highScore");
        };

        miniGame.ranInterval = Math.floor(Math.random()*((vw*10+vh*10)/2))

        if (window.location.origin == "https://sauifarta.com") {
            miniGame.debug = false;
            miniGame.debugLevel = 0;
        };

        document.getElementById("startscreen").showModal();
    },

    miniGameOver: function() {
        clearInterval(miniGame.interval);
        if (miniGame.score > localStorage.getItem("highScore")) {localStorage.setItem("highScore", miniGame.score);};
        window.location.search = "?score=" + miniGame.score;
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
        miniGame.diff = document.getElementById("diff").value;
        document.getElementById("startscreen").close();
        miniGame.interval = setInterval(miniGame.onTick, Math.round(1000/miniGame.fps));
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

document.addEventListener("DOMContentLoaded", (event) => {miniGame.onLoad();});
document.addEventListener("mousemove", (event) => {miniGame.mouse.x = event.clientX;});
document.addEventListener("touchmove", (event) => {miniGame.mouse.x = event.touches[0].clientX;});