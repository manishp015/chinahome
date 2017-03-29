<?php
require 'PHPMailer/PHPMailerAutoload.php';
define("_ID_EMAIL_FROM_EMAIL_ADDRESS_NOT_SPECIFIED", 13001);
define("_ID_EMAIL_FROM_EMAIL_ADDRESS_INVALID", 13002);
define("_ID_EMAIL_TO_EMAIL_ADDRESS_NOT_SPECIFIED", 13003);
define("_ID_EMAIL_TO_EMAIL_ADDRESS_INVALID", 13004);
define("_ID_EMAIL_CC_EMAIL_ADDRESS_INVALID", 13005);
define("_ID_EMAIL_BCC_EMAIL_ADDRESS_INVALID", 13006);
define("_ID_EMAIL_ATTACHMENT_FILE_DOES_NOT_EXIST", 13007);

class SendIAssessMails {
    /*
     * Purpose          		- For Sending EMail through Amazon
     *
     * Input Params
     * 1. $sub				- String - Subject of the email to be sent.
     * 2. $msg				- String - Entire content of the email to be sent.
     * 3. $fromEMailAddress	- String - From Address of the email to be sent.
     * 4. $fromName			- String - From Name of the email to be sent.
     * 5. $toEmailAddr		- array	 - Array of email addresses to whom the email address needs to be sent.
     * 6. $toNameArr		- array	 - Array of names of people to whom the email address needs to be sent.
     * 7. $otherOptions 	- object - Other options like CC, BCC, attachements etc.
     *		a.	$otherOptions->CCEMailAddressArr	- Array of email addresses to whom the email address needs to be sent as CC
     *		b.	$otherOptions->CCNameArr           - Array of names of people to whom the email address needs to be sent as CC.
     *		c.	$otherOptions->BCCEMailAddressArr  - Array of email addresses to whom the email address needs to be sent as BCC.
     *		d.	$otherOptions->BCCNameArr          - Array of names of people to whom the email address needs to be sent as BCC.
     *		e.	$otherOptions->attachmentPathArr   - Array of physical path of the attachments to be attached with the Email.
     *
     * Output Params
     *
     * Return Value		- boolean	 - true for success; false for failure.
     */
	
	protected $mailModel;
	
	public function __construct() {
	
	}
	
