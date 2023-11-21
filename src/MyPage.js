import './MyPage.css';
import './default.css';
import React, {useEffect, useState} from 'react';
import Notification from './Notification';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import ReactPaginate from 'react-paginate';
import banner from './images/banner_image.png';
import { getByDisplayValue } from '@testing-library/react';

function MyPage() {
  const [currentPage, pageChange] = useState('1');
  const userId = localStorage.getItem('userId');
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const navigate = useNavigate();
  const navigate2 = useNavigate();

    // 유저 로그인 여부 확인 및 페이지 리다이렉트
    useEffect(() => {
      const isUserLoggedIn = () => {
        const userId = localStorage.getItem('userId');
        return userId !== null;
      };
  
      const handlePageRedirect = () => {
        if (!isUserLoggedIn()) {
          // 유저가 로그인되어 있지 않다면 '/' 페이지로 이동
          navigate2('/');
        }
      };
  
      handlePageRedirect();
    }, [navigate2]);

    const openNotification = () => {
        setIsNotificationOpen(true);
    };

    const closeNotification = () => {
        setIsNotificationOpen(false);
    };

    function MyRequest() {

      const [reqList, setReqList] = useState(null);
      const [req, setReq] = useState(null);
      const [isUpdate, setIsUpdate] = useState(false);
      const [reqCurrentPage, setReqCurrentPage] = useState(0);
      const [totalPages, setTotalPages] = useState(1);
  
      const getReqList = async () => {
        try{
          const resp = await (await axios.get(`http://140.238.14.81:8080/request/${userId}?size=5&page=${reqCurrentPage}&sort=createdDate,desc`));
          setReqList(resp.data);
          setTotalPages(resp.data.totalPages);
          console.log(resp.data);
        } catch (error) {
          navigate('/error');
        }
      }
  
      useEffect(() => {
        getReqList();
        if(!userId) {
          navigate('/');
        }
      }, [reqCurrentPage]);
  
      const editReq = async () => {
        try {
          // POST 요청 보낼 엔드포인트 URL
          const apiUrl = `http://140.238.14.81:8080/request/${req.requestId.id}`;
  
          // 보낼 데이터
          const dataToSend = {
            title: req.title,
            content: req.content,
            userId: userId
          };
  
          // Axios를 사용하여 POST 요청 보내기
          const response = await axios.put(apiUrl, dataToSend);
          // 성공적으로 응답 받았을 때의 처리
          console.log('응답 데이터:', response.data);
          alert("수정되었습니다!")
          window.location.reload();
        } catch (error) {
          // 오류 발생 시의 처리
          navigate('/error');
          console.error('에러 발생:', error);
        }
      };
  
      const reqDelete = async (reqId) => {
        try{
          const resp = await (await axios.delete(`http://140.238.14.81:8080/request/${reqId}`));
          console.log(resp.data);
        alert("신청이 삭제되었습니다!");
      } catch (error) {
        navigate('/error');
      }
    }
  
      function handleDelete(reqId) {
        reqDelete(reqId);
      }
  
      function handleUpdate(req) {
        setIsUpdate(true);
        setReq(req);
      }
  
      function handleUpdateRequest() {
        editReq();
        setIsUpdate(false);
        console.log(req);
      }

      const handlePageClick = (selectedPage) => {
        setReqCurrentPage(selectedPage.selected);
        console.log(selectedPage.selected);
      };
  
      return (
          <>
          {reqList && reqList.content.map((val, idx) => (
              <>
              {isUpdate && (req.requestId.id == val.requestId.id) ? (
                    <div className="box_array">
                      <div className="modify_box_style">
                        <div className="edit_input">
                          <input type="text" value={req.title} style={{fontFamily: 'default_font', width: '500px', height: '30px', fontSize: '20px'}} className="mypage-modify" onChange={(event) => setReq({...req, title: event.target.value})} />
                        </div>
                        <div className="edit_input" id="edit_content">
                          <textarea value={req.content} style={{fontFamily: 'default_font', width: '500px', height: '100px', fontSize: '20px'}} className="mypage-modify" id="modify-textarea" onChange={(event) => setReq({...req, content: event.target.value})} />
                        </div>
                        <div className="box_username">
                          {req.nickname}
                        </div>
                      </div>
                        <button onClick={() => handleUpdateRequest()} className="edit_button">확인</button>
                    </div>
              ) : (
                    <div className="box_array">
                      <div className="box_style">
                        <div className="box_header_req">
                          {val.title}
                        </div>
                        <div className="box_content">
                          {val.content}
                        </div>
                        <div className="box_username">
                          {val.nickname}
                        </div>
                      </div>
                      {(val.result == null) && (
                          <>
                            {/*<Link to={`/editreq/${val.requestId.id}`}>*/}
                            <button onClick={() => handleUpdate(val)} className="edit_button">수정</button>
                            {/*</Link>*/}
                            <button onClick={() => handleDelete(val.requestId.id)} className="delete_button">삭제</button>
                          </>
                      )}
                    </div>
              )}
              </>
          ))}
          <ReactPaginate
              previousLabel={'이전'}
              nextLabel={'다음'}
              breakLabel={'...'}
              breakClassName={'break-me'}
              pageCount={totalPages}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={'pagination'}
              activeClassName={'active'}
          />
          </>
      );
    }
  function MyPost() {
    const [postList, setPostList] = useState(null);
    const [postCurrentPage, setPostCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    const genderEnumMapping = {
      MALE: "남",
      FEMALE: "여",
    };

    const numberEnumMapping = {
        ONE: "1:1",
        TWO: "2:2",
        THREE: "3:3",
        FOUR: "4:4",
        FIVE: "5:5"
    };

    const getPostList = async () => {
      try{
        const resp = await (await axios.get(`http://140.238.14.81:8080/post/${userId}?size=5&page=${postCurrentPage}&sort=createdDate,desc`));
        setPostList(resp.data);
        setTotalPages(resp.data.totalPages);
      } catch (error) {
        navigate('/error');
      }
    }

    useEffect(() => {
      getPostList();
    }, [postCurrentPage]);

    const handlePageClick = (selectedPage) => {
      setPostCurrentPage(selectedPage.selected);
    };

    return (
        <>
          <div className="box_array">
                        {postList && postList.content.map((val,idx) => (
                            <Link to={`/read/${val.postId.id}`} style={{width: '300px', margin: '60px', textDecoration: 'none'}}>
                            <div className="box_style">
                                <div className = "box_header">
                                    {val.title}
                                </div>
                                <div className = "box_info">
                                    <span className = "box_gender">
                                        {genderEnumMapping[val.gender]}
                                    </span>
                                    <span>
                                        |
                                    </span>
                                    <span className = "box_count">
                                      {numberEnumMapping[val.number]}
                                    </span>
                                    <span className = "box_date">
                                      {val.createdDate
                                          ? [
                                              val.createdDate[0],
                                              val.createdDate[1],
                                              val.createdDate[2],
                                          ].join('/') +
                                          ' ' +
                                          [
                                              val.createdDate[3].toString().padStart(2, '0'),
                                              val.createdDate[4].toString().padStart(2, '0'),
                                          ].join(':')
                                          : ''}
                                    </span>
                                </div>
                                <div className = "box_line">
                                </div>
                                <div className = "box_username">
                                    {val.nickname}
                                </div>
                            </div>
                            </Link>
                        ))}
                    </div>
          <ReactPaginate
              previousLabel={'이전'}
              nextLabel={'다음'}
              breakLabel={'...'}
              breakClassName={'break-me'}
              pageCount={totalPages}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={'pagination'}
              activeClassName={'active'}
          />
        </>
    );
  }

  //request와 participate 함수 형태가 같고 가지고 오는 데이터만 다르기 때문에 output 함수에서 request 함수에 주는 값을 다르게 만들어서 participate 함수까지 구현

  function Info() {
    const ages = Array.from({length: 10}, (_, i) => i + 20);
    const imgContainerStyle = {
      position: 'relative',
      display: 'inline-block',
      width: '200px',
      height: '230px', // Change this
      marginTop: '30px'
    };
  
    const imgStyle = {
      display: 'block',
      width: '100%',
      height: '87%', // Change this
    };
  
    const buttonStyle = {
     position:'absolute', 
     bottom:'0', 
     right:'0'
  };


    const userId = localStorage.getItem('userId');
    const [userInfo, setUserInfo] = useState({});
    const [isDuplicated, setIsDuplicated] = useState(true);
    const [nickname, setNickname] = useState(localStorage.getItem('nickname'));
    const navigate = useNavigate();


    const getUser = async () => {
      try {
        const resp = await (await axios.get(`http://140.238.14.81:8080/users/${userId}`));
        setUserInfo(resp.data);
        console.log(resp.data);
      } catch (error) {
        navigate('/error');
      }
    }
    useEffect(() => {
      getUser();
    }, []);


    const getDupId = async () => {
      try {
        const resp = await (await axios.get(`http://140.238.14.81:8080/users/nickname/${userInfo.nickname}`));
        console.log(resp.data);

        if(!resp.data) {
          setIsDuplicated(false);
        }
      } catch (error) {
        navigate('/error');
      }
    }

    function handleDupId() {
      getDupId();
    }

    const editUser = async () => {
      try {
        // POST 요청 보낼 엔드포인트 URL
        const apiUrl = `http://140.238.14.81:8080/users/${userId}`;

        // 보낼 데이터
        const dataToSend = {
          nickname: userInfo.nickname
        };

        // Axios를 사용하여 POST 요청 보내기
        const response = await axios.put(apiUrl, dataToSend);
        // 성공적으로 응답 받았을 때의 처리
        console.log('응답 데이터:', response.data);
        alert("수정되었습니다!")
      } catch (error) {
        // 오류 발생 시의 처리
        navigate('/error');
        console.error('에러 발생:', error);
      }
    };

    function handleEdit() {
      console.log(userInfo.nickname);
      localStorage.setItem('nickname', userInfo.nickname);
      editUser();
    }

    const handleQuit = async () => {
      try{
        const resp = await (await axios.delete(`http://140.238.14.81:8080/users/${userId}`));
        navigate('/');
      } catch (error) {
        navigate('/error');
      }
    }

    return (
      <>
        {userInfo && (
            <div className="my_info">
              <label>
                <h3>닉네임</h3>
                <input type="text" value={userInfo.nickname} onChange={(event) => setUserInfo({...userInfo, nickname: event.target.value})} className="nickNameInput"/>
                {isDuplicated && (<button onClick={handleDupId} className="nicknameButton">닉네임 중복 확인 </button>)}
                {!isDuplicated && (<button onClick={handleEdit} className="nicknameButton">닉네임 수정</button>)}
              </label>
              <h3>{userInfo.school}</h3>
              <label>
              </label><br />
              <label>
                <button onClick={handleQuit} className="quitButton">회원탈퇴</button>
              </label>
            </div>
            //현재 받은 패널티 출력하는 함수
        )}
      </>
    );
  }

  function output() {
    if(currentPage === '1'){
      return <MyRequest />;
    }
    if(currentPage === '2'){
      return <MyPost />;
    }
    if(currentPage === '3'){
      return <Info />;
    }
  }

  function Colorchange(Value) {
    const disabledStyle = {
      color: 'gray',
      fontSize: '20px',
      border: 'none',
      backgroundColor: 'transparent',
      marginRight: '10px',
    }
    const enabledStyle = {
      color: 'black',
      fontSize: '20px',
      border: 'none',
      backgroundColor: 'transparent',
      marginRight: '10px',
    }
    if(currentPage === Value){
      return enabledStyle;
    }
    else {
      return disabledStyle;
    }
    //어떻게 통합된 value를 세개의 Colorchange 함수에 전달할 것인가?
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
      <div className="mypage_menu">
        <h1>마이페이지</h1>
        <button onClick={() => pageChange('1')} style={Colorchange('1')}>
          신청글
        </button>
        <button onClick={() => pageChange('2')} style={Colorchange('2')}>
          작성글
        </button>
        <button onClick={() => pageChange('3')} style={Colorchange('3')}>
          내 정보
        </button>
      </div>
      {output()}
    </div>
  );
}

export default MyPage;