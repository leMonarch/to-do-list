import Task from './Task.js';


export default class SortTasks {
    constructor(el) {
        this._el = el;
        this._elBtnSortName = this._el.querySelector('[data-js-sort-alphabetical]');
        this._elBtnSortImportance = this._el.querySelector('[data-js-sort-importance]');

        this._elToDoList = document.querySelector('[data-js-tasks]');

        this._elTemplate = document.querySelector('[data-js-task-template]');

        this.init();
    }


    init() {
        this._elBtnSortName.addEventListener('click', function() {
            this.sort('tache');
        }.bind(this));
        this._elBtnSortImportance.addEventListener('click', function() {
            this.sort('importance');
        }.bind(this));
    }


    sort(column) {
        /**definition de l'entete */
        let myInit = { 
            method: 'post',
            headers: {
             'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            /**On passe le nom de la colonne à trier ASC dans le SQL*/
            body: `action=trier&column=${column}`
        };
        /**appelle au serveur avec l'entete */
        fetch('client-serveur/requetesAsynch.php', myInit)
        .then(function(response){
            /**On recoit tous les tâches trier en json */
            if(response.ok) return response.json();
            else throw new Error('Erreur');
        }.bind(this))
        .then(function(data){
            this._elToDoList.innerHTML = ''; //vider le html
            if(data.length == 0){
                /**On mentionne si il n'y a aucune tache */
                this._elToDoList.innerHTML = '<p>Aucune taches</p>';
            } else {
                 /** On fait une double boucle sur le tableau qui regroupe les taches en format json */
                for( const index in data){
                    let elCloneTaskTemplate = this._elTemplate.cloneNode(true);
                    for( const prop in data[index]){
                        /**Remplace les expressions par le data de la chaque taches dans un ordre trie */
                        let regExp = new RegExp('{{' + prop + '}}', 'g');
                        elCloneTaskTemplate.innerHTML = elCloneTaskTemplate.innerHTML.replaceAll(regExp, data[index][prop] );
                    }
                    let newTask = document.importNode(elCloneTaskTemplate.content, true);
                    this._elToDoList.appendChild(newTask);
                    /**Il faut les instancier egalement */
                    new Task(this._elToDoList.lastElementChild);
                }
                

            }
        }.bind(this))
        .catch(function(error) {
            console.log(`Il y a eu un problème avec l'opération fetch: ${error.message}`);
        }.bind(this));

    }
}