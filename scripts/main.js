import { classesMapping } from "./classMapping.js";

import Form from "./Form.js";
import Task from "./Task.js";
import SortTasks from "./SortTasks.js";
import Detail from "./Detail.js";



(function() {

    let elComponents = document.querySelectorAll('[data-js-component]');

	for (let i = 0, l = elComponents.length; i < l; i++) {

		let datasetComponent = elComponents[i].dataset.jsComponent, 			// => string
			elComponent = elComponents[i];

		for (let key in classesMapping) {
			if (datasetComponent == key) new classesMapping[datasetComponent](elComponent);
		}
	}

    let elForms = document.querySelectorAll('[data-js-form]'),
        elSortTasks = document.querySelectorAll('[data-js-sort-tasks]'),
        elDetails = document.querySelectorAll('[data-js-section-detail]'),
        elTasks = document.querySelectorAll('[data-js-task]');  


    for (let i = 0, l = elForms.length; i < l; i++) {
        new Form(elForms[i]);
    }

    for (let i = 0, l = elTasks.length; i < l; i++) {
        new Task(elTasks[i]);
    }

    for (let i = 0, l = elDetails.length; i < l; i++) {
        new Detail(elDetails[i]);
    }

    for (let i = 0, l = elSortTasks.length; i < l; i++) {
        new SortTasks(elSortTasks[i]);
    }
})(); 

