const forventedDato = [20, 4, 2024] //dd, mm, yyyy

function getDays() {
    date = new Date();
    if (date.getFullYear() <= forventedDato[2] && date.getDate() <= forventedDato[0] && date.getMonth() <= forventedDato[1]) {
        document.getElementById("dagertillamming").innerText = "🐑" + (forventedDato[0] - (date.getDate()+1)) + " dager igjen til lamming🐑";
    }else if (date.getFullYear() <= forventedDato[2] && day >= forventedDato[0] && date.getMonth() <= forventedDato[1]) {
        document.getElementById("dagertillamming").innerText = "🐑lamming🐑"
        document.getElementById("disclamer").innerText = "🐑det er lamming!!!!!🐑"
    }
    else{
        document.getElementById("tilLaming").remove()
    }
};