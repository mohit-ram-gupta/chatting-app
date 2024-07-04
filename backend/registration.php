<?php 
 include('connect_db.php');
  
  $username=$_POST['username'];
  $email=$_POST['email'];
  $phone=$_POST['phone'];
  $dob=$_POST['dob'];
  $password=$_POST['password'];


// $username = 'asvdv';
// $email = 'aszx@gmail.com';
// $phone = 9874561236;
// $dob = '1968-08-20';
// $password = '12345';



$hashed_password = password_hash($password, PASSWORD_DEFAULT);

$sql = "INSERT INTO user (username, email, phone, dob, password) VALUES ('$username', '$email', '$phone', '$dob', '$hashed_password')";

$result = mysqli_query($conn, $sql);

if ($result) {
    echo "Record inserted successfully";
} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}

mysqli_close($conn);


?> 