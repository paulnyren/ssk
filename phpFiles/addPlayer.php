<?php header('Content-Type: charset=utf-8');
ini_set('default_charset', 'utf-8');
?>
<?php
require('vendor/autoload.php');
use WebSocket\Client;
$client = new Client("ws://130.237.223.192:8080");

$newPlayer = array();

include 'dbConfig.php';
$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$opt = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];
$params = json_decode(file_get_contents("php://input"), true)["params"];

$query = "INSERT INTO players (first_name, last_name, gender, notes, email, address, personal_number, phone_number,profile_picture_url, elo_rank) VALUES (";
$executeArray = array();
array_push($executeArray, $params["firstName"]);
$query=$query."?".",";
$newPlayer["first_name"]=$params["firstName"];
array_push($executeArray, $params["lastName"]);
$query=$query."?".",";
$newPlayer["last_name"]=$params["lastName"];
if(isset($params["gender"])){
	array_push($executeArray, $params["gender"]);
	$query=$query."?".",";
  $newPlayer["gender"]=$params["gender"];
}
if(isset($params["notes"])){
	array_push($executeArray, $params["notes"]);
	$query=$query."?".",";
  $newPlayer["notes"]=$params["notes"];
}
if(isset($params["email"])){
	array_push($executeArray, $params["email"]);
	$query=$query."?".",";
  $newPlayer["email"]=$params["email"];
}
if(isset($params["address"])){
	array_push($executeArray, $params["address"]);
	$query=$query."?".",";
  $newPlayer["address"]=$params["address"];
}
if(isset($params["personalNumber"])){
	array_push($executeArray, $params["personalNumber"]);
	$query=$query."?".",";
  $newPlayer["personal_number"]=$params["personalNumber"];
}
if(isset($params["telephoneNumber"])){
	array_push($executeArray, $params["telephoneNumber"]);
	$query=$query."?".",";
  $newPlayer["phone_number"]=$params["telephoneNumber"];
}
if(isset($params["profilePictureUrl"])){
	array_push($executeArray, $params["profilePictureUrl"]);
	$query=$query."?".",";
  $newPlayer["profile_picture_url"]=$params["profilePictureUrl"];
}

array_push($executeArray, $params["eloRank"]);
$query=$query."?".");";
$newPlayer["elo_rank"]=$params["eloRank"];
print_r($newPlayer);
$pdo = new PDO($dsn, $user, $pass, $opt);
print_r($query);
$statement = $pdo->prepare($query);
$statement->execute($executeArray);
$result = $statement->fetchAll();
$client->send(json_encode($newPlayer));
print_r(json_encode($result));
?>
