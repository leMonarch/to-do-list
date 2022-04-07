<?php
	$connexion = connectDB();
	
	function connectDB() {
		define("DB_HOST", "localhost");
		define("DB_USER", "root");
        define("DB_PASSWORD", "");	//En  local
        // define("DB_USER", "e1224194");
        // define("DB_PASSWORD", "daM49Lz415vB8UiiFZX7");			// Webdev

        $laConnexion = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD);
				
		if (!$laConnexion) {
			// La connexion n'a pas fonctionné
			die("Erreur de connexion à la base de données. " . mysqli_connect_error());
		}
		
		$selected = mysqli_select_db($laConnexion, "to-do-list");
		// $selected = mysqli_select_db($laConnexion, "e1224194"); //Webdev


		if(!$selected) {
			die("La base de données n'existe pas.");
		}
		
		mysqli_query($laConnexion, "SET NAMES 'utf8'");
		return $laConnexion;
	}
	
	/**
	 * On recoit une requete sql, on l'execute et retourne le resultat.
	 * Si $last est true, on retourne plutot l'id du dernier item inseré.
	 * @param $requete
	 * @param false $last
	 * @return bool|int|mysqli_result|string
	 */
	function executeRequete($requete, $last = false) {
		global $connexion;
		if ($last) {
			mysqli_query($connexion, $requete);
			return $connexion->insert_id;
		} else {
			$resultats = mysqli_query($connexion, $requete);
			return $resultats;
		}
	}

    function getAllTasks() {
        return executeRequete("SELECT id, tache, description, importance from taches");
    }
	
	function insertTask($tache, $desc, $imp) {
        return executeRequete("INSERT INTO taches (tache, description, importance) VALUES ('$tache', '$desc', '$imp')", true);
	}
	
	function showDetails($idTask) {
		return executeRequete("SELECT id, tache, description, importance from taches where id = " . $idTask);
	}	

	function deleteTask($id){
		return executeRequete("DELETE FROM taches WHERE id = " . $id, true);
	}

	function trier($column){
		return executeRequete("SELECT id, tache, description, importance from taches ORDER BY " . $column . " ASC");
	}
	
	
?>