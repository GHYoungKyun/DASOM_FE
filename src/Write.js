import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import { Link } from 'react-router-dom';
import axios from "axios";
import './Write.css';
import profile from './profile_image.jpg';
import "react-datepicker/dist/react-datepicker.css";

function Write() {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState("");
    const [writer, setWriter] = useState('');
    const [gender, setGender] = useState('전체');
    const [num, setNum] = useState('1');
    const [univ, setUniv] = useState('');
    const [meetDate, setmeetDate] = useState(new Date());
    const [location, setLocation] = useState('전체');


    function submit() {
        console.log(title);
        console.log(content);
        console.log(writer);
        console.log(gender);
        console.log(num);
        console.log(univ);
        console.log(meetDate);
        console.log(location);
        const postData = async () => {
            try {
                // POST 요청 보낼 엔드포인트 URL
                const apiUrl = 'http://140.238.14.81:8080/post';

                // 보낼 데이터
                const dataToSend = {
                    title: title,
                    content: content,
                    writer: writer,
                    gender: gender,
                    num: num,
                    school: univ,
                    date: meetDate,
                    location: location
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
            <select onChange={(event) => setGender(event.target.value)} className="sizeSet">
                <option value="전체">전체</option>
                <option value="남">남</option>
                <option value="여">여</option>
            </select>
            <p>모집인원</p>
            <select onChange={(event) => setNum(event.target.value)} className="sizeSet">
                <option value="1">1:1</option>
                <option value="2">2:2</option>
                <option value="3">3:3</option>
                <option value="4">4:4</option>
                <option value="5">5:5</option>
            </select>
            <p>미팅날짜</p>
            <DatePicker
                className="sizeSet"
                dateFormat="yyyy/MM/dd"
                selected={meetDate}
                onChange={date => setmeetDate(date)}
                minDate={new Date()}
            />
            <p>미팅지역</p>
            <select onChange={(event) => setLocation(event.target.value)} className="sizeSet">
                <option value="전체">전체</option>
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
            <textarea id="content" onChange={(event) => setContent(event.target.value)} placeholder="글 내용을 입력해주세요."/>
            <Link to="/main">
                <button className="cancel_button">취소</button>
            </Link>
            <Link to="/read">
                <button onClick={submit} className="upload_button">글 등록</button>
            </Link>
        </div>
    );
}

export default Write;