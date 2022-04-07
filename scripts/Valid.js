export default class Valid {

    constructor(el){

        this._el = el;
        this._elInputTask = this._el.task;
        this._elInputDescription = this._el.description;
        this._elInputImportance = this._el.querySelectorAll('input[name="importance"]');

        this.isValid = true,
        this.isChecked = false;
        
    }

    validForm() {

        /* Input 'Nouvelle tâche' */
        if (this._elInputTask.value == '') {
            this._elInputTask.parentNode.classList.add('error');
            this.isValid = false;
        } else {
            if (this._elInputTask.parentNode.classList.contains('error')) this._elInputTask.parentNode.classList.remove('error');
        }

        /* Inputs Radio */
        for (let i = 0, l = this._elInputImportance.length; i < l; i++) {
            if (this._elInputImportance[i].checked) this.isChecked = true;
        }

        /**On ajoute la classe error qui colorie en rouge les endroits obligatoires non remplis sinon on l'enleve */
        if (!this.isChecked) {
            this._elInputImportance[0].parentNode.classList.add('error');
            this.isValid = false;
        } else {
            if (this._elInputImportance[0].parentNode.classList.contains('error')) this._elInputImportance[0].parentNode.classList.remove('error');
        }

       
    }

    get estValid(){
        this.validForm();
        return this.isValid;
    }
    

}
