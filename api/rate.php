<?php
require_once(__DIR__ . "/config.php");

$post = json_decode(file_get_contents('php://input'), true);
$rating = $post['rating'];

if(intval($rating['rating']) >= 0 && $rating['name'] && $rating['comment']) {
	$stmt = $db->prepare('INSERT INTO `comments` (`name`, `comment`, `rating`, `created`, `approved`) VALUES (:name, :comment, :rating, :created, :approved)');
	$stmt->bindValue(':name', $rating['name']);
	$stmt->bindValue(':comment', $rating['comment']);
	$stmt->bindValue(':rating', intval($rating['rating']));
	$stmt->bindValue(':created', date('Y-m-d H:i:s'));
	$stmt->bindValue(':approved', '0');
	$stmt->execute();
	
	$id = $db->lastInsertId();
	
	if($id > 0) {
	    $message = '<p>A new comment has been submitted on airportbanskotransfer.com. Comment details:</p><p>From name: '.$rating['name'].'<br/>Comment: '.$rating['comment'].'<br />Rating: '.$rating['rating'].'</p><p>To approve it, please <a href="https://airportbanskotransfer.com/api/approve.php?comment='.encrypt($id).'" target="_blank">Click Here</a></p>';
	    
		$stmt = $db->prepare('INSERT INTO `emails` (`recipient`, `subject`, `message`, `attempts`, `created`) VALUES (:recipient, :subject, :message, :attempts, :created)');
		$stmt->bindValue(':recipient', 'bterziev84@gmail.com');
		$stmt->bindValue(':subject', 'Comment Approval');
		$stmt->bindValue(':message', $message);
		$stmt->bindValue(':attempts', '0');
		$stmt->bindValue(':created', date('Y-m-d H:i:s'));
		$stmt->execute();
		
		die(json_encode(['status' => 'success']));
	}
}
die(json_encode(['status' => 'error']));