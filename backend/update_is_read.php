<?php


include('connect_db.php');

$sender_id = $_POST['sender_id'];
$receiver_id = $_POST['receiver_id'];

$sql = "UPDATE messages SET seen = 0 WHERE sender_id = '{$receiver_id}' AND receiver_id = '{$sender_id}' ";
$result = mysqli_query($conn, $sql);


 $sql2 = "UPDATE user SET s_seen = 0 WHERE id = '{$receiver_id}'";
$result2 = mysqli_query($conn, $sql2);

   $sql3 = "UPDATE user SET r_seen = 0 WHERE id = '{$sender_id}'";
$result3 = mysqli_query($conn, $sql3);

$success = false;
if ($result) {
  $success = true;
  $message = "Messages marked as seen successfully";
} else {
  $message = "Failed to mark messages as unseen";
}

mysqli_close($conn);

echo json_encode(array("success" => $success, "message" => $message));
?>