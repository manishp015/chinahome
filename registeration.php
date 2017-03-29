<?php
    
	
	require_once('mail.php');
    // If the values are posted, insert them into the database.
    if (isset($_POST['name']) && isset($_POST['email'])){
        $name = $_POST['name'];
	    $email =$_POST['email'];
        $organisation = $_POST['organisation'];
        $country = $_POST['country'];
        $source = $_POST['source'];
		$designation=$_POST['designation'];
		$mobileNo=$_POST['mobileNo'];
		$source=$_POST['source'];
		
		$mailTemplate="Hi Team,<br /><br />
Following are the details of a new user: <br />
Name&nbsp;&nbsp;:&nbsp;&nbsp; {$name}<br />
Email ID&nbsp;&nbsp;:&nbsp;&nbsp; {$email}<br />
Organisation&nbsp;&nbsp;:&nbsp;&nbsp;{$organisation }<br />
Designation&nbsp;&nbsp;:&nbsp;&nbsp; {$designation}<br />
Phone No.&nbsp;&nbsp;:&nbsp;&nbsp; {$mobileNo}<br />
Country&nbsp;&nbsp;:&nbsp;&nbsp; {$country}<br />
Source&nbsp;&nbsp;:&nbsp;&nbsp; {$source}<br />

Please verify the user details.<br />
Validate the account if the details found are sufficient and correct.
<br /> <br />
<p>Thanks</p>
<p>Team Amcat</p>";

			
$requestedData = array ('emailToArr' => array('manish.pandey@aspiringminds.in','shivanshu.gupta@aspiringminds.in'),'subject' => 'AMCAT - Recruiter interface | Query','message' => $mailTemplate,'fromEmail' => 'donot-reply@amcatmail.cn','fromName' => 'manish' );
$obj = new SendIAssessMails();
$mailerResult = $obj->sendEmail ( $requestedData );
echo $mailerResult;
        
    }
    ?>