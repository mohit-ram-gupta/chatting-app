<?php
include('connect_db.php');
require '../vendor/autoload.php';
use Google\Auth\OAuth2;

// Function to get access token from Google credentials
function getAccessToken($credentialsPath) {
    $jsonKey = json_decode(file_get_contents($credentialsPath), true);
    $clientEmail = $jsonKey['client_email'];
    $privateKey = $jsonKey['private_key'];
    $scopes = ['https://www.googleapis.com/auth/firebase.messaging'];
    $oauth2 = new OAuth2([
        'audience' => 'https://oauth2.googleapis.com/token',
        'issuer' => $clientEmail,
        'signingAlgorithm' => 'RS256',
        'signingKey' => $privateKey,
        'tokenCredentialUri' => 'https://oauth2.googleapis.com/token',
        'scope' => $scopes,
    ]);

    $token = $oauth2->fetchAuthToken();
    return $token['access_token'];
}

// Function to send notification via Firebase Cloud Messaging
function sendNotification($firebaseToken, $message, $projectId, $accessToken) {
    $url = 'https://fcm.googleapis.com/v1/projects/' . $projectId . '/messages:send';

    $fields = [
        'message' => [
            'token' => $firebaseToken,
            'notification' => [
                'title' => $message['title'],
                'body' => $message['body'],
            ]
        ]
    ];

    $headers = [
        'Authorization: Bearer ' . $accessToken,
        'Content-Type: application/json',
    ];

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($fields));

    $result = curl_exec($ch);
    if ($result === FALSE) {
        die(json_encode(["success" => false, "message" => 'Curl failed: ' . curl_error($ch)]));
    }

    curl_close($ch);
    return $result;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';


 

    if (strpos($contentType, 'text/plain') !== false) {
        // Handle JSON data
        $json = file_get_contents('php://input');
        $data = json_decode($json, true);
        $userId = $data['userId'] ?? null;
        $deviceId = $data['deviceId'] ?? null;

        if ($userId && $deviceId) {
            if (!$conn) {
                die(json_encode(["success" => false, "message" => "Connection failed: " . mysqli_connect_error()]));
            }

            // Update the user's device notification ID
            $updateSql = "UPDATE user SET device_notification_id='$deviceId' WHERE id='$userId'";
            if ($conn->query($updateSql) === TRUE) {
                echo json_encode(["success" => true, "message" => "Token updated successfully"]);
            } else {
                echo json_encode(["success" => false, "message" => "Error: " . $conn->error]);
            }

            $conn->close();
        } else {
            echo json_encode(["success" => false, "message" => "Invalid input"]);
        }
    } elseif (strpos($contentType, 'application/x-www-form-urlencoded') !== false || strpos($contentType, 'multipart/form-data') !== false) {
        // Handle form-encoded data
        $sender_id = $_POST['receiver_id'] ?? null;
        $msg = $_POST['msg'] ?? null;

        if ($sender_id) {
            $conn = mysqli_connect('localhost', 'root', '', 'chatting-app');
            if (!$conn) {
                die(json_encode(["success" => false, "message" => "Connection failed: " . mysqli_connect_error()]));
            }

            $sql = "SELECT device_notification_id FROM user WHERE id='$sender_id'";
            $result = $conn->query($sql);

            if ($result->num_rows > 0) {
                $row = $result->fetch_assoc();
                if (!empty($row['device_notification_id'])) {
                    $firebaseToken = $row['device_notification_id'];
                    $message = [
                        'title' => $msg,
                        'body' => 'You have a new message.'
                    ];
                    $credentialsPath = 'http://localhost/chatting-app-php-react/adminbackend/chat-app-25caa-b6d2314dd545.json';
                    $projectId = 'chat-app-25caa';
                    $accessToken = getAccessToken($credentialsPath);
                    $response = sendNotification($firebaseToken, $message, $projectId, $accessToken);
                    echo $response;
                } else {
                    echo json_encode(["success" => false, "message" => "User does not have a device notification ID"]);
                }
            } else {
                echo json_encode(["success" => false, "message" => "No user found with the given ID"]);
            }

            $conn->close();
        } else {
            echo json_encode(["success" => false, "message" => "Invalid input"]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Unsupported Content-Type"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Invalid request method"]);
}
?>
