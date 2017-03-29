<?php
    ini_set('display_errors', '0');
	require('connection.php');
    // If the values are posted, insert them into the database.
    if (isset($_POST['name']) && isset($_POST['email'])){
        $name = $_POST['name'];
	     $email =$_POST['email'];
        $organisation = $_POST['org'];
        $country = $_POST['country'];
        $source = $_POST['source'];


        $query = "INSERT INTO `signupdata` (name, organisation, email,country,	source) VALUES ('{$name}', '{$organisation}', '{$email}','{$country}','{$source}')";
		$result = mysqli_query($connection, $query);
        if($result){
            $msg = 1;
        }else{
            $msg = 0;
        }
		echo $msg;
    }
    ?>