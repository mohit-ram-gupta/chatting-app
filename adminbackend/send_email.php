<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
  
    // Database connection variables (replace with your actual database credentials)
    $servername = "localhost";
    $username = "mycoders";
    $password = "mycoders";
    $dbname = "chatting-app";

    // Create connection
    $conn = mysqli_connect($servername, $username, $password, $dbname);

    // Check connection
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    // Collect form data securely
    $username = mysqli_real_escape_string($conn, $_POST['username']);
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $subject = "forget password";
    $mobile = "9782345233";
    $message = "Hey";

    // $subject = mysqli_real_escape_string($conn, $_POST['subject']);
    // $mobile = mysqli_real_escape_string($conn, $_POST['mobile']);
    // $message = mysqli_real_escape_string($conn, $_POST['message']);

    // Check if username exists in admin table
    $sql = "SELECT * FROM admin WHERE username = '$username'";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
    
            // Send email
            $to = "kr.suraj1602@gmail.com";
            $from = "demo@developeraspl.in";
            $headers = "From: $from\r\n";
            $messageBody = "Subject: $subject\r\n";
            $messageBody .= "Email: $email\r\n"; 
            $messageBody .= "Mobile: $mobile\r\n";
            $messageBody .= "Message: $message\r\n";

            if (mail($to, $subject, $messageBody, $headers)) {
                echo "We have received your request, we will get back to you soon!";
            } else {
                echo "Data saved to the database, but email sending failed.";
            }
        
    } else {
        echo "Username not found in admin database.";
    }

    mysqli_close($conn);
} else {
    echo "Invalid request, Please try later!";
}
?>
