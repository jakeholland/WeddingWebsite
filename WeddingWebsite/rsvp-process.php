<?php
	// ** MySQL settings ** //
	define('DB_NAME', 'jtholla2_rsvp');
	define('DB_USER', 'jthol_jtholla2');
	define('DB_PASSWORD', 'Th3M0us3');
	define('DB_HOST', 'localhost');

$conn = mysql_connect(DB_HOST, DB_USER, DB_PASSWORD) or die ('Error connecting to mysql');
$db_selected = mysql_select_db(DB_NAME);

$NAME0 = $_POST['name'];
$EMAIL = $_POST['email'];
$PHONENUMBER = $_POST['phonenumber'];
$GUESTS = $_POST['guests-names'];
$COMMENTS = $_POST['comments'];
$SONG = $_POST['song'];
$NUMBERATTENDING = $_POST['number-attending'];

$to      = $EMAIL;
$subject = '"Thank you for RSVPing!';
$message = 'Thank you for RSVPing, ' .$NAME0. '. The reservation is as follows.\n';
$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
$headers .= 'From: rsvp@jakeandtaylor.com' . "\r\n";
$headers .= 'Reply-To: rsvp@jakeandtaylor.com' . "\r\n";


$sql = "INSERT INTO rsvp ".
       "(NAME0, EMAIL, PHONENUMBER, GUESTS, COMMENTS, SONG, NUMBERATTENDING) ".
       "VALUES('$NAME0','$EMAIL','$PHONENUMBER','$GUESTS','$COMMENTS','$SONG','$NUMBERATTENDING')";

$retval = mysql_query( $sql, $conn );
if(! $retval )
{
  die('Could not enter data: ' . mysql_error());
}
else
{
	echo "Entered data successfully\n";

	//send mail if they entered an email.
	if($EMAIL)
	{
		$mailsent = mail($to, $subject, $message, $headers);
		if($mailsent)
		{
			echo'Mail send successfully';
		}
		else
		{
			echo'Mail was not sent';
		}
	}
}

mysql_close($conn);
?>