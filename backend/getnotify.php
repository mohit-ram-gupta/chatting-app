<?php
// include('login.php');
include('connect_db.php');
$sql = "SELECT user.username, messages.sender_id, COUNT(*) as NumberOfMessages FROM user INNER JOIN messages ON user.id = messages.sender_id GROUP BY user.username, messages.sender_id";
$result = mysqli_query($conn, $sql);
$userData = array();
if ($result) {
    while ($row = mysqli_fetch_assoc($result)) {
        // Loop through all rows and collect user data
        $userData["data"][] = $row;
    } 
    if (!empty($userData["data"])) {
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
