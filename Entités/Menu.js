// class menu
export default class Menu {
    code_plat;
    nom_plat;
    prix_plat;
    type_plat;
    photo_plat;
    temps_preparation_plat;
    // constructeur de la classe
    constructor(nom, prix, type, temps) {
        this.code_plat = nom;
        this.nom_plat = nom;
        this.prix_plat = prix;
        this.type_plat = type;
        this.temps_preparation_plat = temps;
    }


    // méthode affichant tous les menus stockés dans le localStorage
    voirTousLesMenus() {
        document.getElementById('menus').innerHTML = "";
        const listeMenus = JSON.parse(localStorage.getItem('menus'));
        listeMenus.forEach(menu => {
            const nouveauxInputs = {
                nom: document.createElement("input"),
                prix: document.createElement("input"),
                type: document.createElement("input"),
                temps: document.createElement("input"),
            };
            const nouvelleDivision = document.createElement("div");
            const nouveauxButton = {
                supprimer: document.createElement("input"),
                modifier: document.createElement("input"),
            };

            for (const [key, value] of Object.entries(nouveauxInputs)) {
                value.setAttribute('type', 'text');
                value.setAttribute('id', `${key}menu${menu.nom}`);
                value.style.backgroundColor = "gray";
                value.style.color = "white";

                key === "nom" && value.setAttribute('value', menu.nom);
                key === "prix" && value.setAttribute('value', menu.prix);
                key === "type" && value.setAttribute('value', menu.type);
                key === "temps" && value.setAttribute('value', menu.temps);

                nouvelleDivision.appendChild(value);
                document.getElementById('menus').appendChild(nouvelleDivision);

            }

            for (const [key, value] of Object.entries(nouveauxButton)) {
                value.setAttribute('type', 'button');
                value.setAttribute('class', key);
                value.setAttribute('id', menu.nom);
                value.setAttribute('value', key);

                key === "supprimer" && value.setAttribute('style', "background-color:red;border:1px solid;border-radius:5px;margin:10px;");
                key === "modifier" && value.setAttribute('style', "background-color:yellow;border:1px solid;border-radius:5px;");

                nouvelleDivision.appendChild(value);
            }
        });
    }

    // méthode éditant les informations d'un menu précis
    editer() {
        const listeMenus = JSON.parse(localStorage.getItem('menus'));
        const buttonModifier = document.querySelectorAll('.modifier');

        buttonModifier.forEach(button => {
            button.addEventListener('click', () => { modifierMenu(button.id) });
        });

        function modifierMenu(id) {
            const nouveauxInputs = {
                nom: document.getElementById(`nommenu${id}`),
                prix: document.getElementById(`prixmenu${id}`),
                type: document.getElementById(`typemenu${id}`),
                temps: document.getElementById(`tempsmenu${id}`),
            };
            listeMenus.forEach((menu) => {
                if (menu.nom === id) {
                    menu.nom = nouveauxInputs.nom.value;
                    menu.prix = nouveauxInputs.prix.value;
                    menu.type = nouveauxInputs.type.value;
                    menu.temps = nouveauxInputs.temps.value;
                    let confirmation = confirm(`voulez-vous vraiment modifier le menu ${menu.nom}?`);
                    if (confirmation == true) {
                        localStorage.setItem("menus", JSON.stringify(listeMenus));
                        alert("Modifications faites avec succès");
                    }
                }
            });
        }
    }

    // méthode supprimant un menu bien précis
    supprimer() {
        const listeMenus = JSON.parse(localStorage.getItem('menus'));
        const buttonSupprimer = document.querySelectorAll('.supprimer');

        buttonSupprimer.forEach(button => {
            button.addEventListener('click', () => { supprimerMenu(button.id) });
        });

        function supprimerMenu(id) {
            listeMenus.forEach(menu => {
                const positionMenuDansObject = listeMenus.indexOf(menu);
                if(menu.nom === id){
                    listeMenus.splice(positionMenuDansObject, 1);
                    let confirmation = confirm(`voulez-vous vraiment  supprimer le menu ${menu.nom}?`);
                    if (confirmation == true) {
                        localStorage.setItem("menus", JSON.stringify(listeMenus));
                        document.location = 'Menu.html';
                        alert("Opération effectuée avec succès");
                    }
                }
            });
        }
    }

    // méthode ajoutant un menu
    ajouter() {
        const menu = {
            nom: document.getElementById('nom').value,
            prix: document.getElementById('prix').value,
            type: document.getElementById('type').value,
            temps: document.getElementById('temps').value,
        };
        const table = JSON.parse(localStorage.getItem('menus'));

        if (table == null) {
            localStorage.setItem('menus', JSON.stringify([]));
            const listeMenus = JSON.parse(localStorage.getItem('menus'));
            listeMenus.push(menu);

            if (menu.nom !== "" && menu.prix !== "" && menu.type !== "" && menu.temps !== "") {
                localStorage.setItem("menus", JSON.stringify(listeMenus));
                alert("Ajout effectuer avec succès!");
            } else { alert("Un problème a été rencontré lors de l'ajout"); }

        } else {
            const listeMenus = JSON.parse(localStorage.getItem('menus'));
            listeMenus.push(menu);

            if (menu.nom !== "" && menu.prix !== "" && menu.type !== "" && menu.temps !== "") {
                localStorage.setItem("menus", JSON.stringify(listeMenus));
                alert("Ajout effectuer avec succès!");
            } else { alert("Un problème a été rencontré lors de l'ajout"); }
        }

    }
    // méthode affichant l'image d'un menu
    afficherImageMenu(){
        document.querySelector("#file").addEventListener("change", function(){
            const reader = new FileReader();
            reader.addEventListener("load", ()=>{
            localStorage.setItem("image", reader.result);
            const recentimage = localStorage.getItem("image");
            if(recentimage){
                document.querySelector("#img").setAttribute("src", recentimage);
            }
            });
            reader.readAsDataURL(this.files[0]);
        }); 
        document.addEventListener("DOMContentLoaded",()=>{
            const recentimage = localStorage.getItem("image");
            if(recentimage){
                document.querySelector("#img").setAttribute("src", recentimage);
            }
        });
    }

}

// création et manipulation d'un objet menu
const menu = new Menu(document.getElementById('nom').value,document.getElementById('prix').value,document.getElementById('type').value,document.getElementById('temps').value);

const buttonAjoute = document.getElementById('ajoute');

buttonAjoute.addEventListener('click', ()=>{menu.ajouter();});
menu.voirTousLesMenus();
menu.editer();
menu.supprimer();
menu.afficherImageMenu();

