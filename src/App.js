import React from "react";
import { Route, Routes, Link } from 'react-router-dom';
import Login from './Login';
import MeetingRequest from './MeetingRequest';
import MyPage from './MyPage';
import Signup from './Signup';

function App() {
  return (
    <div>
        <Routes>
          <Route path="/login" element={<Login />} />                       
          <Route path="/meetingreq" element={<MeetingRequest />} />         
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
    </div>
  );
}

export default App;
