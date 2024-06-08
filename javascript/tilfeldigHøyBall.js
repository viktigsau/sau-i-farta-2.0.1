function onClick() {
    try {
        newAmount = window.localStorage.getItem("tilfeldigHøyBall");
    }
    catch {
        newAmount = 0;
    };

    newAmount++;
    document.getElementById("tilfeldigHøyBallText").innerText = newAmount;
    window.localStorage.setItem("tilfeldigHøyBall", newAmount);
};

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("tilfeldigHøyBall").addEventListener("click", onClick);
    try {
        newAmount = window.localStorage.getItem("tilfeldigHøyBall");
    }
    catch {
        newAmount = 0;
    };
    document.getElementById("tilfeldigHøyBallText").innerText = newAmount;
    window.localStorage.setItem("tilfeldigHøyBall", newAmount);
});