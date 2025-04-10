
// import React from 'react'
// import {useParams} from "react-router-dom";
// // import {zegoUIKitprebulit} from "@zegocloud/zego-uikit-prebuilt";
// import {ZegoUIKitPrebuilt} from "@zegocloud/zego-uikit-prebuilt";
// import {v4} from "uuid";

// function Room() {
//   const {roomId} =useParams();
//   async function meetingUI(element) {
//     const appId =1882843349
//     const serverSecret ="ea42b5adcb97afde7c6446a3adc451e7"

//     const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
//       appId,
//       serverSecret,
//       roomId,
//       v4(),
//       "shiva"
//     );

//   const ui = ZegoUIKitPrebuilt.create(kitToken);

// ui.joinRoom({
//   container: element,
//   scenario: {
//     mode: ZegoUIKitPrebuilt.VideoConference
//   },
// });
// }
//   return (
//     <>
//     <h2 style={{ textAlign:"center"}}>Room {roomId}</h2>
//     <div ref={meetingUI}></div>
//     </>
//   )
// }
// export default Room;

// import React, { useEffect, useRef } from 'react';
// import { useParams } from "react-router-dom";
// import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
// import { v4 } from "uuid";

// function Room() {
//   const { roomId } = useParams();
//   const containerRef = useRef(null);

//   useEffect(() => {
//     async function setupMeeting() {
//       const appId = 1882843349;
//       const serverSecret = "ea42b5adcb97afde7c6446a3adc451e7";
      
//       const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
//         appId,
//         serverSecret,
//         roomId,
//         v4(),
//         "shiva"
//       );
      
//       const ui = ZegoUIKitPrebuilt.create(kitToken);
      
//       ui.joinRoom({
//         container: containerRef.current,
//         scenario: {
//           mode: ZegoUIKitPrebuilt.VideoConference
//         },
//       });
//     }
    
//     if (containerRef.current) {
//       setupMeeting();
//     }
//   }, [roomId]);

//   return (
//     <>
//       <h2 style={{ textAlign: "center" }}>Room {roomId}</h2>
//       <div ref={containerRef} style={{ height: "70vh" }}></div>
//     </>
//   );
// }

// export default Room;


// import React, { useEffect, useRef } from 'react';
// import { useParams } from "react-router-dom";
// import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
// import { v4 } from "uuid";

// function Room() {
//   const { roomId } = useParams();
//   const containerRef = useRef(null);

//   useEffect(() => {
//     // Check if the container element exists
//     if (!containerRef.current) return;

//     const initMeeting = async () => {
//       try {
//         // Your Zego credentials
//         const appID = 1882843349;
//         const serverSecret = "ea42b5adcb97afde7c6446a3adc451e7";
//         const userName = "shiva"; // You can make this dynamic if needed
        
//         // Generate a unique user ID for this session
//         const userID = v4();
        
//         // Create the kit token
//         const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
//           appID,
//           serverSecret,
//           roomId,
//           userID,
//           userName
//         );
        
//         // Create the UI instance
//         const zp = ZegoUIKitPrebuilt.create(kitToken);
        
//         // Join the room
//         zp.joinRoom({
//           container: containerRef.current,
//           sharedLinks: [
//             {
//               name: 'Copy Room Link',
//               url: `${window.location.origin}/room/${roomId}`,
//             },
//           ],
//           scenario: {
//             mode: ZegoUIKitPrebuilt.VideoConference,
//           },
//           showScreenSharingButton: true,
//         });
        
//         console.log("Room initialized successfully");
//       } catch (error) {
//         console.error("Failed to initialize room:", error);
//       }
//     };

//     initMeeting();
//   }, [roomId]); // Re-run when roomId changes

//   return (
//     <div className="room-container">
//       <h2 style={{ textAlign: "center", margin: "20px 0" }}>Room: {roomId}</h2>
//       <div 
//         className="video-container" 
//         ref={containerRef} 
//         style={{ 
//           width: "100%", 
//           height: "80vh",
//           border: "1px solid #ccc", 
//           borderRadius: "8px", 
//           overflow: "hidden" 
//         }}
//       ></div>
//     </div>
//   );
// }

// export default Room;
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



// MeetingRoom.js - The actual video meeting room page



