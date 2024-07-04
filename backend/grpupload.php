<?php
include('connect_db.php');

$sender_id = $_POST['sender_id'];
$receiver_id = $_POST['receiver_id'];


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

    // Insert image, PDF, and message into the database
    $sql = "INSERT INTO channel (sender_id, receiver_id, message, image,pdf) VALUES ('$sender_id', '$receiver_id', '$message','$uniqueImageFileName', '$uniquePdfFileName')";

    if (mysqli_query($conn, $sql)) {
        $sql1 = "SELECT * FROM channel";
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
