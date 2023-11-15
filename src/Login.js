import React from 'react';
import './Login.css';
import kakaoLogin from './images/kakao_login_large_narrow.png';
import naverLogin from './images/btnG.png';

const Login = () => {
    const handleKakaoLoginClick = () => {
        window.location.href = 'http://140.238.14.81:8080/oauth/kakao';
    };

    const handleNaverLoginClick = () => {
        window.location.href = 'http://140.238.14.81:8080/oauth/naver'; // Replace with your Naver login URL
    };

    return (
        <div className="background">
            <div className="main">
                <div className = "buttonBox">
                    <div className = "loginHeader">
                        DASOM
                    </div>
                    <div className = "loginHello">
                        DASOM에 오신것을 환영합니다!
                    </div>
                    <button
                        onClick={handleKakaoLoginClick}
                    >
                        <img src = {kakaoLogin} className = "kakaoLogin"/>
                    </button>
                    <button
                        onClick={handleNaverLoginClick}
                        className = "naverButton"
                    >
                        <img src = {naverLogin} className = "naverLogin" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
/*
import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'

function Login() {
  const navigate = useNavigate();
    const handleNaverLoginClick = () => {
        window.location.href = 'http://140.238.14.81:8080/oauth/naver'; // Replace with your Naver login URL
    };

  return (
    <div className="main">
      <h1 className="header">DASOM에 오신 것을 환영합니다!</h1>
      <div className="allForm">

        <button type="submit" onClick={handleNaverLoginClick} className="loginButton">로그인</button>
      </div>
    </div>
  );
}
*/

