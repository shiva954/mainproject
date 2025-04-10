import * as React from "react";
import {  Routes, Route } from 'react-router-dom';
import Header from "./Components/LandingPage/header";
import Dashboard from "./Components/Dashboard"; 
import SignIn from "./Components/LandingPage/SignIn";
import HomeContent from "./Components/HomeContent";
import Room from "./Components/Room";
import MeetingContent from "./Components/MeetingContent";
export const baseUrl = "https://connectmeet-nyay.onrender.com"
function App() {
    return (
          <div className="app">
            <Routes>
            <Route path="/" element={< Header/>} />
            <Route path="/Signin" element={ <SignIn />}/>
            <Route path="/Dashboard/*" element={<Dashboard />} />  
            <Route path="/" element={<HomeContent />} />
            <Route path="/meeting-room" element={<Room />} />
            <Route path="/scheduler" element={<MeetingContent />} />
            </Routes>
          </div>
    );
  }

export default App;


