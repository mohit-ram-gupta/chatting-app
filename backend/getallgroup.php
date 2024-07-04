<?php
// include('login.php');
include('connect_db.php');
$sql = "SELECT * FROM channel";
$result = mysqli_query($conn, $sql);
$userData = array();

// echo 'Username: ' . $userDataa['id'];

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
        $response = array("message" => "No channel found");
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
