<?php
include('connect_db.php');
$sql = "SELECT * FROM messages WHERE is_read = 1";
// $sql = "SELECT sender_id, COUNT(*) as seen FROM messages WHERE is_read = 1 GROUP BY sender_id";
$result = mysqli_query($conn, $sql);
$userData = array();

// echo 'Username: ' . $userDataa['id'];

if ($result) {
    while ($row = mysqli_fetch_assoc($result)) {
        // Loop through all rows and collect user data
        $userData["seen"][] = $row;
    }
    if (!empty($userData["seen"])) {
        // Users found
        echo json_encode($userData);
    } else {
        // No users found
        $response = array("message" => "No users found");
        echo json_encode($response);
    }
} else {
    // Query execution failed
    $response = array("message" => "Query failed: " . mysqli_error($conn));
    echo json_encode($response);
}

// Close the database connection
mysqli_close($conn);
?>
