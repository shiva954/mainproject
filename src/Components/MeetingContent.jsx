
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/MeetingsPage.css';

function useLocalStorage(key, initialValue) {
  const getStoredValue = () => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  };

  const [storedValue, setStoredValue] = useState(getStoredValue);

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error writing to localStorage key "${key}":`, error);
    }
  };

  useEffect(() => {
    function handleStorageChange(event) {
      if (event.key === key) {
        try {
          setStoredValue(event.newValue ? JSON.parse(event.newValue) : initialValue);
        } catch (error) {
          console.error(`Error handling storage event for key "${key}":`, error);
        }
      }
    }

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key, initialValue]);

  return [storedValue, setValue];
}

function MeetingScheduler() {
  const navigate = useNavigate();
  const [meetings, setMeetings] = useLocalStorage('meetingsData', []);
  const [showForm, setShowForm] = useState(false);
  
  const [newMeeting, setNewMeeting] = useState({
    title: '',
    date: '',
    time: '',
    duration: 30,
    participants: '',
    roomID: '',
    description: ''
  });

  const generateRoomID = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMeeting(prevState => ({ ...prevState, [name]: value }));
  };
  
  const handleScheduleMeeting = (e) => {
    e.preventDefault();
    const meetingToAdd = { ...newMeeting, id: Date.now(), roomID: newMeeting.roomID || generateRoomID() };
    setMeetings(currentMeetings => [...currentMeetings, meetingToAdd]);
    setNewMeeting({ title: '', date: '', time: '', duration: 30, participants: '', roomID: '', description: '' });
    setShowForm(false);
  };
  
  const handleDeleteMeeting = (id) => {
    setMeetings(currentMeetings => currentMeetings.filter(meeting => meeting.id !== id));
  };

  const handleJoinMeeting = (roomID) => {
    navigate(`/meeting-room?roomID=${roomID}`);
  };

  const today = new Date().toISOString().split('T')[0];

  const upcomingMeetings = meetings.filter(meeting => new Date(meeting.date) >= new Date(today));

  return (
    <div className="scheduler-container">
      <div className="scheduler-header">
        <h2>Meeting Scheduler</h2>
        <button className="new-meeting-btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ New Meeting'}
        </button>
      </div>
      {showForm && (
        <form onSubmit={handleScheduleMeeting} className="meeting-form">
          <input type="text" name="title" value={newMeeting.title} onChange={handleInputChange} required placeholder="Meeting Title" />
          <input type="date" name="date" value={newMeeting.date} onChange={handleInputChange} min={today} required />
          <input type="time" name="time" value={newMeeting.time} onChange={handleInputChange} required />
          <select name="duration" value={newMeeting.duration} onChange={handleInputChange} required>
            {[15, 30, 45, 60, 90, 120].map(time => <option key={time} value={time}>{time} min</option>)}
          </select>
          <input type="text" name="participants" value={newMeeting.participants} onChange={handleInputChange} placeholder="Participants (emails)" />
          <input type="text" name="roomID" value={newMeeting.roomID} onChange={handleInputChange} placeholder="Room ID (optional)" />
          <textarea name="description" value={newMeeting.description} onChange={handleInputChange} placeholder="Meeting Description" />
          <button type="submit" className="schedule-btn">Schedule Meeting</button>
        </form>
      )}
      <div className="meetings-list">
        <h3>Upcoming Meetings ({upcomingMeetings.length})</h3>
        {upcomingMeetings.length === 0 ? (
          <p>No scheduled meetings. Create one!</p>
        ) : (
          upcomingMeetings.map(meeting => (
            <div key={meeting.id} className="meeting-card">
              <h4>{meeting.title}</h4>
              <p>{meeting.date} at {meeting.time}</p>
              <button onClick={() => handleJoinMeeting(meeting.roomID)}>Join</button>
              <button onClick={() => handleDeleteMeeting(meeting.id)}>Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MeetingScheduler;



// import * as React from 'react';

// import Box from '@mui/material/Box';

// import Typography from '@mui/material/Typography';

// function MeetingContent() {
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
//       <Typography variant="h4" gutterBottom>Meetings</Typography>
//       <Typography variant="body1">
//         Schedule new meetings or join existing ones from this page.
//       </Typography>
//     </Box>
//   );
// }
// export default MeetingContent;




// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import '../Styles/MeetingsPage.css';

// function MeetingContent() {
//   const navigate = useNavigate();
//   const [meetings, setMeetings] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [newMeeting, setNewMeeting] = useState({
//     title: '',
//     date: '',
//     time: '',
//     duration: 30,
//     participants: '',
//     roomID: '',
//     description: ''
//   });
//   localStorage.setItem('scheduledMeetings', JSON.stringify(meetings))
//   // console.log(meetings)
//   useEffect(() => {
//     const savedMeetings = localStorage.getItem('scheduledMeetings');
//     console.log(savedMeetings)
//     if (savedMeetings) {
//       const meetingsList = JSON.parse(savedMeetings);
//       const today = new Date().setHours(0, 0, 0, 0); // Normalize today's date
  
      
//       const upcomingMeetings = meetingsList.filter(meeting => {
//         const meetingDate = new Date(meeting.date).setHours(0, 0, 0, 0);
//         return meetingDate >= today;
//       });
  
//       setMeetings(upcomingMeetings);
//       localStorage.setItem('scheduledMeetings', JSON.stringify(upcomingMeetings)); // Update storage
//     }
//   }, []);

//   console.log(meetings)
  
  
//   // useEffect(() => {
//   //   const savedMeetings = localStorage.getItem('scheduledMeetings');
//   //   if (savedMeetings) {
//   //     setMeetings(JSON.parse(savedMeetings));
//   //   }
//   // }, []);

//   // useEffect(() => {
//   //   localStorage.setItem('scheduledMeetings', JSON.stringify(meetings));
//   // }, [meetings]);

  
//   const generateRoomID = () => {
//     const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     let id = '';
//     for (let i = 0; i < 8; i++) {
//       id += chars.charAt(Math.floor(Math.random() * chars.length));
//     }
//     return id;
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewMeeting({
//       ...newMeeting,
//       [name]: value
//     });
//   };

//   const handleScheduleMeeting = (e) => {
//     e.preventDefault();
    

//     const meetingToAdd = {
//       ...newMeeting,
//       id: Date.now(),
//       roomID: newMeeting.roomID || generateRoomID()
//     };
    
//     setMeetings([...meetings, meetingToAdd]);
    
  
//     setNewMeeting({
//       title: '',
//       date: '',
//       time: '',
//       duration: 30,
//       participants: '',
//       roomID: '',
//       description: ''
//     });
    
//     setShowForm(false);
//   };

//   const handleDeleteMeeting = (id) => {
//     setMeetings(meetings.filter(meeting => meeting.id !== id));
//   };

//   const handleJoinMeeting = (roomID) => {
//     navigate(`/meeting-room?roomID=${roomID}`);
//   };


//   const today = new Date().toISOString().split('T')[0];

  
//   const formatDate = (dateString) => {
//     const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
//     return new Date(dateString).toLocaleDateString(undefined, options);
//   };

//   return (
//     <div className="scheduler-container">
//       <div className="scheduler-header">
//         <h2>Meeting Scheduler</h2>
//         <button 
//           className="new-meeting-btn"
//           onClick={() => setShowForm(!showForm)}
//         >
//           {showForm ? 'Cancel' : '+ New Meeting'}
//         </button>
//       </div>

//       {showForm && (
//         <div className="meeting-form-container">
//           <form onSubmit={handleScheduleMeeting} className="meeting-form">
//             <div className="form-group">
//               <label htmlFor="title">Meeting Title*</label>
//               <input
//                 type="text"
//                 id="title"
//                 name="title"
//                 value={newMeeting.title}
//                 onChange={handleInputChange}
//                 required
//                 placeholder="Enter meeting title"
//               />
//             </div>

//             <div className="form-row">
//               <div className="form-group">
//                 <label htmlFor="date">Date*</label>
//                 <input
//                   type="date"
//                   id="date"
//                   name="date"
//                   value={newMeeting.date}
//                   onChange={handleInputChange}
//                   min={today}
//                   required
//                 />
//               </div>

//               <div className="form-group">
//                 <label htmlFor="time">Time*</label>
//                 <input
//                   type="time"
//                   id="time"
//                   name="time"
//                   value={newMeeting.time}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>

//               <div className="form-group">
//                 <label htmlFor="duration">Duration (minutes)*</label>
//                 <select
//                   id="duration"
//                   name="duration"
//                   value={newMeeting.duration}
//                   onChange={handleInputChange}
//                   required
//                 >
//                   <option value="15">15</option>
//                   <option value="30">30</option>
//                   <option value="45">45</option>
//                   <option value="60">60</option>
//                   <option value="90">90</option>
//                   <option value="120">120</option>
//                 </select>
//               </div>
//             </div>

//             <div className="form-group">
//               <label htmlFor="participants">Participants (emails, comma separated)</label>
//               <input
//                 type="text"
//                 id="participants"
//                 name="participants"
//                 value={newMeeting.participants}
//                 onChange={handleInputChange}
//                 placeholder="john@example.com, jane@example.com"
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="roomID">Room ID (optional)</label>
//               <input
//                 type="text"
//                 id="roomID"
//                 name="roomID"
//                 value={newMeeting.roomID}
//                 onChange={handleInputChange}
//                 placeholder="Leave empty to generate automatically"
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="description">Description</label>
//               <textarea
//                 id="description"
//                 name="description"
//                 value={newMeeting.description}
//                 onChange={handleInputChange}
//                 placeholder="Meeting agenda or notes"
//                 rows="3"
//               ></textarea>
//             </div>

//             <div className="form-actions">
//               <button type="submit" className="schedule-btn">Schedule Meeting</button>
//             </div>
//           </form>
//         </div>
//       )}

//       <div className="meetings-list">
//         <h3>Upcoming Meetings</h3>
//         {meetings.length === 0 ? (
//           <p className="no-meetings">No scheduled meetings. Create one to get started!</p>
//         ) : (
//           <div className="meeting-cards">
//             {meetings.map(meeting => (
//               <div key={meeting.id} className="meeting-card">
//                 <div className="meeting-card-header">
//                   <h4>{meeting.title}</h4>
//                   <div className="meeting-actions">
//                     <button 
//                       className="join-meeting-btn" 
//                       onClick={() => handleJoinMeeting(meeting.roomID)}
//                     >
//                       Join
//                     </button>
//                     <button 
//                       className="delete-meeting-btn" 
//                       onClick={() => handleDeleteMeeting(meeting.id)}
//                     >
//                       ✕
//                     </button>
//                   </div>
//                 </div>
//                 <div className="meeting-details">
//                   <p><strong>Date & Time:</strong> {formatDate(meeting.date)} at {meeting.time}</p>
//                   <p><strong>Duration:</strong> {meeting.duration} minutes</p>
//                   <p><strong>Room ID:</strong> {meeting.roomID}</p>
//                   {meeting.participants && (
//                     <p><strong>Participants:</strong> {meeting.participants}</p>
//                   )}
//                   {meeting.description && (
//                     <p><strong>Description:</strong> {meeting.description}</p>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default MeetingContent;








// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import '../Styles/MeetingsPage.css';


// function MeetingContent() {
  
//   const navigate = useNavigate();
//   const [meetings, setMeetings] = useState([]); 
//   const [showForm, setShowForm] = useState(false); 
  
  
//   const [newMeeting, setNewMeeting] = useState({
//     title: '',
//     date: '',
//     time: '',
//     duration: 30,
//     participants: '',
//     roomID: '',
//     description: ''
//   });

  
//   useEffect(() => {
//     try {
//       const savedMeetings = sessionStorage.getItem('meetings');
//       if (savedMeetings) {
//         setMeetings(JSON.parse(savedMeetings));
//       }
//     } catch (error) {
//       console.error('Error loading meetings from session storage:', error);
//     }
//   }, []);
  
  
//   useEffect(() => {
//     try {
//       sessionStorage.setItem('meetings', JSON.stringify(meetings));
//     } catch (error) {
//       console.error('Error saving meetings to session storage:', error);
//     }
//   }, [meetings]);

  
//   const generateRoomID = () => {
//     const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     let id = '';
//     for (let i = 0; i < 8; i++) {
//       id += chars.charAt(Math.floor(Math.random() * chars.length));
//     }
//     return id;
//   };


//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewMeeting(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

  
//   const handleScheduleMeeting = (e) => {
//     e.preventDefault();
    
   
//     const meetingToAdd = {
//       ...newMeeting,
//       id: Date.now(),
//       roomID: newMeeting.roomID || generateRoomID() 
//     };
    
   
//     setMeetings(prevMeetings => [...prevMeetings, meetingToAdd]);
    
  
//     setNewMeeting({
//       title: '',
//       date: '',
//       time: '',
//       duration: 30,
//       participants: '',
//       roomID: '',
//       description: ''
//     });
    
  
//     setShowForm(false);
//   };

  
//   const handleDeleteMeeting = (id) => {
//     setMeetings(prevMeetings => prevMeetings.filter(meeting => meeting.id !== id));
//   };


//   const handleJoinMeeting = (roomID) => {
//     navigate(`/meeting-room?roomID=${roomID}`);
//   };


//   const today = new Date().toISOString().split('T')[0];
  

//   const formatDate = (dateString) => {
//     const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
//     return new Date(dateString).toLocaleDateString(undefined, options);
//   };


//   const upcomingMeetings = meetings.filter(meeting => {
//     const meetingDate = new Date(meeting.date).setHours(0, 0, 0, 0);
//     const todayDate = new Date().setHours(0, 0, 0, 0); 
//     return meetingDate >= todayDate;
//   });


//   const toggleForm = () => {
//     setShowForm(prevState => !prevState);
//   };

//   return (
//     <div className="scheduler-container">

//       <div className="scheduler-header">
//         <h2>Meeting Scheduler</h2>
//         <button 
//           className="new-meeting-btn"
//           onClick={toggleForm}
//         >
//           {showForm ? 'Cancel' : '+ New Meeting'}
//         </button>
//       </div>

     
//       {showForm && (
//         <div className="meeting-form-container">
//           <form onSubmit={handleScheduleMeeting} className="meeting-form">
            
//             <div className="form-group">
//               <label htmlFor="title">Meeting Title*</label>
//               <input
//                 type="text"
//                 id="title"
//                 name="title"
//                 value={newMeeting.title}
//                 onChange={handleInputChange}
//                 required
//                 placeholder="Enter meeting title"
//               />
//             </div>

            
//             <div className="form-row">
//               <div className="form-group">
//                 <label htmlFor="date">Date*</label>
//                 <input
//                   type="date"
//                   id="date"
//                   name="date"
//                   value={newMeeting.date}
//                   onChange={handleInputChange}
//                   min={today}
//                   required
//                 />
//               </div>

//               <div className="form-group">
//                 <label htmlFor="time">Time*</label>
//                 <input
//                   type="time"
//                   id="time"
//                   name="time"
//                   value={newMeeting.time}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>

//               <div className="form-group">
//                 <label htmlFor="duration">Duration (minutes)*</label>
//                 <select
//                   id="duration"
//                   name="duration"
//                   value={newMeeting.duration}
//                   onChange={handleInputChange}
//                   required
//                 >
//                   <option value="15">15</option>
//                   <option value="30">30</option>
//                   <option value="45">45</option>
//                   <option value="60">60</option>
//                   <option value="90">90</option>
//                   <option value="120">120</option>
//                 </select>
//               </div>
//             </div>

        
//             <div className="form-group">
//               <label htmlFor="participants">Participants (emails, comma separated)</label>
//               <input
//                 type="text"
//                 id="participants"
//                 name="participants"
//                 value={newMeeting.participants}
//                 onChange={handleInputChange}
//                 placeholder="john@example.com, jane@example.com"
//               />
//             </div>

      
//             <div className="form-group">
//               <label htmlFor="roomID">Room ID (optional)</label>
//               <input
//                 type="text"
//                 id="roomID"
//                 name="roomID"
//                 value={newMeeting.roomID}
//                 onChange={handleInputChange}
//                 placeholder="Leave empty to generate automatically"
//               />
//             </div>

      
//             <div className="form-group">
//               <label htmlFor="description">Description</label>
//               <textarea
//                 id="description"
//                 name="description"
//                 value={newMeeting.description}
//                 onChange={handleInputChange}
//                 placeholder="Meeting agenda or notes"
//                 rows="3"
//               ></textarea>
//             </div>

            
//             <div className="form-actions">
//               <button type="submit" className="schedule-btn">Schedule Meeting</button>
//             </div>
//           </form>
//         </div>
//       )}

    
//       <div className="meetings-list">
//         <h3>Upcoming Meetings</h3>
//         {upcomingMeetings.length === 0 ? (
//           <p className="no-meetings">No scheduled meetings. Create one to get started!</p>
//         ) : (
//           <div className="meeting-cards">
            
//             {upcomingMeetings.map(meeting => (
//               <div key={meeting.id} className="meeting-card">
//                 <div className="meeting-card-header">
//                   <h4>{meeting.title}</h4>
//                   <div className="meeting-actions">
//                     <button 
//                       className="join-meeting-btn" 
//                       onClick={() => handleJoinMeeting(meeting.roomID)}
//                       aria-label={`Join meeting ${meeting.title}`}
//                     >
//                       Join
//                     </button>
//                     <button 
//                       className="delete-meeting-btn" 
//                       onClick={() => handleDeleteMeeting(meeting.id)}
//                       aria-label={`Delete meeting ${meeting.title}`}
//                     >
//                       ✕
//                     </button>
//                   </div>
//                 </div>
//                 <div className="meeting-details">
//                   <p><strong>Date & Time:</strong> {formatDate(meeting.date)} at {meeting.time}</p>
//                   <p><strong>Duration:</strong> {meeting.duration} minutes</p>
//                   <p><strong>Room ID:</strong> {meeting.roomID}</p>
//                   {meeting.participants && (
//                     <p><strong>Participants:</strong> {meeting.participants}</p>
//                   )}
//                   {meeting.description && (
//                     <p><strong>Description:</strong> {meeting.description}</p>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default MeetingContent;











// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import '../Styles/MeetingsPage.css';

// // Custom hook for localStorage
// function useLocalStorage(key, initialValue) {
//   // Function to get value from localStorage
//   const getStoredValue = () => {
//     try {
//       const item = window.localStorage.getItem(key);
//       return item ? JSON.parse(item) : initialValue;
//     } catch (error) {
//       console.error(`Error reading localStorage key "${key}":`, error);
//       return initialValue;
//     }
//   };

//   // State to store the value
//   const [storedValue, setStoredValue] = useState(getStoredValue);

//   // Function to update both state and localStorage
//   const setValue = (value) => {
//     try {
//       // Special handling for functions like in useState
//       const valueToStore = value instanceof Function ? value(storedValue) : value;
      
//       // Save to state
//       setStoredValue(valueToStore);
      
//       // Save to localStorage
//       window.localStorage.setItem(key, JSON.stringify(valueToStore));
      
//       console.log(`Successfully saved to localStorage key "${key}":`, valueToStore);
//     } catch (error) {
//       console.error(`Error writing to localStorage key "${key}":`, error);
//     }
//   };

//   // Effect to sync with localStorage changes from other tabs/windows
//   useEffect(() => {
//     function handleStorageChange(event) {
//       if (event.key === key) {
//         try {
//           setStoredValue(event.newValue ? JSON.parse(event.newValue) : initialValue);
//         } catch (error) {
//           console.error(`Error handling storage event for key "${key}":`, error);
//         }
//       }
//     }

//     // Listen for changes
//     window.addEventListener('storage', handleStorageChange);
    
//     // Cleanup
//     return () => {
//       window.removeEventListener('storage', handleStorageChange);
//     };
//   }, [key, initialValue]);

//   return [storedValue, setValue];
// }

// function MeetingScheduler() {
//   const navigate = useNavigate();
//   const [meetings, setMeetings] = useLocalStorage('meetingsData', []);
//   const [showForm, setShowForm] = useState(false);
  
//   const [newMeeting, setNewMeeting] = useState({
//     title: '',
//     date: '',
//     time: '',
//     duration: 30,
//     participants: '',
//     roomID: '',
//     description: ''
//   });

//   // Debug output for initial load
//   useEffect(() => {
//     console.log('MeetingScheduler mounted, initial meetings:', meetings);
//   }, [meetings]);

//   const generateRoomID = () => {
//     const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     let id = '';
//     for (let i = 0; i < 8; i++) {
//       id += chars.charAt(Math.floor(Math.random() * chars.length));
//     }
//     return id;
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewMeeting(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };
  
//   const handleScheduleMeeting = (e) => {
//     e.preventDefault();
    
//     const meetingToAdd = {
//       ...newMeeting,
//       id: Date.now(),
//       roomID: newMeeting.roomID || generateRoomID() 
//     };
    
//     // Using functional update to ensure we work with the latest state
//     setMeetings(currentMeetings => [...currentMeetings, meetingToAdd]);
//     console.log('Scheduled new meeting:', meetingToAdd);
    
//     // Reset the form
//     setNewMeeting({
//       title: '',
//       date: '',
//       time: '',
//       duration: 30,
//       participants: '',
//       roomID: '',
//       description: ''
//     });
    
//     setShowForm(false);
//   };
  
//   const handleDeleteMeeting = (id) => {
//     setMeetings(currentMeetings => 
//       currentMeetings.filter(meeting => meeting.id !== id)
//     );
//   };

//   const handleJoinMeeting = (roomID) => {
//     navigate(`/meeting-room?roomID=${roomID}`);
//   };

//   const today = new Date().toISOString().split('T')[0];
  
//   const formatDate = (dateString) => {
//     const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
//     return new Date(dateString).toLocaleDateString(undefined, options);
//   };

//   const upcomingMeetings = meetings.filter(meeting => {
//     const meetingDate = new Date(meeting.date).setHours(0, 0, 0, 0);
//     const todayDate = new Date().setHours(0, 0, 0, 0); 
//     return meetingDate >= todayDate;
//   });

//   const toggleForm = () => {
//     setShowForm(prevState => !prevState);
//   };

//   return (
//     <div className="scheduler-container">
//       <div className="scheduler-header">
//         <h2>Meeting Scheduler</h2>
//         <button 
//           className="new-meeting-btn"
//           onClick={toggleForm}
//         >
//           {showForm ? 'Cancel' : '+ New Meeting'}
//         </button>
//       </div>
     
//       {showForm && (
//         <div className="meeting-form-container">
//           <form onSubmit={handleScheduleMeeting} className="meeting-form">
//             <div className="form-group">
//               <label htmlFor="title">Meeting Title*</label>
//               <input
//                 type="text"
//                 id="title"
//                 name="title"
//                 value={newMeeting.title}
//                 onChange={handleInputChange}
//                 required
//                 placeholder="Enter meeting title"
//               />
//             </div>
            
//             <div className="form-row">
//               <div className="form-group">
//                 <label htmlFor="date">Date*</label>
//                 <input
//                   type="date"
//                   id="date"
//                   name="date"
//                   value={newMeeting.date}
//                   onChange={handleInputChange}
//                   min={today}
//                   required
//                 />
//               </div>

//               <div className="form-group">
//                 <label htmlFor="time">Time*</label>
//                 <input
//                   type="time"
//                   id="time"
//                   name="time"
//                   value={newMeeting.time}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>

//               <div className="form-group">
//                 <label htmlFor="duration">Duration (minutes)*</label>
//                 <select
//                   id="duration"
//                   name="duration"
//                   value={newMeeting.duration}
//                   onChange={handleInputChange}
//                   required
//                 >
//                   <option value="15">15</option>
//                   <option value="30">30</option>
//                   <option value="45">45</option>
//                   <option value="60">60</option>
//                   <option value="90">90</option>
//                   <option value="120">120</option>
//                 </select>
//               </div>
//             </div>
        
//             <div className="form-group">
//               <label htmlFor="participants">Participants (emails, comma separated)</label>
//               <input
//                 type="text"
//                 id="participants"
//                 name="participants"
//                 value={newMeeting.participants}
//                 onChange={handleInputChange}
//                 placeholder="john@example.com, jane@example.com"
//               />
//             </div>
      
//             <div className="form-group">
//               <label htmlFor="roomID">Room ID (optional)</label>
//               <input
//                 type="text"
//                 id="roomID"
//                 name="roomID"
//                 value={newMeeting.roomID}
//                 onChange={handleInputChange}
//                 placeholder="Leave empty to generate automatically"
//               />
//             </div>
      
//             <div className="form-group">
//               <label htmlFor="description">Description</label>
//               <textarea
//                 id="description"
//                 name="description"
//                 value={newMeeting.description}
//                 onChange={handleInputChange}
//                 placeholder="Meeting agenda or notes"
//                 rows="3"
//               ></textarea>
//             </div>
            
//             <div className="form-actions">
//               <button type="submit" className="schedule-btn">Schedule Meeting</button>
//             </div>
//           </form>
//         </div>
//       )}
    
//       <div className="meetings-list">
//         <h3>Upcoming Meetings ({upcomingMeetings.length})</h3>
//         {upcomingMeetings.length === 0 ? (
//           <p className="no-meetings">No scheduled meetings. Create one to get started!</p>
//         ) : (
//           <div className="meeting-cards">
//             {upcomingMeetings.map(meeting => (
//               <div key={meeting.id} className="meeting-card">
//                 <div className="meeting-card-header">
//                   <h4>{meeting.title}</h4>
//                   <div className="meeting-actions">
//                     <button 
//                       className="join-meeting-btn" 
//                       onClick={() => handleJoinMeeting(meeting.roomID)}
//                       aria-label={`Join meeting ${meeting.title}`}
//                     >
//                       Join
//                     </button>
//                     <button 
//                       className="delete-meeting-btn" 
//                       onClick={() => handleDeleteMeeting(meeting.id)}
//                       aria-label={`Delete meeting ${meeting.title}`}
//                     >
//                       ✕
//                     </button>
//                   </div>
//                 </div>
//                 <div className="meeting-details">
//                   <p><strong>Date & Time:</strong> {formatDate(meeting.date)} at {meeting.time}</p>
//                   <p><strong>Duration:</strong> {meeting.duration} minutes</p>
//                   <p><strong>Room ID:</strong> {meeting.roomID}</p>
//                   {meeting.participants && (
//                     <p><strong>Participants:</strong> {meeting.participants}</p>
//                   )}
//                   {meeting.description && (
//                     <p><strong>Description:</strong> {meeting.description}</p>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Debug section */}
//       <div style={{ marginTop: '30px', padding: '15px', border: '1px dashed #ccc', borderRadius: '4px' }}>
//         <h3>Debug Information</h3>
//         <p>Current localStorage state:</p>
//         <pre style={{ background: '#f5f5f5', padding: '10px', overflow: 'auto' }}>
//           {JSON.stringify(meetings, null, 2)}
//         </pre>
//         <button 
//           onClick={() => {
//             const testMeeting = {
//               id: Date.now(),
//               title: 'Test Meeting',
//               date: today,
//               time: '12:00',
//               duration: 30,
//               participants: 'test@example.com',
//               roomID: 'TEST123',
//               description: 'This is a test meeting'
//             };
//             setMeetings(curr => [...curr, testMeeting]);
//           }}
//           style={{ padding: '8px 16px', marginRight: '10px' }}
//         >
//           Add Test Meeting
//         </button>
//         <button 
//           onClick={() => {
//             localStorage.clear();
//             setMeetings([]);
//           }}
//           style={{ padding: '8px 16px' }}
//         >
//           Clear All Data
//         </button>
//       </div>
//     </div>
//   );
// }

// export default MeetingScheduler;



// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import '../Styles/MeetingsPage.css';

// // Custom hook for localStorage
// function useLocalStorage(key, initialValue) {
//   const getStoredValue = () => {
//     try {
//       const item = window.localStorage.getItem(key);
//       return item ? JSON.parse(item) : initialValue;
//     } catch (error) {
//       console.error(`Error reading localStorage key "${key}":`, error);
//       return initialValue;
//     }
//   };

//   const [storedValue, setStoredValue] = useState(getStoredValue);

//   const setValue = (value) => {
//     try {
//       const valueToStore = value instanceof Function ? value(storedValue) : value;
//       setStoredValue(valueToStore);
//       window.localStorage.setItem(key, JSON.stringify(valueToStore));
//     } catch (error) {
//       console.error(`Error writing to localStorage key "${key}":`, error);
//     }
//   };

//   useEffect(() => {
//     function handleStorageChange(event) {
//       if (event.key === key) {
//         try {
//           setStoredValue(event.newValue ? JSON.parse(event.newValue) : initialValue);
//         } catch (error) {
//           console.error(`Error handling storage event for key "${key}":`, error);
//         }
//       }
//     }

//     window.addEventListener('storage', handleStorageChange);
//     return () => window.removeEventListener('storage', handleStorageChange);
//   }, [key, initialValue]);

//   return [storedValue, setValue];
// }

// function MeetingScheduler() {
//   const navigate = useNavigate();
//   const [meetings, setMeetings] = useLocalStorage('meetingsData', []);
//   const [showForm, setShowForm] = useState(false);
  
//   const [newMeeting, setNewMeeting] = useState({
//     title: '',
//     date: '',
//     time: '',
//     duration: 30,
//     participants: '',
//     roomID: '',
//     description: ''
//   });

//   const generateRoomID = () => {
//     const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     return Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewMeeting(prevState => ({ ...prevState, [name]: value }));
//   };
  
//   const handleScheduleMeeting = (e) => {
//     e.preventDefault();
//     const meetingToAdd = { ...newMeeting, id: Date.now(), roomID: newMeeting.roomID || generateRoomID() };
//     setMeetings(currentMeetings => [...currentMeetings, meetingToAdd]);
//     setNewMeeting({ title: '', date: '', time: '', duration: 30, participants: '', roomID: '', description: '' });
//     setShowForm(false);
//   };
  
//   const handleDeleteMeeting = (id) => {
//     setMeetings(currentMeetings => currentMeetings.filter(meeting => meeting.id !== id));
//   };

//   const handleJoinMeeting = (roomID) => {
//     navigate(`/meeting-room?roomID=${roomID}`);
//   };

//   const today = new Date().toISOString().split('T')[0];

//   const upcomingMeetings = meetings.filter(meeting => new Date(meeting.date) >= new Date(today));

//   return (
//     <div className="scheduler-container">
//       <div className="scheduler-header">
//         <h2>Meeting Scheduler</h2>
//         <button className="new-meeting-btn" onClick={() => setShowForm(!showForm)}>
//           {showForm ? 'Cancel' : '+ New Meeting'}
//         </button>
//       </div>
//       {showForm && (
//         <form onSubmit={handleScheduleMeeting} className="meeting-form">
//           <input type="text" name="title" value={newMeeting.title} onChange={handleInputChange} required placeholder="Meeting Title" />
//           <input type="date" name="date" value={newMeeting.date} onChange={handleInputChange} min={today} required />
//           <input type="time" name="time" value={newMeeting.time} onChange={handleInputChange} required />
//           <select name="duration" value={newMeeting.duration} onChange={handleInputChange} required>
//             {[15, 30, 45, 60, 90, 120].map(time => <option key={time} value={time}>{time} min</option>)}
//           </select>
//           <input type="text" name="participants" value={newMeeting.participants} onChange={handleInputChange} placeholder="Participants (emails)" />
//           <input type="text" name="roomID" value={newMeeting.roomID} onChange={handleInputChange} placeholder="Room ID (optional)" />
//           <textarea name="description" value={newMeeting.description} onChange={handleInputChange} placeholder="Meeting Description" />
//           <button type="submit" className="schedule-btn">Schedule Meeting</button>
//         </form>
//       )}
//       <div className="meetings-list">
//         <h3>Upcoming Meetings ({upcomingMeetings.length})</h3>
//         {upcomingMeetings.length === 0 ? (
//           <p>No scheduled meetings. Create one!</p>
//         ) : (
//           upcomingMeetings.map(meeting => (
//             <div key={meeting.id} className="meeting-card">
//               <h4>{meeting.title}</h4>
//               <p>{meeting.date} at {meeting.time}</p>
//               <button onClick={() => handleJoinMeeting(meeting.roomID)}>Join</button>
//               <button onClick={() => handleDeleteMeeting(meeting.id)}>Delete</button>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }

// export default MeetingScheduler;
