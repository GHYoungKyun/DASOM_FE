import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './Signup.css';

function Signup() {

  const [nickname, setNickname] = useState('');
  const [univ, setUniv] = useState('univ1');
  const [univEmail, setEmail] = useState('');


  function submit() {
    console.log(nickname);
    console.log(univ);
    console.log(univEmail);

    //여기에 회원정보 제출하는 함수 작성
    const postData = async () => {
      try {
        // POST 요청 보낼 엔드포인트 URL
        const apiUrl = 'http://140.238.14.81:8080/users/sendmail';

        // 보낼 데이터
        const dataToSend = {
          nickname: nickname,
          school: univ,
          univEmail: univEmail
        };

        // Axios를 사용하여 POST 요청 보내기
        const response = await axios.post(apiUrl, dataToSend);
        console.log(response);

        // 성공적으로 응답 받았을 때의 처리
        console.log('응답 데이터:', response.data);
      } catch (error) {
        // 오류 발생 시의 처리
        console.error('에러 발생:', error);
      }
    };
  }

  return (
    <div>
      <h1 className="Signup-header">DASOM에 오신 것을 환영합니다!</h1>
        <form className="Signup-form">
          <label className="Signup-detail">닉네임<br />
            <input type="text" onChange={(event) => setNickname(event.target.value)} className="Signup-input"></input>
          </label>
          <label className="Signup-detail">대학교<br />
            <select onChange={(event) => setUniv(event.target.value)} className="Signup-select">
              <option value="univ1">광운대학교</option>
              <option value="univ2">서울대학교</option>
              <option value="univ3">연세대학교</option>
              <option value="univ4">고려대학교</option>
            </select>
          </label>
          <label className="Signup-detail">대학교 이메일<br />
            <input type="text" onChange={(event) => setEmail(event.target.value)} className="Signup-input"></input>
          </label><br />
          <button onClick={submit} className="submit">
            회원가입
          </button>
        </form>
    </div>
  );
}

export default Signup;