// import * as React from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
// import { APP_ID, SERVER_SECRET } from './constants';
// import axios from 'axios';
// import { Layout , Typography } from 'antd';
// import { useState, useEffect, useRef } from 'react';
// import Cookies from 'js-cookie';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchUserProfile } from '../Redux/userSlice';
// import "../Styles/Room.css"
// import { baseUrl } from '../App';
// import logo from '../assets/favicon2.png';

// const {Header} = Layout;
// const {Title} = Typography;
// const Room = () => {
//   const { roomID } = useParams();
//   const navigate = useNavigate();
//   const [token, setToken] = useState('');
//   const [meeting, setMeeting] = useState(null);
//   const [meetingNotFound, setMeetingNotFound] = useState(false);
//   const [meetingNotStarted,setMeetingNotStarted] = useState(false)
//   const [loading, setLoading] = useState(true); // State for loading
//   const dispatch = useDispatch();
//   const hasStartedMeeting = useRef(false);
//   const hasJoinedMeeting = useRef(false);
//   let zpInstance = null;
//   let user = useSelector((state) => state.user.user);


//   useEffect(() => {
//     // Store the current location as the previous page to be used later
//     sessionStorage.setItem('previousPage', location.pathname);
//   }, [location.pathname]);
//   useEffect(() => {
//     window.alert = () => {}; // Suppress all alerts
//     return () => {
//       window.alert = alert; // Restore original alert on unmount
//     };
//   }, []);
  
//   useEffect(() => {
//     //console.log("hello")
//       if (!user) {
//         dispatch(fetchUserProfile());
//       }
//   }, []);
//   // 

//   // Fetch user profile
//   useEffect(() => {
//     const cookie = Cookies.get('session');
//     const session = cookie ? JSON.parse(cookie) : null;
//     if (!session || !session.token) {
//       localStorage.setItem('roomID', roomID);
//       navigate('/');
//       return;
//     }
//     localStorage.removeItem('roomID');
//     // console.log(session.token);
    
//     setToken(session.token);
//   }, [navigate, roomID]);

//   // Fetch meeting details
//   useEffect(() => {
//     const fetchMeeting = async () => {
//       if (!token) return;
//       try {
//         const response = await axios.get(
//           `${baseUrl}/meetings/${roomID}`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         if (!response.data) {
//           setMeetingNotFound(true); // Set fallback when no meeting found
//         } else {
//           setMeeting(response.data);
//         }
//       } catch (error) {
//         console.error('Error fetching meetings:', error);
//         setMeetingNotFound(true); // Set fallback if there's an error
//       }
//       setLoading(false); // Stop loading once the meeting data is fetched
//     };
//     fetchMeeting();
//   }, [token]);


// const startMeetByHost = async () => { 
//   try {
//     const response = await fetch(`${baseUrl}/meetings/startmeet/${roomID}`, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json"
//       }
//     });

//     const data = await response.json();
//      console.log(data);
//   } catch (error) {
//     console.error("Error fetching meetings:", error);
//   }
// };


//   const joinMeet = async (email, id) => {
//     if(hasJoinedMeeting.current) return;
//     hasJoinedMeeting.current = true;
//     try {
//       const response = await axios.post(
//         `${baseUrl}/meetings/joinmeet/${id}`,
//         { email: email },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
  
//       if (response.data.message === "Meeting not started yet") {
//         setMeetingNotStarted(true); // Set fallback when the meeting is not started
//       }
//       // console.log(response);
//     } catch (error) {
//       if (error.response && error.response.status === 404) {
//         if (error.response.data.message === "Meeting not started yet") {
//           setMeetingNotStarted(true)
//           return error.response.data.message
//         }
//       }else  {

//         console.error('Error fetching meetings:', error);
//       }
//     }
//   };
  
//   // Join room using ZEGOCLOUD
//   useEffect(() => {
//     const myMeeting = async () => {
//       let layout = window.innerHeight > 576
//       console.log(layout);
      
//       if (!user || !meeting) return;
//       let isHost = user.uid == meeting.host ? true : false;
//       console.log(isHost , meeting.isActive);
      
//       if(isHost && !meeting.isActive){
//        hasStartedMeeting.current = true
//        console.log("hello");
       
//         await startMeetByHost()
//       }
//       if (!isHost) {
        
