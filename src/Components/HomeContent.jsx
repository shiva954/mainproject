
// import "../Styles/HomePage.css";
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Carousal from "./Carousal";
// function HomeContent() {
//   const [roomID, setRoomID] = useState('');
//   const navigate = useNavigate();


//   const generateRoomID = () => {
//     const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     let id = '';
//     for (let i = 0; i < 8; i++) {
//       id += chars.charAt(Math.floor(Math.random() * chars.length));
//     }
//     return id;
//   };

  
//   const handleJoinMeeting = () => {
//     const meetingID = roomID || generateRoomID();
//     navigate(`/meeting-room?roomID=${meetingID}`);
//   };

//   return (
//     <div className="home-container">
//       <div className="instantMeet-card">
//       <p className='card-head'>Video Calls and meetings for everyone</p>
//         <p className="card-text">Connect, Collaborate and Celebrate from anywhere with Connect Meet</p>
//       <div className="join-form">
//         <input
//           type="text"
//           placeholder="Enter room ID (optional)"
//           value={roomID}
//           onChange={(e) => setRoomID(e.target.value)}
//           className="room-input"
//         />
//         <button onClick={handleJoinMeeting} className="join-button">
//           Join Meeting
//         </button>
//       </div>
//     </div>
  

//  <div className="right-side">
//         <Carousal />
//       </div>
//     </div>
//   );
// }

// export default HomeContent;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, useTheme, useMediaQuery } from '@mui/material';
import Carousal from "./Carousal";

function HomeContent() {
  const [roomID, setRoomID] = useState('');
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm')); 
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md')); 

  const generateRoomID = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from({ length: 8 }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
  };

  const handleJoinMeeting = () => {
    const meetingID = roomID || generateRoomID();
    navigate(`/meeting-room?roomID=${meetingID}`);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'center',
        justifyContent: 'center',
        gap: { xs: 4, md: 8 },
        px: { xs: 2, sm: 4, md: 6 },
        py: { xs: 4, md: 8 },
        minHeight: '100vh',
        backgroundColor: '#7c95af',
        textAlign: 'center',
      }}
    >
      
      <Box
        sx={{
          maxWidth: 500,
          width: '100%',
          bgcolor: 'white',
          p: { xs: 3, sm: 4, md: 5 },
          borderRadius: '1.5rem',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
          textAlign: { xs: 'center', md: 'left' },
          animation: 'fadeInUp 0.6s ease-in-out',
        }}
      >
        <Typography 
          variant={isSmallScreen ? "h5" : "h4"} 
          fontWeight={700} 
          color="primary.dark" 
          gutterBottom
        >
          Video Calls and meetings for everyone
        </Typography>
        <Typography 
          variant={isSmallScreen ? "body2" : "body1"} 
          color="text.secondary" 
          mb={3}
        >
          Connect, Collaborate and Celebrate from anywhere with Connect Meet
          {/* Connect with anyone, anywhere. Join or create a meeting with a single click. */}
        </Typography>

        {/* Form */}
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: isMediumScreen ? 'column' : 'row',
            gap: 2,
            alignItems: 'center',
          }}
        >
          <TextField
            fullWidth
            placeholder="Enter room ID (optional)"
            value={roomID}
            onChange={(e) => setRoomID(e.target.value)}
            variant="outlined"
            sx={{
              flex: 1,
              '& .MuiOutlinedInput-root': {
                borderRadius: '0.75rem',
                fontSize: { xs: '0.875rem', sm: '1rem' },
              },
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleJoinMeeting}
            sx={{
              fontSize: { xs: '0.875rem', sm: '1rem' },
              fontWeight: 600,
              px: { xs: 2, sm: 3 },
              py: { xs: 1, sm: 1.2 },
              borderRadius: '0.75rem',
              transition: 'transform 0.2s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                backgroundColor: 'primary.dark',
              },
              whiteSpace: 'nowrap',
            }}
          >
            Join Meeting
          </Button>
        </Box>
      </Box>

    
      <Box
        sx={{
          maxWidth: 500,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          animation: 'fadeIn 0.8s ease-in-out',
        }}
      >
        <Carousal />
      </Box>
    </Box>
  );
}

