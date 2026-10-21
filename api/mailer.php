<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require_once(__DIR__ . "/config.php");
require_once(__DIR__ . '/classes/PHPMailer/Exception.php');
require_once(__DIR__ . '/classes/PHPMailer/PHPMailer.php');
require_once(__DIR__ . '/classes/PHPMailer/SMTP.php');

$stmt = $db->prepare('SELECT * FROM `emails` WHERE `status` IS NULL AND `attempts` <= 3 AND `recipient` != ""');
$stmt->execute();
$results = $stmt->fetchAll();

foreach($results as $row) {
	if(strlen(trim($row['recipient'])) < 3) continue;
	
	$mail = new PHPMailer(true);
	try {
		$mail->isSMTP();
		$mail->SMTPDebug = 0;
		$mail->SMTPSecure = 'ssl';
		$mail->Host = SMTP_HOST;
		$mail->Port = SMTP_PORT;
		$mail->SMTPAuth = true;
		$mail->Username = SMTP_USER;
		$mail->Password = SMTP_PASS;
		$mail->setFrom(SMTP_USER, SMTP_FROM);
		
		$recipients = explode(',', trim(str_replace(";",",",$row['recipient'])));
		foreach($recipients as $recipient) {
			$recipient = filter_var(trim($recipient), FILTER_VALIDATE_EMAIL);
			
			if($recipient!==false) {
			    if($recipient == 'bterziev84@gmail.com') $mail->addBCC($recipient);
			    else $mail->addAddress($recipient);
			}
		}
		
		$mail->Subject = $row['subject'];
		$mail->AltBody = 'To view the message, please use an HTML compatible email viewer!';
		$mail->MsgHTML($row['message']);
		
		$sent = $mail->Send();
		$mail->ClearAddresses();
		
		if($sent || $row['attempts'] >=4) {
			$stmt = $db->prepare('UPDATE `emails` SET `status`="OK", attempts="'.($row['attempts']+1).'" WHERE `id` = "'.$row['id'].'"');
			$stmt->execute();
		}
		else {
			$stmt = $db->prepare('UPDATE `emails` SET attempts="'.($row['attempts']+1).'" WHERE `id` = "'.$row['id'].'"');
			$stmt->execute();
		}
	}
	catch(phpmailerException $e) {
		mail('nikolay.panev@gmail.com', 'Mailer Issue', date('YmdHis').' Message '.$row['id'].' has the following issue : '. $e->getMessage());
		$stmt = $db->prepare('UPDATE `emails` SET `attempts` = "'.($row['attempts']+1).'", `status` = "ERROR" WHERE `id` = "'.$row['id'].'"'); 
		$stmt->execute();
	}
	catch(Exception $e) {
		mail('nikolay.panev@gmail.com', 'Mailer Issue', date('YmdHis').' Message '.$row['id'].' has the following issue : '. $e->getMessage());
		$stmt = $db->prepare('UPDATE `emails` SET `attempts` = "'.($row['attempts']+1).'", `status` = "ERROR" WHERE `id` = "'.$row['id'].'"'); 
		$stmt->execute();
	}
}