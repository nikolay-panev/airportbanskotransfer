<?php
require_once(__DIR__ . "/config.php");
require_once(__DIR__ . "/classes/MySQL.php");

header("Content-Type: application/json; charset=utf-8;");

$operations = ['select'];
$tables = ['comments'];

$data = json_decode(file_get_contents('php://input'), true);

if($data && is_array($data) && count($data) > 0) {
	if(in_array($data['operation'], $operations) && $data['table'] && (in_array($data['table'], $tables) || empty($tables))) {
		$api = new APIMySQL($db);
		$result = $api->get($data);
		
		die(json_encode($result));
	}
	else die(json_encode(["Invalid params."]));
}
else die(json_encode(["Invalid data."]));