<?php
	//require_once "Mail.php";

	if(isset($_POST['submit']) {
		echo 'lalala';
	} else {
		echo 'nono';
	}

	$from   = $_POST['email'];
	$name	= $_POST['name'];

	$to 	= "contacto@eatsmart.mx";
	$subject = "Contacto EATsmart Web Site";

	$headers = "From: " . strip_tags($from) . "\r\n";
	$headers .= "Reply-To": . strip_tags($from) . "\r\n";
	$headers .= "MIME-version: 1.0\r\n";
	$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

	// $host = "ssl://smtp.gmail.com";
	// $port = "465";
	// $username = "contacto@eatsmart.com";
	// $password = "contactoEATsmart123";

	$body = '<html><body>';
	$body .= 	'<img src="http://eatsmart.mx/img/menu/logo.png" alt="EATsmart" />';
	$body .= 	'<table rules="all" style="border-color: #666;" cellpadding="10">';
	$body .= 		'<tr style="background: #eee;">';
	$body .= 			"<td><strong>Nombre:</strong></td><td>" . strip_tags($name) . "</td>";
	$body .=		'</tr>';
	$body .= 		"<tr><td><strong>Email:</strong></td><td>" . strip_tags($from) . "</td></tr>";
	$body .= 		"<tr><td><strong>Mensaje:</strong></td><td>" . strip_tags($_POST['message']) . "</td></tr>";
	$body .= 	'</table>';
	$body .= '</body></html>';

	if(mail($to, $subject, $message, $headers)) {
		echo true;
	} else {
		echo false;
	}

	// $headers = array(
	// 	'From' 	  => $from,
	// 	'To'   	  => $to,
	// 	'Subject' => $subject 
	// );
	// $smtp = Mail::factory('smtp', array(
	// 	'host' 	   => $host,
	// 	'port' 	   => $port,
	// 	'username' => $username,
	// 	'password' => $password
	// ));

	// $mail = $smtp->send($to, $headers, $body);

	// if(PEAR::isError($mail)) {
	// 	echo($mail->getMessage());
	// } else {
	// 	echo("Message successfully sent!\n");
	// }
?>