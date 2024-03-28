// récupération des informations stockées dans le localStorage 
const commandes = JSON.parse(localStorage.getItem("commandes"));
const employes = JSON.parse(localStorage.getItem("employes"));
const menus = JSON.parse(localStorage.getItem("menus"));
const tables = JSON.parse(localStorage.getItem("tables"));

// initialisation de la page Dashboard avec les informations telles que le nombre total de menus, de commandes...etc
if (menus) {
    const totalMenus = menus.length;
    document.getElementById('menus').innerHTML = totalMenus;
}

if (commandes) {
    const totalCommandes = commandes.length;
    document.getElementById('commandes').innerHTML = totalCommandes;


    var prixTotal = 0;
    commandes.forEach(commande => {
        prixTotal = prixTotal + commande.prix;
    });
    document.getElementById('montant').innerHTML = `${prixTotal} Fcfa`;
}

if (employes) {
    const totalEmployes = employes.length;
    document.getElementById('employes').innerHTML = totalEmployes;
}

if (tables && commandes) {
    const totalTables = tables.length;
    tables.forEach(table => {
        const cardTable = {
            cardTitle: document.createElement("input"),
            cardText: document.createElement("input"),
        }

        const divCard = document.createElement("div");
        const divHeader = document.createElement("input");
        const divBody = document.createElement("div");
        const divFooter = document.createElement("input");

        for (const [key, value] of Object.entries(cardTable)) {
            if (key == "cardTitle") {
                value.setAttribute('value', `Forme: ${table.forme}`);
                value.setAttribute('class', "card-title");
                value.setAttribute('style', "border:none;padding-left:100px;font-weight:600;font-size:20px;");
                value.setAttribute('disabled', "disabled");
            }
            if (key == "cardText") {
                commandes.forEach(commande => {
                    if (table.numero == commande.table) {
                        var nombre = commande.nbrePersonne;
                        value.setAttribute('value', `Places:  ${nombre}/${table.nombre}`);
                    } else {
                        value.setAttribute('value', `Places:  0/${table.nombre}`);
                    }
                });
                value.setAttribute('class', "card-text");
                value.setAttribute('style', "border:none;font-weight:600;font-size:20px;");
                value.setAttribute('disabled', "disabled");
            }

            divCard.setAttribute('class', "card-header");
            divCard.setAttribute('style', "margin:10px;");
            divCard.setAttribute('class', "card text-center");
            divHeader.setAttribute('value', `Table N* ${table.numero}`);
            divHeader.setAttribute('style', "text-align:center");
            divHeader.setAttribute('disabled', "disabled");
            divBody.setAttribute('class', "card-body")
            divBody.setAttribute('disabled', "disabled");
            divFooter.setAttribute('class', "card-footer text-muted");
            divFooter.setAttribute('disabled', "disabled");


            divBody.appendChild(value);
            divCard.appendChild(divHeader);
            divCard.appendChild(divBody);
            divCard.appendChild(divFooter);
            document.getElementById('tables').appendChild(divCard);
        }
    });
}