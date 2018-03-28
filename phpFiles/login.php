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
$paramString = $_GET["query"];
$jsonData = json_decode($paramString,TRUE);
$params = $jsonData["params"];

$pdo = new PDO($dsn, $user,$pass,$opt);
$executeArray = array();
$query = "SELECT * FROM admin WHERE user_name = ?;";
array_push($executeArray, $params["user_name"]);
$statement = $pdo->prepare($query);
$statement->execute($executeArray);
$result = $statement->fetchAll();
if(password_verify($params["password"], $result[0]["password"])){
	$response = array('status'=>1);
	print_r(json_encode($response));
}


else{
	$response = array('status'=>0);
	print_r(json_encode($response));
}
?>
