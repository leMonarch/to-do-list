export default class App {

    createTask(index) {
        let myInit = { 
            /**Method d'envoi */
            method: 'post',
           /**Le type d'envoi */
            headers: {
             'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            /**  La query string */
            body: `action=showDetails&id=${index}`
        };

        /** La requete au serveur avec l'entete myInit */
        fetch('client-serveur/requetesAsynch.php', myInit)

        .then(function(response){
            /**La reponse du php est en json on le decode et le passe au then suivant */
            if(response.ok) return response.json();
            else throw new Error('Erreur');
        }.bind(this))
        /**reception du data en json */
        .then(function(data){
            /** traitement de l'url*/
            let path = window.location.pathname;
            window.location = `${path}#!/tache/${index}`;
            /** recuperation du template */
            let template = document.querySelector('[data-js-detail-template]');
            if(index){

                /**Le template avec son contenu */
                let elCloneDetails = template.cloneNode(true);
                
                /**Si la tache n'a pas de description on affiche le msg Aucune description possible */
                elCloneDetails.innerHTML = elCloneDetails.innerHTML.replace('{{description}}', data[0].description != '' ? data[0].description: 'Aucune description disponible.');
                /**On remplace tous les prop pour la data des taches */
                for(const prop in data[0]){
                    let regExp = new RegExp('{{' + prop + '}}', 'g');
                    elCloneDetails.innerHTML = elCloneDetails.innerHTML.replace(regExp, data[0][prop]);
                }
                
                let elTaskDetail = document.querySelector('[data-js-task-detail]');
                /**On importe le contenu de la tache a afficher */
                let detailsToShow = document.importNode(elCloneDetails.content, true);
                /**On vide la precedente */
                elTaskDetail.innerHTML='';
                /**On ajoute la tache impotée */
                elTaskDetail.appendChild(detailsToShow);
            }
        }.bind(this))

        .catch(function(error) {
            console.log(`Il y a eu un problème avec l'opération fetch: ${error.message}`);
        }.bind(this));
       
    };
}
/**Exportation pour cree les taches */
export const { createTask } = new App();