import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import { Link } from 'react-router-dom';
import './Main.css';
import profile from './profile_image.jpg';
import "react-datepicker/dist/react-datepicker.css";

function Main() {
    const [meetDate, setmeetDate] = useState(new Date());
    const sizeSet = {
        width: '90px',
        height: '30px',
    };
    const makeInline = {
        display: 'inline',
    };

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
                <Link to="/write">
                    <button className="write_button">새 게시물 작성</button>
                </Link>
            </div>
            <div className="Frame">사진</div>
            <div className="gender_filter">
                <p>모집성별</p>
    `           <select style={sizeSet}>
                    <option value="전체">전체</option>
                    <option value="남">남</option>
                    <option value="여">여</option>
                </select>
            </div>
            <div className="num_filter">
                <p>모집인원</p>
                <select style={sizeSet}>
                    <option value="1:1">1:1</option>
                    <option value="2:2">2:2</option>
                    <option value="3:3">3:3</option>
                    <option value="4:4">4:4</option>
                    <option value="5:5">5:5</option>
                </select>
            </div>
            <div className="date_filter">
                <p>미팅날짜</p>
                <DatePicker
                    className="dpsizeSet"
                    dateFormat="yyyy/MM/dd"
                    selected={meetDate}
                    onChange={date => setmeetDate(date)}
                    minDate={new Date()}
                />
            </div>
            <div className="place_filter">
                <p>미팅장소</p>
                <select style={sizeSet}>
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
            </div>
            <input type="text" className="searchbar" placeholder="게시물 검색"/>
            <button className="search_button">검색</button>
            <div className="space"></div>
            <div className="postBox">
                <Link to="/read">post1</Link>
            </div>
        </div>
    );
}

export default Main;