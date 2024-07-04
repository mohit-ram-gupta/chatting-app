<?php

include('connect_db.php');

$sender_id = $_POST['sender_id'];
$receiver_id = $_POST['receiver_id'];
$message = $_POST['message'];


// $sender_id = '1';
// $receiver_id = '1';
// $message = 'bunty';



// Original
$sql = "INSERT INTO messages (sender_id, receiver_id, message) VALUES ('$sender_id', '$receiver_id', '$message')";

// $sql = "INSERT INTO messages (sender_id, receiver_id, message, image) VALUES ('$sender_id', '$receiver_id', '$message', '$image')";

if (mysqli_query($conn, $sql)) {
    
    $sql1 = "SELECT messages.* FROM messages WHERE (sender_id = {$sender_id} AND receiver_id = {$receiver_id}) OR (sender_id = {$receiver_id} AND receiver_id = {$sender_id});";
    $result1 = mysqli_query($conn, $sql1);
    $userData = array();

    if ($result1) {
        while ($row = mysqli_fetch_assoc($result1)) {
            // Loop through all rows and collect user data
            $userData["message"][] = $row;
        }

        if (!empty($userData["message"])) {
            // Messages found
            echo json_encode($userData);
        } else {
            // No messages found
            $response = array("message" => "No messages found");
            echo json_encode($response);
        }
    } else {
        // Query execution failed
        $response = array("message" => "Query failed: " . mysqli_error($conn));
        echo json_encode($response);
    }
} else {
    // Insertion failed
    $response = array("message" => "Message insertion failed: " . mysqli_error($conn));
    echo json_encode($response);
}

// Close the database connection
mysqli_close($conn);

?>