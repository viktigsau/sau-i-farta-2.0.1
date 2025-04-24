const navnognommer = [
    {
        ar: 2025, navnNommer: [
            {navn: "rosenkål", nommer: "55015"}
        ]
    },
    {ar: 2024, navnNommer: [
        {navn:"felix", nommer:"44026"},
        {navn:"finn", nommer:"44034"},
        {navn:"max", nommer:"44032"},
        {navn: "tia", nommer: "44021"},
        {navn: "tassen", nommer: "44046"},
        {navn: "krølle", nommer: "44048"},
        {navn: "nudle", nommer: "44006"},
        {navn: "mallos", nommer: "44005"},
        {navn: "doffen", nommer: "44013"},
        {navn: "jale", nommer: "44010"},
    ]},
    {ar: 2023, navnNommer:[
            {navn: "bob", nommer: "33004"},
            {navn: "stuart", nommer: "33005"},
            {navn: "kevin", nommer: "33014"},
            {navn: "tina", nommer: "33030"},
            {navn: "kyle", nommer: "33032"},
            {navn: "gru", nommer: "33038"},
            {navn: "herb", nommer: "33060"},
            {navn: "walter", nommer: "33050"},
            {navn: "sumo", nommer: "33037"},
            {navn: "walter jr", nommer: "33029"}
    ]} 
];

function get(x) {
    for (let ar = 0; ar < navnognommer.length; ar++) {
        for (let lam = 0; lam < navnognommer[ar].navnNommer.length; lam++) {
            if (navnognommer[ar].navnNommer[lam].navn == x.toLowerCase()) {
                return navnognommer[ar].navnNommer[lam].nommer;
            };
            if (navnognommer[ar].navnNommer[lam].nommer == x) {
                return up(navnognommer[ar].navnNommer[lam].navn)
            };
        };
    };
    return "beklager finner ikke " + x
};

function up(x) {
    return x.charAt(0).toUpperCase() + x.slice(1);
}

function run() {
    document.getElementById("output").innerText = get(document.getElementById("in").value)
}

function render(fillingId) {
    for (let currentAr = 0; currentAr < navnognommer.length; currentAr++) {
        const ar = document.createElement("div");
        ar.classList.add("ar");
        const h1 = document.createElement("h1");
        h1.innerText = navnognommer[currentAr].ar;
        ar.appendChild(h1);
        for (let lamb = 0; lamb < navnognommer[currentAr].navnNommer.length; lamb++) {
            const currentlamb = document.createElement("p");
            currentlamb.innerText = "🐑" + up(navnognommer[currentAr].navnNommer[lamb].navn) + " _ " + navnognommer[currentAr].navnNommer[lamb].nommer + "🐑"
            ar.appendChild(currentlamb);
        };
        document.getElementById(fillingId).appendChild(ar);
    };
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("in").addEventListener("keydown", (event) => {
        if (event.key == "Enter") {
            run();
        };
        console.log(event)
    });
});
