import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import './default.css';

const Redirect = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({});

    const handleOAuthNaver = async (code) => {
        try {
            // 네이버로부터 받아온 code를 서버에 전달하여 회원가입 & 로그인한다
            const response = await axios.get(`http://140.238.14.81:8080/oauth/login/naver?code=${code}`);
            const data = response.data; // 응답 데이터

            localStorage.setItem('userId', data);
            const userId = localStorage.getItem('userId');

            navigate("/success");
            getUser(userId)
        } catch (error) {
            navigate("/fail");
        }
    };

    const getUser = async (userId) => {
        try {
            const resp = await (await axios.get(`http://140.238.14.81:8080/users/${userId}`));
            setUserInfo(resp.data);
            localStorage.setItem('nickname', resp.data.nickname);
            if(resp.data) {
                navigate('/main');
            }
            else {
                navigate('/signup');
            }
        } catch (error) {
            navigate('/signup');
        }
    }

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const code = searchParams.get('code');  // 네이버는 Redirect 시키면서 code를 쿼리 스트링으로 준다.
        if (code) {
            handleOAuthNaver(code);
        }
    }, [location]);

    return (
        <div className="background">
            <div style={{fontSize: "64px"}}>다솜에 로그인하는 중 입니다...</div>
        </div>
    );
};

export default Redirect;