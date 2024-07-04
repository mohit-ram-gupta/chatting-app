<?php
// include('./connect_db.php');

$username = $_POST['username'];
$password = $_POST['password'];

$conn = mysqli_connect('localhost', 'mycoders', 'mycoders', 'chatting-app');
if (!$conn) {
    die(json_encode(["message" => "Connection failed: " . mysqli_connect_error()]));
}

$sql = "SELECT * FROM admin WHERE username = '{$username}' AND password = '{$password}' ";
$result = mysqli_query($conn, $sql);

$userData = array();

if ($result) {
    $row = mysqli_fetch_assoc($result);

    if ($row) {
        // Authentication succeeded
        $_SESSION['loggedadmin'] = $row; // Store user data in the session
        echo json_encode($_SESSION['loggedadmin']);
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
