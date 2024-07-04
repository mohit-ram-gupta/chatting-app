<?php
include('connect_db.php');

// Hardcoded sender_id and receiver_id for now

$sender_id = $_POST['sender_id'];
$receiver_id = $_POST['receiver_id'];
// $sender_id = 1;
// $receiver_id = "2,3";


// Simplified SQL query to retrieve all data from the channel table
$sql = "SELECT * FROM channel";
$result = mysqli_query($conn, $sql);

if ($result) {
    $userData = array();
    while ($row = mysqli_fetch_assoc($result)) {
        // Loop through all rows and collect message data
        $userData["usermessages"][] = $row;
    }

    if (!empty($userData["usermessages"])) {
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

mysqli_close($conn);
?>
