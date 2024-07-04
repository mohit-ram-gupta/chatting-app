<?php
session_start();
include('connect_db.php');

$username = $_POST['username'];
$password = $_POST['password'];


// Prepare the SQL statement to prevent SQL injection
$sql = "SELECT * FROM user WHERE username = ?";
$stmt = mysqli_prepare($conn, $sql);
mysqli_stmt_bind_param($stmt, 's', $username);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);

if ($result && mysqli_num_rows($result) > 0) {
    $row = mysqli_fetch_assoc($result);
    $hashed_password = $row['password'];

    if (password_verify($password, $hashed_password)) {
        // Authentication succeeded
        $_SESSION['loggedinuser'] = $row; // Store user data in the session
        $id = $_SESSION['loggedinuser']['id'];
        $sql2 = "UPDATE user SET online = 1 WHERE id = ?";
        $stmt2 = mysqli_prepare($conn, $sql2);
        mysqli_stmt_bind_param($stmt2, 'i', $id);
        mysqli_stmt_execute($stmt2);
        
        // Return the user data as a JSON response
        echo json_encode($_SESSION['loggedinuser']);
    } else {
        // Authentication failed
        echo json_encode(["message" => "Invalid credentials."]);
    }
} else {
    // Username does not exist
    echo json_encode(["message" => "Invalid credentials."]);
}

mysqli_close($conn);
?>
