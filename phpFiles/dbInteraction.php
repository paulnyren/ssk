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

$query = "SELECT * ";
if(isset($params["select"])){
	$query = substr($query, 0, strlen($query)-2);
	foreach($params["select"] as $value){
		$query = $query ." ". $value["name"];
		if(isset($value["as"])){
			$query = $query . " AS ". $value["as"];
		}
		$query = $query . ",";
	}
}
$query = substr($query, 0, strlen($query)-1);
$query = $query .  " FROM ".$params["table"];
$executeArray = array();
$pdo = new PDO($dsn, $user, $pass, $opt);

if(isset($params["join"])){
	foreach($params["join"] as $value){
		$query = $query . " INNER JOIN ";
		if(isset($value["joinTable"])){
			$query = $query . $value["joinTable"];
		}
		if(isset($value["as"])){
			$query = $query . " AS ";
			$query = $query . $value["as"];
		}
		if(isset($value["joinOn"])){
			$query = $query ." ON ".$value["joinOn"]["firstJoin"];
			$query = $query . " = " .$value["joinOn"]["secondJoin"];
		}
	}
}
if(isset($params["where"])){
	$query = $query . " WHERE ";
	foreach($params["where"] as $value){
		array_push($executeArray, $value["value"]);
		if(isset($value["comparator"])){
			$query = $query . $value["key"] . " ". $value["comparator"] . " ?";
		}
		else {
			$query = $query . $value["key"] . " ". "="." ?";
		}
		if(isset($value["separator"])){
			$query = $query ." " .$value["separator"]. " ";
		}

	}
}

if(isset($params["orderBy"])){
	$query = $query . " ORDER BY " . $params["orderBy"];
}
if(isset($params["order"])){
	$query = $query ." ". $params["order"];
};
if(isset($params["limit"])){
	$query = $query ." LIMIT ". $params["limit"];
};
$statement = $pdo->prepare($query);
$statement->execute($executeArray);
$result = $statement->fetchAll();
print_r(json_encode($result));

?>
