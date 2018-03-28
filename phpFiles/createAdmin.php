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
$query = "INSERT INTO admin (password, user_name) VALUES(?,?)";
$passwordHash=password_hash($params["password"],PASSWORD_DEFAULT);
$executeArray = array();
array_push($executeArray, $passwordHash);
array_push($executeArray, $params["user_name"]);
$pdo = new PDO($dsn, $user, $pass, $opt);
$statement = $pdo->prepare($query);
$statement->execute($executeArray);
print_r(json_encode(array("response"=>"Admin added successfully")));
?>
