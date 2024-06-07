function removeUnnesesary() {
    let varibles = window.location.search;
    varibles = varibles.substring(1);
    varibles = varibles.split("&");

    for (let i = 1; i <= getTotal(); i++) {
        if (i != varibles[0].split("=")[1] || varibles[0].split("=")[0] != "event") {
            console.log(i, varibles[0].split("=")[1])
            try{
                document.getElementById(i).remove();
            }catch(error){};
        };
    }; 
};