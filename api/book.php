<?php
require_once(__DIR__ . "/config.php");
$post = json_decode(file_get_contents('php://input'), true);
$booking = $post['booking'];

if($booking['cost'] > 0 && $booking['email'] && $booking['phone'] && $booking['passangers'] > 0) {
	$stmt = $db->prepare('INSERT INTO `bookings`(`name`, `phone`, `email`, `pickup_location`, `dropoff_location`, `pickup_date`, `pickup_time`, `return_date`, `return_time`, `passangers`, `oneway`, `flight_number`, `notes`, `cost`, `created`) VALUES (:name, :phone, :email, :pickup_location, :dropoff_location, :pickup_date, :pickup_time, :return_date, :return_time, :passangers, :oneway, :flight_number, :notes, :cost, :created)');
	$stmt->bindValue(':name', $booking['name']);
	$stmt->bindValue(':phone', $booking['phone']);
	$stmt->bindValue(':email', $booking['email']);
	$stmt->bindValue(':pickup_location', $booking['pickup_location']);
	$stmt->bindValue(':dropoff_location', $booking['dropoff_location']);
	$stmt->bindValue(':pickup_date', date('Y-m-d', strtotime($booking['pickup_date'])));
	$stmt->bindValue(':pickup_time', $booking['pickup_time']);
	$stmt->bindValue(':return_date', date('Y-m-d', strtotime($booking['return_date'])));
	$stmt->bindValue(':return_time', $booking['return_time']);
	$stmt->bindValue(':passangers', intval($booking['passangers']));
	$stmt->bindValue(':oneway', intval($booking['oneway']));
	$stmt->bindValue(':flight_number', $booking['flight_number']);
	$stmt->bindValue(':notes', $booking['notes']);
	$stmt->bindValue(':cost', round($booking['cost'], 2));
	$stmt->bindValue(':created', date('Y-m-d H:i:s'));
	$stmt->execute();
	
	$id = $db->lastInsertId();
	
	if($id > 0) {
		$message = '<p>Dear '.$booking['name'].',<br />We are pleased to confirm your airport transfer booking with <strong>Airport Bansko Transfer</strong>. We appreciate your choosing our services and would like to provide you with the details of your upcoming transfer.</p><p><strong>Booking Details</strong></p><p>Booking Reference: '.$id.'<br />Pickup Location: '.$booking['pickup_location'].'<br />Destination: '.$booking['dropoff_location'].'<br />Pickup Date: '.date('d/m/Y', strtotime($booking['pickup_date'])).'<br />Pickup Time: '.$booking['pickup_time'].'<br />Number of Passangers: '.intval($booking['passangers']).'<br />Transfer Type: '.($booking['oneway'] ? 'One-way' : 'Return').'<br />';
		
		if(!$booking['oneway']) {
			$message .= 'Return Date: '.date('d/m/Y', strtotime($booking['return_date'])).'<br />Return Time: '.$booking['return_time'].'<br />';
		}
		$message .= 'Flight number: '.$booking['flight_number'] . '<br/>';
		$message .= 'Notes: '.$booking['notes'].'<br />Total cost: '.round($booking['cost'], 2).'</p><p><strong>Contact details:</strong></p><p>Email: '.$booking['email'].'<br/>Phone: '.$booking['phone'].'</p><p>Your designated driver will be waiting for you at the agreed-upon pickup location, holding a sign with your name for easy identification. They will assist you with your luggage and ensure a smooth and comfortable journey.</p><p>Should you have any questions or concerns regarding your booking, feel free to reach out to us at <a href="tel:+359899239723">+359-899239723</a> or <a href="mailto:book@airportbanskotransfer.com">book@airportbanskotransfer.com</a>.</p><p>Safe travels!</p><p>Regards,<br />Airport Bansko Transfer';
		
		
		$stmt = $db->prepare('INSERT INTO `emails` (`recipient`, `subject`, `message`, `attempts`, `created`) VALUES (:recipient, :subject, :message, :attempts, :created)');
		$stmt->bindValue(':recipient', implode(",", ['bterziev84@gmail.com', $booking['email']]));
		$stmt->bindValue(':subject', 'Booking Confirmation');
		$stmt->bindValue(':message', $message);
		$stmt->bindValue(':attempts', '0');
		$stmt->bindValue(':created', date('Y-m-d H:i:s'));
		$stmt->execute();
		
		die(json_encode(['status' => 'success', 'ref'=>$id]));
	}
}
die(json_encode(['status'=> 'error', 'ref' => null]));
