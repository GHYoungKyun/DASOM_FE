import './MeetingRequest.css';
import './default.css';
import React, { useState } from 'react';
import Notification from './Notification';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import banner from './images/banner_image.png';

function MeetingRequest() {
  const [numPeople, setNumPeople] = useState(2);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState("");
  const userId = localStorage.getItem('userId');
  const { id } = useParams();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

    const openNotification = () => {
        setIsNotificationOpen(true);
    };

    const closeNotification = () => {
        setIsNotificationOpen(false);
    };

  const navigate = useNavigate();
  const postData = async () => {
    try {
      // POST 요청 보낼 엔드포인트 URL
      const apiUrl = 'http://140.238.14.81:8080/request';

      // 보낼 데이터
      const dataToSend = {
        title: title,
        content: content,
        userId: userId,
        postId: id
        //number: numPeople
      };

      // Axios를 사용하여 POST 요청 보내기
      const response = await axios.post(apiUrl, dataToSend);
      // 성공적으로 응답 받았을 때의 처리
      console.log('응답 데이터:', response.data);
      if(response.data) {
        navigate("/main");
      }
    } catch (error) {
      // 오류 발생 시의 처리
      navigate('./error')
    }
  };

  function handleSubmit(event) {
    console.log(title);
    console.log(content);
    console.log(userId);
    console.log(id);
    //console.log(numPeople);
    //console.log(univ);
    //console.log(location);
    postData();
  }

  return (
    <div>
      <div className="banner-top">
                    <Link to="/main" style={{textDecoration: 'none'}}>
                        <div className="text-wrapper">DASOM</div>
                    </Link>
                    <div id="profile">
                    <div className="top-nickname">
                            <Link to="/mypage" id="nickname_to_mypage" title="마이페이지">
                                {localStorage.getItem('nickname')}
                            </Link>님
                        </div>
                        <div>
                            <Link to="#" onClick={openNotification}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 45 49" fill="none">
                                    <path d="M44.118 35.5487C42.8389 33.3454 40.9375 27.1112 40.9375 18.9688C40.9375 14.0788 38.995 9.38917 35.5373 5.93147C32.0796 2.47377 27.3899 0.53125 22.5 0.53125C17.6101 0.53125 12.9204 2.47377 9.46273 5.93147C6.00503 9.38917 4.06251 14.0788 4.06251 18.9688C4.06251 27.1135 2.15884 33.3454 0.879741 35.5487C0.553099 36.1088 0.379933 36.7452 0.377707 37.3936C0.375481 38.042 0.544274 38.6795 0.867062 39.2419C1.18985 39.8043 1.65522 40.2716 2.21624 40.5967C2.77726 40.9218 3.41409 41.0933 4.06251 41.0938H13.4679C13.8933 43.1752 15.0246 45.0459 16.6704 46.3894C18.3162 47.7329 20.3755 48.4667 22.5 48.4667C24.6245 48.4667 26.6838 47.7329 28.3296 46.3894C29.9754 45.0459 31.1067 43.1752 31.5321 41.0938H40.9375C41.5857 41.0929 42.2223 40.9211 42.783 40.5959C43.3437 40.2706 43.8087 39.8032 44.1312 39.2409C44.4538 38.6786 44.6223 38.0412 44.62 37.393C44.6177 36.7448 44.4445 36.1086 44.118 35.5487ZM22.5 44.7812C21.3565 44.7809 20.2412 44.4261 19.3076 43.7658C18.374 43.1054 17.668 42.1719 17.2868 41.0938H27.7132C27.332 42.1719 26.6261 43.1054 25.6925 43.7658C24.7589 44.4261 23.6436 44.7809 22.5 44.7812ZM4.06251 37.4062C5.83712 34.3548 7.75002 27.2841 7.75002 18.9688C7.75002 15.0568 9.30403 11.3051 12.0702 8.53893C14.8364 5.77276 18.5881 4.21875 22.5 4.21875C26.412 4.21875 30.1637 5.77276 32.9298 8.53893C35.696 11.3051 37.25 15.0568 37.25 18.9688C37.25 27.2771 39.1583 34.3479 40.9375 37.4062H4.06251Z" fill="#292929"/>
                                </svg>    
                            </Link>
                            <div className = "notification">
                                {isNotificationOpen && <Notification onClose={closeNotification} />}
                            </div>
                        </div>
                        <Link to="/write">
                            <button className="write_button">새 게시물 작성</button>
                        </Link>
                    </div>
                </div>
                <div className="banner">
                    <div className="banner_word">
                        <div className="banner_logo">
                            다솜
                        </div>
                        <div className="banner_words">
                             : 사랑을 뜻하는 순우리말<br />
                            에서 아는 선배 없이도 미팅해요
                        </div>
                    </div>
                    <div className="banner_image">
                        <img src={banner} />
                    </div>
                </div>
      <div className="req_block">
        <div className="header">미팅 신청</div>
          <label className="contentsInput">
            <div className="write_contents">제목</div>
            <div className="inputValue">
              <input type="text" id="writeHeader" className="req-text" placeholder="제목을 입력해주세요" onChange={(event) => setTitle(event.target.value)}/>
            </div>
          </label>
          <label className="contentsInput">
            <div className="write_contents">소개글</div>
            <div className="inputValue">
              <textarea placeholder="간단한 소개글을 입력해주세요" id="writeContent" className="req-text" onChange={(event) => setContent(event.target.value)}/>
            </div>
          </label>
          <div>
            <button onClick={handleSubmit} type="submit" className="submitSet">전송하기</button>
          </div>
        </div>
    </div>
  );
}

export default MeetingRequest;
