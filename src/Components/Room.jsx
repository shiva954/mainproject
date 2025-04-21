
import React, { useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import "../Styles/HomePage.css";

function Room() {
  const meetingContainerRef = useRef(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (meetingContainerRef.current) {
      initMeeting();
    }
  }, []);

  const initMeeting = async () => {
    try {
      // Get the room ID from URL parameters
      const roomID = searchParams.get('roomID');
      
      if (!roomID) {
        alert('Room ID is required');
        navigate('/');
        return;
      }
      
      // Create a random user ID and name
      const userID = Date.now().toString();
      const userName = 'User_' + userID.substring(userID.length - 4);
      
      // Replace with your actual credentials
      const appID = 1882843349; // Replace with your ZEGO AppID as a number
      const serverSecret = 'ea42b5adcb97afde7c6446a3adc451e7'; // Replace with your ZEGO ServerSecret
      
      // Create token
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomID,
        userID,
        userName
      );
      
      // Create the instance
      const zp = ZegoUIKitPrebuilt.create(kitToken);
      
      // Join meeting
      zp.joinRoom({
        container: meetingContainerRef.current,
        sharedLinks: [
          {
            name: 'Copy Meeting Link',
            url: `${window.location.origin}/meeting-room?roomID=${roomID}`,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.GroupCall,
        },
        turnOnMicrophoneWhenJoining: true,
        turnOnCameraWhenJoining: true,
        showMyCameraToggleButton: true,
        showMyMicrophoneToggleButton: true,
        showAudioVideoSettingsButton: true,
        showScreenSharingButton: true,
        showTextChat: true,
        showUserList: true,
        maxUsers: 50,
        layout: 'Auto',
        showLayoutButton: true,
        onLeaveRoom: () => {
          navigate('/');
        }
      });
      
      console.log('Meeting initialized successfully');
    } catch (error) {
      console.error('Error initializing meeting:', error);
      alert('Failed to join meeting. Please try again.');
      navigate('/');
    }
  };

  return (
    <div className="meeting-room">
      <div 
        ref={meetingContainerRef} 
        className="meeting-container"
      ></div>
    </div>
  );
}

export default Room;

