<?php
require_once(__DIR__ . "/config.php");
$post = json_decode(file_get_contents('php://input'), true);
$contact = $post['contact'];

if($contact['name'] && $contact['email'] && $contact['phone'] && $contact['message']) {
	try {
		$message = '<p>New message from airportbanskotransfer.com: </p><p>From: '.$contact['name'].'<br />Phone: '.$contact['phone'].'<br />Email: '.$contact['email'].'<br />Message: '.$contact['message'];
		
		$stmt = $db->prepare('INSERT INTO `emails` (`recipient`, `subject`, `message`, `attempts`, `created`) VALUES (:recipient, :subject, :message, :attempts, :created)');
		$stmt->bindValue(':recipient', 'bterziev84@gmail.com');
		$stmt->bindValue(':subject', 'Contact Message');
		$stmt->bindValue(':message', $message);
		$stmt->bindValue(':attempts', '0');
		$stmt->bindValue(':created', date('Y-m-d H:i:s'));
		$stmt->execute();
		
		if($db->lastInsertId() > 0) {
			die(json_encode(['status' => 'success']));
		}
	}
	catch(Exception $e) {
		die(json_encode(['status' => 'error', 'message' => $e->getMessage()]));
	}
}

die(json_encode(['status' => 'error']));