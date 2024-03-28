// classe employe
export default class Employe {
    nom_personnel;
    surnom_personnel;
    numero_telephone_personnel;
    poste_personnel;
    // constructeur de la classe
    constructor(nom, surnom, numero, poste) {
        this.nom_personnel = nom;
        this.surnom_personnel = surnom;
        this.numero_telephone_personnel = numero;
        this.poste_personnel = poste;
    }

    // méthode affichant la liste de tous les employés
    voirListeEmployes() {
        document.getElementById('employes').innerHTML = "";
        const listeEmployes = JSON.parse(localStorage.getItem('employes'));
        listeEmployes.forEach(employe => {
            const nouveauxInputs = {
                nom: document.createElement("input"),
                prenom: document.createElement("input"),
                telephone: document.createElement("input"),
                poste: document.createElement("input"),
            };
            const nouvelleDivision = document.createElement("div");
            const nouveauxButton = {
                supprimer: document.createElement("input"),
                modifier: document.createElement("input"),
            };

            for (const [key, value] of Object.entries(nouveauxInputs)) {
                value.setAttribute('type', 'text');
                value.setAttribute('id', `${key}employe${employe.telephone}`);
                value.style.backgroundColor = "gray";
                value.style.color = "white";

                key === "nom" && value.setAttribute('value', employe.nom);
                key === "prenom" && value.setAttribute('value', employe.prenom);
                key === "telephone" && value.setAttribute('value', employe.telephone);
                key === "poste" && value.setAttribute('value', employe.poste);

                nouvelleDivision.appendChild(value);
                document.getElementById('employes').appendChild(nouvelleDivision);

            }

            for (const [key, value] of Object.entries(nouveauxButton)) {
                value.setAttribute('type', 'button');
                value.setAttribute('class', key);
                value.setAttribute('id', employe.telephone);
                value.setAttribute('value', key);

                key === "supprimer" && value.setAttribute('style', "background-color:red;border:1px solid;border-radius:5px;margin:10px;");
                key === "modifier" && value.setAttribute('style', "background-color:yellow;border:1px solid;border-radius:5px;");

                nouvelleDivision.appendChild(value);
            }
        });
    }

    // méthode modifiant les informations sur un employé
    modifier() {
        const listeEmployes = JSON.parse(localStorage.getItem('employes'));
        const buttonModifier = document.querySelectorAll('.modifier');

        buttonModifier.forEach(button => {
            button.addEventListener('click', () => { modifierEmployer(button.id) });
        });

        function modifierEmployer(id) {
            const nouveauxInputs = {
                nom: document.getElementById(`nomemploye${id}`),
                prenom: document.getElementById(`prenomemploye${id}`),
                telephone: document.getElementById(`telephoneemploye${id}`),
                poste: document.getElementById(`posteemploye${id}`),
            };
            listeEmployes.forEach((employe) => {
                if (employe.telephone === id) {
                    employe.nom = nouveauxInputs.nom.value;
                    employe.prenom = nouveauxInputs.prenom.value;
                    employe.telephone = nouveauxInputs.telephone.value;
                    employe.poste = nouveauxInputs.poste.value;
                    let confirmation = confirm(`voulez-vous vraiment modifier l'employer ${employe.nom}?`);
                    if (confirmation == true) {
                        localStorage.setItem("employes", JSON.stringify(listeEmployes));
                        alert("Modifications faites avec succès");
                    }
                }
            });
        }
    }

    // méthode supprimant un employé
    supprimer() {
        const listeEmployes = JSON.parse(localStorage.getItem('employes'));
        const buttonSupprimer = document.querySelectorAll('.supprimer');

        buttonSupprimer.forEach(button => {
            button.addEventListener('click', () => { suprimerEmployer(button.id) });
        });

        function suprimerEmployer(id) {
            listeEmployes.forEach(employe => {
                const positionEmployerDansObject = listeEmployes.indexOf(employe);
                if(employe.telephone === id){
                    listeEmployes.splice(positionEmployerDansObject, 1);
                    let confirmation = confirm(`voulez-vous vraiment  supprimer l'employer ${employe.nom}?`);
                    if (confirmation == true) {
                        localStorage.setItem("employes", JSON.stringify(listeEmployes));
                        document.location = 'Employé.html';
                        alert("Opération effectuée avec succès");
                    }
                }
            });
        }
    }
    // méthode ajoutant un employé
    ajouter() {
        const employe = {
            telephone: document.getElementById('numero').value,
            nom: document.getElementById('nom').value,
            prenom: document.getElementById('prenom').value,
            poste: document.getElementById('poste').value,
        };
        const table = JSON.parse(localStorage.getItem('employes'));

        if (table == null) {
            localStorage.setItem('employes', JSON.stringify([]));
            const listeEmployes = JSON.parse(localStorage.getItem('employes'));
            listeEmployes.push(employe);

            if (employe.nom !== "" && employe.numero !== "" && employe.prenom !== "" && employe.poste !== "") {
                localStorage.setItem("employes", JSON.stringify(listeEmployes));
                alert("Ajout effectuer avec succès!");
            } else { alert("Un problème a été rencontré lors de l'ajout"); }

        } else {
            const listeEmployes = JSON.parse(localStorage.getItem('employes'));
            listeEmployes.push(employe);

            if (employe.nom !== "" && employe.numero !== "" && employe.prenom !== "" && employe.poste !== "") {
                localStorage.setItem("employes", JSON.stringify(listeEmployes));
                alert("Ajout effectuer avec succès!");
            } else { alert("Un problème a été rencontré lors de l'ajout"); }
        }



    }
}

// création et manipulation d'un objet employe
const employe = new Employe(document.getElementById('nom').value,document.getElementById('prenom').value,document.getElementById('numero').value,document.getElementById('poste').value);

const buttonAjouter = document.getElementById('ajouter');

buttonAjouter.addEventListener('click', ()=>{employe.ajouter()});
employe.voirListeEmployes();
employe.modifier();
employe.supprimer();