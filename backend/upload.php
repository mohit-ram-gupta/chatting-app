<?php
include('connect_db.php');

$sender_id = $_POST['sender_id'];
$receiver_id = $_POST['receiver_id'];


if (!$conn) {
    $response = ['success' => false, 'message' => 'Failed to connect to the database.'];
    // echo json_encode($response);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Check if image file is provided
    if (isset($_FILES['image'])) {
        $uploadDirectory = $_SERVER['DOCUMENT_ROOT'] . '/chatting-app-php-react/images/';

        if (!is_dir($uploadDirectory) || !is_writable($uploadDirectory)) {
            $response = ['success' => false, 'message' => 'Upload directory is not valid.'];
            // echo json_encode($response);
            exit();
        }

        // Handle image file
        $imageFile = $_FILES['image'];
        $imageFileName = $imageFile['name'];
        $imageTempFilePath = $imageFile['tmp_name'];
        $uniqueImageFileName = uniqid() . "_" . $imageFileName;
        $imageTargetFilePath = $uploadDirectory . $uniqueImageFileName;

        if (!move_uploaded_file($imageTempFilePath, $imageTargetFilePath)) {
            $response = ['success' => false, 'message' => 'Failed to move the image file.'];
            // echo json_encode($response);
            exit();
        }
    } else {
        // If image file is not provided, set default value
        $uniqueImageFileName = '';
    }

    // Check if PDF file is provided
    if (isset($_FILES['pdf'])) {
        $pdfUploadDirectory = $_SERVER['DOCUMENT_ROOT'] . '/chatting-app-php-react/pdf/';

        if (!is_dir($pdfUploadDirectory) || !is_writable($pdfUploadDirectory)) {
            $response = ['success' => false, 'message' => 'PDF upload directory is not valid.'];
            // echo json_encode($response);
            exit();
        }

        // Handle PDF file
        $pdfFile = $_FILES['pdf'];
        $pdfFileName = $pdfFile['name'];
        $pdfTempFilePath = $pdfFile['tmp_name'];
        $uniquePdfFileName = uniqid() . "_" . $pdfFileName;
        $pdfTargetFilePath = $pdfUploadDirectory . $uniquePdfFileName;

        if (!move_uploaded_file($pdfTempFilePath, $pdfTargetFilePath)) {
            $response = ['success' => false, 'message' => 'Failed to move the PDF file.'];
            // echo json_encode($response);
            exit();
        }
    } else {
        // If PDF file is not provided, set default value
        $uniquePdfFileName = '';
    }

     // Get the message from POST data
     $message = isset($_POST['message']) ? $_POST['message'] : '';
     $rply_msg = isset($_POST['rply_msg']) ? $_POST['rply_msg'] : '';
     $seen = isset($_POST['seen']) ? $_POST['seen'] : '';
 
 
     // Insert image, PDF, and message into the database
     $sql = "INSERT INTO messages (sender_id, receiver_id, message, rply_msg, image, pdf, seen) VALUES ('$sender_id', '$receiver_id', '$message', '$rply_msg', '$uniqueImageFileName', '$uniquePdfFileName', '$seen')";


//      $sql2 = "UPDATE messages SET seen = 0 WHERE sender_id = '{$receiver_id}' AND receiver_id = '{$sender_id}' ";
// $result2 = mysqli_query($conn, $sql2);



   $sql2 = "UPDATE user SET s_seen = 1 WHERE id = '{$sender_id}'";
$result2 = mysqli_query($conn, $sql2);

   $sql3 = "UPDATE user SET r_seen = 1 WHERE id = '{$receiver_id}'";
$result3 = mysqli_query($conn, $sql3);
    //  $sql1 = "INSERT INTO user (username, email, phone, dob, password, online, status, device_notification_id, sender_id, receiver_id, seen) VALUES ('', '', '', '', '','','','', $sender_id', '$receiver_id', '$seen')";
//      $sql1 = "INSERT INTO user (sender_id, receiver_id, seen)
// VALUES ($sender_id, $receiver_id, $seen)";
//      $result1 = mysqli_query($conn, $sql1);
 
    if (mysqli_query($conn, $sql)) {
        $sql1 = "SELECT * FROM messages";
        $result1 = mysqli_query($conn, $sql1);
        $data = array();

        while ($row = mysqli_fetch_assoc($result1)) {
            $data['image'][] = $row;
        }

        echo json_encode($data);

        $response = ['success' => true, 'message' => 'Files uploaded successfully.', 'data' => $data];
    } else {
        $response = ['success' => false, 'message' => 'Failed to execute SQL query.'];
    }
} else {
    $response = ['success' => false, 'message' => 'Invalid request method.'];
}

header('Content-Type: application/json');
// echo json_encode($response);
?>
