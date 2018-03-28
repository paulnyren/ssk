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

$query = "SELECT * FROM players WHERE ";

if(isset($params["where"])){
  foreach ($params["where"] as $key => $value) {
    if(is_numeric($value)){
      $query = $query . $key . "=" . $value . " AND ";
    }
    else {
      $query = $query . $key . "=" . '"'. $value . '"' . " AND ";
    }

  }
  $query = substr($query, 0, strlen($query)-4);
} else {
  $query = substr($query, 0, strlen($query)-7);
}
$query = $query . " INNER JOIN ELO_rank ON ELO_rank.player_id = players.player_id ORDER BY ELO_rank.singles_elo DESC" ;
//print_r($query);
//$query = $query . $params["where"]["match_id"];
$pdo = new PDO($dsn, $user, $pass, $opt);
$statement = $pdo->query($query);
$result = $statement->fetchAll();
echo json_encode($result);
?>
