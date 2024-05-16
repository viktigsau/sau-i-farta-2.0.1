const game = {
    tick: function() {
        document.getElementById("debug").innerText = "time:" + game.time.time + " frame:" + game.frame;

        if (game.time.time == 0) {
            game.openMinigame();
        };

        if (game.minigameScore) {
            console.log(game.minigameScore);
            game.minigameScore = undefined;
        };

        game.time.update();
        game.frame += 1;
    },

    load: function() {
        game.tickId = setInterval(game.tick,Math.floor(1));
    },

    pause: function() {
        clearInterval(game.tickId);
    },

    openMinigame: function() {
        game.pause();
        
    },

    minigameScore: undefined,
    tickId: null,
    tps: 1000,
    frame: 0,
    time: {
        set: function(time) {
            game.time.time = time;
        },

        add: function(time) {
            game.time.time += time;
        },

        remove: function(time) {
            game.time.time -= time;
        },

        update: function() {
            game.time.time = game.frame/game.time.tpsToTime%24;
        },

        time: 0,
        tpsToTime: 1000,
    },
};

document.addEventListener("DOMContentLoaded", game.load);