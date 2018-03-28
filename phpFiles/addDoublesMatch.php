<?php header('Content-Type: charset=utf-8');
ini_set('default_charset', 'utf-8');
?>
<?php
include 'dbConfig.php';
$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$opt = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];
$params = json_decode(file_get_contents("php://input"), true)["params"];
//loser_id, winner_id, referee_name, loser_score, winner_score, court, notes, winner_new_elo, loser_new_elo

//INSERT INTO singles_matches (winner, loser, match_date, winner_score, loser_score, court, referee, notes)
//VALUES(winnerID,loserID, loser_score, winner_score, court, notes, refereeID)


//UPDATE players SET current_singles_elo=new_winner_elo WHERE player_id=winnerID
//UPDATE players SET current_singles_elo=new_loser_elo WHERE player_id=loserID

//INSERT INTO elo_rank (player_id, singles_elo, date) VALUES (winnerID, new_winner_elo, NOW())
//INSERT INTO elo_rank (player_id, singles_elo, date) VALUES (loserID, new_loser_elo, NOW())
date_default_timezone_set("Europe/Stockholm");
$pdo = new PDO($dsn, $user, $pass, $opt);

$query = "INSERT INTO doubles_matches (winner, loser, match_date, winner_score, loser_score, court, referee, notes) VALUES(?,?,?,?,?,?,?,";
$executeArray = array();
array_push($executeArray, $params["winnerId"]);
array_push($executeArray, $params["loserId"]);
array_push($executeArray, $params["date"]);
array_push($executeArray, $params["winnerScore"]);
array_push($executeArray, $params["loserScore"]);
array_push($executeArray, $params["court"]);
array_push($executeArray, $params["refereeId"]);
if(isset($params["notes"])){
	array_push($executeArray, $params["notes"]);
	$query = $query."?";
}
$query = $query.");";

print_r($query);
$statement = $pdo->prepare($query);
$statement->execute($executeArray);
$result = $statement->fetchAll();
print_r(json_encode($result));

$executeArray = array();
array_push($executeArray, $params["winnerNewElo"]);
array_push($executeArray, $params["winnerId"]);
$query = "UPDATE teams SET elo_rank= ? WHERE team_id = ?;";
$statement = $pdo->prepare($query);
$statement->execute($executeArray);
$result = $statement->fetchAll();
print_r(json_encode($result));

$executeArray = array();
array_push($executeArray, $params["loserNewElo"]);
array_push($executeArray, $params["loserId"]);
$statement->execute($executeArray);
$result = $statement->fetchAll();
print_r(json_encode($result));


$executeArray = array();
array_push($executeArray, $params["loserId"]);
array_push($executeArray, $params["loserNewElo"]);
array_push($executeArray, $params["date"]);
$query = "INSERT INTO ELO_rank_doubles (team_id, elo_rank, date) VALUES (?, ?, ?);";
$statement = $pdo->prepare($query);
$statement->execute($executeArray);
print_r(json_encode($result));

$executeArray = array();
array_push($executeArray, $params["winnerId"]);
array_push($executeArray, $params["winnerNewElo"]);
array_push($executeArray, $params["date"]);
$statement->execute($executeArray);
$result = $statement->fetchAll();
print_r(json_encode($result));

$executeArray = array();
$query = "SELECT rank FROM doubles_ladder WHERE team = ?";
array_push($executeArray, $params["winnerId"]);
$statement = $pdo->prepare($query);
$statement->execute($executeArray);
$winnerRank = $statement->fetchAll()[0]["rank"];
$executeArray = array();
array_push($executeArray, $params["loserId"]);
$statement->execute($executeArray);
$loserRank = $statement->fetchAll()[0]["rank"];

if($winnerRank > $loserRank){
	$query = "UPDATE doubles_ladder SET rank = rank +1 WHERE rank < ? AND rank > ?";
	$executeArray = array();
	array_push($executeArray, $winnerRank);
	array_push($executeArray, $loserRank);
	$statement = $pdo->prepare($query);
	$statement->execute($executeArray);
	print_r($query);
	print_r($executeArray);

	$executeArray = array();
	$query = "UPDATE doubles_ladder SET rank = ? WHERE team = ?";
	array_push($executeArray, $loserRank);
	array_push($executeArray, $params["winnerId"]);
	$statement = $pdo->prepare($query);
	$statement->execute($executeArray);
	$result = $statement->fetchAll();

	$executeArray = array();
	array_push($executeArray, $loserRank+1);
	array_push($executeArray, $params["loserId"]);
	$statement->execute($executeArray);
	$result = $statement->fetchAll();

}

?>
