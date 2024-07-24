const events = [
    {ar: 2024, events: [
        {place: "gol bygdemuseum", date: [9, 5]},
        {place: "hallingdal museum", date: [7, 7]},
        {place: "fårefestivalen", date: [21, 8]}
    ]},
    {ar: 2023, events: [
        {place: "gol bygdemuseum", date: [11, 5]},
        {place: "hallingdal museum", date: [5, 6]},
        {place: "hesla gård", date: [2, 2]},
        {place: "fårefestivalen", date: [23, 8]}
    ]}
];

const dates = [
    {no: "januar", en: "January"},
    {no: "februar", en: "February"},
    {no: "mars", en: "March"},
    {no: "april", en: "April"},
    {no: "mai", en: "May"},
    {no: "juni", en: "June"},
    {no: "juli", en: "July"},
    {no: "august", en: "August"},
    {no: "september", en: "September"},
    {no: "oktober", en: "October"},
    {no: "november", en: "November"},
    {no: "desember", en: "December"}
];

function getTotal() {
    let total = 0
    for (let i = 0; i < events.length; i++) {
        for (let j = 0; j < events[i].events.length; j++) {
            total++;
        };
    };
    return total;
};

function render(fillingId) {
    const total = getTotal()
    let id = 0;
    for (let currentAr = 0; currentAr < events.length; currentAr++) {
        ar = document.createElement("div");
        ar.classList.add("ar");
        h1 = document.createElement("h2");
        h1.innerText = events[currentAr].ar;
        ar.appendChild(h1);
        for (let event = 0; event < events[currentAr].events.length; event++) {
            const currentEvent = document.createElement("p");
            currentEvent.innerText = "🐑" + events[currentAr].events[event].place + " " + events[currentAr].events[event].date[0] + "." + dates[events[currentAr].events[event].date[1]].no + "🐑";
            const currentEventLink = document.createElement("a");
            currentEventLink.innerText = "kart";
            currentEventLink.href = "/omevents.html?event=" + (getTotal()-id);
            id++;
            currentEvent.appendChild(currentEventLink);
            ar.appendChild(currentEvent);
        };
        document.getElementById(fillingId).appendChild(ar);
    };
};