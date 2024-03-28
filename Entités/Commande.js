//  création de la classe "commande"
export default class Commande {
    total_commandes = 0;
    num_commande;
    num_table;
    nbre_personne;
    prix_total;
    contenu;
// constructeur de la classe
    constructor(numTable, nbrePersonne) {
        this.num_commande = this.total_commandes;
        this.num_table = numTable;
        this.nbre_personne = nbrePersonne;
        this.total_commandes += 1;
    }

    // méthode permettant d'afficher toutes les commandes
    voirToutesLesCommandes() {
        document.getElementById('commandes').innerHTML = "";
        const listeCommandes = JSON.parse(localStorage.getItem('commandes'));
        // création des input et insertions des informations sur les commandes stockées dans le localStorage
        listeCommandes.forEach(commande => {
            const nouveauxInputs = {
                numero: document.createElement("input"),
                table: document.createElement("input"),
                nbrePersonne: document.createElement("input"),
                prix: document.createElement("input"),
                quantite: document.createElement("input"),
                menu: document.createElement("input"),
            };
            const nouvelleDivision = document.createElement("div");
            // création du button supprimer permettant de supprimer une commande
            const nouveauxButton = {
                supprimer: document.createElement("input"),
            };
            // remplissage des inputs créer avec les données des commandes
            for (const [key, value] of Object.entries(nouveauxInputs)) {
                value.setAttribute('type', 'text');
                value.setAttribute('id', `${key}commande${commande.numero}`);
                value.setAttribute('disabled', 'disabled');
                value.style.backgroundColor = "gray";
                value.style.color = "white";

                key === "numero" && value.setAttribute('value', commande.numero);
                key === "table" && value.setAttribute('value', commande.table);
                key === "nbrePersonne" && value.setAttribute('value', commande.nbrePersonne);
                key === "prix" && value.setAttribute('value', commande.prix);
                key === "quantite" && value.setAttribute('value', commande.contenu.quantite);
                key === "menu" && value.setAttribute('value', commande.contenu.menu);

                // ajout des inputs dans la nouvelle division 
                nouvelleDivision.appendChild(value);
                // ajout de la nouvelle division dans notre page "Commande.html"
                document.getElementById('commandes').appendChild(nouvelleDivision);

            }

            for (const [key, value] of Object.entries(nouveauxButton)) {
                value.setAttribute('type', 'button');
                value.setAttribute('class', key);
                value.setAttribute('id', commande.numero);
                value.setAttribute('value', key);

                key === "supprimer" && value.setAttribute('style', "background-color:red;border:1px solid;border-radius:5px;margin:10px;");
                // ajout du button supprimer dans la nouvelle division créer plus haut
                nouvelleDivision.appendChild(value);
            }
        });
    }

    // méthode permettant de supprimer un commande
    supprimer() {
        const listeCommandes = JSON.parse(localStorage.getItem('commandes'));
        const buttonSupprimer = document.querySelectorAll('.supprimer');

        buttonSupprimer.forEach(button => {
            button.addEventListener('click', () => { suprimerCommande(button.id) });
        });

        function suprimerCommande(id) {
            // parcourt de la liste de commande et vérification du numéro de commande de chaque commande si il correspond à i' id passé en parametre de la fonction supprimerCommande
            listeCommandes.forEach(commande => {
                const positionCommandeDansObject = listeCommandes.indexOf(table);
                if (commande.numero == id) {
                    listeCommandes.splice(positionCommandeDansObject, 1);
                    // prompt de confirmation
                    let confirmation = confirm(`voulez-vous vraiment  supprimer la commande ${commande.numero}?`);
                    if (confirmation == true) {
                        localStorage.setItem("commandes", JSON.stringify(listeCommandes));
                        document.location = 'Commande.html';
                        alert("Opération effectuée avec succès");
                    }
                }
            });
        }
    }

    // méthode permettant d'ajouter une commande
    ajouter(){
        var listeCommandes = JSON.parse(localStorage.getItem('commandes'));
        // vérification si une commande existe déja
        if (listeCommandes == null) {
            listeCommandes = [];
        }
        let longueur = listeCommandes.length;

        if (longueur == 0) {
            var num = 0;
        } else {
            var num = listeCommandes[longueur - 1].numero + 1;
        }

        let menubase = document.getElementById('menu').value;
        const menus = JSON.parse(localStorage.getItem('menus'));

        // calcul du prix total
        var prix;
        menus.forEach(menu => {
            if (menu.nom == menubase) {
                prix = menu.prix;
            }
        });

        if (prix) {
            const commande = {
                numero: num,
                table: document.getElementById('table').value,
                nbrePersonne: document.getElementById('nbrePersonne').value,
                prix: prix * document.getElementById('quantite').value,
                contenu: {
                    quantite: document.getElementById('quantite').value,
                    menu: document.getElementById('menu').value,
                },
            };

            if (longueur == 0) {
                localStorage.setItem('commandes', JSON.stringify([]));
                const listeCommandes = JSON.parse(localStorage.getItem('commandes'));
                listeCommandes.push(commande);

                if (commande.nombre !== "" && commande.forme !== "" && commande.position !== "") {
                    localStorage.setItem("commandes", JSON.stringify(listeCommandes));
                    alert("Ajout effectuer avec succès!");
                } else { alert("Veuillez renseigner tous les champs"); }

            } else {
                const listeCommandes = JSON.parse(localStorage.getItem('commandes'));
                listeCommandes.push(commande);

                if (commande.nombre !== "" && commande.forme !== "" && commande.position !== "") {
                    // ajout de la commande dans le localStorage
                    localStorage.setItem("commandes", JSON.stringify(listeCommandes));
                    alert("Ajout effectuer avec succès!");
                } else { alert("Veuillez renseigner tous les champs"); }
            }
        }else{
             alert("Désolé, ce menu n'est pas proposé par notre restaurant");
        }
    }

}

// création et manipulation d'un objet commande
const commande = new Commande(document.getElementById('table').value, document.getElementById('nbrePersonne').value);

const buttonAjouter = document.getElementById('ajouter');

buttonAjouter.addEventListener('click', () => {commande.ajouter();});
commande.voirToutesLesCommandes();
commande.supprimer();