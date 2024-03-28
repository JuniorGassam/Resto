// classe table
export default class Table {
    num_table;
    nbre_place;
    forme_table;
    position_table;
    // constructeur de la classe
    constructor(nbre, forme, position) {
        this.nbre_place = nbre;
        this.forme_table = forme;
        this.position_table = position;
    }

    // méthode affichant toutes les tables 
    voirToutesLesTables() {
        document.getElementById('tables').innerHTML = "";
        const listeTables = JSON.parse(localStorage.getItem('tables'));
        listeTables.forEach(table => {
            const nouveauxInputs = {
                numero: document.createElement("input"),
                nombre: document.createElement("input"),
                forme: document.createElement("input"),
                position: document.createElement("input"),
            };
            const nouvelleDivision = document.createElement("div");
            const nouveauxButton = {
                supprimer: document.createElement("input"),
                modifier: document.createElement("input"),
            };

            for (const [key, value] of Object.entries(nouveauxInputs)) {
                value.setAttribute('type', 'text');
                value.setAttribute('id', `${key}table${table.numero}`);
                value.style.backgroundColor = "gray";
                value.style.color = "white";

                key === "numero" && value.setAttribute('value', table.numero);
                key === "numero" && value.setAttribute('disabled', 'disabled');
                key === "nombre" && value.setAttribute('value', table.nombre);
                key === "forme" && value.setAttribute('value', table.forme);
                key === "position" && value.setAttribute('value', table.position);

                nouvelleDivision.appendChild(value);
                document.getElementById('tables').appendChild(nouvelleDivision);

            }

            for (const [key, value] of Object.entries(nouveauxButton)) {
                value.setAttribute('type', 'button');
                value.setAttribute('class', key);
                value.setAttribute('id', table.numero);
                value.setAttribute('value', key);

                key === "supprimer" && value.setAttribute('style', "background-color:red;border:1px solid;border-radius:5px;margin:10px;");
                key === "modifier" && value.setAttribute('style', "background-color:yellow;border:1px solid;border-radius:5px;");

                nouvelleDivision.appendChild(value);
            }
        });
    }

    // méthode éditant une table bien précise
    editer() {
        const listeTables = JSON.parse(localStorage.getItem('tables'));
        const buttonModifier = document.querySelectorAll('.modifier');

        buttonModifier.forEach(button => {
            button.addEventListener('click', () => { modifierTable(button.id) });
        });

        function modifierTable(id) {
            const nouveauxInputs = {
                numero: document.getElementById(`numerotable${id}`),
                nombre: document.getElementById(`nombretable${id}`),
                forme: document.getElementById(`formetable${id}`),
                position: document.getElementById(`positiontable${id}`),
            };
            listeTables.forEach((table) => {
                if (table.numero == id) {
                    table.nombre = nouveauxInputs.nombre.value;
                    table.forme = nouveauxInputs.forme.value;
                    table.position = nouveauxInputs.position.value;
                    let confirmation = confirm(`voulez-vous vraiment modifier la table ${table.numero}?`);
                    if (confirmation == true) {
                        localStorage.setItem("tables", JSON.stringify(listeTables));
                        alert("Modifications faites avec succès");
                    }
                }
            });
        }
    }

    // méthode supprimant une table
    supprimer() {
        const listeTables = JSON.parse(localStorage.getItem('tables'));
        const buttonSupprimer = document.querySelectorAll('.supprimer');

        buttonSupprimer.forEach(button => {
            button.addEventListener('click', () => { suprimerTable(button.id) });
        });

        function suprimerTable(id) {
            listeTables.forEach(table => {
                const positionTableDansObject = listeTables.indexOf(table);
                if(table.numero == id){
                    listeTables.splice(positionTableDansObject, 1);
                    let confirmation = confirm(`voulez-vous vraiment  supprimer la table ${table.numero}?`);
                    if (confirmation == true) {
                        localStorage.setItem("tables", JSON.stringify(listeTables));
                        document.location = 'Table.html';
                        alert("Opération effectuée avec succès");
                    }
                }
            });
        }
    }

    // méthode ajoutant une table
    ajouter() {

        const ListeTables = JSON.parse(localStorage.getItem('tables'));
        if(ListeTables != null){
            let longueur = ListeTables.length;
            if(longueur == 0){
                var num = 0;
            }else{
                var num = ListeTables[longueur-1].numero + 1;
            }
        }

        const table = {
            numero: num,
            nombre: document.getElementById('nombre').value,
            forme: document.getElementById('forme').value,
            position: document.getElementById('position').value,
        };
        

        if (ListeTables == null) {
            localStorage.setItem('tables', JSON.stringify([]));
            const listeTables = JSON.parse(localStorage.getItem('tables'));
            listeTables.push(table);

            if (table.nombre !== "" && table.forme !== "" && table.position !== "") {
                localStorage.setItem("tables", JSON.stringify(listeTables));
                alert("Ajout effectuer avec succès!");
            } else { alert("Un problème a été rencontré lors de l'ajout"); }

        } else {
            const listeTables = JSON.parse(localStorage.getItem('tables'));
            listeTables.push(table);

            if (table.nombre !== "" && table.forme !== "" && table.position !== "") {
                localStorage.setItem("tables", JSON.stringify(listeTables));
                alert("Ajout effectuer avec succès!");
            } else { alert("Un problème a été rencontré lors de l'ajout"); }
        }
    }

}

// création et manipulation d'un objet table
const table = new Table(document.getElementById('nombre').value,document.getElementById('forme').value,document.getElementById('position').value);

const buttonAjouter = document.getElementById('ajouter');

buttonAjouter.addEventListener('click', ()=>{table.ajouter();});
table.voirToutesLesTables();
table.editer();
table.supprimer();