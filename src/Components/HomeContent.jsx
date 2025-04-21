

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











































