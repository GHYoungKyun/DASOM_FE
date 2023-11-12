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

  let reqInfoAdd = [] // 배열에 신청한 미팅 정보 저장
  let partInfoAdd = [] // 배열에 참가한 미팅 정보 저장

  const addReqInfo = (reqInfoAdd) => {
    reqInfoSet(prevState => [...prevState, reqInfoAdd]);
  }
  const addPartInfo = (partInfoAdd) => {
    partInfoSet(prevState => [...prevState, partInfoAdd]);
  }

  function RequestAndParticipate(Univ, Header, HeadCount, UserName) {
    const univ = '광운대학교'; // Univ 정보 받아온 후 선언
    const header = '미팅하실분 모집합니다'; // Header 정보 받아온 후 선언
    const headCount = '3명'; // HeadCount 정보 받아온 후 선언
    const userName = '구운밤' // UserName 정보 받아온 후 선언

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

    return (
      <div style={boxStyle}>
        <p style={contentStyle}>
          <span style={univStyle}>
            {univ}
          </span>
          <h3 style={headerStyle}>
            {header}
          </h3>
          <span style={countStyle}>
            {headCount}
          </span>
          <hr />
          <span style={userStyle}>
            <img />
            {userName}
          </span>
        </p>
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

    const quit = async () => {
      const resp = await (await axios.delete(`http://140.238.14.81:8080/users/${userId}`));
      navigate('/login');
    }

    return (
      <div>
        <div style={imgContainerStyle}>
          <img src={profile} style={imgStyle}/>
          <button style={buttonStyle}>
            프사 바꾸기
          </button>
      </div>
        <form action="" method="POST">
          <label>
            <h3>{userInfo.nickname}</h3>
            <input type="text" value="현재 닉네임" className="nickNameInput"/>
          </label>
          <h3>{userInfo.school}</h3>
          <label>
          </label><br />
          <label>
            <button onClick={quit}>회원탈퇴</button>
          </label>
        </form>
        //현재 받은 패널티 출력하는 함수
      </div>
    );
  }

  function output() {
    if(currentPage === '1'){
      return <RequestAndParticipate />;
    }
    if(currentPage === '2'){
      return <RequestAndParticipate />;
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
        참여한 미팅
      </button>
      <button onClick={() => pageChange('3')} style={Colorchange('3')}>
        내 정보
      </button>
      {output()}
    </div>
  );
}

export default MyPage;