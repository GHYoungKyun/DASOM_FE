import React from "react";
import { Route, Routes, Link } from 'react-router-dom';
import Login from './Login';
import MeetingRequest from './MeetingRequest';
import MyPage from './MyPage';
import Signup from './Signup';
import Main from './Main';
import Applicant from './Applicant';
import Write from './Write';
import Read from './Read';
import Redirect from './Redirect';
import RedirectK from './RedirectK';

function App() {
  return (
    <div>
        <Routes>
            <Route path="/login" element={<Login />} />                       
            <Route path="/meetingreq" element={<MeetingRequest />} />         
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/main" element={<Main />} />
            <Route path="/appllicant" element={<Applicant />} />
            <Route path="/write" element={<Write />} />
            <Route path={`/read/:id`} element={<Read />} />
            <Route path="/oauth/redirected/naver" element={<Redirect />} />
            <Route path="/oauth/redirected/kakao" element={<RedirectK />} />
        </Routes>
    </div>
  );
}

export default App;