	public function sendEmail($emailParams, $otherOptions = false, $queued = false) {
		$sub = $emailParams ['subject'];
		$msg = $emailParams ['message'];
		$fromEMailAddress = $emailParams ['fromEmail'];
		$fromName = $emailParams ['fromName'];
		$toEmailAddr = $emailParams ['emailToArr'];
		
			$countryId = 'ZH';
			if ($countryId != 'ZH') {
				return $this->uSendEMailByAmazon ( $toEmailAddr, $fromEMailAddress, $fromName, $sub, $msg, $otherOptions );
			} else {
					return $this->uSendEMailForChina ( $toEmailAddr, $fromEMailAddress, $fromName, $sub, $msg, $otherOptions );
		
			}
	}
	public function uSendEMailByAmazon($toEmailAddr, $fromEMailAddress, $fromName, $sub, $msg, $otherOptions = array()) {
		$fromEMailAddress = trim ( $fromEMailAddress );
		$fromName = trim ( $fromName );
		$sub = trim ( $sub );
		$msg = trim ( $msg );
		
		if ( !filter_var ( $fromEMailAddress, FILTER_VALIDATE_EMAIL )) {
			throw new Exception ( _ID_EMAIL_FROM_EMAIL_ADDRESS_INVALID );
		}
		
		$mail = new PHPMailer ();
		
		$mail->IsSMTP ( true );
		$mail->SMTPAuth = true;
		$mail->Mailer = 'smtp';
		$mail->Host = 'smtp.elasticemail.com';
		$mail->Port = 25;
		$mail->Username = 'b4b2f152-e62b-41e5-8564-35c33cc85923';
		$mail->Password = 'b4b2f152-e62b-41e5-8564-35c33cc85923';
		$mail->Subject = $sub;
		$mail->MsgHTML ( $msg );
		$mail->SetFrom ( $fromEMailAddress, $fromName );
		$mail->AddReplyTo ( $fromEMailAddress, $fromName );
		$mail->Subject = $sub;
		$mail->MsgHTML ( $msg );
		
		if (isset ( $otherOptions ['isChina'] ) && $otherOptions ['isChina']) {
			$mail->Host = 'smtp.elasticemail.com';
			$mail->Port = 2525;
			$mail->Username = 'b4b2f152-e62b-41e5-8564-35c33cc85923';
			$mail->Password = 'b4b2f152-e62b-41e5-8564-35c33cc85923';
		}
		
		if (is_array ( $toEmailAddr )) {
			foreach ( $toEmailAddr as $key => $val ) {
				$emailAddress = trim ( $toEmailAddr [$key] );				
				if (filter_var ( $emailAddress, FILTER_VALIDATE_EMAIL )) {
					$mail->AddAddress ( $emailAddress );
				} else {
					throw new Exception ( _ID_EMAIL_TO_EMAIL_ADDRESS_INVALID );
				}
			}
		} else {
			throw new Exception ( _ID_EMAIL_FROM_EMAIL_ADDRESS_NOT_SPECIFIED );
		}
		
		if (isset ( $otherOptions['ccEMailAddressArr'] ) && count($otherOptions['ccEMailAddressArr']) > 0  )  {
			foreach ( $otherOptions['ccEMailAddressArr'] as $key => $val ) {
				$emailAddress = trim ( $val );
				if (filter_var ( $emailAddress, FILTER_VALIDATE_EMAIL )) { 
					$mail->AddCC ($emailAddress) ;
				} else {
					throw new Exception ( _ID_EMAIL_CC_EMAIL_ADDRESS_INVALID );
				}
			}
		}
		
		if (isset ( $otherOptions['bccEMailAddressArr'] ) && count($otherOptions['bccEMailAddressArr']) > 0 ) {
			foreach ( $otherOptions['bccEMailAddressArr'] as $key => $val ) {
				$emailAddress = trim ( $val );
				$bccName = isset($otherOptions['bccNameArr'][$key] )? trim ( $otherOptions['bccNameArr'][$key] ): '';
				if (filter_var ( $emailAddress, FILTER_VALIDATE_EMAIL )) {
					$mail->AddBCC ( $emailAddress, $bccName );
				} else {
					throw new Exception ( _ID_EMAIL_CC_EMAIL_ADDRESS_INVALID );
				}
			}
		}
		
		if (isset ( $otherOptions['attachmentPathArr'] )  && count($otherOptions['attachmentPathArr']) > 0 ) {
			foreach ( $otherOptions['attachmentPathArr'] as $key => $val ) {
				if (! file_exists ( $val )) {
					throw new Exception ( _ID_EMAIL_ATTACHMENT_FILE_DOES_NOT_EXIST );
				} else {
					$mail->AddAttachment ( $val, $key );
				}
			}
		}
		if ($mail->Send ()) {
			return true;
			
		} else {
			 echo "Mailer Error: " . $mail->ErrorInfo;
			return false;
		}
	}

    public function uSendEMailForChina( $toEmailAddr, $fromEMailAddress, $fromName, $sub, $msg, $otherOptions = array() ) {
    	
        $url = 'http://sendcloud.sohu.com/webapi/mail.send.json';
        $API_USER = 'amcatBatchUserChina';
        $API_KEY = 'r4nOmwobGQukyDob';

        $bccArr = $otherOptions->BCCEMailAddressArr;
        $ccArr = $otherOptions->CCEMailAddressArr;

        if (is_array($bccArr)) {
            $bcc = implode(";", $bccArr);
        } else {
            $bcc = $bccArr;
        }

        if (is_array($ccArr)) {
            $cc = implode(";", $ccArr);
        } else {
            $cc = $ccArr;
        }

        if (is_array($toEmailAddr)) {
            $to = implode(";", $toEmailAddr);
        } else {
            $to = $toEmailAddr;
        }

        $param = array(
            'api_user' => $API_USER,
            'api_key' => $API_KEY,
            'from' => $fromEMailAddress,
            'fromname' => $fromName,
            'to' => $to,
            'subject' => $sub,
            'html' => $msg,
            'bcc' => $bcc,
            'cc' => $cc,
            'resp_email_id' => 'true');

        $data = http_build_query($param);

        $options = array(
            'http' => array(
                'method' => 'POST',
                'header' => 'Content-Type: application/x-www-form-urlencoded',
                'content' => $data
        ));

        $context = stream_context_create($options);
        $result = file_get_contents($url, false, $context);

        $res = json_decode($result, true);

        if ($res['message'] == 'success') {
            return true;
        } else {
            return false;
        }
    }

}

?>