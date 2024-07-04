<?php
session_start();

include('connect_db.php');
$username = $_POST['username'];
$password = $_POST['password'];



$sql = "SELECT * FROM user WHERE username = '{$username}' AND password = '{$password}' ";
$result = mysqli_query($conn, $sql);

$userData = array();

if ($result) {
    $row = mysqli_fetch_assoc($result);

    if ($row) {
        // Authentication succeeded
        $_SESSION['loggedinuser'] = $row; // Store user data in the session
        $id = $_SESSION['loggedinuser']['id'];
        $sql2= "UPDATE user SET online = 1 WHERE id = '{$id}' ";
        $result = mysqli_query($conn, $sql2);
        // Return the user data as a JSON response
        echo json_encode($_SESSION['loggedinuser']);
    } else {
        // Authentication failed
        // echo json_encode(["message" => "Login unsuccessfully"]);
    }
} else {
    // Query execution failed
    echo json_encode(["message" => "Query failed: " . mysqli_error($conn)]);
}

mysqli_close($conn);
?>