export default HomeContent;















































// import React from 'react'

// const HomeContent = () => {
//   return (
//     <div>HomeContent</div>
//   )
// }

// export default HomeContent;





// import React, { useState, useCallback, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { Card, Button, Input, Row, Col ,message } from 'antd';
// import { VideoCameraOutlined, EnterOutlined } from '@ant-design/icons';
// import Cookies from "js-cookie";
// import { getFreshToken } from '../services/authService';
// import '../Styles/HomePage.css';
// import { baseUrl } from '../App';
// import Carousal from './Carousal';

// const HomeContent = () => {
//   const date = new Date();
//   const options = { weekday: 'long', month: 'short' };
//   const formattedDate = date.toLocaleDateString('en-US', options)
//     .split(' ')
//     .map(word => word.charAt(0).toUpperCase() + word.slice(1))
//     .join(' ');
//   const [roomID, setRoomID] = useState("");
//   const [meetingData, setMeetingData] = useState({
//     title: 'Instant Meet',
//     description: `Instant Meet - ${formattedDate
      
//     }`,
//     date: new Date()
//   });
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleRoomIDChange = (e) => {
//     setRoomID(e.target.value);
//   };

//   const cookie = Cookies.get("session");
//   const session = cookie ? JSON.parse(cookie) : null;
//   if (!session) {
//     navigate("/");
//     return;
//   }

//   const handleJoin = useCallback(() => {
//     if(roomID.trim()==""){
//       message.error("Enter meeting Id")
//       return;
//     }
//     navigate(`/room/${roomID}`);
//   }, [navigate, roomID]);

//   const handleInstantMeet = async () => {
//     setLoading(true);
//     try {
//       const token = await getFreshToken();
//       const response = await axios.post(
//         `${baseUrl}/meetings`,
//         meetingData,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       const meetingId = response.data._id;
//       navigate(`/room/${meetingId}`);
//     } catch (error) {
//       console.error("Error creating instant meeting", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const isReload = sessionStorage.getItem("isReload");
//     if (isReload) {
//       navigate("/dashboard");
//       sessionStorage.removeItem("isReload");
//     }
//   }, [navigate]);

//   window.addEventListener("beforeunload", () => {
//     sessionStorage.setItem("isReload", "true");
//   });

 

//   return (
//     <div className="home-page">
//       {/* <div className="home-content"> */}
//         <Row gutter={16} align="middle" justify="center" className='homerow'>
//         <Col xs={24} sm={16} md={12} lg={8}  className='instant'>
//       <Card
//         className="instantMeet-card"
//       >
//        <p className='card-head'>Video Calls and meetings for everyone</p>
//         <p className="card-text">Connect, Collaborate and Celebrate from anywhere with TalkSphere</p>
//         <Button
//           type="primary"
//           onClick={handleInstantMeet}
//           loading={loading}
//           icon={<VideoCameraOutlined />}
//           className="primary-button"
//         >
//           {loading ? "Creating Meeting..." : "Start Instant Meet"}
//         </Button>

//         <Input
//           placeholder="Enter Meeting ID"
//           value={roomID}
//           onChange={handleRoomIDChange}
//           className="meeting-id-input"
//         />

//         <Button
//           type="default"
//           onClick={handleJoin}
//           icon={<EnterOutlined />}
//           className="join-button"
//         >
//           Join
//         </Button>
//       </Card>
//     </Col>
//           <Col xs={24} sm={16} md={12} lg={10}>
//             <div className="right-side" style={{ textAlign: 'center', marginTop: '20px', height:"50%" }}>
//               <Carousal />
//             </div>
//           </Col>
//         </Row>
//       </div>
//     // </div>
//   );
// };

// export default HomeContent;



// import {useState} from 'react'
// import { useNavigate,Routes,Route } from 'react-router-dom';
// import Room from './Room';
// import '../Styles/HomePage.css';
// function HomeContent() {
//   return (
//     <>
// <Routes>
//   <Route path="/" element={<Home />}/>
//   <Route path="/room/:roomId" element={<Room/>}/>
// </Routes>

//     </>
//   );
// }
// function Home() {
//   const [roomId,setRoomId]=useState("");
//   const navigate = useNavigate()
//   function handlejoin(){
//     navigate(`/room/${roomId}`);
//   }
//   return (
//     <main>
// <h1>Connect Meet</h1>
// <input type="text"
// placeholder="Enter room id"
//  value={roomId}
//  onChange={(e)=>setRoomId(e.target.value)} />

// <button onClick={handlejoin}>join</button>
//     </main>
//   );
// }

// export default HomeContent;
// React implementation with ZegoCloud UIKit Prebuilt
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import "../Styles/HomePage.css";

// function HomeContent() {
//   const [roomID, setRoomID] = useState('');
//   const navigate = useNavigate();

//   // Generate a random room ID if user doesn't provide one
//   const generateRoomID = () => {
//     const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     let id = '';
//     for (let i = 0; i < 8; i++) {
//       id += chars.charAt(Math.floor(Math.random() * chars.length));
//     }
//     return id;
//   };

//   // Handle clicking the join meeting button
//   const handleJoinMeeting = () => {
//     const meetingID = roomID || generateRoomID();
//     navigate(`/meeting-room?roomID=${meetingID}`);
//   };

//   return (
//     <div className="home-container">
//       <h1>Video Meeting App</h1>
//       <div className="join-form">
//         <input
//           type="text"
//           placeholder="Enter room ID (optional)"
//           value={roomID}
//           onChange={(e) => setRoomID(e.target.value)}
//           className="room-input"
//         />
//         <button onClick={handleJoinMeeting} className="join-button">
//           Join Meeting
//         </button>
//       </div>
//     </div>
//   );
// }

// export default HomeContent;


// import "../Styles/HomePage.css";
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Room from "./Room";
// import Carousal from "./Carousal";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// function HomeContent() {
//   const [roomID, setRoomID] = useState('');
//   const navigate = useNavigate();

//   // Generate a random room ID if user doesn't provide one
//   const generateRoomID = () => {
//     const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     let id = '';
//     for (let i = 0; i < 8; i++) {
//       id += chars.charAt(Math.floor(Math.random() * chars.length));
//     }
//     return id;
//   };

//   // Handle clicking the join meeting button
//   const handleJoinMeeting = () => {
//     const meetingID = roomID || generateRoomID();
//     navigate(`/meeting-room?roomID=${meetingID}`);
//   };

//   return (
//     <div className="home-container">
//       <div className="instantMeet-card">
//       <p className='card-head'>Video Calls and meetings for everyone</p>
//         <p className="card-text">Connect, Collaborate and Celebrate from anywhere with Connect Meet</p>
//       <div className="join-form">
//         <input
//           type="text"
//           placeholder="Enter room ID (optional)"
//           value={roomID}
//           onChange={(e) => setRoomID(e.target.value)}
//           className="room-input"
//         />
//         <button onClick={handleJoinMeeting} className="join-button">
//           Join Meeting
//         </button>
//       </div>
//     </div>
  
//  {/* Right Side - Carousal Component */}
//  <div className="right-side">
//         <Carousal />
//       </div>
//     </div>
//   );
// }

// export default HomeContent;


// import { useState } from 'react';
// import { useNavigate, Routes, Route } from 'react-router-dom';
// import Room from './Room';
// import '../Styles/HomePage.css';

// function HomeContent() {
//   return (
//     <div className="home-content">
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/room/:roomId" element={<Room />} />
//       </Routes>
//     </div>
//   );
// }

// function Home() {
//   const [roomId, setRoomId] = useState("");
//   const navigate = useNavigate();
  
//   function handleJoin(e) {
//     e.preventDefault();
//     if (roomId.trim() !== "") {
//       navigate(`/room/${roomId}`);
//     } else {
//       alert("Please enter a room ID");
//     }
//   }
  
//   return (
//     <main className="home-main">
//       <h1>Connect Meet</h1>
//       <div className="join-container">
//         <input 
//           type="text"
//           placeholder="Enter room ID"
//           value={roomId}
//           onChange={(e) => setRoomId(e.target.value)} 
//         />
//         <button onClick={handleJoin}>Join</button>
//       </div>
//     </main>
//   );
// }

// export default HomeContent;

// import * as React from 'react';
// import Box from '@mui/material/Box';

// import Typography from '@mui/material/Typography';

// function HomeContent() {
//   return (
//     <Box
//       sx={{
//         py: 4,
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         textAlign: 'center',
//       }}
//     >
//       <Typography variant="h4" gutterBottom>Welcome to Connect Meet</Typography>
//       <Typography variant="body1">
//         This is your home dashboard where you can see your upcoming meetings and activity.
//       </Typography>
//     </Box>
//   );
// }
// export default HomeContent;





// import React, { useState } from 'react';
// import { 
//   Box, 
//   Typography, 
//   Grid, 
//   Paper, 
//   Button, 
//   Card, 
//   CardContent, 
//   CardMedia,
//   CardActions,
//   Container
// } from '@mui/material';
// import { 
//   VideoCall as VideoCallIcon, 
//   People as PeopleIcon, 
//   Schedule as ScheduleIcon 
// } from '@mui/icons-material';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { getFreshToken } from '../services/authService';
// import { baseUrl } from '../App';

// function HomePageContent() {
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   // Dynamic date formatting
//   const date = new Date();
//   const options = { weekday: 'long', month: 'short', day: 'numeric' };
//   const formattedDate = date.toLocaleDateString('en-US', options)
//     .split(' ')
//     .map(word => word.charAt(0).toUpperCase() + word.slice(1))
//     .join(' ');

//   const handleInstantMeet = async () => {
//     setLoading(true);
//     try {
//       const token = await getFreshToken();
//       const meetingData = {
//         title: 'Instant Meet',
//         description: `Instant Meet - ${formattedDate}`,
//         date: new Date()
//       };

//       const response = await axios.post(
//         `${baseUrl}/meetings`,
//         meetingData,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       const meetingId = response.data._id;
//       navigate(`/room/${meetingId}`);
//     } catch (error) {
//       console.error("Error creating instant meeting", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Box sx={{ flexGrow: 1, py: 4, bgcolor: 'background.default' }}>
//       <Container maxWidth="lg">
//         <Typography 
//           variant="h4" 
//           component="h1" 
//           gutterBottom 
//           sx={{ 
//             textAlign: 'center', 
//             mb: 4, 
//             fontWeight: 'bold' 
//           }}
//         >
//           Welcome to Connect Meet
//         </Typography>

//         <Grid container spacing={4}>
//           {/* Instant Meet Card */}
//           <Grid item xs={12} md={4}>
//             <Card 
//               sx={{ 
//                 height: '100%', 
//                 display: 'flex', 
//                 flexDirection: 'column',
//                 textAlign: 'center'
//               }}
//             >
//               <CardMedia
//                 component="div"
//                 sx={{
//                   pt: '56.25%', // 16:9 aspect ratio
//                   backgroundColor: 'primary.light',
//                   display: 'flex',
//                   justifyContent: 'center',
//                   alignItems: 'center'
//                 }}
//               >
//                 <VideoCallIcon sx={{ fontSize: 80, color: 'primary.contrastText' }} />
//               </CardMedia>
//               <CardContent sx={{ flexGrow: 1 }}>
//                 <Typography gutterBottom variant="h5" component="h2">
//                   Instant Meet
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Start a video call instantly with just one click
//                 </Typography>
//               </CardContent>
//               <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
//                 <Button 
//                   variant="contained" 
//                   color="primary"
//                   startIcon={<VideoCallIcon />}
//                   onClick={handleInstantMeet}
//                   disabled={loading}
//                 >
//                   {loading ? 'Creating Meeting...' : 'Start Meeting'}
//                 </Button>
//               </CardActions>
//             </Card>
//           </Grid>
 
//           {/* Schedule Meeting Card */}
//           <Grid item xs={12} md={4}>
//             <Card 
//               sx={{ 
//                 height: '100%', 
//                 display: 'flex', 
//                 flexDirection: 'column',
//                 textAlign: 'center'
//               }}
//             >
//               <CardMedia
//                 component="div"
//                 sx={{
//                   pt: '56.25%', // 16:9 aspect ratio
//                   backgroundColor: 'secondary.light',
//                   display: 'flex',
//                   justifyContent: 'center',
//                   alignItems: 'center'
//                 }}
//               >
//                 <ScheduleIcon sx={{ fontSize: 80, color: 'secondary.contrastText' }} />
//               </CardMedia>
//               <CardContent sx={{ flexGrow: 1 }}>
//                 <Typography gutterBottom variant="h5" component="h2">
//                   Schedule Meeting
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Plan and schedule your upcoming video meetings
//                 </Typography>
//               </CardContent>
//               <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
//                 <Button 
//                   variant="outlined" 
//                   color="secondary"
//                   startIcon={<ScheduleIcon />}
//                   onClick={() => navigate('/schedule')}
//                 >
//                   Schedule
//                 </Button>
//               </CardActions>
//             </Card>
//           </Grid> 

//           {/* Join Meeting Card */}
//           <Grid item xs={12} md={4}>
//             <Card 
//               sx={{ 
//                 height: '100%', 
//                 display: 'flex', 
//                 flexDirection: 'column',
//                 textAlign: 'center'
//               }}
//             >
//               <CardMedia
//                 component="div"
//                 sx={{
//                   pt: '56.25%', // 16:9 aspect ratio
//                   backgroundColor: 'success.light',
//                   display: 'flex',
//                   justifyContent: 'center',
//                   alignItems: 'center'
//                 }}
//               >
//                 <PeopleIcon sx={{ fontSize: 80, color: 'success.contrastText' }} />
//               </CardMedia>
//               <CardContent sx={{ flexGrow: 1 }}>
//                 <Typography gutterBottom variant="h5" component="h2">
//                   Join Meeting
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Enter a meeting code to join an existing meeting
//                 </Typography>
//               </CardContent>
//               <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
//                 <Button 
//                   variant="outlined" 
//                   color="success"
//                   startIcon={<PeopleIcon />}
//                   onClick={() => navigate('/join')}
//                 >
//                   Join Meeting
//                 </Button>
//               </CardActions>
//             </Card>
//           </Grid>
//         </Grid>

//         {/* Recent Activity Section */}
//         <Box sx={{ mt: 4 }}>
//           <Typography variant="h6" gutterBottom>
//             Recent Activity
//           </Typography>
//           <Paper elevation={2} sx={{ p: 2 }}>
//             <Typography variant="body2" color="text.secondary">
//               No recent meetings. Start your first video call!
//             </Typography>
//           </Paper>
//         </Box>
//       </Container>
//     </Box>
//   );
// }

// export default HomePageContent;











// import React, { useState, useCallback, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { Card, Button, Input, Row, Col ,message } from 'antd';
// import { VideoCameraOutlined, EnterOutlined } from '@ant-design/icons';
// import Cookies from "js-cookie";
// import { getFreshToken } from '../services/authService';
// import '../Styles/HomePage.css';
// import { baseUrl } from '../App';
// import Carousal from './Carousal';


// const HomePageContent = () => {
//   const date = new Date();
//   const options = { weekday: 'long', month: 'short' };
//   const formattedDate = date.toLocaleDateString('en-US', options)
//     .split(' ')
//     .map(word => word.charAt(0).toUpperCase() + word.slice(1))
//     .join(' ');
//   const [roomID, setRoomID] = useState("");
//   const [meetingData, setMeetingData] = useState({
//     title: 'Instant Meet',
//     description: `Instant Meet - ${formattedDate
      
//     }`,
//     date: new Date()
//   });
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const cookie = Cookies.get("session");
//   const session = cookie ? JSON.parse(cookie) : null;
//   if (!session) {
//     navigate("/");
//     return;
//   }


//   const handleInstantMeet = async () => {
//     setLoading(true);
//     try {
//       const token = await getFreshToken();
//       const response = await axios.post(
//         `${baseUrl}/meetings`,
//         meetingData,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       const meetingId = response.data._id;
//       navigate(`/room/${meetingId}`);
//     } catch (error) {
//       console.error("Error creating instant meeting", error);
//     } finally {
//       setLoading(false);
//     }
//   };
//   return (
//     <div className="home-page">
//        <Row gutter={16} align="middle" justify="center" className='homerow'>
//         <Col xs={24} sm={16} md={12} lg={8}  className='instant'>
//       <Card
//         className="instantMeet-card"
//       >
//        <p className='card-head'>Video Calls and meetings for everyone</p>
//         <p className="card-text">Connect, Collaborate and Celebrate from anywhere with Connect Meet</p>
//         <Button
//           type="primary"
//           onClick={handleInstantMeet}
//           loading={loading}
//           icon={<VideoCameraOutlined />}
//           className="primary-button"
//         >
//           {loading ? "Creating Meeting..." : "Start Instant Meet"}
//         </Button>

     
//       </Card>
//     </Col>
//           <Col xs={24} sm={16} md={12} lg={10}>
//             <div className="right-side" style={{ textAlign: 'center', marginTop: '20px', height:"50%" }}>
//               <Carousal />
//             </div>
//           </Col>
//         </Row>
//       </div>
//     // </div>
//   );
// };

// export default HomePageContent;














// import React, { useState } from 'react';
// import { 
//   Box, 
//   Button, 
//   Card, 
//   CardContent, 
//   Typography, 
//   Grid, 
//   CircularProgress 
// } from '@mui/material';
// import VideoCallIcon from '@mui/icons-material/VideoCall';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { getFreshToken } from '../services/authService';
// import { baseUrl } from '../App';
// import Carousal from './Carousal';

// const HomePageContent = () => {
//   const date = new Date();
//   const options = { weekday: 'long', month: 'short' };
//   const formattedDate = date.toLocaleDateString('en-US', options)
//     .split(' ')
//     .map(word => word.charAt(0).toUpperCase() + word.slice(1))
//     .join(' ');

//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const meetingData = {
//     title: 'Instant Meet',
//     description: `Instant Meet - ${formattedDate}`,
//     date: new Date()
//   };

//   const handleInstantMeet = async () => {
//     setLoading(true);
//     try {
//       const token = await getFreshToken();
//       const response = await axios.post(
//         `${baseUrl}/meetings`,
//         meetingData,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       const meetingId = response.data._id;
//       navigate(`/room/${meetingId}`);
//     } catch (error) {
//       console.error("Error creating instant meeting", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Box sx={{ flexGrow: 1, py: 5, bgcolor: 'background.default' }}>
//       <Grid container spacing={4} justifyContent="center" alignItems="center">
//         {/* Left Card */}
//         <Grid item xs={12} md={6} lg={4}>
//           <Card elevation={3} sx={{ p: 3, textAlign: 'center' }}>
//             <CardContent>
//               <Typography variant="h5" fontWeight="bold" gutterBottom>
//                 Video Calls and meetings for everyone
//               </Typography>
//               <Typography variant="body1" color="text.secondary" mb={2}>
//                 Connect, Collaborate and Celebrate from anywhere with Connect Meet
//               </Typography>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <VideoCallIcon />}
//                 onClick={handleInstantMeet}
//                 disabled={loading}
//               >
//                 {loading ? "Creating Meeting..." : "Start Instant Meet"}
//               </Button>
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Right Carousel */}
//         <Grid item xs={12} md={6} lg={6}>
//           <Box sx={{ textAlign: 'center', mt: { xs: 4, md: 0 } }}>
//             <Carousal />
//           </Box>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default HomePageContent;
