
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

