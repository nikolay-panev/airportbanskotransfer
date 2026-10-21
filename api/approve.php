<?php
require_once(__DIR__ . "/config.php");
if($_GET['comment']) {
	$id = decrypt($_GET['comment']);
	
	if(intval($id) > 0) {
		$stmt = $db->prepare('UPDATE `comments` SET `approved` = "1" WHERE `id` = :id');
		$stmt->bindValue(':id', intval($id));
		$stmt->execute();
		
		die("Comment approved successfully.");
	}
}
die("Invalid parameter.");