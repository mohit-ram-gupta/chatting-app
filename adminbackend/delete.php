<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
// header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Content-Type: application/json");

$id = $_POST['id'];
$conn = mysqli_connect('localhost', 'mycoders', 'mycoders', 'chatting-app');
if (!$conn) {
    die(json_encode(["message" => "Connection failed: " . mysqli_connect_error()]));
}

$sql = "DELETE FROM user WHERE id = '{$id}'";

$result = mysqli_query($conn, $sql);

if ($result) {
    echo json_encode(["message" => "Successful Update"]);
} else {
    echo json_encode(["message" => "Update failed: " . mysqli_error($conn)]);
}

mysqli_close($conn);
?>
