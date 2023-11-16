import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import profile from './profile_image.jpg'
import './MyPage.css'
import { getByDisplayValue } from '@testing-library/react';

function MyPage() {
  let RequestedInfo = [];
  const [currentPage, pageChange] = React.useState('1');
  const [reqInfo, reqInfoSet] = React.useState([]);
  const [partInfo, partInfoSet] = React.useState([]);

  const userId = localStorage.getItem('userId');

  const addReqInfo = (reqInfoAdd) => {
    reqInfoSet(prevState => [...prevState, reqInfoAdd]);
  }
  const addPartInfo = (partInfoAdd) => {
    partInfoSet(prevState => [...prevState, partInfoAdd]);
  }

  function RequestAndParticipate(Univ, Header, HeadCount, UserName) {

    const [reqList, setReqList] = useState([]);

    const boxStyle = {
      border: '2px solid',
      borderColor: 'gray',
      borderRadius: '40px',
      height: '200px',
      margin: '30px',
      marginRight: '70px',
    }

    const contentStyle = {
      marginLeft: '30px',
    }

    const univStyle = {
      fontSize: '12px',
      padding: '7px',
      backgroundColor: 'gray',
      color: 'white',
      borderRadius: '14px',
      textAlign: 'center',
    }

    const countStyle = {
      fontSize: '12px',
      padding: '7px',
      paddingLeft: '30px',
      paddingRight: '30px',
      backgroundColor: 'rgb(26, 188, 156)',
      color: 'white',
      borderRadius: '14px',
      textAlign: 'center',
    }

    const headerStyle = {
      marginBottom: '40px',
    }

    const userStyle = {
      fontSize: '12px',
    }
    const getReqList = async () => {
      const resp = await (await axios.get(`http://140.238.14.81:8080/request/user/${userId}`));
      setReqList(resp.data);

      reqList.map((val, idx) => console.log(val));
    }

    useEffect(() => {
      getReqList();
    }, []);


    return (
        <>
        {reqList && reqList.map((val, idx) => (
            <div>
              <div style={boxStyle}>
                <p style={contentStyle} />
              <span style={univStyle}>
              </span>
              <h3 style={headerStyle}>
                {val.title}
              </h3>
              <span style={countStyle}>
              {/*val.number*/}
              </span>
              <hr />
              <span style={userStyle}>
                    {val.userId}
              </span>
              </div>
            </div>
        ))}
        </>
    );
  }
  function Notice() {
    const [noticeList, setNoticeList] = useState([]);
    const getNoticeList = async () => {
      const resp = await (await axios.get(`http://140.238.14.81:8080/notice/${userId}`));
      setNoticeList(resp.data);

      noticeList.map((val, idx) => console.log(val));
    }

    useEffect(() => {
      getNoticeList();
    }, []);
    return (
        <div>
          <ul>
            {noticeList && noticeList.map((val,idx) => (
                <li key={idx}>
                  {val.requestName}/{val.requestContent}/{val.status}/{val.postId}/{val.postTitle}/{val.openKakao}/{val.kind}
                </li>
            ))}
          </ul>
        </div>
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
    const navigate = useNavigate();

    const getUser = async () => {
      const resp = await (await axios.get(`http://140.238.14.81:8080/users/${userId}`));
      setUserInfo(resp.data);
      console.log(resp.data);
    }
    useEffect(() => {
      getUser();
    }, []);

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
        console.error('에러 발생:', error);
      }
    };

    function handleEdit() {
      console.log(userInfo.nickname);
      localStorage.setItem('nickname', userInfo.nickname);
      editUser();
    }

    const handleQuit = async () => {
      const resp = await (await axios.delete(`http://140.238.14.81:8080/users/${userId}`));
      navigate('/');
    }

    return (
      <>
        {userInfo && (
            <div>
              <label>
                <h3>닉네임</h3>
                <input type="text" value={userInfo.nickname} onChange={(event) => setUserInfo({...userInfo, nickname: event.target.value})} className="nickNameInput"/>
                <button onClick={handleEdit}>닉네임 수정</button>
              </label>
              <h3>{userInfo.school}</h3>
              <label>
              </label><br />
              <label>
                <button onClick={handleQuit}>회원탈퇴</button>
              </label>
            </div>
            //현재 받은 패널티 출력하는 함수
        )}
      </>
    );
  }

  function output() {
    if(currentPage === '1'){
      return <RequestAndParticipate />;
    }
    if(currentPage === '2'){
      return <Notice />;
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
    <div className="main">
      <Link to="/main">
        <div className="pageName">
          <strong>DASOM</strong>
        </div>
      </Link>
      <h1>마이페이지</h1>
      <button onClick={() => pageChange('1')} style={Colorchange('1')}>
        신청한 미팅
      </button>
      <button onClick={() => pageChange('2')} style={Colorchange('2')}>
        알림함
      </button>
      <button onClick={() => pageChange('3')} style={Colorchange('3')}>
        내 정보
      </button>
      {output()}
    </div>
  );
}

export default MyPage;