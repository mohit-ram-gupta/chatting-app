<?php

include('connect_db.php');

$sender_id = $_POST['sender_id'];
$receiver_id = $_POST['receiver_id'];
$sql = "UPDATE messages SET is_read = 1 WHERE sender_id = '{$sender_id}' AND receiver_id = '{$receiver_id}' ";

$result = mysqli_query($conn, $sql);
$sql2 = "SELECT * FROM messages WHERE sender_id = '{$sender_id}' AND receiver_id = '{$receiver_id}' AND is_read = 1";
$result2 = mysqli_query($conn, $sql2);
$userData = array();
if ($result2) {
    $userData['notification'] = mysqli_fetch_all($result2, MYSQLI_ASSOC);
    echo json_encode($userData);
} else {
    echo "Query failed: " . mysqli_error($conn);
}
mysqli_close($conn);
?>
