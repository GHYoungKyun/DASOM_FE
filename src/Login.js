import './Login.css';
import './default.css'
import React from 'react';
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