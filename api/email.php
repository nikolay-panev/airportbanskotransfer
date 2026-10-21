<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require_once(__DIR__ . "/config.php");

require_once(__DIR__ . '/classes/PHPMailer/Exception.php');
require_once(__DIR__ . '/classes/PHPMailer/PHPMailer.php');
require_once(__DIR__ . '/classes/PHPMailer/SMTP.php');

//===== Send email
try {
	$mail = new PHPMailer();
	$mail->isSMTP();
	$mail->SMTPDebug = 1;
	$mail->SMTPSecure = 'ssl';
	$mail->Host = SMTP_HOST;
	$mail->Port = SMTP_PORT;
	$mail->SMTPAuth = true;
	$mail->Username = SMTP_USER;
	$mail->Password = SMTP_PASS;
	$mail->setFrom(SMTP_USER, SMTP_FROM);
	$mail->addAddress('nikolay.panev@gmail.com');
	$mail->Subject = 'Airport Bansko Transfer Test Email';
	$mail->msgHTML('This is a simple test message');
	$mail->AltBody = 'Please use an HTML viewer!';

	$mail->send();
	
	die(json_encode(['status'=>'success', 'error'=>null]));
}
catch(phpmailerException $e) {
	die(json_encode(['status'=>'fail', 'error'=>'Could not sent email. ' . $e->getMessage()]));
}