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

date_default_timezone_set("Europe/Stockholm");
$pdo = new PDO($dsn, $user, $pass, $opt);
$query = "INSERT INTO teams (player_1, player_2, elo_rank) VALUES (?,?,?);";
$executeArray = array();
array_push($executeArray, $params["player_1"]);
array_push($executeArray, $params["player_2"]);
array_push($executeArray, $params["elo_rank"]);
$statement = $pdo->prepare($query);
$statement->execute($executeArray);


$query = "SELECT MAX(rank) AS maxRank FROM doubles_ladder";
$statement = $pdo->prepare($query);
$statement->execute();
$maxRank = $statement->fetchAll()[0]["maxRank"];

$query = "SELECT team_id FROM teams WHERE player_1 = ? AND player_2 = ?";
$executeArray = array();
array_push($executeArray, $params["player_1"]);
array_push($executeArray, $params["player_2"]);

$statement = $pdo->prepare($query);
$statement->execute($executeArray);
$teamId = $statement->fetchAll()[0]["team_id"];


$query = "INSERT INTO doubles_ladder (team, rank, date) VALUES (?,?,?)";
$executeArray = array();
array_push($executeArray, $teamId);
array_push($executeArray, $maxRank+1);
array_push($executeArray, date("Y/m/d H:i:s"));
$statement=$pdo->prepare($query);
$statement->execute($executeArray);
print_r($query);
print_r($executearray);

?>