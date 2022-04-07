import { createTask } from "./App.js";

export default class Task{
    constructor(el) {
        this._el = el;

        this._index = this._el.dataset.jsTask;

        this._elBtnShowDetail = this._el.querySelector('[data-js-show-detail]');
        this._elBtnDelete = this._el.querySelector('[data-js-delete]');
        
        this._elToDoList = this._el.closest('[data-js-tasks]');
        this._elTaskDetail = document.querySelector('[data-js-task-detail]');

        this._elTemplate = document.querySelector('[data-js-detail-template]');

        this.init();
    }


    init() {
        this._elBtnShowDetail.addEventListener('click', this.showDetail.bind(this));
        this._elBtnDelete.addEventListener('click', this.delete.bind(this));
    }


    showDetail() {
        createTask(this._index);
    }

    delete() {
        /**definition de l'entete */
        let myInit = { 
            method: 'post',
           
            headers: {
             'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },

            body: `action=deleteTask&id=${this._index}`
        };

        /**Requete au serveur avec l'entete */
        fetch('client-serveur/requetesAsynch.php', myInit)
        .then(function(response){
            /**On ne recoit pas de l'information essentiel */
            if(response.ok) return response.text();
            else throw new Error('Erreur');
        }.bind(this))
        .then(function(data){
            /**On utilise l'index courant de la tache de laquelle le bouton Supprimer a été clique */
            let task = this._elToDoList.querySelector(`[data-js-task="${this._index}"]`);
            /**On supprime la tache */
            task.parentNode.removeChild(task);
        }.bind(this))
        .catch(function(error) {
            console.log(`Il y a eu un problème avec l'opération fetch: ${error.message}`);
        }.bind(this));
    }
}

