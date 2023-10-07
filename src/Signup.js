import React, {useState} from 'react';
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