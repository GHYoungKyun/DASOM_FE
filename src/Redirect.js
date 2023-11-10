import React, {useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import axios from 'axios';

const Redirect = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // const handleOAuthKakao = async (code) => {
    //     try {
    //         // 카카오로부터 받아온 code를 서버에 전달하여 카카오로 회원가입 & 로그인한다
    //         const response = await axios.get(`https://ghyoungkyun.github.io/DASOM_FE/#/oauth/redirected/naver?code=${code}&state=${state}`);
    //         const data = response.data; // 응답 데이터
    //         alert("로그인 성공: " + data)
    //         navigate("/success");
    //     } catch (error) {
    //         navigate("/fail");
    //     }
    // };

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const code = searchParams.get('code');  // 카카오는 Redirect 시키면서 code를 쿼리 스트링으로 준다.
        const state = searchParams.get('state');
        if (code && state) {
            console.log(code);
            console.log(state);
            // handleOAuthKakao(code);
        }
    }, [location]);

    return (
        <div>
            <div>Processing...</div>
        </div>
    );
};

export default Redirect;