import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dragDrop from 'drag-drop';
import { setId, setReceiverId } from '../Reducers/UiReducer';

const DragTry = () => {
  const dispatch = useDispatch();
  const { id, receiverId } = useSelector((state) => state.ui);

  const handleDrop = (files) => {
    console.log('Files dropped:', files);
    console.log('Current sender_id:', id);
    console.log('Current receiver_id:', receiverId);

    const formData = new FormData();
    formData.append('sender_id', id);
    formData.append('receiver_id', receiverId);

    let imageFile = null;
    let pdfFile = null;

    // Iterate through dropped files to find image and pdf
    Array.from(files).forEach((file) => {
      if (file.type.includes('image')) {
        if (!imageFile) {
          imageFile = file; // Only keep the first image found
        }
      } else if (file.type.includes('pdf')) {
        if (!pdfFile) {
          pdfFile = file; // Only keep the first pdf found
        }
      }
    });

    if (imageFile) formData.append('image', imageFile);
    if (pdfFile) formData.append('pdf', pdfFile);

    // Send data to backend
    fetch('http://localhost/chatting-app-php-react/backend/upload.php', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  useEffect(() => {
    const dropElement = document.body;

    const dropHandler = (files, pos, fileList, directories) => {
      console.log('Drop event triggered');
      handleDrop(files);
    };

    // Initialize drag-and-drop functionality
    const removeDrop = dragDrop(dropElement, { onDrop: dropHandler });

    // Cleanup function
    return () => {
      removeDrop();
    };
  }, [id, receiverId]); // Depend on id and receiverId to ensure the latest values are used

  return (
    <>
      <div
        style={{
          padding: '20px',
          minHeight: '100px',
          border: '2px dashed gray',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        Drag and drop files here
      </div>
      <div style={{ padding: '30px' }} onClick={() => dispatch(setReceiverId(3))}>
        Dispatch receiver 3
      </div>
      <div style={{ padding: '30px' }} onClick={() => dispatch(setReceiverId(2))}>
        Dispatch receiver 2
      </div>
      <div style={{ padding: '30px' }} onClick={() => dispatch(setId(1))}>
        Dispatch sender 1
      </div>
    </>
  );
};

export default DragTry;
