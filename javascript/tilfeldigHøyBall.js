function onClick() {
    let newAmount;
    try {
        newAmount = Number(window.localStorage.getItem("tilfeldigHøyBall"));
        if (isNaN(newAmount)) {
            newAmount = 0;
        };
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
});