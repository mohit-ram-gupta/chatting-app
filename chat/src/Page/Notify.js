import React, { useEffect, useState } from "react";
import { messaging } from "../firebase";
import { getToken } from "firebase/messaging";
import { useSelector } from "react-redux";

function Notify() {

  const backendUrl = process.env.REACT_APP_API_URL;
  const { id } = useSelector((state) => state.ui);
  const [deviceId, setDeviceId] = useState("");
  const [userId, setUserId] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const storedUserDataString = sessionStorage.getItem("userData");
    if (storedUserDataString) {
      const storedUserData = JSON.parse(storedUserDataString);
      setUserId(storedUserData.id);
    } else {
      console.log("No user data found in sessionStorage");
    }
  }, []);

  useEffect(() => {
    const requestPermission = async () => {
      try {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          const token = await getToken(messaging, {
            vapidKey:
              "BE1nFgn1IH9j6kG2gGhQrAumNsEMOSTchTSnwWyk46MDiwXGUR7Pgqc7GFd_MJwLz--bqZVfP4N29yT16hU4G1Y",
          });
          console.log("Token Gen", token);
          setDeviceId(token);
        } else if (permission === "denied") {
          alert("You denied the notification");
        }
      } catch (error) {
        console.error("Error during permission request", error);
      }
    };

    if (userId) {
      requestPermission();
    }
  }, [userId]);

  useEffect(() => {
    const saveDeviceId = async () => {
      if (userId && deviceId) {
        try {
          const response = await fetch(
            `${backendUrl}/getnotification.php`,
            {
              method: "POST",
              body: JSON.stringify({ userId, deviceId }),
            }
          );

          if (response.ok) {
            const responseData = await response.json();
            console.log("Response Data", responseData);
          } else {
            setError("Invalid User");
          }
        } catch (error) {
          console.error("An error occurred while logging", error);
          setError("An error occurred");
        }
      }
    };

    saveDeviceId();
  }, [userId, deviceId]);

  return <div>{error && <p>{error}</p>}</div>;
}

export default Notify;