//         let userEmail = user.email ?? 'anonymususer@gmail.com';
//         let meetID = roomID;
//        let message =  await joinMeet(userEmail, meetID)
//         // console.log(message)
//        if(message == "Meeting not started yet") {
//         // console.log(meetingNotStarted);
//         return;
//        }
//       }
//       try {
//         const appID = APP_ID;
//         const serverSecret = SERVER_SECRET;
//         const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
//           appID,
//           serverSecret,
//           roomID,
//           user.uid ?? Date.now().toString(),
//           user.name ?? 'Guest'
//         );

//         zpInstance = ZegoUIKitPrebuilt.create(kitToken);
//         zpInstance.joinRoom({
//           container: document.querySelector('.myCallContainer'),
//           sharedLinks: [
//             {
//               name: 'Personal link',
//               url:
//                 window.location.protocol +
//                 '//' +
//                 window.location.host +
//                 window.location.pathname +
//                 '?roomID=' +
//                 roomID,
//             },
//           ],
//           scenario: {
//             mode: ZegoUIKitPrebuilt.GroupCall,
//           },
//           showPreJoinView: true, // Show the pre-join screen
//           preJoinViewConfig: {
//             title: "Join the Meeting", // Custom title for the pre-join screen
//           },
//           layout:"Grid",
//           showLayoutButton: layout,
//           turnOnMicrophoneWhenJoining: false, // Disable mic by default
//           turnOnCameraWhenJoining: true, // Enable camera by default
//           useFrontFacingCamera: true, // Use front-facing camera
//           videoResolutionDefault: "720p", // Set default video resolution
//           enableStereo: true, // Enable stereo sound
//           showTurnOffRemoteCameraButton: isHost,
//           showTurnOffRemoteMicrophoneButton: isHost,
//           showRemoveUserButton: isHost,
//           videoScreenConfig: 'fill',
//         });
//       } catch (error) {
//         console.error('Error starting the meeting:', error);
//       }
//     };
//     myMeeting();
//   }, [user, meeting]);

//   if (loading) {
//     return (
//       <div
//         style={{
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           height: '100vh',
//           backgroundColor: '#E9F5F2',
//           width: '100vw'

//         }}
//       >
//         <div className="loader"></div>
//       </div>
//     );
//   }
//   if (!loading && meetingNotFound){
//     return (
//       <div
//         style={{
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           height: '100vh',
//           width:'100vw',
//           backgroundColor: '#E9F5F2',
//           color: '#2D6A4F',
//           textAlign: 'center',
//         }}
//       >
//         <div>
//           <h1 style={{ fontSize: '3rem', fontWeight: 'bold' }}>Meeting Not Found</h1>
//           <p style={{ fontSize: '1.5rem', marginBottom: '20px' }}>
//             Oops! The meeting you're trying to join doesn't exist or has been deleted.
//           </p>
//           <button
//             onClick={() => navigate('/')}
//             style={{
//               padding: '10px 20px',
//               fontSize: '1.2rem',
//               backgroundColor: '#2D6A4F',
//               color: 'white',
//               border: 'none',
//               borderRadius: '5px',
//               cursor: 'pointer',
//             }}
//           >
//             Go to Home
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (!loading && meeting && meetingNotStarted) {
//     // console.log(meetingNotStarted);
    
//     return (
//       <div
//         style={{
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           height: '100vh',
//           width:'100vw',
//           backgroundColor: '#E9F5F2',
//           color: '#2D6A4F',
//           textAlign: 'center',
//         }}
//       >
//         <div>
//           <h1 style={{ fontSize: '3rem', fontWeight: 'bold' }}>Oops! Meeting Not Started</h1>
//           <p style={{ fontSize: '1.5rem', marginBottom: '20px' }}>
//             The host hasn't started the meeting yet. Please wait and try again later.
//           </p>
//           <button
//             onClick={() => navigate('/')}
//             style={{
//               padding: '10px 20px',
//               fontSize: '1.2rem',
//               backgroundColor: '#2D6A4F',
//               color: 'white',
//               border: 'none',
//               borderRadius: '5px',
//               cursor: 'pointer',
//             }}
//           >
//             Go to Home
//           </button>
//         </div>
//       </div>
//     );
//   }
//   return (
//     <div className='room-container' border="2px solid black">
   
   
//     <div
//       className="myCallContainer"
      
//     ></div>
//     </div>
//   );
// };

// export default Room;





