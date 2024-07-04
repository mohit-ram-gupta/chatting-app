<?php
include('connect_db.php');
$sql = "SELECT messages.* FROM messages";

$result = mysqli_query($conn, $sql);
$userData = array();

if ($result) {
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
