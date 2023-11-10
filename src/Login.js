import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'

function Login() {
  const navigate = useNavigate();
  function submitButton() {
    window.open('http://140.238.14.81:8080/oauth2/authorization/naver', '_blank');
    // navigate('/signup');
  }

  return (
    <div className="main">
      <h1 className="header">DASOM에 오신 것을 환영합니다!</h1>
      <form className="allForm">
        {/*<label>*/}
        {/*  <div className="idInput">*/}
        {/*    <div className="inputInfo">*/}
        {/*      아이디*/}
        {/*    </div>*/}
        {/*    <input type="text" className="Text" onChange={(event) => {getid(event.target.value)}} />*/}
        {/*  </div>*/}
        {/*</label>*/}
        {/*<label>*/}
        {/*  <div className="passwdInput">*/}
        {/*    <div className="inputInfo">*/}
        {/*      비밀번호*/}
        {/*    </div>*/}
        {/*    <input type="password" className="Text" onChange={(event) => {getPasswd(event.target.value)}} />*/}
        {/*  </div>*/}
        {/*</label>*/}
        <button type="submit" onClick={submitButton} className="loginButton">로그인</button>
      </form>
    </div>
  );
}

export default Login;
