import React from "react";
import { Route, Routes} from 'react-router-dom';
import Login from './Login';
import MeetingRequest from './MeetingRequest';
import MyPage from './MyPage';
import Signup from './Signup';
import Main from './Main';
import Applicant from './Applicant';
import Write from './Write';
import Edit from './Edit';
import Read from './Read';
import Redirect from './Redirect';
import RedirectK from './RedirectK';
import Notification from './Notification';
import ErrorPage from './ErrorPage';

function App() {
  return (
    <div>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path={`/meetingreq/:id`} element={<MeetingRequest />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/main" element={<Main />} />
            <Route path={`/applicant/:id`} element={<Applicant />} />
            <Route path="/write" element={<Write />} />
            <Route path={`/edit/:id`} element={<Edit />} />
            <Route path={`/read/:id`} element={<Read />} />
            <Route path="/oauth/redirected/naver" element={<Redirect />} />
            <Route path="/oauth/redirected/kakao" element={<RedirectK />} />
            <Route path="/notification" element={<Notification />} />
            <Route path="/error" element={<ErrorPage />} />
            
            <Route path="*" element={<ErrorPage />} />
        </Routes>
    </div>
  );
}

export default App;
