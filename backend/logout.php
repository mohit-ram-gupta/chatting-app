<?php
include('connect_db.php');

$sender_id = $_POST['sender_id'];

$conn = mysqli_connect('localhost', 'root', '', 'chatting-app');
if (!$conn) {
    die(json_encode(["message" => "Connection failed: " . mysqli_connect_error()]));
}

$sql = "UPDATE user SET online = 0 WHERE id = '{$sender_id}' ";
$result = mysqli_query($conn, $sql);

mysqli_close($conn);
?>
