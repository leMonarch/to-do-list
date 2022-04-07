<?php
require_once('fonctionsDB.php');

if (isset($_POST['action'])) {

	// Switch en fonction de l'action envoyée
	switch ($_POST['action']) {	
		case 'insertTask':

			if(isset($_POST['tache']) && isset($_POST['description']) && isset($_POST['importance'])){

				$tache = filter_var($_POST['tache'], FILTER_SANITIZE_FULL_SPECIAL_CHARS);
				$desc = filter_var($_POST['description'], FILTER_SANITIZE_FULL_SPECIAL_CHARS);
				$imp = filter_var($_POST['importance'], FILTER_SANITIZE_FULL_SPECIAL_CHARS);

				echo insertTask($tache, $desc, $imp);
	
			} else {
				echo 'Erreur query string';
			}
			
			break;
		case 'showDetails':
			if( isset($_POST['action']) && isset($_POST['id'])){

				$tab = array();
				$details = showDetails($_POST['id']);

				while ($detail = mysqli_fetch_assoc($details)) {
					$tab[] = $detail;
				 }
				
				echo json_encode($tab);

			} else {
				echo 'Erreur query string';
			}
			
			break;

		case 'deleteTask':
			if(isset($_POST['id'])){
				echo deleteTask($_POST['id']);
			} else {
				echo 'Erreur query string';
			}
			break;

		case 'trier':
			if(isset($_POST['column'])){
				
				$tab = array();
				$tasks = trier($_POST['column']);

				while ($task = mysqli_fetch_assoc($tasks)) {
					$tab[] = $task;
				 }
				
				echo json_encode($tab);
			} else {
				echo 'Erreur query string';
			}
			break;
	}
} else {
	echo 'Erreur action';					
}





?>