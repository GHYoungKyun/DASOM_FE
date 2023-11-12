import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import './Write.css';
import profile from './profile_image.jpg';

function Write() {

    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState("");
    const writer = localStorage.getItem('nickname');
    const userId = localStorage.getItem('userId');
    const [gender, setGender] = useState('MALE');
    const [num, setNum] = useState('TWO');
    const [univ, setUniv] = useState('');
    const [openKakaoAddress, setOpenKakaoAddress] = useState('');
    const [alcohol, setAlcohol] = useState('12');
    const [location, setLocation] = useState('강남구');

    const postData = async () => {
        try {
            // POST 요청 보낼 엔드포인트 URL
            const apiUrl = 'http://140.238.14.81:8080/post';

            // 보낼 데이터
            const dataToSend = {
                title: title,
                content: content,
                openKakaoAddress: openKakaoAddress,
                userId: userId,
                gender: gender,
                number: num,
                alcohol: alcohol
                //location: location
            };

            // Axios를 사용하여 POST 요청 보내기
            const response = await axios.post(apiUrl, dataToSend);
            // 성공적으로 응답 받았을 때의 처리
            console.log('응답 데이터:', response.data);
            if(response.data) {
                navigate("/main");
            }
        } catch (error) {
            // 오류 발생 시의 처리
            console.error('에러 발생:', error);
        }
    };
    function submit() {
        console.log(title);
        console.log(content);
        console.log(userId);
        console.log(gender);
        console.log(num);
        console.log(openKakaoAddress);
        //console.log(univ);
        //console.log(location);
        postData();
    }
    return(
        <div className="makeBlock">
            <div className="Project">
                <Link to="/main">
                    <div className="project_title"><strong>DASOM</strong></div>
                </Link>
                <div className="profile">
                    <Link to="/mypage">
                        <img src={profile} width="40" height="40"/>
                    </Link>
                </div>
            </div>
            <h1 className="header"> 과팅 or 미팅 정보를 입력해주세요.</h1>
            <hr />
            <p>모집성별</p>
            <select value={gender} onChange={(event) => setGender(event.target.value)} className="sizeSet">
                <option value="MALE">남</option>
                <option value="FEMALE">여</option>
            </select>
            <p>모집인원</p>
            <select value={num} onChange={(event) => setNum(event.target.value)} className="sizeSet">
                <option value="ONE">1:1</option>
                <option value="TWO">2:2</option>
                <option value="THREE">3:3</option>
                <option value="FOUR">4:4</option>
                <option value="FIVE">5:5</option>
            </select>
            <p>미팅지역</p>
            <select value={location} onChange={(event) => setLocation(event.target.value)} className="sizeSet">
                <option value="강남구">강남구</option>
                <option value="강동구">강동구</option>
                <option value="강서구">강서구</option>
                <option value="강북구">강북구</option>
                <option value="관악구">관악구</option>
                <option value="광진구">광진구</option>
                <option value="구로구">구로구</option>
                <option value="금천구">금천구</option>
                <option value="노원구">노원구</option>
                <option value="동대문구">동대문구</option>
                <option value="도봉구">도봉구</option>
                <option value="동작구">동작구</option>
                <option value="마포구">마포구</option>
                <option value="서대문구">서대문구</option>
                <option value="성동구">성동구</option>
                <option value="성북구">성북구</option>
                <option value="서초구">서초구</option>
                <option value="송파구">송파구</option>
                <option value="영등포구">영등포구</option>
                <option value="용산구">용산구</option>
                <option value="양천구">양천구</option>
                <option value="은평구">은평구</option>
                <option value="종로구">종로구</option>
                <option value="중구">중구</option>
                <option value="중랑구">중랑구</option>
            </select>
            <h1 className="header">과팅 or 미팅에 대해 소개해주세요.</h1>
            <hr />
            <p>제목</p>
            <input type="text" id="title" onChange={(event) => setTitle(event.target.value)} placeholder="글 제목을 입력해주세요."/>
            <p>오픈카카오톡 주소</p>
            <input type="text" id="title" onChange={(event) => setOpenKakaoAddress(event.target.value)} placeholder="오픈카카오톡 주소 입력."/>
            <textarea id="content" onChange={(event) => setContent(event.target.value)} placeholder="글 내용을 입력해주세요."/>
            <Link to="/main">
                <button className="cancel_button">취소</button>
            </Link>
            <button onClick={submit} className="upload_button">글 등록</button>
        </div>
    );
}

export default Write;