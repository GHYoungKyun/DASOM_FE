import React, {useState} from 'react';
import axios from 'axios';
import './Signup.css';
import './default.css';
import signup_image from './images/27572996_Mans_hand_giving_heart_gift_to_woman.png'
import {useNavigate} from 'react-router-dom';

function Signup() {

  const [nickname, setNickname] = useState('');
  const [univ, setUniv] = useState('광운대학교');
  const [univEmail, setEmail] = useState('');
  const [vernum, setNum] = useState('');
  const [isSended, setIsSended] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isDuplicated, setIsDuplicated] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const univOptions = [
    '가천대학교', '가톨릭대학교', '강원대학교', '건국대학교', '건국대학교(글로컬)', '경기과학기술대학교', 
    '경기대학교', '경남대학교', '경남정보대학교', '경복대학교', '경북대학교', '경상국립대학교', '경성대학교', 
    '경인여자대학교', '경희대학교', '경희사이버대학교', '계명대학교', '계명문화대학교', '계원예술대학교', 
    '고려대학교 세종캠퍼스', '고려대학교', '고려사이버대학교', '공주대학교', '광운대학교', '국민대학교', 
    '남서울대학교', '단국대학교', '단국대학교', '대구가톨릭대학교', '대구대학교', '대구보건대학교', '대림대학교', 
    '대전대학교', '대전보건대학교', '덕성여자대학교', '동국대학교', '동국대학교(경주)', '동덕여자대학교', 
    '동서대학교', '동서울대학교', '동아대학교', '동양미래대학교', '동의과학대학교', '동의대학교', '마산대학교', 
    '명지대학교 자연캠퍼스', '명지전문대학교', '배재대학교', '백석대학교', '백석문화대학교', '부경대학교', 
    '부산대학교', '부천대학교', '삼육대학교', '상명대학교', '상지대학교', '서강대학교', '서경대학교', 
    '서영대학교', '서울과학기술대학교', '서울대학교', '서울디지털대학교', '서울사이버대학교', '서울시립대학교', 
    '서울여자대학교', '서울예술대학교', '서일대학교', '선문대학교', '성균관대학교', '성신여자대학교', '세종대학교', 
    '세종사이버대학교', '수원과학대학교', '수원대학교', '숙명여자대학교', '순천향대학교', '숭실대학교', '신구대학교', 
    '아주대학교', '연성대학교', '연세대학교', '영남대학교', '영남이공대학교', '영진전문대학교', '오산대학교', 
    '우송대학교(본교)', '울산대학교', '원광대학교', '유한대학교', '이화여자대학교', '인덕대학교', '인제대학교', 
    '인천대학교', '인하공업전문대학', '인하대학교', '장안대학교', '전남대학교', '전북대학교', '전주대학교', 
    '제주대학교', '조선대학교', '중부대학교', '중앙대학교', '중앙대학교', '청주대학교', '충남대학교', '충북대학교', 
    '한국공학대학교', '한국교통대학교', '한국방송통신대학교', '한국외국어대학교', '한국항공대학교', '한남대학교', 
    '한밭대학교', '한성대학교', '한양대학교', '한양대학교(ERICA)', '한양사이버대학교', '한양여자대학교', 
    '호서대학교', '홍익대학교'
  ]
  
  const toggling = () => setIsOpen(!isOpen);

  const navigate = useNavigate();

  const userId = localStorage.getItem('userId');

  const onOptionClicked = value => () => {
    setUniv(value);
    setIsOpen(false);
  };

  const postData = async () => {
    try {
      // POST 요청 보낼 엔드포인트 URL
      const apiUrl = 'http://140.238.14.81:8080/users/sendmail';


      // 보낼 데이터
      const dataToSend = {
        userId : userId,
        nickname: nickname,
        school: univ,
        univemail: univEmail
      };

      // Axios를 사용하여 POST 요청 보내기
      const response = await axios.post(apiUrl, dataToSend);
      // 성공적으로 응답 받았을 때의 처리
      console.log('응답 데이터:', response.data);

      if(response.data) {
        setIsSended(true);
      }
    } catch (error) {
      // 오류 발생 시의 처리
      navigate('/error');
      console.error('에러 발생:', error);
    }
  };

  function submit() {
    console.log(nickname);
    console.log(univ);
    console.log(univEmail);
    console.log(userId);

    //여기에 회원정보 제출하는 함수 작성
    postData();
  }
  function submit2() {
    console.log(nickname);
    console.log(univ);
    console.log(univEmail);

    //여기에 회원정보 제출하는 함수 작성
    const verData = async () => {
      try {
        // POST 요청 보낼 엔드포인트 URL
        const apiUrl = 'http://140.238.14.81:8080/users/verifymail';


        // 보낼 데이터
        const dataToSend = {
          userId : userId,
          nickname: nickname,
          school: univ,
          univemail: univEmail,
          inputVerifyCode: vernum
        };

        // Axios를 사용하여 POST 요청 보내기
        const response = await axios.post(apiUrl, dataToSend);

        // 성공적으로 응답 받았을 때의 처리
        console.log('응답 데이터:', response.data);

        if(response.data) {
          setIsVerified(true);
        }
      } catch (error) {
        // 오류 발생 시의 처리
        navigate('/error');
        console.error('에러 발생:', error);
      }
    };
    verData();
  }
  function submit3() {
    console.log(nickname);
    console.log(univ);
    console.log(univEmail);

    //여기에 회원정보 제출하는 함수 작성
    const signupData = async () => {
      try {
        // POST 요청 보낼 엔드포인트 URL
        const apiUrl = 'http://140.238.14.81:8080/users/signup';


        // 보낼 데이터
        const dataToSend = {
          userId : userId,
          nickname: nickname,
          school: univ,
          univemail: univEmail,
          inputVerifyCode: vernum
        };

        // Axios를 사용하여 POST 요청 보내기
        const response = await axios.post(apiUrl, dataToSend);

        // 성공적으로 응답 받았을 때의 처리
        console.log('응답 데이터:', response.data);

        if(response.data) {
          localStorage.setItem('nickname', nickname);
          navigate("/main");
        }
      } catch (error) {
        // 오류 발생 시의 처리
        navigate('/error');
        console.error('에러 발생:', error);
      }
    };
    signupData();
  }

  const getDupId = async () => {
    try {
      const resp = await (await axios.get(`http://140.238.14.81:8080/users/nickname/${nickname}`));
      console.log(resp.data);

      if(!resp.data) {
        setIsDuplicated(false);
      }
    } catch (error) {
      navigate('/error')
    }
  }

  function handleDupId() {
    console.log(isDuplicated);
    getDupId();
  }

  return (
    <div className="background">
      <div className="signup_page">
        <div className="signup_left">
          <div className="Signup-header">DASOM</div>
          <img src={signup_image} />
        </div>
        {!isSended && (
            <div className="Signup-form">
              <div className="form-header">
                회원가입
              </div>
              <div className="signup-detail">
                <div className="signup-nickname">
                  <label>닉네임<br />
                    <input type="text" onChange={(event) => setNickname(event.target.value)} className="Signup-input"></input>
                    <br /><button onClick={handleDupId} className="nicknameButton">닉네임 중복 확인</button>
                  </label>
                </div>
                <div className="signup-univ">
                  <label>대학교<br />
                  <div className="dd-wrapper" onClick={toggling}>
                    <button 
                        className="dd-header"  
                        >
                            {univ}
                    </button>
                    {isOpen && (
                        <ul className="dd-list">
                            {univOptions.map(option => (
                                <li className="dd-list-item" onClick={onOptionClicked(option)}>
                                    {option}
                                </li>
                            ))}
                        </ul>
                    )}
                  </div>
                  </label>
                </div>
                <div className="email">
                  <label>대학교 이메일<br />
                    <input type="text" onChange={(event) => setEmail(event.target.value)} className="Signup-input"></input>
                    {!isDuplicated && (
                        <button onClick={submit} className="submit">메일보내기</button>
                    )}
                  </label>
                </div>
              </div>
            </div>
        )}

        {isSended && !isVerified && (
            <div className="signup-num">
              <label className="num-input">인증번호 <br />
                <input type="text" onChange={(event) => setNum(event.target.value)} className="Signup-input"></input>
                <button onClick={submit2} className="submit">인증번호</button>
              </label>
            </div>
        )}

        {isVerified && (
          <>
            <div className="verify">
              <p>인증 완료되었습니다. <br />아래 버튼을 통해 가입을 완료해주세요.</p>
              <button onClick={submit3} className="submit">
              회원가입
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
}

export default Signup;