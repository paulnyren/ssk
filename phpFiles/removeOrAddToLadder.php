<?php header('Content-Type: charset=utf-8');
ini_set('default_charset', 'utf-8');
?>
<?php
include 'dbConfig.php';
date_default_timezone_set("Europe/Stockholm");
$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$opt = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];
$params = json_decode(file_get_contents("php://input"), true)["params"];
$query = "SELECT * FROM singles_ladder WHERE player_id = ?";

$pdo = new PDO($dsn, $user, $pass, $opt);
$executeArray = array();
array_push($executeArray, $params["playerId"]);

$statement = $pdo->prepare($query);
$statement->execute($executeArray);
$result = $statement->fetchAll();
print_r($params["playerId"]);

if(is_null($result[0])){
	$query = "SELECT MAX(rank) AS maxRank FROM singles_ladder";
	$statement = $pdo->prepare($query);
	$statement->execute();
	$maxRank = $statement->fetchAll()[0]["maxRank"];
	print_r($maxRank);	


	$query = "INSERT INTO singles_ladder (player_id, rank, date) VALUES (?,?,?)";
	$executeArray = array();
	array_push($executeArray, $params["playerId"]);
	array_push($executeArray, $maxRank+1);
	array_push($executeArray, date("Y/m/d H:i:s"));
	$statement = $pdo->prepare($query);
	$statement->execute($executeArray);
} 
else {
	$currentRank = $result[0]["rank"];
	$query = "DELETE FROM singles_ladder WHERE player_id = ?";
	$executeArray = array();
	array_push($executeArray, $params["playerId"]);
	$statement = $pdo->prepare($query);
	$statement->execute($executeArray);


	$query = "UPDATE singles_ladder SET rank = rank-1 WHERE rank>?";
	$statement = $pdo->prepare($query);
	$executeArray = array();
	print_r($executeArray);
	array_push($executeArray, $currentRank);
	$statement->execute($executeArray);
}


?>
