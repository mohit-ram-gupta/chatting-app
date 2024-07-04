import React, { useEffect, useRef, useState } from "react";
import axios from "axios"; // Removed unnecessary import { all }

import { Box, Grid, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  setReceiverId,
  setUser,
  setallUser,
  setselecteMem,
  toggleSelecteMem,
  setgrp_receiverId,
  setgrp_message,
  setgrp_id,
  setSel_MessId,
  setSel_Mess,
  setMedia,
  setuserName,
  setStatus,
} from "../Reducers/UiReducer"; // Removed unnecessary imports

import { FaRegFaceSmileWink } from "react-icons/fa6";
import { IoVideocamOutline } from "react-icons/io5";
import { IoArrowDownOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";

import { BiLogOutCircle } from "react-icons/bi";

import { IoIosSend } from "react-icons/io";
import { ImAttachment } from "react-icons/im";
import { IoCallOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { IoSearchSharp } from "react-icons/io5";

import { TiTick } from "react-icons/ti";
import { PiDotsThreeOutlineVerticalDuotone } from "react-icons/pi";
import { MdMessage, MdOutlineReplyAll } from "react-icons/md";
import dragDrop from "drag-drop";
import Notify from "./Notify";
import { BsFillImageFill } from "react-icons/bs";
import { BsFillFileEarmarkPdfFill } from "react-icons/bs";

import { BiDownload } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import sound from "../Component/mp3/notify.wav";
import InfiniteScroll from "react-infinite-scroll-component";
import pdfLogo from "../image/pdfLogo.png";
import config from "../config";
import { useRequireAuth } from "../auth";
import io from "socket.io-client";
import DisplaChannel from "./smallComponent/DisplaChannel";
import { GoFileDirectoryFill } from "react-icons/go";
import { RiCheckDoubleLine } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import Media from "./smallComponent/Media";
import zIndex from "@mui/material/styles/zIndex";
// import MessageCountBadge from "../Function/MessageCountBadge";
const fileTypes = ["JPEG", "PNG", "GIF"];
function App() {
  const backendUrl = process.env.REACT_APP_API_URL;
  const imgUrl = process.env.REACT_APP_IMG_URL;

  const [file, setFile] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    id,
    user = [],
    receiverId,
    allUser,
    selectemem,
    grp_receiverId,
    grp_message,
    grp_id,
    sel_mess,
    sel_messId,
    media,
    username,
    status,
  } = useSelector((state) => state.ui);

  const playCalled = useRef(false);
  function play() {
    if (receiverId == id && id == receiverId) new Audio(sound).play();
  }
  function pause() {
    new Audio(sound).pause();
  }

  // Bottom to top code
  const [scrollVal, setScrollVal] = useState(10);
  const [scrollVall, setScrollVall] = useState(10);

  const [hasMoreFilterData, setHasMoreFilterData] = useState(true);
  const [hasMoreFilterDataa, setHasMoreFilterDataa] = useState(true);
  const [scroll, setScroll] = useState(true);

  const [selectedTripID, setSelectedTripID] = useState(null);

  const containerRef = useRef(null);

  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };
  //   useEffect(() => {
  //   if (containerRef.current) {
  //     containerRef.current.scrollTop = containerRef.current.scrollHeight;
  //   }
  // }, [user]); // Assuming `user` is the state holding your messages

  // const scrollToBottom = () => {
  //   setTimeout(() => {
  //     if (containerRef.current) {
  //       containerRef.current.scrollTop = containerRef.current.scrollHeight;
  //     }
  //   }, 0);
  // };

  // // Call scrollToBottom whenever user state changes
  // if (containerRef.current) {
  //   scrollToBottom();
  // }

  const fetchMoreData = () => {
    if (scrollVal >= user.length) {
      setHasMoreFilterData(false);
    }

    setTimeout(() => {
      setScrollVal((prevScrollVal) =>
        prevScrollVal < user.length ? prevScrollVal + 5 : prevScrollVal
      );
    }, 500);
  };

  const fetchMoreDataa = () => {
    if (!grp_message || grp_message.length === 0) return;

    if (scrollVal >= grp_message.length) {
      setHasMoreFilterDataa(false);
    }

    setTimeout(() => {
      setScrollVall((prevScrollVal) =>
        prevScrollVal < grp_message.length ? prevScrollVal + 5 : prevScrollVal
      );
    }, 500);
  };

  const [messageLength, setMessageLength] = useState([]);

  const [selectParticular, setSelectParticular] = useState("");
  const [selectId, setSelectId] = useState("");
  const [shadow, setShadow] = useState("");
  const [shadow2, setShadow2] = useState("");

  const [grpshadow, setgrpshadow] = useState("");
  const [grpidd, setgrpid] = useState("");

  const [channel, setChannel] = useState([]);
  const [messChange, setMessChange] = useState(true);
  const [filter, setFilter] = useState(null);

  const [timeoutCount, setTimeoutCount] = useState(false);

  const [formData, setFormData] = useState({
    sender_id: id,
    receiver_id: !messChange ? receiverId : null,
    grpid: messChange ? grp_id : null,
    message: "",
    image: null,
    pdf: null,
  });

  const [formNoti, setFormNoti] = useState({
    sender_id: id,
    receiver_id: receiverId,
  });
  const [formRead, setFormRead] = useState({
    sender_id: id,
    receiver_id: receiverId,
  });
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const [UserMessage, setUserMessage] = useState({
    sender_id: id,
    // receiver_id: receiverId,
    receiver_id: !messChange ? receiverId : null,
    grpid: messChange ? grp_id : null,
  });

  // const [groupMessage, setGroupMessage] = useState({
  //   sender_id: id,
  //   receiver_id: receiverId,
  // });

  const [UserUpdate, setUserUpdate] = useState({
    sender_id: id,
    receiver_id: id,
  });

  const [LogOut, setLogOut] = useState({
    sender_id: id,
  });

  // useEffect(() => {
  //   play();
  // }, [num]);

  const [toggle, setToggle] = useState(true);

  const handleToggle = () => {
    setToggle((prevToggle) => !prevToggle);
  };

  const [selectedUsers, setSelectedUsers] = useState([]);

  const toggleUserSelection = (userId) => {
    dispatch(setselecteMem(userId));
    console.log("select", selectemem);
    setSelectedUsers((prevSelectedUsers) =>
      prevSelectedUsers.includes(userId)
        ? prevSelectedUsers.filter((id) => id !== userId)
        : [...prevSelectedUsers, userId]
    );
    setChannelData((prevChannelData) => ({
      ...prevChannelData,
      receiver_id: prevChannelData.receiver_id.includes(userId)
        ? prevChannelData.receiver_id.filter((id) => id !== userId)
        : [...prevChannelData.receiver_id, userId],
    }));
    // console.log("selectedUsers", selectedUsers);
  };

  const [channelData, setChannelData] = useState({
    sender_id: id,
    receiver_id: [],
    message: "",
    image: null,
    pdf: null,
    grp_name: null,
  });

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${backendUrl}/getallusers.php`
        // 'http://localhost/chatting-app-php-react/backend/getallusers.php'
      );
      dispatch(setallUser(response.data));
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDrop = (files) => {
    console.log("Files dropped:", files);
    console.log("Current sender_id:", id);
    console.log("Current receiver_id:", receiverId);

    const formData = new FormData();
    formData.append("sender_id", id);
    formData.append("receiver_id", receiverId);

    let imageFile = null;
    let pdfFile = null;

    // Iterate through dropped files to find image and pdf
    Array.from(files).forEach((file) => {
      if (file.type.includes("image")) {
        if (!imageFile) {
          imageFile = file; // Only keep the first image found
        }
      } else if (file.type.includes("pdf")) {
        if (!pdfFile) {
          pdfFile = file; // Only keep the first pdf found
        }
      }
    });

    if (imageFile) formData.append("image", imageFile);
    if (pdfFile) formData.append("pdf", pdfFile);

    // Send data to backend
    // fetch('http://localhost/chatting-app-php-react/backend/upload.php', {
    fetch(`${backendUrl}/upload.php`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    const dropElement = document.body;

    const dropHandler = (files, pos, fileList, directories) => {
      console.log("Drop event triggered");
      handleDrop(files);
    };

    // Initialize drag-and-drop functionality
    const removeDrop = dragDrop(dropElement, { onDrop: dropHandler });

    // Cleanup function
    return () => {
      removeDrop();
    };
  }, [id, receiverId]); // Depend on id and receiverId to ensure the latest values are used

  useEffect(() => {
    axios({
      method: "get",
      // url: "http://localhost/sir/chating-app/backend/getnotify.php",
      // url: `${config.REACT_APP_BACKEND_URL}/getallusers.php`,
      // url: 'http://localhost/chatting-app-php-react/backend/getallusers.php'
      url: `${backendUrl}/getallusers.php`,

      // dataType: "JSON",
      // withCredentials: true,
    })
      .then((response) => {
        dispatch(setallUser(response.data));
        // Handle the response data here
        // console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const [stop, setStop] = useState(true);

  const handleFilter = (e) => {
    const value = e.target.value;

    if (value !== "") {
      setStop(false);
    } else {
      setStop(true);
    }

    // Assuming `user` is an array of objects and you want to filter based on `item.message`
    const filteredData = user.filter((item) => item.message.includes(value));

    // Dispatching the filtered data to your Redux store or state management
    dispatch(setUser(filteredData));
  };

  const handleBoxClick = (item) => {
    // scrollToBottom();
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
    console.log("receiverId", item.id);
    console.log("senderId", id.toString());

    setScroll(!true);
    setgrpshadow("");
    setMessChange(false);
    dispatch(setReceiverId(item.id));
    dispatch(setuserName(item.username));
    dispatch(setStatus(true));

    setSelectId(item.id);
    setSelectParticular(item);
    setFormData({
      ...formData,
      receiver_id: item.id,
    });
    setFormNoti({
      ...formNoti,
      receiver_id: item.id,
    });
    setFormRead({
      ...formRead,
      receiver_id: item.id,
    });
    setUserUpdate({
      sender_id: 0,
      receiver_id: item.id,
    });
    handleReadUpdate(item);
    // handleUpdate();
  };

  const handleGrpBoxClick = (item) => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
    dispatch(setStatus(false));
    dispatch(setuserName(item.grp_name));
    setShadow("");
    setgrpid(item.sender_id);
    setMessChange(true);
    setgrpshadow(item.id);
    dispatch(setgrp_id(item.id));
    dispatch(setgrp_receiverId(item.receiver_id));
    console.log("rece", grp_receiverId);
    handleGrpGet(item);
  };

  const handleInputChange = (e) => {
    const message = e.target.value;
    setFormData({ ...formData, message });
  };
  const handlePdfChange = (e, fileType) => {
    setFormData({
      ...formData,
      [fileType]: e.target.files[0],
    });
  };

  const handleGetChannel = async () => {
    try {
      const response = await axios({
        method: "get",
        // url: 'http://localhost/chatting-app-php-react/backend/getallgroup.php',
        url: `${backendUrl}/getallgroup.php`,
      });
      setChannel(response.data.data);
      console.log("bunty", response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChannel = async (e) => {
    handleGetChannel();
    // dispatch(setselecteMem([]));
    const form = new FormData();
    form.append("sender_id", channelData.sender_id);
    form.append("receiver_id", channelData.receiver_id);
    form.append("message", channelData.message);
    form.append("image", channelData.image);
    form.append("grp_name", channelData.grp_name);
    form.append("pdf", channelData.pdf);
    try {
      const response = await fetch(
        // "http://localhost/sir/chating-app/backend/upload.php",
        // `${config.REACT_APP_BACKEND_URL}/upload.php`,
        // `http://localhost/chatting-app-php-react/backend/createchannel.php`,
        `${backendUrl}/createchannel.php`,

        {
          method: "POST",
          body: form,
        }
      );
      if (response.ok) {
        setSelectedUsers([]);

        setChannelData({
          ...channelData,
          message: "",
          image: null,
          pdf: null,
          grp_name: "",
        });
        handleGetChannel();
        const responseData = await response.json();
        console.log("responseData", responseData);
      } else {
        console.error("Failed to send message");
      }
    } catch (error) {
      console.error("An error occurred while sending the message:", error);
    }
  };

  const handleClick = async () => {
    handleChannel();
    handleGetChannel();
  };

  const handleClear = () => {
    setFormData({ ...formData, message: "" });
  };

  useEffect(() => {
    handleGetChannel();
  }, []);

  const handleSubmit = async (e) => {
    scrollToBottom();

    e.preventDefault();
    const form = new FormData();
    form.append("sender_id", formData.sender_id);
    form.append("receiver_id", formData.receiver_id);
    form.append("grpid", grp_id);

    // if (!messChange) {
    //   form.append("receiver_id", formData.receiver_id);
    // } else {
    //   form.append("grpid", formData.grpid);
    // }

    form.append("message", formData.message);
    form.append("image", formData.image);
    form.append("pdf", formData.pdf);
    // console.log("sel_mess",sel_mess);
    if (sel_mess) {
      form.append("rply_msg", sel_mess);
    } else {
      form.append("rply_msg", "");
    }
    form.append("seen", 1);

    // console.log("formData.grp_id",grp_id);
    try {
      // const url = !messChange
      //   ? 'http://localhost/chatting-app-php-react/backend/upload.php'
      //   : 'http://localhost/chatting-app-php-react/backend/grppupload.php';

      const url = !messChange
        ? `${backendUrl}/upload.php`
        : `${backendUrl}/grppupload.php`;

      const response = await fetch(url, {
        method: "POST",
        body: form,
      });

      if (response.ok) {
        setFormData({
          ...formData,
          message: "",
          image: null,
          pdf: null,
        });
        dispatch(setSel_Mess(null));
        dispatch(setSel_MessId(!null));
        const responseData = await response.json();
        handlenot();
        const { message } = responseData;

        // if (message) {
        if (!messChange) {
          dispatch(setUser(message));
        } else {
          dispatch(setgrp_message(message));
        }
        setTimeoutCount(false); // Assuming setTimeoutCount is defined elsewhere
        // }
      } else {
        console.error("Failed to send message");
      }
    } catch (error) {
      console.error("An error occurred while sending the message:", error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  const handlenot = async (e) => {
    const form = new FormData();
    form.append("receiver_id", formData.receiver_id);
    form.append("msg", formData.message);

    try {
      const url =
        // "http://localhost/chatting-app-php-react/backend/getnotification.php";
        `${backendUrl}/getnotification.php`;

      const response = await fetch(url, {
        method: "POST",
        body: form,
      });

      if (response.ok) {
        const responseData = await response.json();
        const { message } = responseData;

        setFormData({
          ...formData,
          message: "",
          image: null,
          pdf: null,
        });
        if (!messChange) {
          dispatch(setUser(message));
        } else {
          dispatch(setgrp_message(message));
        }
        setTimeoutCount(false); // Assuming setTimeoutCount is defined elsewhere
        // }
      } else {
        console.error("Failed to send message");
      }
    } catch (error) {
      console.error("An error occurred while sending the message:", error);
    }
  };

  const handleNotification = async (e) => {
    // setSender(formData.sender_id);
    // console.log("formData", sender);
    const form = new FormData();
    form.append("sender_id", formNoti.sender_id);
    form.append("receiver_id", formNoti.receiver_id);

    console.log("formnoti", formNoti);
    try {
      const response = await fetch(
        // "http://localhost/sir/chating-app/backend/notification.php",
        // `${config.REACT_APP_BACKEND_URL}/notification.php`,
        // `http://localhost/chatting-app-php-react/backend/notification.php`,
        `${backendUrl}/notification.php`,

        {
          method: "POST",
          body: form,
        }
      );
      // setFormData({
      //   ...formData,
      //   message: "",
      //   image: null,
      //   pdf: null,
      // });

      if (response.ok) {
        const responseData = await response.json();
        const { notification } = responseData;

        if (notification) {
          // console.log("notification", Notification);
          // setTimeoutCount(false);
        }
      } else {
        console.error("Failed to send message");
      }
    } catch (error) {
      console.error("An error occurred while sending the message:", error);
    }
  };

  const handleReadUpdate = async (item) => {
    const form = new FormData();
    form.append("sender_id", id);
    form.append("receiver_id", item.id);

    // console.log("formnoti", formNoti);
    try {
      const response = await fetch(
        // "http://localhost/sir/chating-app/backend/notification.php",
        `${backendUrl}/update_is_read.php`,
        {
          method: "POST",
          body: form,
        }
      );
    } catch (error) {
      console.error("An error occurred while sending the message:", error);
    }
  };

  const handleUpdate = async (e) => {
    setUserUpdate({
      sender_id: id,
    });
    const form = new FormData();
    form.append("sender_id", UserUpdate.sender_id);
    // form.append("sender_id", UserUpdate.sender_id);

    // form.append("is_read", formData.is_read);
    // console.log("form", formData);
    try {
      const response = await fetch(
        // "http://localhost/sir/chating-app/backend/notification.php",
        `${config.REACT_APP_BACKEND_URL}/notification.php`,
        {
          method: "POST",
          body: form,
        }
      );
      if (response.ok) {
        const responseData = await response.json();
        const { data } = responseData;

        if (data) {
          dispatch(setallUser(data));
        }
      } else {
        console.error("Failed to send message");
      }
    } catch (error) {
      console.error("An error occurred while sending the message:", error);
    }
  };

  const handleGet = async () => {
    const form = new FormData();
    form.append("sender_id", UserMessage.sender_id);

    // const url = messChange
    //   ? `http://localhost/chatting-app-php-react/backend/getpttgrpmessage.php`
    //   : `http://localhost/chatting-app-php-react/backend/getptmessage.php`;

    const url = messChange
      ? `${backendUrl}/getpttgrpmessage.php`
      : `${backendUrl}/getptmessage.php`;

    if (!messChange) {
      form.append("receiver_id", UserMessage.receiver_id);
    } else {
      form.append("grp_id", grp_id);
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        body: form,
      });

      if (response.ok) {
        const responseData = await response.json();
        const { usermessages } = responseData;

        if (!messChange) {
          dispatch(setUser(usermessages));
        } else {
          dispatch(setgrp_message(usermessages));
        }

        setTimeoutCount(true);
      } else {
        console.error("Failed to fetch messages");
      }
    } catch (error) {
      console.error("An error occurred while fetching messages:", error);
    }
  };

  const handleGrpGet = async () => {
    setMessChange(true);
    const form = new FormData();
    form.append("sender_id", id);
    // form.append("receiver_id", grp_receiverId);
    // if (!messChange) {
    //   form.append("receiver_id", formData.receiver_id);
    // } else {
    console.log("grp_id", grp_id);
    form.append("grp_id", grp_id);
    // }

    try {
      const response = await fetch(
        // "http://localhost/sir/chating-app/backend/getptmessage.php",
        // `${config.REACT_APP_BACKEND_URL}/getptmessage.php`,
        // `http://localhost/chatting-app-php-react/backend/getpttgrpmessage.php`,
        `${backendUrl}/getpttgrpmessage.php`,

        {
          method: "POST",
          body: form,
        }
      );
      if (response.ok) {
        const responseData = await response.json();
        const { usermessages } = responseData;
        // console.log("usermessages", usermessages);
        dispatch(setgrp_message(usermessages));
        dispatch(setUser(usermessages));
        // console.log("usergrp", user );
        setTimeoutCount(true);
      } else {
        console.error("Failed to fetch messages");
      }
    } catch (error) {
      console.error("An error occurred while fetching messages:", error);
    }
  };

  // useEffect(() => {
  //   if (UserMessage.receiver_id !== null) {
  //     handleGet();
  //     // handleGrpGet();
  //   }
  // }, [UserMessage.receiver_id]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      handleGet();
    }, 1000);

    return () => clearTimeout(timerId);
  }, [stop && user]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      handleGet();
    }, 1000);

    return () => clearTimeout(timerId);
  }, [stop && grp_message]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      fetchData();
    }, 1000);

    return () => clearTimeout(timerId);
  }, [user]);

  // useEffect(() => {
  //   const timerId = setTimeout(() => {
  //     fetchData();
  //   }, 1000);

  //   return () => clearTimeout(timerId);
  // }, [user]);

  // useEffect(() => {
  //   const timerId = setTimeout(() => {
  //     if (messChange === true) {
  //       handleGrpGet();
  //       // console.log("handleGrpGet", handleGrpGet);

  //       } else {
  //       handleGet();
  //       // console.log("handleGet", handleGet);

  //     }
  //   }, 1000);

  //   return () => clearTimeout(timerId);
  // }, [messChange  || user]);

  const handleLogout = async () => {
    sessionStorage.clear();
    localStorage.clear();
    navigate("/chat");

    const form = new FormData();
    form.append("sender_id", LogOut.sender_id);

    // console.log("form", formData);
    try {
      const response = await fetch(
        // "http://localhost/sir/chating-app/backend/upload.php",
        // `${config.REACT_APP_BACKEND_URL}/logout.php`,
        `${backendUrl}/logout.php`,
        {
          method: "POST",
          body: form,
        }
      );
    } catch (error) {
      console.error("An error occurred while sending the message:", error);
    }
  };

  const [filteredMessagesArray, setFilteredMessagesArray] = useState([]);

  useEffect(() => {
    if (Array.isArray(messageLength)) {
      const uniqueUserMessages = messageLength.filter(
        (message, index, self) =>
          index ===
          self.findIndex(
            (m) =>
              m.sender_id === message.sender_id &&
              m.receiver_id === message.receiver_id
          )
      );

      // Update the state using setFilteredMessagesArray
      setFilteredMessagesArray(uniqueUserMessages);
    }
  }, []);

  return (
    <>
      <Notify />
      <Grid
        style={{
          background: "white",
          color: "white",
        }}
        container
      >
        <Grid className="fullscreen-background" item lg={0.7}>
          <Box>
            {" "}
            <Box className="centered-padding-background">
              <img
                className="rounded-square"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVpX6V5vW3sw6xZd0OojjdzPVBNQxZOR8iqALSVhkCtmGXsgW9IDx6o2MFEZAsMlTx0BQ&usqp=CAU"
                alt=""
              />
            </Box>
          </Box>

          <Box mt={3} className="centered-text-large">
            <Box>
              <MdMessage />
            </Box>

            <Box mt={2}>
              <IoCallOutline />
            </Box>

            <Box
              onClick={handleLogout}
              className="padding-background-margintop-cursor"
            >
              <BiLogOutCircle />
            </Box>
          </Box>
        </Grid>

        <Grid style={{}} item lg={3} mx="auto">
          <Box className="padded-colored-background">
            <img
              style={{ width: "100%" }}
              src="https://atypicalsoftware.com/images/logo.png"
              alt=""
            />
          </Box>

          <Paper
            // className="background-height-color"
            style={{
              background: "hsl(206.25deg 66.67% 95.29%)",
              height: "86.5vh",
              color: "black",
              backgroundSize: "100%",
            }}
          >
            {Array.isArray(allUser.data) &&
              allUser.data.map((item, i) => (
                <>
                  {item.id !== id.toString() && (
                    <Box
                      className="my-class"
                      key={i}
                      onClick={() => {
                        // scrollToBottom();
                        handleBoxClick(item);

                        // handleReadUpdate(item);
                        setShadow(item.id);
                        setUserMessage((prevUserMessage) => ({
                          ...prevUserMessage,
                          receiver_id: item.id,
                        }));
                      }}
                      style={{
                        borderLeft:
                          shadow === item.id ? "4px solid #139cec" : "",
                        color: shadow === item.id ? "#139cec" : "",
                        background:
                          shadow === item.id
                            ? "linear-gradient(to right, white, #7ccfff)"
                            : "  hsl(206.25deg 66.67% 95.29%)",
                      }}
                      mt={0}
                    >
                      <Box style={{ display: "flex" }}>
                        <Box
                          style={{
                            color: "white",
                            display: "flex",
                          }}
                          mr={2}
                        >
                          <Box></Box>
                        </Box>

                        <Box mt={1}>
                          <Box style={{ display: "flex" }}>
                            <Box style={{ fontWeight: "500" }}>
                              {" "}
                              {item.username}{" "}
                            </Box>

                            {item.online === "1" ? (
                              <Box
                                ml={1}
                                mt={1}
                                // ml={1}
                                className="custom-style"
                              >
                                {/* online */}
                              </Box>
                            ) : null}
                          </Box>

                          <Box style={{ fontSize: "12px" }}>Send message </Box>
                        </Box>

                        {item.s_seen === "1" && item.r_seen === "0" && (
                          <Box key={i} mt={1} style={{ marginLeft: "140px" }}>
                            <Box
                              style={{
                                background: "#38b6ff",
                                padding: "3px 10px",
                                fontSize: "12px",
                                fontWeight: "bold",
                              }}
                            >
                              New
                            </Box>
                          </Box>
                        )}
                      </Box>
                    </Box>
                  )}
                </>
              ))}

            <Box mt={2} ml={3.5} className="flex-style">
              <button
                style={{ fontWeight: 500, fontSize: "11px" }}
                type="button"
                className="btn btn-outline-primary"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                Create Channel{" "}
                <span style={{ marginTop: "-1px", marginLeft: "2px" }}>
                  {" "}
                  <FaPlus />{" "}
                </span>
              </button>

              <div
                className="modal fade"
                id="exampleModal"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">
                        Create Channel
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <Box>Name of Channel</Box>
                      <Box>
                        <input
                          onChange={(e) =>
                            setChannelData({
                              ...channelData,
                              grp_name: e.target.value,
                            })
                          }
                          value={channelData.grp_name}
                          className="form-control"
                          type="text"
                        />
                      </Box>
                      <Box mt={1}>
                        <h5>Add Member </h5>
                      </Box>
                      <Box>
                        {Array.isArray(allUser.data) &&
                          allUser.data
                            .filter((item) => item.id !== id)
                            .map((item) => (
                              <Box
                                className="new-class"
                                key={item.id}
                                onClick={async () => {
                                  setShadow2(item.id);
                                  toggleUserSelection(item.id);
                                }}
                                style={{
                                  boxShadow:
                                    shadow2 === item.id ? "0 0 5px" : "0 0 1px",
                                }}
                                mt={3}
                              >
                                <Box style={{ display: "flex" }}>
                                  <Box
                                    style={{
                                      color: "black",
                                      marginRight: "8px",
                                    }}
                                  >
                                    <img
                                      className="circle-button"
                                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVpX6V5vW3sw6xZd0OojjdzPVBNQxZOR8iqALSVhkCtmGXsgW9IDx6o2MFEZAsMlTx0BQ&usqp=CAU"
                                      alt=""
                                    />
                                  </Box>
                                  <Box>
                                    <h5>{item.username}</h5>
                                  </Box>
                                  {item.online === "1" && (
                                    <Box className="green-circle"></Box>
                                  )}
                                </Box>
                                <Box>
                                  {selectedUsers.includes(item.id) ? (
                                    <Box>
                                      <TiTick />
                                    </Box>
                                  ) : (
                                    <Box className="center-flex">
                                      <Box style={{ marginTop: "1px" }}>
                                        Add
                                      </Box>
                                      <Box style={{ marginLeft: "4px" }}>
                                        <FaPlus />
                                      </Box>
                                    </Box>
                                  )}
                                </Box>
                              </Box>
                            ))}
                      </Box>
                    </div>
                    <div className="modal-footer">
                      <button
                        onClick={async () => {
                          dispatch(setselecteMem([]));
                        }}
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      <button
                        onClick={handleClick}
                        type="button"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        className="btn btn-primary"
                      >
                        Create
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Box>
            <Box style={{ display: "flex" }}>
              <Box
                style={{ fontWeight: "600", fontSize: "15px" }}
                mt={2}
                ml={3.5}
              >
                Created{" "}
                <span style={{ borderBottom: "2px solid grey" }}>
                  {" "}
                  Channels{" "}
                </span>{" "}
              </Box>
            </Box>
            <Box className="custom-stylee">
              {/* <Box></Box> */}
              {Array.isArray(channel) &&
                channel
                  .filter((item) => {
                    // Remove the surrounding quotes and then split the string
                    const receiverIds = item.receiver_id
                      .replace(/"/g, "")
                      .split(",");
                    return (
                      receiverIds.includes(String(id)) || item.sender_id == id
                    );
                  })
                  .map((item, i) => (
                    <Box
                      key={i}
                      onClick={async () => {
                        await handleGrpBoxClick(item);
                        // handleSetID(item)
                      }}
                      style={{
                        cursor: "pointer",
                        boxShadow: "0 0 1px",

                        background:
                          grpshadow === item.id
                            ? "linear-gradient(to right, white, #7ccfff)"
                            : "  hsl(206.25deg 66.67% 95.29%)",

                        padding: "2px",
                        // color: "white",
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "1rem", // Added marginTop to replace mt={3}
                      }}
                    >
                      <Box style={{ display: "flex" }}>
                        <Box style={{ color: "white" }} mr={2}>
                          <img
                            style={{
                              borderRadius: "18px",
                              width: "20px",
                              height: "20px",
                            }}
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcW9DNhn-g9K9RKPSjBnolksTrOZU6u2Z-RQ&shttps://media.licdn.com/dms/image/D4E12AQHHMdfFMwm3YA/article-cover_image-shrink_720_1280/0/1661728501609?e=2147483647&v=beta&t=3T_AsYyTEklBTggqfGki846L1ksRNavSq-499aWFKII"
                            alt=""
                          />
                        </Box>
                        <Box>
                          <h6>{item.grp_name}</h6>
                          {/* <h5>{item.sender_id}</h5> */}
                        </Box>
                      </Box>
                    </Box>
                  ))}
            </Box>
          </Paper>
        </Grid>
        <Grid item lg={8.3} mx="auto">
          <Paper
            style={{
              padding: "20px",
              height: "100vh",
              // boxShadow: "0 0 5px",
              // background: "white",
              // background: "#faeaf2",
              background: "hsl(0deg 0% 100%)",

              // background: `url(https://img.freepik.com/free-vector/dark-gradient-background-with-copy-space_53876-99548.jpg?w=740&t=st=1695184988~exp=1695185588~hmac=589eaea881d4191567ed9b2ec7660aabb2fa40e541ed15ae923d4cdbb355e64d)`,
              // backgroundSize: "cover",
            }}
          >
            <Box>
              <Box style={{ display: "flex", justifyContent: "space-between" }}>
                <Box
                  style={{
                    fontWeight: "500",
                    display: "flex",
                    color: "hsl(204deg 28.99% 27.06%)",
                  }}
                >
                  <Box>
                    <Box
                      ml={1}
                      style={{ textTransform: "capitalize", fontSize: "20px" }}
                    >
                      {username}
                    </Box>
                    {status && (
                      <Box style={{ display: "flex" }}>
                        <Box
                          ml={1}
                          style={{ fontWeight: "400", fontSize: "12px" }}
                        >
                          Active
                        </Box>{" "}
                        <Box
                          ml={0.6}
                          mt={0.6}
                          style={{
                            fontWeight: "500",
                            background: "green",
                            borderRadius: "30px",
                            width: "8px",
                            height: "8px",
                          }}
                        ></Box>
                      </Box>
                    )}
                  </Box>
                </Box>
                <Box style={{ display: "flex" }}>
                  <Box style={{ color: "grey" }} mt={1} mr={5}>
                    <Box
                      style={{
                        border: "1px solid black",
                        borderRadius: "25px",
                        display: "flex",
                      }}
                    >
                      <Box>
                        <input
                          onChange={(e) => handleFilter(e)}
                          placeholder="Search"
                          style={{
                            outline: "none",
                            border: "none",
                            borderRadius: "25px 0 0 25px",
                            padding: "3px 10px",
                          }}
                          type="Search"
                        />
                      </Box>

                      <Box mr={2}>
                        <IoSearchSharp />
                      </Box>
                    </Box>
                  </Box>

                  <Box
                    onClick={() => dispatch(setMedia(true))}
                    mr={2}
                    style={{
                      background: "#ebf4fb",
                      color: "grey",
                      padding: "8px 12px",
                      fontSize: "20px",
                      borderRadius: "15px",
                      cursor: "pointer",
                    }}
                  >
                    <GoFileDirectoryFill />
                  </Box>

                  {media && <Media />}

                  <Box
                    mr={2}
                    style={{
                      background: "#ebf4fb",
                      color: "grey",
                      padding: "8px 12px",
                      fontSize: "20px",
                      borderRadius: "15px",
                    }}
                  >
                    <IoVideocamOutline />
                  </Box>
                </Box>
              </Box>
              <hr />

              {/* Bottom to top code */}
              {!messChange ? (
                <Box
                  mt={1}
                  style={{
                    background: "hsl(0deg 0% 100%)",
                    padding: "15px",
                    borderRadius: "8px",
                  }}
                  ref={containerRef}
                  sx={{ height: "71vh", overflowY: "scroll" }}
                  onScroll={(e) => {
                    const { scrollTop } = e.target;
                    if (scrollTop <= 20 && hasMoreFilterData) {
                      fetchMoreData();
                    }
                  }}
                >
                  <InfiniteScroll
                    dataLength={scrollVal}
                    next={fetchMoreData}
                    hasMore={hasMoreFilterData}
                    scrollableTarget={containerRef.current}
                  >
                    {Array.isArray(user) &&
                      user.slice(-scrollVal).map((item, index) => {
                        const charCount = item.rply_msg
                          ? item.rply_msg.length
                          : item.message.length;

                        const getWidth = (charCount) => {
                          const baseWidth = 60; // Base width for very short messages
                          const maxWidth = 500; // Maximum width for very long messages
                          const widthPerChar = 7; // Width increment per character
                          return Math.min(
                            baseWidth + charCount * widthPerChar,
                            maxWidth
                          );
                        };

                        const messageWidth = getWidth(charCount) + 10;
                        const defaultMediaWidth = "160px"; // Default width for images and PDFs
                        // const defaultMediaHeight = "auto"; // Default height for images and PDFs
                        const defaultMediaHeight = "100px"; // Default height for images and PDFs

                        return (
                          <React.Fragment key={index}>
                            <Box
                              style={{
                                boxShadow: "3px 3px 16px -4px rgb(0 0 0 / 30%)",
                                width:
                                  item.message || item.rply_msg
                                    ? `${messageWidth}px`
                                    : defaultMediaWidth,
                                height: "auto",
                                color:
                                  item.receiver_id !== selectId
                                    ? "hsl(203.72deg 41.75% 20.2%)"
                                    : "white",
                                marginLeft:
                                  item.receiver_id === selectId
                                    ? "auto"
                                    : "1rem",
                                marginRight:
                                  item.receiver_id !== selectId
                                    ? "auto"
                                    : "1rem",
                                // paddingLeft: "20px",
                                paddingBottom: "2px",
                                borderRadius: "8px",
                                marginTop: index === 0 ? "" : 10,
                                background:
                                  item.receiver_id !== selectId
                                    ? "hsl(206.25deg 66.67% 95.29%)"
                                    : "hsl(0deg 86.14% 60.39%)",
                                whiteSpace: "pre-wrap",
                                overflow: "hidden",
                                wordWrap: "break-word", // Add this line to handle long words
                              }}
                            >
                              <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                // mt={2}
                              >
                                <Grid container>
                                  <Grid item xs={12} lg={10}>
                                    <Box alignItems="center">
                                      <Box
                                        style={{
                                          textOverflow: "ellipsis",
                                        }}
                                      >
                                        {item.message && (
                                          <>
                                            <Box
                                              style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                              }}
                                            >
                                              <Box
                                                style={{
                                                  textTransform: "capitalize",
                                                  fontSize: "15px",
                                                  display: "flex",
                                                  flexDirection: "column",
                                                  justifyContent:
                                                    "space-between",
                                                  paddingLeft: "20px",
                                                  // width: "200px"
                                                  width: "messageWidth",
                                                }}
                                              >
                                                {item.rply_msg && (
                                                  <Box
                                                    mt={2}
                                                    style={{
                                                      background:
                                                        item.receiver_id !==
                                                        selectId
                                                          ? "rgb(19 156 236 / 41%)"
                                                          : "rgb(205 31 31 / 99%)",
                                                      borderRadius: "8px",
                                                      padding: "5px",
                                                      marginBottom: "10px",
                                                      // width: `messageWidth + 12px`
                                                    }}
                                                  >
                                                    {item.rply_msg}
                                                  </Box>
                                                )}
                                                <Box>
                                                  {item.message}{" "}
                                                  {item.receiver_id ==
                                                    receiverId && (
                                                    <span>
                                                      <RiCheckDoubleLine
                                                        style={{
                                                          color:
                                                            item.seen == "1"
                                                              ? "grey"
                                                              : "blue",
                                                        }}
                                                      />{" "}
                                                    </span>
                                                  )}{" "}
                                                </Box>
                                                {/* <br /> */}
                                              </Box>

                                              <Box
                                                style={{ cursor: "pointer" }}
                                                onClick={() => {
                                                  dispatch(
                                                    setSel_MessId(item.id)
                                                  );
                                                  dispatch(
                                                    setSel_Mess(item.message)
                                                  );
                                                  handleToggle();
                                                }}
                                              >
                                                <PiDotsThreeOutlineVerticalDuotone />
                                              </Box>
                                            </Box>
                                          </>
                                        )}

                                        {item.image && (
                                          <a
                                            style={{ textDecoration: "none" }}
                                            // href={`http://localhost/chatting-app-php-react/images/${item.image}`}
                                            href={`${imgUrl}/images/${item.image}`}
                                            // `${imgUrl}/getallusers.php`
                                            target="_blank"
                                            rel="noopener noreferrer"
                                          >
                                            <img
                                              style={{
                                                width: defaultMediaWidth,
                                                height: defaultMediaHeight,
                                                cursor: "pointer",
                                              }}
                                              src={`${imgUrl}/images/${item.image}`}
                                              alt=""
                                            />
                                          </a>
                                        )}

                                        {item.pdf && (
                                          <div style={{ textAlign: "center" }}>
                                            <a
                                              style={{ textDecoration: "none" }}
                                              // href={`http://localhost/chatting-app-php-react/pdf/${item.pdf}`}
                                              href={`${imgUrl}/pdf/${item.pdf}`}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                            >
                                              <img
                                                style={{
                                                  width: "100px",
                                                  // width: defaultMediaWidth,
                                                  // height: defaultMediaHeight,
                                                  // marginRight: "-20px"
                                                }}
                                                src={pdfLogo}
                                                alt=""
                                              />
                                              <span
                                                style={{
                                                  color: "white",
                                                  marginTop: "10px",
                                                }}
                                              >
                                                Download PDF <BiDownload />
                                              </span>
                                            </a>
                                          </div>
                                        )}
                                      </Box>
                                    </Box>
                                  </Grid>
                                </Grid>
                              </Box>

                              {item.id === selectedTripID && (
                                <Box display="flex"></Box>
                              )}
                            </Box>
                            {item.id === sel_messId && toggle ? (
                              <Box style={{ display: "flex" }}>
                                <Box
                                  mt={2}
                                  style={{
                                    background: "#23262f",
                                    padding: "5px 12px",
                                    color: "white",
                                    cursor: "pointer",
                                    marginLeft:
                                      item.sender_id == id ? "600px" : "150px",
                                    borderRadius: "8px",
                                    display: "flex",
                                  }}
                                >
                                  <Box
                                    onClick={() =>
                                      dispatch(setSel_MessId(null))
                                    }
                                    // mt={1}
                                    style={{}}
                                  >
                                    Reply
                                  </Box>
                                  <Box ml={1} mt={0}>
                                    <MdOutlineReplyAll /> &nbsp;
                                  </Box>
                                </Box>
                              </Box>
                            ) : null}
                          </React.Fragment>
                        );
                      })}
                  </InfiniteScroll>

                  <Box
                    style={{
                      position: "absolute",
                      zIndex: 66,
                      top: "500px",
                      right: "450px",
                      justifyContent: "flex-end",
                      cursor: "pointer",
                    }}
                    onClick={scrollToBottom}
                  >
                    {" "}
                    <Box
                      style={{
                        background: "#c1c1c1",
                        padding: "8px 13px",
                        borderRadius: "25px",
                      }}
                    >
                      {" "}
                      <IoArrowDownOutline />
                    </Box>
                  </Box>

                  {sel_messId == null ? (
                    <Box
                      mt={1}
                      style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      <Box style={{ background: "grey", padding: "5px" }}>
                        <Box style={{ color: "white", fontSize: "15px" }}>
                          Reply Message Of
                        </Box>
                        <Box
                          pr={1}
                          style={{ background: "pink", display: "flex" }}
                        >
                          <Box
                            style={{
                              textAlign: "left",
                              padding: "5px 100px",
                              fontWeight: "bold",
                              borderRadius: "10px",
                            }}
                          >
                            {sel_mess}
                          </Box>
                          <Box
                            onClick={() => dispatch(setSel_MessId(!null))}
                            style={{ fontWeight: "bold", cursor: "pointer" }}
                          >
                            <RxCross2 />
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  ) : null}
                </Box>
              ) : (
                <Box
                  mt={1}
                  style={{
                    background: "hsl(0deg 0% 100%)",
                    padding: "15px",
                    borderRadius: "8px",
                  }}
                  ref={containerRef}
                  sx={{
                    height: "71vh",
                    overflowY: "scroll",
                  }}
                  onScroll={(e) => {
                    const { scrollTop, clientHeight, scrollHeight } = e.target;
                    if (scrollTop <= 20 && hasMoreFilterDataa) {
                      fetchMoreDataa();
                    }
                  }}
                >
                  {Array.isArray(grp_message) && grp_message.length > 0 && (
                    <InfiniteScroll
                      dataLength={scrollVall}
                      next={fetchMoreDataa}
                      hasMore={hasMoreFilterDataa}
                      // loader={<h4 style={{ textAlign: "center" }}>Loading...</h4>}
                      endMessage={
                        <p style={{ textAlign: "center" }}>
                          {/* <b>No New Message</b> */}
                        </p>
                      }
                      scrollableTarget={containerRef.current}
                    >
                      {Array.isArray(grp_message) &&
                        grp_message.slice(-scrollVal).map((item, index) => {
                          const charCount = item.rply_msg
                            ? item.rply_msg.length
                            : item.message.length;

                          const getWidth = (charCount) => {
                            const baseWidth = 60; // Base width for very short messages
                            const maxWidth = 600; // Maximum width for very long messages
                            const widthPerChar = 7; // Width increment per character
                            return Math.min(
                              baseWidth + charCount * widthPerChar,
                              maxWidth
                            );
                          };

                          const messageWidth = getWidth(charCount) + 10;
                          const defaultMediaWidth = "160px"; // Default width for images and PDFs
                          // const defaultMediaHeight = "auto"; // Default height for images and PDFs
                          const defaultMediaHeight = "100px"; // Default height for images and PDFs

                          return (
                            <React.Fragment key={index}>
                              <Box
                                style={{
                                  boxShadow:
                                    "3px 3px 16px -4px rgb(0 0 0 / 30%)",
                                  width:
                                    item.message || item.rply_msg
                                      ? `${messageWidth}px`
                                      : defaultMediaWidth,
                                  height: "auto",
                                  color:
                                    item.sender_id !== id.toString()
                                      ? "hsl(203.72deg 41.75% 20.2%)"
                                      : "white",
                                  marginLeft:
                                    item.sender_id == id.toString()
                                      ? "auto"
                                      : "1rem",
                                  marginRight:
                                    item.sender_id !== id.toString()
                                      ? "auto"
                                      : "1rem",
                                  // paddingLeft: "20px",
                                  paddingBottom: "2px",
                                  borderRadius: "8px",
                                  marginTop: index === 0 ? "" : 10,
                                  background:
                                    item.sender_id !== id.toString()
                                      ? "hsl(206.25deg 66.67% 95.29%)"
                                      : "hsl(0deg 86.14% 60.39%)",
                                  whiteSpace: "pre-wrap",
                                  overflow: "hidden",
                                  wordWrap: "break-word", // Add this line to handle long words
                                }}
                              >
                                <Box
                                  display="flex"
                                  justifyContent="space-between"
                                  alignItems="center"
                                  // mt={2}
                                >
                                  <Grid container>
                                    <Grid item xs={12} lg={10}>
                                      <Box alignItems="center">
                                        <Box
                                          style={{
                                            textOverflow: "ellipsis",
                                          }}
                                        >
                                          {item.message && (
                                            <Box
                                              style={{
                                                textTransform: "capitalize",
                                                fontSize: "15px",
                                                display: "flex",
                                                flexDirection: "column",
                                                justifyContent: "space-between",
                                                paddingLeft: "20px",
                                                // width: "200px"
                                                width: "messageWidth",
                                              }}
                                            >
                                              {item.rply_msg && (
                                                <Box
                                                  mt={2}
                                                  style={{
                                                    background:
                                                      item.sender_id !== id
                                                        ? "rgb(19 156 236 / 41%)"
                                                        : "rgb(205 31 31 / 99%)",
                                                    borderRadius: "8px",
                                                    padding: "5px",
                                                    marginBottom: "10px",
                                                    // width: `messageWidth + 12px`
                                                  }}
                                                >
                                                  {item.rply_msg}
                                                  <RiCheckDoubleLine />
                                                </Box>
                                              )}
                                              <Box>
                                                {item.message}{" "}
                                                {!item.rply_msg &&
                                                  item.sender_id !== id && (
                                                    <span
                                                      style={{
                                                        cursor: "pointer",
                                                      }}
                                                      onClick={() => {
                                                        dispatch(
                                                          setSel_MessId(item.id)
                                                        );
                                                        dispatch(
                                                          setSel_Mess(
                                                            item.message
                                                          )
                                                        );
                                                        handleToggle();
                                                      }}
                                                    >
                                                      <PiDotsThreeOutlineVerticalDuotone />
                                                    </span>
                                                  )}
                                              </Box>
                                              {/* <br /> */}
                                            </Box>
                                          )}

                                          {item.image && (
                                            <a
                                              style={{ textDecoration: "none" }}
                                              // href={`http://localhost/chatting-app-php-react/images/${item.image}`}
                                              // href={`${backendUrl}/images/${item.image}`}
                                              href={`${imgUrl}/images/${item.image}`}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                            >
                                              <img
                                                style={{
                                                  width: defaultMediaWidth,
                                                  height: defaultMediaHeight,
                                                  cursor: "pointer",
                                                }}
                                                // src={`http://localhost/chatting-app-php-react/images/${item.image}`}
                                                // href={`${backendUrl}/images/${item.image}`}
                                                src={`${imgUrl}/images/${item.image}`}
                                                alt=""
                                              />
                                            </a>
                                          )}

                                          {item.pdf && (
                                            <div
                                              style={{ textAlign: "center" }}
                                            >
                                              <a
                                                style={{
                                                  textDecoration: "none",
                                                }}
                                                // href={`http://localhost/chatting-app-php-react/pdf/${item.pdf}`}
                                                href={`${imgUrl}/pdf/${item.pdf}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                              >
                                                <img
                                                  style={{
                                                    width: "100px",
                                                  }}
                                                  src={pdfLogo}
                                                  alt=""
                                                />
                                                <span
                                                  style={{
                                                    color: "white",
                                                    marginTop: "10px",
                                                  }}
                                                >
                                                  Download PDF <BiDownload />
                                                </span>
                                              </a>
                                            </div>
                                          )}
                                        </Box>
                                      </Box>
                                    </Grid>
                                  </Grid>
                                </Box>

                                {item.id === selectedTripID && (
                                  <Box display="flex"></Box>
                                )}
                              </Box>
                              {item.id === sel_messId && toggle ? (
                                <Box style={{ display: "flex" }}>
                                  <Box
                                    mt={2}
                                    style={{
                                      background: "#23262f",
                                      padding: "5px 12px",
                                      color: "white",
                                      cursor: "pointer",
                                      marginLeft: "100px",
                                      borderRadius: "8px",
                                      display: "flex",
                                    }}
                                  >
                                    <Box
                                      onClick={() =>
                                        dispatch(setSel_MessId(null))
                                      }
                                      // mt={1}
                                      style={{}}
                                    >
                                      Reply
                                    </Box>
                                    <Box ml={1} mt={0}>
                                      <MdOutlineReplyAll /> &nbsp;
                                    </Box>
                                  </Box>
                                </Box>
                              ) : null}
                            </React.Fragment>
                          );
                        })}
                    </InfiniteScroll>
                  )}
                  <Box
                    style={{
                      position: "absolute",
                      zIndex: 66,
                      top: "500px",
                      right: "450px",
                      justifyContent: "flex-end",
                      cursor: "pointer",
                    }}
                    onClick={scrollToBottom}
                  >
                    {" "}
                    <Box
                      style={{
                        background: "#c1c1c1",
                        padding: "8px 13px",
                        borderRadius: "25px",
                      }}
                    >
                      {" "}
                      <IoArrowDownOutline />
                    </Box>
                  </Box>
                  {sel_messId == null ? (
                    <Box
                      style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      <Box
                        pr={1}
                        style={{ background: "white", display: "flex" }}
                      >
                        <Box
                          style={{
                            textAlign: "left",
                            padding: "5px 100px",
                            fontWeight: "bold",
                            borderRadius: "10px",
                          }}
                        >
                          {sel_mess}
                        </Box>
                        <Box
                          onClick={() => dispatch(setSel_MessId(!null))}
                          style={{ fontWeight: "bold", cursor: "pointer" }}
                        >
                          <RxCross2 />
                        </Box>
                      </Box>
                    </Box>
                  ) : null}
                </Box>
              )}
            </Box>

            <hr />

            <Box
              mt={0.8}
              style={{ display: "flex", justifyContent: "flex-start" }}
            >
              <Box
                mr={2}
                style={{
                  background: "#ebf4fb",
                  padding: "8px 12px",
                  fontSize: "20px",
                  borderRadius: "15px",
                }}
              >
                <FaRegFaceSmileWink />
              </Box>

              {/* <form onSubmit={handleSubmit}> */}
              <Box>
                <input
                  style={{
                    outline: "none",
                    border: "none",
                    width: "700px",
                    padding: "5px 8px",
                    fontSize: "18px",
                    fontWeight: "500",
                    background: "white",
                    borderRadius: "8px",
                    color: "grey",
                  }}
                  type="text"
                  placeholder="Type message"
                  onChange={handleInputChange}
                  value={formData.message}
                  onClick={handleClear}
                  onKeyDown={handleKeyDown}
                  name=""
                  id=""
                />
              </Box>
              <Box
                ml={3}
                style={{
                  background: "rgb(241 67 67)",
                  borderRadius: "25px",
                  padding: "6px 14px",
                  fontSize: "20px",
                  border: "none",
                }}
                onClick={(e) => {
                  handleSubmit(e);
                }}
                className="btn btn-dark"
              >
                <IoIosSend />
                {/* Send */}
              </Box>
              {/* </form> */}

              <Box mt={0.1} ml={2}>
                <div>
                  <div className="dropdown">
                    <button
                      className="btn btn-outline-danger dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <ImAttachment />
                      {/* Upload files */}
                    </button>
                    <ul
                      style={{
                        padding: "10px",
                        background: "#FFC0CB",
                        //  background: "hsl(214.42deg 84.07% 55.69%)"
                      }}
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li
                        style={{ boxShadow: "0 0 5px", background: "whitey" }}
                      >
                        <label htmlFor="image">
                          <div
                            style={{
                              textAlign: "center",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              marginLeft: "40px",
                            }}
                          >
                            <h6>
                              {" "}
                              Image <BsFillImageFill />
                            </h6>
                          </div>

                          <input
                            style={{ display: "none" }}
                            onChange={handleFileChange}
                            // value={formData.image}
                            type="file"
                            className="form-control"
                            id="image"
                          />
                        </label>
                      </li>
                      <li style={{ boxShadow: "0 0 5px", background: "white" }}>
                        <label htmlFor="pdf">
                          <div
                            style={{
                              textAlign: "center",
                              cursor: "pointer",
                              marginLeft: "40px",
                            }}
                          >
                            <h6>
                              Pdf <BsFillFileEarmarkPdfFill />{" "}
                            </h6>
                          </div>
                          <input
                            style={{ display: "none" }}
                            onChange={(e) => handlePdfChange(e, "pdf")}
                            type="file"
                            className="form-control"
                            id="pdf"
                          />
                        </label>
                      </li>
                    </ul>
                  </div>
                </div>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default App;
