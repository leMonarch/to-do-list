import { createTask } from "./App.js";

export default class Router {
    constructor(el) {
        this._el = el;

        /**
         * Aller chercher le domain en local
         */
        if (location.hostname == 'localhost') {
            let domain = `${location.pathname.substring(0, location.pathname.lastIndexOf('/') + 1)}` ;

            this._domain = domain;
        } else {
            /**
             * Le domaine en prod
             */
            this._domain = location.pathname;
        }

        this._elBtnShowDetail = this._el.querySelectorAll('[data-js-show-detail]');

        this._elTemplate = document.querySelector('[data-js-detail-template]');

        this._elTaskDetail = document.querySelector('[data-js-task-detail]');

        this._elAllTasks = document.querySelectorAll('[data-js-task]');

        this._routes = [];

        this.init();
    }


    init() {

        /**
         * Charger tous les routes liées au tâches dans la DB dans le tableau
         */
        for (let i = 0, l = this._elAllTasks.length; i < l; i++) {
            
            this._routes.push({
                index: i,
                taskId: this._elAllTasks[i].dataset.jsTask
            });
            
        }

        /**
         * Au chargement de la page
         * 
         */
        let pathinit = location.pathname,
            hashpart = location.hash,
            /**
             * rajouter le hash et l'id
             */
            completepath = pathinit + hashpart,
            /**
             * prendre l'id
             */
            id = completepath.substring(completepath.lastIndexOf('/') + 1);

        /**
         * Trouver la tache correspondante à l'id
         */
        let task = this.findTask('taskId', id);

        /**
         * Si la tache existe on la crée sinon si le pathname et le domain ne coincident pas on nettoie l'url
         */
        if(task){
            createTask(task.taskId);
        } else {
            if(pathinit != this._domain){
                this.cleanUrl();
            }
        }


        /**
         * A chaque changement de hash on recupere l'id, trouve la tache associee et si elle existe on l'affiche sinon on
         * nettoie l'url
         */
        window.addEventListener('hashchange', function() {
            let id = this.getIdInHash('tache');
            let task = this.findTask('taskId', id);
            if(task) {
                createTask(id)
            } else {
                this.cleanUrl();
            }
        }.bind(this));
    }

    /**
     * 
     * @param {*} slug 
     * @returns l'id de la tache
     */

    getIdInHash(slug){
        let hash = window.location.hash,
            hashInArray = hash.split(`#!/${slug}/`),
            id = hashInArray[1];
        return id;
    }

    /**
     * 
     * @param {*} key la propriété de la tache correspondant ici a l'id
     * @param {*} value l'id
     * @returns la tache
     */
     findTask(key, value) {
        let task;
        for (let i = 0, l = this._routes.length; i < l; i++) {
            if (this._routes[i][key] == value) task = this._routes[i];
        }
        return task;
    }

    /**
     * Nettoyer l'URL
     */
    cleanUrl() {
        history.replaceState(null, null, this._domain);
    }

}