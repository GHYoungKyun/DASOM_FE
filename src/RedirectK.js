import React, {useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import axios from 'axios';

const RedirectK = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleOAuthKakao = async (code) => {
        try {
            // 네이버로부터 받아온 code를 서버에 전달하여 회원가입 & 로그인한다
            const response = await axios.get(`http://140.238.14.81:8080/oauth/login/kakao?code=${code}`);
            const data = response.data; // 응답 데이터

            localStorage.setItem('userId', data);
            localStorage.getItem('userId');

            alert("로그인 성공: " + data)
            navigate("/success");
            navigate("/signup");
        } catch (error) {
            navigate("/fail");
            console.log(error);
        }
    };

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const code = searchParams.get('code');  // 네이버는 Redirect 시키면서 code를 쿼리 스트링으로 준다.
        if (code) {
            alert("CODE = " + code)
            handleOAuthKakao(code);
        }
    }, [location]);

    /*
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const code = searchParams.get('code');  // 카카오는 Redirect 시키면서 code를 쿼리 스트링으로 준다.
        const state = searchParams.get('state');
        if (code && state) {
            console.log(code);
            console.log(state);

            // 성공적으로 리다이렉트 했을 때 해야할 동작
            if (window.opener) {
                window.opener.location.href = "http://localhost:3000/DASOM_FE/#/signup";
            }
            window.close();
        }
    }, [location]);

     */

    return (
        <div>
            <div>Processing...</div>
        </div>
    );
};

export default RedirectK;