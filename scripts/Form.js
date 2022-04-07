import App from "./App.js";
import Task from "./Task.js";
import Valid from "./Valid.js";


export default class Form extends App{
    constructor(el) {
        super();
        this._el = el;
        this._elInputTask = this._el.task;
        this._elInputDescription = this._el.description;
        this._elInputImportance = this._el.querySelectorAll('input[name="importance"]');
        
        this._elBouton = this._el.querySelector('[data-js-btn]'); 
        
        this._elToDoList = document.querySelector('[data-js-tasks]');

        this._elTemplate = document.querySelector('[data-js-task-template]')

        this.init();
    }


    init() {
        this._elBouton.addEventListener('click', function(e) {
            e.preventDefault();
            let valid = new Valid(this._el);
            if(valid.estValid){
                this.addTask();
                this.cleanForm();
            }
        }.bind(this));
    }




    addTask() {

        let importance = '';

        /**Affecter l'importance a la variable importance parmi le choix des bountons radios du form */
        for (let i = 0, l = this._elInputImportance.length; i < l; i++) {
            if (this._elInputImportance[i].checked) importance = this._elInputImportance[i].value;
        }
        
        /**Reformuler clairement l'information a envoyer */
        let infos = {
            'tache': this._elInputTask.value,
            'description': this._elInputDescription.value,
            'importance': importance,
            'action':'insertTask'
        }

        let myInit = { 
            /**Methode d'envoie */
            method: 'post',
           /** Type d'envoi */
            headers: {
             'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            /** query string */
            body: `action=insertTask&tache=${infos.tache}&description=${infos.description}&importance=${importance}`

        };

        /** requete au serveur avec l'entete myInit */
        fetch('client-serveur/requetesAsynch.php', myInit)
            .then(function(response) {
                /**Ici on recoit les l'id de la tache en format texte */
                if (response.ok) return response.text();
                else throw new Error('La réponse n\'est pas OK');
            }.bind(this))
            /**Le data et les infos serve a creer la tache avec les bons infos dans le template task*/
            .then(function(data) {
                let path = window.location.pathname;
                window.location = `${path}#!/tache/${data}`;
                this.insertTaskTemplate(infos,data);
            }.bind(this))
            .catch(function(error) {
                console.log(`Il y a eu un problème avec l'opération fetch: ${error.message}`);
        }.bind(this));
    }

    /** On clone, remplace les expressions par les propriétés et on instancie la nouvelle tâche à la fin*/
    insertTaskTemplate(literalTask, id){
        let elCloneTask = this._elTemplate.cloneNode(true);
        for(const prop in literalTask){
            let regExp = new RegExp('{{' + prop + '}}', 'g');
            elCloneTask.innerHTML = elCloneTask.innerHTML.replace(regExp, literalTask[prop]);
        }
        elCloneTask.innerHTML = elCloneTask.innerHTML.replace('{{id}}', id);

        let newTask = document.importNode(elCloneTask.content, true);
        this._elToDoList.appendChild(newTask);
        new Task(this._elToDoList.lastElementChild);
    }

    /**On nettoie le formulaire */
    cleanForm() {
        this._elInputTask.value = '';
        this._elInputDescription.value = '';
        for (let i = 0, l = this._elInputImportance.length; i < l; i++) {
            if (this._elInputImportance[i].checked) this._elInputImportance[i].checked = false;
        }
    }
}
