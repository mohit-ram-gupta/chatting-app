<?php
include('connect_db.php');

// Assuming $_POST data is properly sanitized and validated
$sender_id = $_POST['sender_id'];
$receiver_id = $_POST['receiver_id'];
$grp_name = $_POST['grp_name'];

$receiver_id_json = json_encode($receiver_id);

// Insert query
$sql = "INSERT INTO channel (sender_id, receiver_id, grp_name) VALUES ('$sender_id','$receiver_id_json','$grp_name')";

if (mysqli_query($conn, $sql)) {
    $response = array("message" => "Message inserted successfully.");
    echo json_encode($response);  // Output JSON response
} else {
    $response = array("message" => "Message insertion failed: " . mysqli_error($conn));
    echo json_encode($response);  // Output JSON response
}

mysqli_close($conn);
?>
